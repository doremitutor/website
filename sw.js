console.log('Service worker waking up');
const currentCacheName="v1";
const urlsToCache=[
    '/css/main.css',
    '/css/home.css',
    '/css/basic.css',
    '/css/extended.css',
    '/css/roboto-flex/slnt-100-1000.woff2',
    '/scripts/createHTML.js',
    '/scripts/logicSupport/articles/sound.js',
    '/scripts/logicSupport/articles/time.js',
    '/scripts/logicSupport/articles/notation.js',
    '/scripts/logicSupport/games/notehunter/notehunter.js',
    '/scripts/logicSupport/score/details.js',
    '/scripts/logicSupport/score/lessonsIndex.js',
    '/scripts/logicSupport/score/playerClasses.js',
    '/scripts/logicSupport/score/playerEngine.js',
    '/scripts/logicSupport/score/playerEnumerators.js',
    '/scripts/logicSupport/score/playerPaths.js',
    '/scripts/logicSupport/score/playerSound.js',
    '/scripts/logicSupport/score/playerUI.js',
    '/scripts/logicSupport/score/scorePlayer.js',
    '/images/favicon.ico',
    '/images/Lesson195-980x500.png',
    '/images/LogoAndLangWrapper-bg-980x72.png',
    '/images/LogoAndLangWrapper-bg-1800x120.png',
    '/images/logoBanner-es.png',
    '/images/nameLessLogo-es-300.png',
    '/images/noteHunter952x324bass.svg',
    '/images/noteHunter952x324treble.svg',
    '/images/staffPaper952x450.svg',
    '/images/myself_100x100.png',
    '/images/myself_200x200.png',
    '/images/MiniLogo150x150.png',
    '/images/MiniLogo360x360.png',
    '/images/MiniLogo512x512.png'
];
const handleFetch=async(fetchEvent)=>{
    const request=fetchEvent.request;
    if(self.location.host.endsWith('.net')&&request.url.includes(`adsbygoogle.js`)){
        fetchEvent.respondWith(new Response(`console.log('No ads, I am local (.net)');`, {status: 200, headers: {'Content-Type': 'text/javascript'}}));
        return;
    }
    if(!request.url.startsWith('http')){
        fetchEvent.respondWith(new Response(`console.log(${request.url});`, {status: 200, headers: {'Content-Type': 'text/javascript'}}));
        return;
    }
    if(!request.url.includes(`/scripts/articles/`)){
        if(request.method=='GET'){// cacheable
            const currentCache=await caches.open(currentCacheName);
            const cacheResponse=await currentCache.match(request);
            if(cacheResponse){// Serve from cache & try to update if stale
                checkForUpdate(request, cacheResponse.clone(), currentCache);
                return cacheResponse;
            }else{// Serve from network & save to cache
                const networkResponse=await fetch(request);
                if(networkResponse.type='basic'){
                    const clonedResponse=networkResponse.clone();
                    currentCache.put(request, clonedResponse);
                }
                return networkResponse;
            }
        }else{//not cacheable
            return await fetch(request);
        }
    }else{// deniable
        return await fetch(request)
        .then(networkResponse=>{
            return networkResponse;
        })
        .catch(error=>{//deniable not found from network
            console.log('Error on denying article content:', error);
            return new Response(`export const article_es='<h1 id="onlyOnline">Conexión a Internet Requerida</h1>';
                                 export const article_en='<h1 id="onlyOnline">Internet Conexion Required</h1>';`,
                                 {status: 200, headers: {'Content-Type': 'text/javascript'}});
        });
    }
    return;
};
const checkForUpdate=async (request, cacheResponse, currentCache)=>{
    const cacheResponseETag=cacheResponse.headers.get('ETag');
    fetch(request, {method: 'HEAD'})// fetch a bodyless testResponse
    .then(testResponse=>{
        const networkETag=testResponse.headers.get('ETag');
        //console.log(request.url, 'Network ETag:', networkETag, 'Cache ETag:' , cacheResponseETag);//, cacheResponseETag, networkETag
        if(networkETag==cacheResponseETag){// same resource found
            return;
        }else{// fetch & cache updated resource for future calls
            fetch(request)
            .then(networkUpdatedResponse=>{
                currentCache.put(request, networkUpdatedResponse);
            });
        }
    })
    .catch(error=>{new Error('line 63', error);});
};
const logLocal=(msg)=>{
    if(self.location.host.endsWith('.net')){
        console.log(msg);
    }
}
self.addEventListener("install", (event) => {
    logLocal('installing');
    event.waitUntil(caches.open(currentCacheName).then(cache=>{cache.addAll(urlsToCache);}));
});
self.addEventListener('activate', (event) => {
    logLocal('activating');
    event.waitUntil(async () => {
        caches.keys()
        .then(keys=>{keys.filter(key=>![currentCacheName].includes(key))})
        .then(cachesToDelete=>{Promise.all(cachesToDelete.map(deleteCache))})
        .catch(e=>{console.error('Error: ', e.message)});
    });
});
self.addEventListener('fetch', handleFetch);