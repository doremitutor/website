const adsEnabled=0;
function AdUnit(group, index, slot){
    this.group=group;
    this.index=index;
    this.slot=slot;
};
const adUnits=[
    new AdUnit('adCenter', 1, 5437806506),
    new AdUnit('adCenter', 2, 6320671002),
    new AdUnit('adCenter', 3, 8537794323),
    new AdUnit('adLateral', 4, 4907516983),
    new AdUnit('adLateral', 5, 4998822806),
    new AdUnit('adLateral', 6, 1498561498),
    new AdUnit('adLateral', 7, 9685200942),
    new AdUnit('adLateral', 8, 1742297598),
    new AdUnit('adLateral', 9, 5745955933),
    new AdUnit('adLateral', 10, 1059577795),
    new AdUnit('adLateral', 11, 5278024402)
];
function createAdUnit(adUnit){
    /* div.innerHTML=`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-0501143569623969" data-ad-slot="${adUnit.slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({}); alert('executed');</script>`; */
    /* div.innerHTML=`<span>Publicidad ${adUnit.index}</span>`; */
    /*<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-0501143569623969" data-ad-slot="${adUnit.slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({}); alert('executed');</script> */
};
for(let i=0; i<3; i++){
    document.write(
        `<div class="adWrapper ${adUnits[i].group}" id="ad${adUnits[i].index}">
        <span>${adUnits[i].index}</span>
        </div>`
    );
}
document.write(
    `<div class="adWrapper ${adUnits[3].group}" id="ad${adUnits[3].index}">
    <span>${adUnits[3].index}</span>
    </div>`
);
document.write(`<div id="adsRight">`);
for(let i=4; i<6; i++){
    document.write(
        `<div class="adWrapper ${adUnits[i].group}" id="ad${adUnits[i].index}">
        <span>${adUnits[i].index}</span>
        </div>`
    );
}
document.write(`</div>`);
for(let i=6; i<8; i++){
    document.write(
        `<div class="adWrapper ${adUnits[i].group}" id="ad${adUnits[i].index}">
        <span>${adUnits[i].index}</span>
        </div>`
    );
}
document.write(`</div>`);
document.write(`<div id="adsLeft">`);
for(let i=8; i<10; i++){
    document.write(
        `<div class="adWrapper ${adUnits[i].group}" id="ad${adUnits[i].index}">
        <span>Ads ${adUnits[i].index}</span>
        </div>`
    );
}
document.write(`</div>`);
document.write(
    `<div class="adWrapper ${adUnits[10].group}" id="ad${adUnits[10].index}">
    <span>Ads ${adUnits[10].index}</span>
    </div>`
);