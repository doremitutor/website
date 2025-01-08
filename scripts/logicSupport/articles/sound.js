const sectionContentWrapper=$('sectionContentWrapper');
if(sectionContentWrapper){
    sectionContentWrapper.innerHTML=`
    <h3 id="inThisSection">${$str('Más sobre el sonido en la música:', 'More about sound in music:')}</h3>
    <menu role="navigation">
        <li><a href="${$str('/es/teoria/sonido/nota-tono-escala', '/en/theory/sound/note-pitch-scale')}">${$str('Nota, tono y escala', 'Note, pitch, and scale')}</a></li>
        <li><a href="${$str('/es/teoria/sonido/consonancia', '/en/theory/sound/consonance')}">${$str('Consonancia', 'Consonance')}</a></li>
        <li><a href="${$str('/es/teoria/sonido/nombres-de-notas', '/en/theory/sound/names-of-notes')}">${$str('Nombres de notas', 'Note names')}</a></li>
        <li><a href="${$str('/es/teoria/sonido/escalas-y-octavas', '/en/theory/sound/scales-and-octaves')}">${$str('Escalas y octavas', 'Scales and octaves')}</a></li>
        <li><a href="${$str('/es/teoria/sonido/escala-diatonica-y-modos', '/en/theory/sound/diatonic-scale-and-modes')}">${$str('La escala diatónica', 'Diatonic scale')}</a></li>
        <li><a href="${$str('/es/teoria/sonido/otras-escalas-mayores', '/en/theory/sound/other-major-scales')}">${$str('Otras escalas mayores', 'Other major scales')}</a></li>
        <li><a href="${$str('/es/teoria/sonido/grados-y-funciones-de-las-notas', '/en/theory/sound/degrees-and-functions-of-notes')}">${$str('Grados y funciones de las notas', 'Degrees and functions of notes')}</a></li>
    </menu>`;
}
const sound=scorePlayer.sound;
const angle=-27.5, duration=1, attack=0.03, decay=0.02, release=0.05, lfoDelay=attack+0.5,
      fullScale=[2, 5, 8, 9, 12, 15, 18, 19, 22, 25, 26, 29, 32, 35, 36, 39, 42, 43, 46, 49, 52, 53, 56, 59, 60, 63, 66, 69, 70], singleScale=[36, 39, 42, 43, 46, 49, 52, 53];
