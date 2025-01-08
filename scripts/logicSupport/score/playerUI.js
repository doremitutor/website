/* const playerGridContent=$ce('template');
playerGridContent.innerHTML=; */
const playerGrid=$ce('section');
playerGrid.id="playerGrid";
playerGrid.innerHTML=`
    <canvas id="playerCanvas" width="952" height="450" data-lessonPath="${LESSON}"></canvas>
    <button type="button" id="rw" class="button-like"></button>
    <button type="button" id="replay" class="button-like"></button>
    <button type="button" id="play" class="button-like"></button>
    <button type="button" id="tune" class="button-like"></button>
    <div id="tempoGridCell">
        <span>Tempo</span>
        <span id="tempoValueLabel"></span>
        <input id="tempo" type="range" name="tempo">
    </div>
    <div id="metroVolGridCell" class="centeredCell">
        <span>${$str('Volumen Metrónomo', 'Metronome Volume')}</span>
        <span id="metroVolValueLabel"></span>
        <input id="metroVol" type="range" name="metroVol">
    </div>
    <div id="optionsGridCell">
        <div>
            <label for="cursor">${$str('Mostrar cursor', 'Show cursor')}</label>
            <input id="cursor" type="checkbox" name="cursor" value="cursor">
        </div>
        <div>
            <label for="names">${$str('Mostrar nombres', 'Show names')}</label>
            <input id="names" type="checkbox" name="names" value="names">
        </div>
        <div>
            <label for="metro">${$str('Metrónomo audible', 'Audible Metronome')}</label>
            <input id="metro" type="checkbox" name="metroVol" value="metro">
        </div>
        <div>
        <label for="marking">${$str('Compás de entrada', 'Entry measure')}</label>
            <input id="marking" type="checkbox" name="marking" value="marking">
        </div>
    </div>`;
$sel('article').append(playerGrid);
if(PAGE_TYPE==="lesson"){
    const playerDetails=$ce('section');
    playerDetails.id='playerDetails';
    playerDetails.setAttribute('data-subject', SUBJECT);
    playerDetails.setAttribute('data-key', KEY);
    playerDetails.setAttribute('data-measure', MEASURE);
    playerDetails.setAttribute('data-clef', CLEF);
    playerDetails.innerHTML=`
        <p id="instructions">
            <a href="${$str('/es/reproductor', '/en/player')}" target="_blank">${$str('Cómo usar el reproductor', 'How to use the player')}</a> ${$str('(Abre una nueva pestaña)', '(Opens a new tab)')}
        </p>`;
    playerGrid.after(playerDetails);
    await import('/scripts/logicSupport/score/lessonsIndex.js')
        .then(m=>{createlessonsIndex(m)})
        .catch(err=>{console.log('Error: '+err.message);});
    function createlessonsIndex(m){
        let lessons=m.lessonsIndex;
        lessons=lessons.filter(lesson=>lesson.lang===lang&&lesson.clef===CLEF);
        const sectionContentWrapper=$('sectionContentWrapper');
        sectionContentWrapper.className='lessons corner-hard';
        const h3=$ce('h3');
        h3.innerHTML=`${$str('Lecciones en esta aplicación', 'This application\'s lessons')}`;
        sectionContentWrapper.append(h3);
        const detailsAside=$ce('aside');
        detailsAside.id='detailsAside';
        sectionContentWrapper.append(detailsAside);
        let count=0;
        const lessonsList=[];
        lessons.forEach(lesson=>{
            lessonsList.push(lesson);
            if(count++===47){
                createKeyList(lessonsList);
                lessonsList.length=0;
                count=0;
            }
        });
        function createKeyList(lessonsList){
            const esH4=`En escala de ${lessonsList[0].key} mayor`;
            const enH4=`In scale of ${lessonsList[0].key} major`;
            const h4=$ce('h4');
            const menu=$ce('menu');
            h4.textContent=$str(esH4, enH4);
            lessonsList.forEach(lesson=>{
                const li=$ce('li');
                const a=$ce('a');
                a.setAttribute("href", lesson.path);
                a.textContent=lesson.title;
                li.append(a);
                menu.append(li);
            });
            const details=$ce('details');
            const summary=$ce('summary')
            summary.append(h4);
            details.append(summary);
            details.append(menu);
            detailsAside.append(details);
        }
    }
}