let ac, wave, shutables=[], callback;
function getAC(){
	if(ac){
		return ac;
	}else{
		const AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext;
		if(AudioContext){
			return ac=new AudioContext({latencyHint: "interactive", sampleRate: 44100});
		}else{
			alert('No AudioContext'); //do something, maybe location change
		}
	}
};
const NoteClass=(function(){
    const instance={};
    instance.C=new Values('Do', 'Do', 'C');
    instance.D=new Values('Re', 'Re', 'D');
    instance.E=new Values('Mi', 'Mi', 'E');
    instance.F=new Values('Fa', 'Fa', 'F');
    instance.G=new Values('Sol', 'So', 'G');
    instance.A=new Values('La', 'La', 'A');
    instance.B=new Values('Si', 'Ti', 'B');
    function Values(es, en, std){
        this.es=es;
        this.en=en;
        this.std=std;
    };
    return instance;
})();
function Note(screenNote, pitchValueIndex){
    this.screenNote=screenNote;
    this.pitchValueIndex=pitchValueIndex;
};
Note.prototype.setScreenNoteName=function(){
    this.screenNote.nextSibling.textContent=NoteClass[sound.pitchValues[this.pitchValueIndex].classKey][lang];
}
Note.prototype.setScreenNoteLetterName=function(){
    this.screenNote.nextSibling.textContent=NoteClass[sound.pitchValues[this.pitchValueIndex].classKey]['std'];
}
Note.prototype.play=function(){
    const ac=getAC();
    if(!wave){
        wave=ac.createPeriodicWave(sound.real, sound.imag, {disableNormalization: true});
    }
    this.screenNote.style="fill:red;";
    let tuneOsc=ac.createOscillator();
    tuneOsc.setPeriodicWave(wave);
    let oscParamIndex=sound.pitchValues[this.pitchValueIndex].oscParamIndex;
    tuneOsc.frequency.value=sound.oscParam[oscParamIndex].freq;
    let gainFactor=sound.oscParam[oscParamIndex].gainFactor;
    let tuneGain=ac.createGain();
    tuneGain.connect(ac.destination);
    tuneOsc.connect(tuneGain);
    let that=this;
    tuneOsc.onended=function(){
        that.screenNote.style="fill:var(--dark-color)";
        if(callback){
            callback();
        }
    }
    let volumeAttack=1*gainFactor;
    let volumeSustain=0.9*gainFactor;
    let volumeRelease=0.8*gainFactor;
    tuneGain.gain.setValueAtTime(0, ac.currentTime);
    tuneGain.gain.linearRampToValueAtTime(volumeAttack, ac.currentTime+attack);
    tuneGain.gain.linearRampToValueAtTime(volumeSustain, ac.currentTime+attack+decay);
    tuneGain.gain.linearRampToValueAtTime(volumeRelease, ac.currentTime+duration-release);
    tuneGain.gain.linearRampToValueAtTime(0.0, ac.currentTime+duration);
    let vibrato=ac.createOscillator();
    vibrato.frequency.value=4.5;
    let vibratoGain=ac.createGain();
    vibrato.connect(vibratoGain);
    vibratoGain.connect(tuneGain.gain);
    vibratoGain.gain.setValueAtTime(0.1*gainFactor, ac.currentTime+lfoDelay);
    vibrato.start(ac.currentTime+lfoDelay);
    tuneOsc.start(ac.currentTime);
    vibrato.stop(ac.currentTime+duration-0.1);
    tuneOsc.stop(ac.currentTime+duration-0.1);
};
let playing=false, iterator;
function playSequence(seq, up){
    stopListening();
    if(!playing){
        playing=true;
        iterator=0;
    }
    if(iterator<seq.length-1){
        callback=()=>{playSequence(seq, up);};
    }else{
        callback=listenBack;
        playing=false;
    }
    seq[up?iterator:seq.length-1-iterator].play();
    iterator+=1;
}
function listenBack(){
    shutables.forEach((shutable)=>{shutable.style="pointer-events:auto;";});
}
function stopListening(){
    shutables.forEach((shutable)=>{shutable.style="pointer-events:none;";});
}
function shut(){
    callback=null;
    playing=false;
    listenBack();
}
if($('vertNotesWrapper')){
    const cx=50, rx=50, numOfNotes=8, ry=rx*0.72, vertStep=680/numOfNotes;
    let cy, noteNum, svg=`<svg id="vertNotesSvg" width="100" height="680" viewBox="0 0 100 680">`;
    for(let i=0; i<numOfNotes; i++){
        cy=vertStep*(i+0.5);
        noteNum=numOfNotes-i;
        svg+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${darkColor}" transform="rotate(${angle}, ${cx}, ${cy})" class="vertNote" id="vertNote${noteNum}"/>`;
        svg+=`<text x="${cx}" y="${cy+2}" font-size="30" fill="${bgColor}" stroke="none" text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;">${noteNum}</text>`;
    }
    svg+=`</svg>`;
    insertSVGNode($('vertNotesWrapper').firstElementChild, svg, false);
    const vertScreenNotes=Array.from(document.getElementsByClassName('vertNote'));
    const vertNotes=[];
    for(let i=0; i<numOfNotes; i++){
        let screenNote=vertScreenNotes[i];
        let note=vertNotes[i]=new Note(screenNote, singleScale[numOfNotes-1-i]);
        note.screenNote.addEventListener('click', ()=>{note.play();}, false);
    }
}
if($('horizNumberedScaleWrapper')){
    const horizNumberedScaleWrapper=$('horizNumberedScaleWrapper');
    const cy=40, numOfNotes=8, horizStep=800/numOfNotes, ry=80*0.43, rx=ry/0.72;
    let cx, noteNum, horizNumberedNotesSvg=`<svg id="horizNumberedNotesSvg" viewBox="0 0 800 80">`;
    for(let i=0; i<numOfNotes; i++){
        cx=horizStep*(i+0.5);
        noteNum=i+1;
        horizNumberedNotesSvg+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${darkColor}" transform="rotate(${angle}, ${cx}, ${cy})" class="horizNumberedNote" id="horizNote${noteNum}"/>`;
        horizNumberedNotesSvg+=`<text x="${cx}" y="${cy+2}" font-size="30" fill="${bgColor}" stroke="none" text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;">${noteNum}</text>`;
    }
    horizNumberedNotesSvg+=`</svg>`;
    appendSVGNode(horizNumberedScaleWrapper, horizNumberedNotesSvg);
    shutables.push(horizNumberedScaleWrapper);
    const horizScreenNumberedNotes=Array.from(document.getElementsByClassName('horizNumberedNote'));
    const horizNumberedNotes=[];
    for(let i=0; i<numOfNotes; i++){
        let screenNote=horizScreenNumberedNotes[i];
        let note=horizNumberedNotes[i]=new Note(screenNote, singleScale[i]);
        screenNote.note=note;
        if(i>0){
            screenNote.addEventListener('click', playPair, false);
        }
    }
    function playPair(e){
        stopListening();
        const note=e.target.note;
        callback=()=>{
            callback=()=>{
                callback=listenBack;
                horizNumberedNotes[0].play();note.play();
            };
            note.play()
        };
        horizNumberedNotes[0].play();
    };
}
if($('horizNamedScaleWrapper')){
    const horizNamedScaleWrapper=$('horizNamedScaleWrapper');
    const cy=44, numOfNotes=8, horizStep=880/numOfNotes, ry=88*0.43, rx=ry/0.72;
    let cx, noteNum, horizNamedNotesSvg=`<svg id="horizNamedNotesSvg" viewBox="0 0 880 88">`;
    for(let i=0; i<numOfNotes; i++){
        cx=horizStep*(i+0.5);
        noteNum=i+1;
        horizNamedNotesSvg+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${darkColor}" transform="rotate(${angle}, ${cx}, ${cy})" class="horizNamedNote" id="horizNote${noteNum}"/>`;
        horizNamedNotesSvg+=`<text x="${cx}" y="${cy+2}" font-size="30" fill="${bgColor}" stroke="none" text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;"></text>`;
    }
    horizNamedNotesSvg+=`</svg>`;
    appendSVGNode(horizNamedScaleWrapper, horizNamedNotesSvg);
    const horizScreenNamedNotes=Array.from(document.getElementsByClassName('horizNamedNote'));
    const horizNamedNotes=[];
    for(let i=0; i<numOfNotes; i++){
        let screenNamedNote=horizScreenNamedNotes[i];
        let note=horizNamedNotes[i]=new Note(screenNamedNote, singleScale[i]);
        note.setScreenNoteName();
        screenNamedNote.note=note;
    }
    const buttonDown=$('_8notesDown');
    const buttonUp=$('_8notesUp');
    buttonUp.addEventListener('click', ()=>{playSequence(horizNamedNotes, true);}, false);
    shutables.push(buttonUp);
    buttonDown.addEventListener('click', ()=>{playSequence(horizNamedNotes, false);}, false);
    shutables.push(buttonDown);
}
if($('largeScaleWrapper')){
    const numOfNotes=29, rx=17, ry=12, horizSmallStep=928/numOfNotes;
    const svgHeight=window.doubleScale?60:28;
    let cy, cx, noteNum, largeScaleNotesSvg=`<svg id="largeScaleNotesSvg" viewBox="0 0 928 ${svgHeight}">`;
    cy=28/2;
    for(let i=0; i<numOfNotes; i++){
        cx=horizSmallStep*(i+0.5);
        noteNum=i+1;
        largeScaleNotesSvg+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${darkColor}" transform="rotate(${angle}, ${cx}, ${cy})" class="smallHorizNoteTop" id="smallNoteTop${noteNum}"/>`;
        largeScaleNotesSvg+=`<text x="${cx}" y="${cy+1}" font-size="16" fill="${bgColor}" stroke="none" text-anchor="middle" dominant-baseline="middle" class="text"></text>`;
    }
    if(window.doubleScale){
        cy=32+28/2;
        for(let i=0; i<numOfNotes; i++){
            cx=horizSmallStep*(i+0.5);
            noteNum=i+1;
            largeScaleNotesSvg+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${darkColor}" transform="rotate(${angle}, ${cx}, ${cy})" class="smallHorizNoteBottom" id="smallNoteBottom${noteNum}"/>`;
            largeScaleNotesSvg+=`<text x="${cx}" y="${cy+1}" font-size="16" fill="${bgColor}" stroke="none" text-anchor="middle" dominant-baseline="middle" class="text"></text>`;
        }
    }
    largeScaleNotesSvg+=`</svg>`;
    appendSVGNode($('largeScaleWrapper'), largeScaleNotesSvg);
    const smallHorizScreenNotesTop=Array.from(document.getElementsByClassName('smallHorizNoteTop'));
    const smallNotesTop=[];
    for(let i=0; i<numOfNotes; i++){
        let screenNote=smallHorizScreenNotesTop[i];
        let note=smallNotesTop[i]=new Note(screenNote, fullScale[i]);
        note.setScreenNoteName();
    }
    if(window.doubleScale){
        const smallHorizScreenNotesBottom=Array.from(document.getElementsByClassName('smallHorizNoteBottom'));
        const smallNotesBottom=[];
        for(let i=0; i<numOfNotes; i++){
            let screenNote=smallHorizScreenNotesBottom[i];
            let note=smallNotesBottom[i]=new Note(screenNote, fullScale[i]);
            note.setScreenNoteLetterName();
        }
    }
    if(!window.doubleScale){
        const buttonDown=$('_29notesDown');
        const buttonUp=$('_29notesUp');
        buttonUp.addEventListener('click', ()=>{playSequence(smallNotesTop, true);}, false);
        shutables.push(buttonUp);
        buttonDown.addEventListener('click', ()=>{playSequence(smallNotesTop, false);}, false);
        shutables.push(buttonDown);
    }
    if($('kbNotesWrapper')){
        let kbNotesSvg=`<svg id="kbNotesSvg" viewBox="0 0 928 120">`;
        kbNotesSvg+=`<rect x="1" y="1" width="${926}" height="118" fill="white" stroke="${darkColor}" stroke-width="2" />`;
        for(let i=1; i<numOfNotes; i++){
            const x=horizSmallStep*i;
            kbNotesSvg+=`<line x1="${x}" x2="${x}" y1="1" y2="118" stroke="${darkColor}" stroke-width="2"/>`;
        }
        for(let i=0; i<numOfNotes; i++){
            cx=horizSmallStep*(i+0.5);
            kbNotesSvg+=`<text x="${cx}" y="87" font-size="16" fill="${darkColor}" stroke="${darkColor}" text-anchor="middle" dominant-baseline="middle">${NoteClass[sound.pitchValues[fullScale[i]].classKey]['std']}</text>`;
            kbNotesSvg+=`<text x="${cx}" y="105" font-size="16" fill="${darkColor}" stroke="${darkColor}" text-anchor="middle" dominant-baseline="middle">${NoteClass[sound.pitchValues[fullScale[i]].classKey][lang]}</text>`;
        }
        for(let i=0; i<numOfNotes; i++){
            if((i+7)%7===0||(i+7)%7===3)continue;
            kbNotesSvg+=`<rect x="${i*horizSmallStep-10}" y="2" width="20" height="70"  fill="${darkColor}"/>`;
        }
        kbNotesSvg+=`</svg>`;
        appendSVGNode($('kbNotesWrapper'), kbNotesSvg);
    }
}
if($('scalesTableWrapper')){
    const height=315, numOfNotes=8, scaleNames=[], vertStep=height/7, scaleX=200, rx=28, ry=20,
    scaleWidth=innerWidth>980?820:750, horizStep=(scaleWidth-rx-(numOfNotes*rx))/(numOfNotes-1)+rx, scales=[], namesWidth=120;
    for(let i=0; i<singleScale.length-1; i++){
        scaleNames.push(NoteClass[sound.pitchValues[singleScale[i]].classKey][lang]);
    }
    let scalesNamesTableSvg=`<svg id="scalesNamesTableSvg" width="${namesWidth}" height="${height}">`;
    let scalesNotesTableSvg=`<svg id="scalesNotesTableSvg" x="${scaleX}" width="${scaleWidth}" height="${height}">`;
    for(let i=0; i<scaleNames.length; i++){
        const className=`scaleOf${scaleNames[i]}`;
        const y=vertStep*(i)+vertStep/2;
        scalesNamesTableSvg+=`<text x="0" y="${y+4}" font-size="18" fill="${darkColor}" stroke="${darkColor}" text-anchor="start" dominant-baseline="middle">${$str('Escala de ', 'Scale of ')}${scaleNames[i]}</text>`;
        for(let j=0; j<numOfNotes; j++){
            const x=+rx+j*horizStep;
            scalesNotesTableSvg+=`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${darkColor}" stroke=="${darkColor}" stroke-width="2" transform="rotate(${angle}, ${x}, ${y})" class="${className}"/>`;
            scalesNotesTableSvg+=`<text x="${x}" y="${y+1}" font-size="28" fill="${lightColor}" stroke="none" text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;"></text>`;
        }
    }
    scalesNamesTableSvg+=`</svg>`;
    scalesNotesTableSvg+=`</svg>`;
    const svgWrapper=$('svgWrapper');
    appendSVGNode(svgWrapper, scalesNamesTableSvg);
    appendSVGNode(svgWrapper, scalesNotesTableSvg);
    for(let i=0; i<scaleNames.length; i++){
        const scaleScreenNotes=Array.from(document.getElementsByClassName(`scaleOf${scaleNames[i]}`));
        const notes=[];
        let scaleIndex=i+14;
        for(let j=0; j<scaleScreenNotes.length; j++){
            scaleScreenNotes[j].nextSibling.textContent=NoteClass[sound.pitchValues[fullScale[scaleIndex++]].classKey][lang];
        }
    }
}
const names=[];
if($('diatonicPatternWrapper')){
    const  width=930, height=80, rx=30, ry=21, fontSize=26, usableWidth=width-rx*2, stepNote=usableWidth/12, steps=[0,2,2,1,2,2,2,1], stepsT=[1,2,3,2,2], stepsST=[4.5,7], textY=16;
    let  name, cx, diatonicScaleSvg=`<svg id="diatonicScaleSvg" width="${width}" height="${height}">`;
    for(let p in NoteClass){
        names.push(NoteClass[p][lang]);
    }
    cx=rx-18;
    for(let i=0; i<steps.length; i++){
        diatonicScaleSvg+=`<ellipse cx="${cx+=stepNote*steps[i]}" cy="60" rx="${rx}" ry="${ry}" fill="${darkColor}" stroke=="${darkColor}" stroke-width="2" transform="rotate(${angle}, ${cx}, ${ry})"/>`;
        diatonicScaleSvg+=`<line x1="${cx+20}" y1="0" x2="${cx+20}" y2="30" stroke-width="4" stroke="${darkColor}"></line>`;
        name=names[i];
        if(i===7){
            name=names[0];
        }

        diatonicScaleSvg+=`<text x="${cx+17}" y="57" font-size="${fontSize}" fill="${bgColor}" stroke="none"
                   text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;">${name}</text>`;
    }
    cx=rx+2;
    for(let i=0; i<stepsT.length;i++){
        diatonicScaleSvg+=`<text x="${cx+=stepNote*stepsT[i]}" y="${textY}" font-size="${fontSize}" fill="${darkColor}" stroke="${darkColor}"
                   text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;">←      T      →</text>`;
    }
    cx=rx+2;
    for(let i=0; i<stepsST.length;i++){
        diatonicScaleSvg+=`<text x="${cx+=stepNote*stepsST[i]}" y="${textY}" font-size="${fontSize}" fill="${darkColor}" stroke="${darkColor}"
                   text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none; letter-spacing:1px;">←S→</text>`;
    }
    diatonicScaleSvg+=`</svg>`;
    appendSVGNode($('diatonicPatternWrapper'), diatonicScaleSvg);
}
if($(`modesTableWrapper`)){
    const buttonsWrapper=$('buttonsWrapper'), scalesWrapper=$('scalesWrapper'), widthScales=750, height=45, numOfNotes=8, numOfPositions=13, rx=28, ry=20, cy=height/2, horizStep=(widthScales-rx-(numOfPositions*rx))/(numOfPositions-1)+rx, scales=[], scaleNames=[], skips=[2, 2, 1, 2, 2, 2, 1];
    for(let i=0; i<singleScale.length-1; i++){
        scaleNames.push(NoteClass[sound.pitchValues[singleScale[i]].classKey][lang]);
    }
    for(let i=0; i<scaleNames.length; i++){
        const className=`scaleOf${scaleNames[i]}`;
        const y=i*height;
        let skipsIndex=i;
        let hPos=0;
        const x=0;
        let modesTableSvg=`<svg id="modesTableSvg-${i+1}" x="${x}" y="${y}" viewBox="0 0 ${widthScales} ${height}">`;
        for(let j=0; j<numOfNotes; j++){
            let cx=rx;
             if(j>0){
                hPos+=skips[skipsIndex];
                cx=cx+hPos*horizStep;
                if(hPos===12){
                    hPos=0;
                }
                if(skipsIndex++===skips.length-1){
                    skipsIndex=0;
                }
            }
            modesTableSvg+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${darkColor}" stroke=="${darkColor}" stroke-width="2" transform="rotate(${angle}, ${cx}, ${cy})" class="${className}"/>`;
            modesTableSvg+=`<text x="${cx}" y="${cy+1}" font-size="20" fill="${bgColor}" stroke="none" text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;"></text>`;
        }
        modesTableSvg+=`</svg>`;
        appendSVGNode(scalesWrapper, modesTableSvg);
        const screenNotes=Array.from(document.getElementsByClassName(`scaleOf${scaleNames[i]}`));
        const notes=[];
        let scaleIndex=i+14;
        for(let j=0; j<screenNotes.length; j++){
            notes[j]=new Note(screenNotes[j], fullScale[scaleIndex++]);
            notes[j].setScreenNoteName();
        }
        const buttonUp=$ce('button');
        const buttonDown=$ce('button');
        buttonUp.textContent=$str('Arriba', 'Up');
        buttonDown.textContent=$str('Abajo', 'Down');
        buttonUp.className='button-like corner-hard';
        buttonDown.className='button-like corner-hard';
        buttonsWrapper.appendChild(buttonUp);
        buttonsWrapper.appendChild(buttonDown);
        buttonUp.addEventListener('click', ()=>{playSequence(notes, true);stopListening();}, false);
        buttonDown.addEventListener('click', ()=>{playSequence(notes, false);stopListening();}, false);
        shutables.push(buttonsWrapper);
    }
}
if($('majorScales')){
    const width=930, height=60, step=(width-height)/12;
    function createMajorScale(steps, names, avoided, sharps){
        let otherScaleSvg=`<svg class="otherScaleSvg" viewBox="0 0 ${width} ${height}">
        <style>circle, rect{fill:none; stroke:${darkColor}; stroke-width:4px;} .red{stroke:red; stroke-opacity:0.5; stroke-width:4px; } .normal{stroke:${darkColor}; stroke-width:4px;} </style>`;
        for(let i=0; i<steps.length; i++){
            const x=height/2+(steps[i])*step;
            otherScaleSvg+=`<circle cx="${x}" cy="${height/2}" r="${height/2-2}"/>`;
            otherScaleSvg+=`<text x="${x}" y="${height/2+1}" font-family="sans-serif" font-size="26px" fill="${darkColor}" stroke="${darkColor}" stroke-width="1"
                   text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;">${names[i]}</text>`;
            if(avoided&&avoided.includes(i)){
                otherScaleSvg+=`<line class="red" x1="${x-height/2+2}" x2="${x+height/2-4}" y1="2" y2="${height-4}"/>`;
                otherScaleSvg+=`<line class="red" x1="${x-height/2+2}" x2="${x+height/2-4}" y1="${height-4}" y2="2"/>`;
                const y=height/2;
                const midX=x+(sharps?step/2:-step/2);
                const xOffset=6;
                const x1=midX-(sharps?xOffset:-xOffset);
                const x2=midX+(sharps?xOffset:-xOffset);
                const tipWidth=9;
                otherScaleSvg+=`<line class="normal" x1="${x1}" x2="${x2}" y1="${y}" y2="${y}"/>`;
                otherScaleSvg+=`<polyline points="${x2+(sharps?2:-2)} ${y} ${x2-(sharps?tipWidth:-tipWidth)} ${y-tipWidth} ${x2-(sharps?tipWidth:-tipWidth)} ${y+tipWidth} ${x2+(sharps?2:-2)} ${y}"/>`;
            }
        }
        otherScaleSvg+=`</svg>`;
        return otherScaleSvg;
    }
    appendSVGNode($('cMajorScale'), createMajorScale([0, 2, 4, 5, 7, 9, 11, 12], ['Do', 'Re', 'Mi', 'Fa', $str('Sol', 'So'), 'La', $str('Si', 'Ti'), 'Do']));
    appendSVGNode($('gMajorScale'), createMajorScale([0, 2, 4, 5, 7, 9, 10, 11, 12], [$str('Sol', 'So'), 'La', $str('Si', 'Ti'), 'Do', 'Re', 'Mi', 'Fa', 'Fa\u266f', $str('Sol', 'So')], [6], 1));
    appendSVGNode($('dMajorScale'), createMajorScale([0, 2, 3, 4, 5, 7, 9, 10, 11, 12], ['Re', 'Mi', 'Fa', 'Fa\u266f', $str('Sol', 'So'), 'La', $str('Si', 'Ti'), 'Do', 'Do\u266f', 'Re'], [2, 7], 1));
    appendSVGNode($('aMajorScale'), createMajorScale([0, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12], ['La', $str('Si', 'Ti'), 'Do', 'Do\u266f', 'Re', 'Mi', 'Fa', 'Fa\u266f', $str('Sol', 'So'), $str('Sol', 'So')+'\u266f', 'La'], [2, 6, 8], 1));
    appendSVGNode($('fMajorScale'), createMajorScale([0, 2, 4, 5, 6, 7, 9, 11, 12], ['Fa', $str('Sol', 'So'), 'La', $str('Si', 'Ti')+'\u266d', $str('Si', 'Ti'), 'Do', 'Re', 'Mi', 'Fa'], [4]));
    appendSVGNode($('bbMajorScale'), createMajorScale([0, 1, 2, 4, 5, 6, 7, 9, 11, 12], [$str('Si', 'Ti')+'\u266d', $str('Si', 'Ti'), 'Do', 'Re', 'Mi\u266d', 'Mi', 'Fa', $str('Sol', 'So'), 'La', $str('Si', 'Ti')+'\u266d'], [1, 5]));
    appendSVGNode($('ebMajorScale'), createMajorScale([0, 1, 2, 4, 5, 6, 7, 8, 9, 11, 12], ['Mi\u266d', 'Mi', 'Fa', $str('Sol', 'So'), 'La\u266d', 'La', $str('Si', 'Ti')+'\u266d', $str('Si', 'Ti'), 'Do', 'Re', 'Mi\u266d'], [1, 5, 7]));
}
if($('noteDegreesWrapper')){
    const width=930, height=90, cy=66, rx=30, ry=21, fontSize=28, usableWidth=width-rx*2, numOfNotes=7, step=usableWidth/(numOfNotes-1), degrees=['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    let  name, degree, cx, noteDegreesSvg=`<svg id="noteDegreesSvg" width="${width}" height="${height}">`;
    for(let p in NoteClass){
        names.push(NoteClass[p][lang]);
    }
    for(let i=0; i<numOfNotes; i++){
        cx=rx+step*i+1;
        noteDegreesSvg+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${darkColor}" stroke="${darkColor}" stroke-width="2" transform="rotate(${angle}, ${cx}, ${cy})"/>`;
        degree=degrees[i];
        noteDegreesSvg+=`<text x="${cx}" y="14" font-family="serif" font-size="${fontSize}" fill="${darkColor}" stroke="${darkColor}" stroke-width="2"
                   text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;">${degree}</text>`;
        name=names[i];
        noteDegreesSvg+=`<text x="${cx}" y="${cy+1}" font-size="${fontSize}" fill="${bgColor}" stroke="none"
                   text-anchor="middle" dominant-baseline="middle" class="text" style="pointer-events:none;">${name}</text>`;
    }
    noteDegreesSvg+=`</svg>`;
    appendSVGNode($('noteDegreesWrapper'), noteDegreesSvg);
}
if($('tensionDemoWrapper')){
    const durations=[3, 3, 3];//3, 2, 2
    const oscParamIndexes=[[29, 30], [40, 38], [52, 56], [61, 64], [73, 72]];
    let tuneOsc, iterator, index0, index1;//+m2, -3m
    const resetButton=$('reset4');
    resetButton.classList.add("button-like");
    resetButton.addEventListener('click', terminate, false);
    window.addEventListener('blur', terminate, false);
    const tensionDemoWrapper=$('tensionDemoWrapper');
    const buttons=$all('#tensionDemoWrapper > button');
    for(let i=0; i<buttons.length; i++){
        const b=buttons[i];
        b.oscParamIndexes=oscParamIndexes[i];
        b.classList.add("button-like");
        b.addEventListener('click', startPlaying, false);
    }
    function startPlaying(e){
        index0=e.target.oscParamIndexes[0];
        index1=e.target.oscParamIndexes[1];
        iterator=0;
        tensionDemoWrapper.style.pointerEvents='none';
        play();
    }
    function play(){
        const ac=getAC();
        if(!wave){
            wave=ac.createPeriodicWave(sound.real, sound.imag, {disableNormalization: true});
        }
        tuneOsc=ac.createOscillator();
        tuneOsc.setPeriodicWave(wave);
        const pitchIndex=(iterator===durations.length-2?index1:index0);
        tuneOsc.frequency.value=sound.oscParam[sound.pitchValues[pitchIndex].oscParamIndex].freq;
        let gainFactor=sound.oscParam[sound.pitchValues[pitchIndex].oscParamIndex].gainFactor;
        let duration=durations[iterator];
        let tuneGain=ac.createGain();
        tuneGain.connect(ac.destination);
        tuneOsc.connect(tuneGain);
        let volumeAttack=1*gainFactor;
        let volumeSustain=0.9*gainFactor;
        let volumeRelease=0.8*gainFactor;
        tuneGain.gain.setValueAtTime(0, ac.currentTime);
        tuneGain.gain.linearRampToValueAtTime(volumeAttack, ac.currentTime+attack);
        tuneGain.gain.linearRampToValueAtTime(volumeSustain, ac.currentTime+attack+decay);
        tuneGain.gain.linearRampToValueAtTime(volumeRelease, ac.currentTime+duration-release*4);
        tuneGain.gain.linearRampToValueAtTime(0.0, ac.currentTime+duration-release*2);
        //let vibrato=ac.createOscillator();
        //vibrato.frequency.value=4;
        //let vibratoGain=ac.createGain();
        //vibrato.connect(vibratoGain);
        //vibratoGain.connect(tuneGain.gain);
        //vibratoGain.gain.setValueAtTime(0.1*gainFactor, ac.currentTime+lfoDelay);
        //vibrato.start(ac.currentTime+lfoDelay);
        tuneOsc.start(ac.currentTime);
        //vibrato.stop(ac.currentTime+duration-0.1);
        tuneOsc.stop(ac.currentTime+duration-0.1);
        tuneOsc.onended=function(){
            if(++iterator>=durations.length){
            tensionDemoWrapper.style.pointerEvents='auto';
                return;
            }
            play();
        }
    }
    function terminate(){
        if(tuneOsc){
            iterator=durations.length;
            tuneOsc.stop();
        }
    }
}
if($('reset1'))$('reset1').addEventListener('click', shut, false);
if($('reset2'))$('reset2').addEventListener('click', shut, false);
if($('reset3'))$('reset3').addEventListener('click', shut, false);
window.addEventListener('blur', shut, false);