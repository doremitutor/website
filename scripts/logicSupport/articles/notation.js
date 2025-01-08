const sectionContentWrapper=$('sectionContentWrapper');
sectionContentWrapper.innerHTML=`
<h3 id="inThisSection">${$str('Más sobre notación musical:', 'More about musical notation:')}</h3>
<menu role="navigation">
    <li><a href="${$str('/es/teoria/notacion/pentagrama-y-nota-basica', '/en/theory/notation/staff-and-basic-note')}">${$str('El pentagrama y nota básica', 'Staff and basic note')}</a></li>
    <li><a href="${$str('/es/teoria/notacion/extensiones-del-pentagrama', '/en/theory/notation/staff-extensions')}">${$str('Extensiones del pentagrama', 'Staff extensions')}</a></li>
    <li><a href="${$str('/es/teoria/notacion/claves-y-nombre-y-tono-de-las-notas', '/en/theory/notation/clefs-and-both-name-and-pitch-of-notes')}">${$str('Las claves y los nombres de las notas', 'Clefs and note names')}</a></li>
    <li><a href="${$str('/es/teoria/notacion/notas-y-silencios', '/en/theory/notation/notes-and-rests')}">${$str('Notas y silencios', 'Notes and rests')}</a></li>
    <li><a href="${$str('/es/teoria/notacion/barras-de-compas-marcas-de-compas-y-metronomo', '/en/theory/notation/barlines-time-signature-metronome-mark')}">${$str('Barras de compás, marca de compás y metrónomo', 'Barlines, time signature, and metronome mark')}</a></li>
    <li><a href="${$str('/es/teoria/notacion/armadura', '/en/theory/notation/key-signature')}">${$str('La armadura', 'Key signature')}</a></li>
</menu>`;
let ac;
function getAC(){
	if(ac){
		return ac;
	}else{
		const AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext;
		if(AudioContext){
			return ac=new AudioContext({latencyHint: "interactive", sampleRate: 44100});
		}else{
			alert('No AudioContext');
		}
	}
};
function createSolidNoteHead(x, y, height, idIndex){
    const angleDegrees=-25;
    const angleRadians=Math.PI/180*angleDegrees;
    const ry=height/2*Math.cos(angleRadians);
    const rratio=1.4;
    const rx=ry*rratio;
    const width=2*rx/1.03;
    const cx=width/2;
    const cy=height/2;
    return `<svg x="${x}" y="${y}" width="${width}" height="${height}">
                <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${darkColor}"
                transform="rotate(${angleDegrees}, ${cx}, ${cy})" id="ellipse-${idIndex}"/>
            </svg>`;
};
function createStaff(x, y, width, step, idIndex){
    let staff=`<svg x="${x}" y="${y}" width="${width}" height="${step*4+2}" id="staff-${idIndex}">`;
    for(let i=0; i<5; i++){
        let x=0;
        let y=i*step+1;
        staff+=`<line x1="${x}" x2="${x+width}" y1="${y}" y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    }
    staff+=`</svg>`;
    return staff;
};
function createSvgText(text, x, y, fill=darkColor, fontSize=18, fontFamily='sans-serif', fontWeight="normal"){
    let textSvg=`<svg style="width:100%;height:100%;position:absolute">`;// style="fill:${darkColor};stroke:${darkColor};stroke-width:1px;stroke-linejoin:miter;fill-rule:nonzero;"
    textSvg+=`<text x="${x}" y="${y}" fill="${fill}" text-anchor="middle" dominant-baseline="hanging" style="font-size:${fontSize};font-family:${fontFamily};font-weight:${fontWeight};pointer-events:none">${text}</text>`;
    textSvg+=`</svg>`;
    return textSvg;
};
function createArrow(xStart, yStart, xEnd, yEnd, stroke=darkColor, strokeWidth='2'){
    let angle=Math.atan((yEnd-yStart)/(xEnd-xStart))-45;
    if(xStart>xEnd)angle+=180;
};
function createCurvedArrow(xStart, yStart, xEnd, yEnd, dev=0, devPosition=1/2, stroke=darkColor, strokeWidth='2'){
    let oppSide=yEnd-yStart, adjSide=xEnd-xStart;
    if(oppSide===0&&adjSide===0){throw new Error('Zero length line');}
    let angleMainRad=Math.atan2(oppSide, adjSide);
    let angleCtrlRad=angleMainRad+(dev>0?Math.PI/2:-Math.PI/2);
    let angleMainDeg=angleMainRad*180/Math.PI;
    let angleCtrlDeg=angleCtrlRad*180/Math.PI;
    let xMid=xStart+(xEnd-xStart)*devPosition;
    let yMid=yStart+(yEnd-yStart)*devPosition;
    let xCtrl=xMid+2*Math.abs(dev)*Math.cos(angleCtrlRad);
    let yCtrl=yMid+2*Math.abs(dev)*Math.sin(angleCtrlRad);
    let angleDegTip=Math.atan2(yEnd-yCtrl, xEnd-xCtrl)*180/Math.PI;
    let arrow=`<svg style="width:100%;height:100%;position:absolute">`;
    arrow+=`<path d="M ${xStart} ${yStart} Q ${xCtrl} ${yCtrl}, ${xEnd} ${yEnd}" fill="transparent" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
    arrow+=`<polygon points="${xEnd+10} ${yEnd} ${xEnd} ${yEnd-10} ${xEnd} ${yEnd+10}" stroke="${darkColor}" fill="${darkColor}" stroke-width="1" transform="rotate(${angleDegTip}, ${xEnd}, ${yEnd})"/>`;
    arrow+=`</svg>`;
    return arrow;
};
if($('plainStaffWrapper')){
    let x=202, width=900, step=36, vertMargin=17, height=step*4+2+vertMargin*2, fontSize=32, lineOrder=[$str('quinta', 'fifth'), $str('cuarta', 'fourth'), $str('tercera', 'third'), $str('segunda', 'second'), $str('primera', 'first')];
    let lineAndSpaceNumbers='';
    for(let i=0; i<5; i++){
        lineAndSpaceNumbers+=`<text x="${x-6}" y="${i*step+29}" fill="${darkColor}", font-Size="${fontSize}",font-Family="sans-serif", font-weight="normal" text-anchor="end">${lineOrder[i]} ${$str('línea', 'line')}</text>`;//(innerWidth>980?20:36)+(innerWidth>980?-6:12)
    }
    let spaceOrder=[$str('cuarto', 'fourth'), $str('tercer', 'third'), $str('segundo', 'second'), $str('primer', 'first')];
    for(let i=0; i<4; i++){
        lineAndSpaceNumbers+=`<text x="220" y="${i*step+47}" fill="${darkColor}", font-Family="sans-serif", font-Size="${fontSize}", font-weight="normal">${spaceOrder[i]} ${$str('espacio', 'space')}</text>`;
    }
    let plainStaff=`<svg width="${width}" height="${height}" id="linesAndSpaces">${createStaff(x, vertMargin+2, width-x, step, 0)}`;
    plainStaff+=lineAndSpaceNumbers;
    plainStaff+=`</svg>`;
    appendSVGNode($('plainStaffWrapper'), plainStaff);
}
if($('staffPaperWrapper')){
    const width=800;
    const lineStep=10;
    const numStaves=4;
    const hMargin=20;
    const topMargin=40;
    const bottomMargin=20;
    const staffStep=lineStep*10;
    const height=staffStep*numStaves;
    let staffPaper=`<svg width="${width}" height="${height+topMargin+bottomMargin}" id="staffPaper">`;
    for(let i=0; i<numStaves; i++){
        staffPaper+=createStaff(hMargin, topMargin+lineStep*3+staffStep*i, width-hMargin*2, lineStep);
    }
    staffPaper+=`</svg>`;
    appendSVGNode($('staffPaperWrapper'), staffPaper);
}
if($('noteHeadWrapper')){
    appendSVGNode($('noteHeadWrapper'), createSolidNoteHead(0, 0, 60));
}
if($('linesAndSpacesWrapper')){
    const width=900;
    const vertMargin=0;
    const vStep=36;
    const height=5*vStep+2*vertMargin+2;
    const x0offset=16;
    let linesAndSpaces=`<svg width="${width}" height="${height}" id="linesAndSpaces">${createStaff(0, vStep/2, width, vStep, 0)}`;
    const numNotes=9;
    const hStep=100;
    const span=numNotes*hStep;
    const x0=(width-span)/2+x0offset;
    const y0=145;
    for(let i=0; i<9; i++){
        linesAndSpaces+=createSolidNoteHead(x0+hStep*i, y0-i*vStep/2, vStep, i);
    }
    linesAndSpaces+=`</svg>`;
    appendSVGNode($('linesAndSpacesWrapper'), linesAndSpaces);
}
if($('firstLedgerSpacesWrapper')){
    const width=900;
    const step=36;
    const height=6*step;
    let firstLedgerSpaces=`<svg width="${width}" height="${height}" id="firstLedgerSpaces">${createStaff(0, step-1, width, step, 0)}`;
    const x=428;
    const yNote=0;
    firstLedgerSpaces+=createSolidNoteHead(x, yNote, step, '-ledger-0');
    firstLedgerSpaces+=createSolidNoteHead(x, yNote+5*step, step, '-ledger-1');
    firstLedgerSpaces+=`</svg>`;
    appendSVGNode($('firstLedgerSpacesWrapper'), firstLedgerSpaces);
}
if($('ledgerLinesWrapper')){
    const width=900;
    const step=36;
    const height=10.5*step+2;
    let ledgerLines=`<svg width="${width}" height="${height}" id="ledgerLines">${createStaff(0, 3*step+1, width, step, 0)}`;
    const x1=410;
    const x2=x1+80;
    for(let i=0; i<11; i++){
        if(i<3||i>7){
            const y=step*i+1;
            ledgerLines+=`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
        }
    }
    ledgerLines+=`</svg>`
    appendSVGNode($('ledgerLinesWrapper'), ledgerLines);
}
if($('dontsWrapper')){
    const width=900;
    const step=36;
    const height=11.5*step+2;
    const noteHeight=36;
    const lineWidth=100;
    const xNote1=250-23;
    const xNote2=450-23;
    const xNote3=650-23;
    let donts=`<svg width="${width}" height="${height}" id="ledgerLines">${createStaff(0, 4*step+1, width, step, 0)}`;
    let x1=xNote1-lineWidth/2+23;
    for(let i=2; i<10; i++){
        if(i<3||i>7){
            const y=step*i+step+1;
            donts+=`<line x1="${x1}" y1="${y}" x2="${x1+lineWidth}" y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
        }
    }
    x1+=200;
    for(let i=1; i<10; i++){
        if(i<3||i>8){
            const y=step*i+step+1;
            donts+=`<line x1="${x1}" y1="${y}" x2="${x1+lineWidth}" y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
        }
    }
    x1+=200;
    for(let i=0; i<11; i++){
        if(i<3||i>7){
            if(i===9)continue;
            const y=step*i+step+1;
            donts+=`<line x1="${x1}" y1="${y}" x2="${x1+lineWidth}" y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
        }
    }
    donts+=createSolidNoteHead(xNote1, 73, noteHeight);
    donts+=createSolidNoteHead(xNote2, 55, noteHeight);
    donts+=createSolidNoteHead(xNote3, 1, noteHeight);
    donts+=createSolidNoteHead(xNote3, 73, noteHeight);
    donts+=createSolidNoteHead(xNote1, 307, noteHeight);
    donts+=createSolidNoteHead(xNote1, 361, noteHeight);
    donts+=createSolidNoteHead(xNote2, 361, noteHeight);
    donts+=createSolidNoteHead(xNote3, 0, noteHeight);
    donts+=createSolidNoteHead(xNote3, 307, noteHeight);
    donts+=createSolidNoteHead(xNote3, 379, noteHeight);
    const side=80;
    const xDont1=450-side/2;
    const yDont1=286;
    const xDont2=xDont1+200;
    const yDont2=yDont1+step;
    donts+=`<path d="m ${xDont1} ${yDont1} l ${side} ${side} m 0 -${side} l -${side} ${side}" style="stroke:red;stroke-width:4px;stroke-linecap:round"/>`;
    donts+=`<path d="m ${xDont2} ${yDont2} l ${side} ${side} m 0 -${side} l -${side} ${side}" style="stroke:red;stroke-width:4px;stroke-linecap:round"/>`;
    donts+=createSvgText($str('¡Omitir lineas es incorrecto!', 'Skipping lines is incorrect!'), 450, 224, 'undefined', 28, 'sans-serif', 'bold');
    donts+=createCurvedArrow(510, 250, 468, 324, -20, 3/4);
    donts+=createCurvedArrow(520, 250, 630, 362, 30, 3/4);
    donts+=`</svg>`;
    appendSVGNode($('dontsWrapper'), donts);
}
const trebleClefPath=`<path style="fill:${darkColor};stroke:${darkColor};stroke-width:1px;stroke-linejoin:miter;fill-rule:nonzero;"
                d="m 31.353931,111.11786 c 22.805173,0.46601 22.180373,-29.669087 6.404193,-29.669087 -13.901784,0 -16.71338,13.980194 -7.497591,20.970297 -21.3056544,-5.747419 -9.059589,-28.271066
                7.341391,-28.271066 9.059589,0 19.212576,8.077446 19.212576,18.95093 0,7.456106 -6.091792,19.572276 -24.835769,20.814966 C 10.922996,113.29256 1.1855,101.17639 1.1855,88.128199
                1.1855,77.565385 7.6271802,63.119184 22.606742,51.313686 43.381317,35.158795 48.53591,23.042626 39.320122,11.765269 33.696928,17.916555 26.667937,23.974639 29.479534,44.478924 l 17.338179,83.259836
                c 0.624799,4.50473 -2.030598,10.25214 -8.59099,13.20351 -6.247992,2.95138 -15.307581,1.86403 -17.494379,0.46601 -6.497912,-2.79604 -8.35669,-6.21342 -8.24735,-10.09681 0.18744,-5.2814 4.342355,-10.56281
                9.809348,-10.56281 10.621587,0 14.682782,16.77623 0,19.10627 6.247993,3.41738 24.210971,-0.46601 20.618375,-15.68889 L 26.667937,47.274963
                C 20.888544,21.1786 31.822531,10.833256 37.758124,1.3049756 57.751699,22.887291 48.84831,46.498285 30.572932,59.857138 -7.9147009,87.351521 9.7671176,111.11786 31.353931,111.11786 Z" id="path3357" />`;
const bassClefPath=`<path style="fill:${darkColor};stroke:${darkColor};stroke-width:1px;stroke-linejoin:miter;fill-rule:nonzero;"
            d="m 0.5,70.486926 c 19.957946,0.6919 42.813013,-26.4671 43.134917,-43.0739 C 43.956819,7.3637769 32.851188,0.5999573 20.940799,0.5999573 9.0304131,0.5999573 0.5,8.7130869 0.5,19.109686
            c 0,12.10904 16.738923,12.28204 17.060826,2.76774 C 17.882728,10.425656 5.489488,13.850816 5.586058,16.359136 5.763105,-0.33244258 33.655943,-3.5690427 33.012139,23.780226 32.207381,55.091026 0.5,70.486926 0.5,70.486926 Z
            m 57.620522,-40 a 3.9754941,4.2727956 0 0 1 -3.862829,4.1517 3.9754941,4.2727956 0 0 1 -4.023779,-4.1517 3.9754941,4.2727956 0 0 1 4.023779,-4.3246 3.9754941,4.2727956 0 0 1 3.862829,4.3246 z
            m 0,-20.84491 a 3.9754941,4.2727956 0 0 1 -3.862829,4.27279 3.9754941,4.2727956 0 0 1 -4.023779,-4.27279 3.9754941,4.2727956 0 0 1 4.023779,-4.2554991 3.9754941,4.2727956 0 0 1 3.862829,4.2554991 z" />`;
if($('clefFiguresWrapper')){
    const fullScale=[1, 2, 5, 8, 9, 12, 15, 18, 19, 22, 25, 26, 29, 32, 35, 36, 39, 42, 43, 46, 49, 52, 53, 56, 59, 60, 63, 66, 69, 70, 73];
    const NoteClass=(function(){
        const instance={};
        instance.C=new Values('Do', 'Do');
        instance.D=new Values('Re', 'Re');
        instance.E=new Values('Mi', 'Mi');
        instance.F=new Values('Fa', 'Fa');
        instance.G=new Values('Sol', 'So');
        instance.A=new Values('La', 'La');
        instance.B=new Values('Si', 'Ti');
        function Values(es, en){
            this.es=es;
            this.en=en;
        };
        return instance;
    })();
    const fontSize='24px';
    let ledgerLines='';
    let x=73, limitY=181, y;
    let hStep=41;
    for(let i=0; i<2; i++){
        let y=limitY-(i*20);
        ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    }
    x+=hStep;
    for(let i=0; i<2; i++){
        let y=limitY-(i*20);
        ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    }
    x+=hStep;
    y=limitY-=20;
    ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    x+=hStep;
    ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    x=73+18*hStep;
    for(let i=0; i<2; i++){
        let y=21+(i*20);
        ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    }
    x-=43;
    for(let i=0; i<2; i++){
        let y=21+(i*20);
        ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    }
    x-=hStep;
    y=41;
    ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    x-=hStep;
    ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    let width=900;
    {
        let trebleClef=`<svg id="trebleClef" width="${width}" height="202" style="display:block; position:relative;">${createStaff(0, 61, width, 20, 0)}`;
        trebleClef+=`<svg x="5" y="26" width="58" height="144">`;
        trebleClef+=trebleClefPath;
        trebleClef+=`</svg>`;
        trebleClef+=ledgerLines;
        let ascendingNotes=``;
        for(let i=0; i<19; i++){
            ascendingNotes+=createSolidNoteHead(i*hStep+80, 181-i*10, 20, `treble-${i}`)
        }
        trebleClef+=ascendingNotes;
        let names='';
        for(let i=0; i<19; i++){
            names+=createSvgText(NoteClass[scorePlayer.sound.pitchValues[fullScale[i+12]].classKey][lang], 92+i*hStep, 186-i*10, `${lightColor}`, 12);
        }
        trebleClef+=names;
        trebleClef+=`</svg>`;
        appendSVGNode($('trebleClefWrapper'), trebleClef);
        let svgTrebleC=`<svg style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none">`;
        svgTrebleC+=createSvgText($str(`Este "Do" de clave de Sol...`, `This "Do" in the treble clef...`), 600, 150, 'undefined', fontSize, 'sans-serif', 'bold');
        svgTrebleC+=createCurvedArrow(440, 162, 275, 165, -15, 0.75);
        svgTrebleC+=`</svg>`;
        appendSVGNode($('trebleClef'), svgTrebleC);
    }
    {
        let bassClef=`<svg id="bassClef" width="${width}" height="202" style="display:block; position:relative;">${createStaff(0, 61, width, 20, 0)}`;
        bassClef+=`<svg x="5" y="61" width="60" height="72">`;
        bassClef+=bassClefPath;
        bassClef+=`</svg>`;
        bassClef+=ledgerLines;
        let ascendingNotes=``;
        for(let i=0; i<19; i++){
            ascendingNotes+=createSolidNoteHead(i*hStep+80, 181-i*10, 20, `bass-${i}`)
        }
        bassClef+=ascendingNotes;
        let names='';
        for(let i=0; i<19; i++){
            names+=createSvgText(NoteClass[scorePlayer.sound.pitchValues[fullScale[i]].classKey][lang], 92+i*hStep, 186-i*10, `${lightColor}`, 12);
        }
        bassClef+=names;
        bassClef+=`</svg>`;
        appendSVGNode($('bassClefWrapper'), bassClef);
        let svgBassC=`<svg style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none">`;
        svgBassC+=createSvgText($str(`...en clave de Fa se escribe aquí`, `...in the bass cleff is written here`), 300, 20, 'undefined', fontSize, 'sans-serif', 'bold');
        svgBassC+=createCurvedArrow(486, 30, 688, 27, -15, 0.75);
        svgBassC+=`</svg>`;
        appendSVGNode($('bassClef'), svgBassC);
    }
    let clefsNotes=Array.from($('clefFiguresWrapper').getElementsByTagName('ellipse'));
    for(let i=0; i<clefsNotes.length; i++){
        clefsNotes[i].pitchValueIndex=fullScale[i<19?i+12:i-19];
        clefsNotes[i].addEventListener('click', (e)=>{play(e);}, false);
    }
    const duration=1, attack=0.03, decay=0.02, release=0.05, lfoDelay=attack+0.5;
    let wave;
    function play(e){
        const ac=getAC();
        if(!wave){
            wave=ac.createPeriodicWave(scorePlayer.sound.real, scorePlayer.sound.imag, {disableNormalization: true});
        }
        e.target.style="fill:red;";
        let tuneOsc=ac.createOscillator();
        tuneOsc.setPeriodicWave(wave);
        let oscParamIndex=scorePlayer.sound.pitchValues[e.target.pitchValueIndex].oscParamIndex;
        tuneOsc.frequency.value=scorePlayer.sound.oscParam[oscParamIndex].freq;
        let gainFactor=scorePlayer.sound.oscParam[oscParamIndex].gainFactor;
        let tuneGain=ac.createGain();
        tuneGain.connect(ac.destination);
        tuneOsc.connect(tuneGain);
        let that=this;
        tuneOsc.onended=function(){
            e.target.style="fill:black";
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
        vibrato.stop(ac.currentTime+duration);
        tuneOsc.stop(ac.currentTime+duration);
    }
}
if($('quarterNoteWrapper')){
    let quarterNote=`<svg width="165" height="167" id="barLines">`;
    quarterNote+=createSolidNoteHead(0, 107, 60);
    quarterNote+=createSolidNoteHead(90, 0, 60);
    quarterNote+=`<path d="m 72 135 v -132 M 92 32 v 132" stroke="${darkColor}" stroke-width="6" stroke-linecap="round"/>`;
    quarterNote+=`</svg>`;
    appendSVGNode($('quarterNoteWrapper'), quarterNote);
}
let quarterRestPath=`<path style="fill:${darkColor};stroke:${darkColor};stroke-width:1px;stroke-linejoin:miter;fill-rule:nonzero;"
                    d="M 5.6997302,1.7131598 21.84982,22.850402 C 10.573215,28.464983 10.75108,38.207931 22.739142,49.932494 12.138423,45.308722 2.8948081,51.253572 12.672015,64.629482
                    -11.19739,46.96007 10.039622,38.703335 13.543551,41.675758 L 2.2029156,27.63931 C 14.557379,17.896361 10.039622,10.432273 3.8321537,3.2323998 Z" >`;
if($('quarterRestWrapper')){
    let quarterRest=`<svg width="72" height="198" id="barLines">`;
    quarterRest+=`<svg x="0" y="0" width="72" height="198" viewbox="0 0 24 66">`;//
    quarterRest+=quarterRestPath;
    quarterRest+=`</svg>`;
    quarterRest+=`</svg>`;
    appendSVGNode($('quarterRestWrapper'), quarterRest);
}
if($('quarterNoteAndRestPositionWrapper')){
    let quarterNoteAndRestPosition=`<svg width="400" height="162" id="barLines">${createStaff(0, 41, 400, 20, 0)}`;
    quarterNoteAndRestPosition+=`<svg x="5" y="6" width="58" height="144">`;
    quarterNoteAndRestPosition+=trebleClefPath;
    quarterNoteAndRestPosition+=`</svg>`;
    quarterNoteAndRestPosition+=createSolidNoteHead(100, 90, 20);
    quarterNoteAndRestPosition+=createSolidNoteHead(150, 40, 20);
    quarterNoteAndRestPosition+=createSolidNoteHead(200, 70, 20);
    quarterNoteAndRestPosition+=`<path d="m 124 101 v-44 m 26 -6 v 44 m 50 -14 v 44" stroke="${darkColor}" stroke-width="2"/>`;
    quarterNoteAndRestPosition+=`<svg x="330" y="50" width="24" height="66">`;
    quarterNoteAndRestPosition+=quarterRestPath;
    quarterNoteAndRestPosition+=`</svg>`;
    appendSVGNode($('quarterNoteAndRestPositionWrapper'), quarterNoteAndRestPosition);
}
if($('barLinesWrapper')){
    {
        let barLines=`<svg width="900" height="162" id="barLines">${createStaff(0, 41, 900, 20, 0)}`;
        barLines+=`<svg x="5" y="6" width="58" height="144">`;
        barLines+=trebleClefPath;
        barLines+=`</svg>`;
        let x=224;
        let sep=164;
        let height=80;
        barLines+=`<path d="m ${x} 40 v ${height} m ${sep} -${height} v ${height} m ${sep} -${height} v ${height} m ${sep} -${height} v ${height}" stroke="${darkColor}" stroke-width="2"/>`;
        barLines+=`<path d="m 896 40 v ${height}" stroke="${darkColor}" stroke-width="8"/>`;
        barLines+=`<path d="m 886 40 v ${height}" stroke="${darkColor}" stroke-width="2"/>`;
        barLines+=`</svg>`;
        appendSVGNode($('barLinesWrapper'), barLines);
    }
    {
        let timeSignature=`<svg width="900" height="162" id="barLines">${createStaff(0, 41, 280, 20, 0)}${createStaff(310, 41, 280, 20, 0)}${createStaff(620, 41, 280, 20, 0)}`;
        timeSignature+=`<svg x="5" y="6" width="58" height="144">`;
        timeSignature+=trebleClefPath;
        timeSignature+=`</svg>`;
        timeSignature+=`<svg x="315" y="6" width="58" height="144">`;
        timeSignature+=trebleClefPath;
        timeSignature+=`</svg>`;
        timeSignature+=`<svg x="625" y="6" width="58" height="144">`;
        timeSignature+=trebleClefPath;
        timeSignature+=`</svg>`;
        timeSignature+=createSvgText('2', 85, 44, undefined, 48, 'sans-serif', 'bold');
        timeSignature+=createSvgText('4', 85, 83, undefined, 48, 'sans-serif', 'bold');
        timeSignature+=createSvgText('3', 395, 44, undefined, 48, 'sans-serif', 'bold');
        timeSignature+=createSvgText('4', 395, 83, undefined, 48, 'sans-serif', 'bold');
        timeSignature+=createSvgText('3', 705, 44, undefined, 48, 'sans-serif', 'bold');
        timeSignature+=createSvgText('4', 705, 83, undefined, 48, 'sans-serif', 'bold');
        timeSignature+=`</svg>`;
        appendSVGNode($('timeSignatureWrapper'), timeSignature);
    }
    {
        let metronomeMark=`<svg width="400" height="176" id="barLines">${createStaff(0, 66, 400, 20, 0)}`;
        metronomeMark+=`<svg x="5" y="31" width="58" height="144">`;
        metronomeMark+=trebleClefPath;
        metronomeMark+=`</svg>`;
        metronomeMark+=createSolidNoteHead(65, 25, 15);
        metronomeMark+=`<path d="m 83 32 v -30" stroke="${darkColor}" stroke-width="2" stroke-linecap="round"/>`;
        metronomeMark+=createSvgText(' = 80', 123, 12, 'undefined', 30, 'sans-serif', 'bold');
        metronomeMark+=`</svg>`;
        appendSVGNode($('metronomeMarkWrapper'), metronomeMark);
    }
}
if(location.hash&&$(location.hash.slice(1))){
    $(location.hash.slice(1)).scrollIntoView(true);
}


/* if($('clefFiguresWrapper')){
    const fullScale=[1, 2, 5, 8, 9, 12, 15, 18, 19, 22, 25, 26, 29, 32, 35, 36, 39, 42, 43, 46, 49, 52, 53, 56, 59, 60, 63, 66, 69, 70, 73];
    const NoteClass=(function(){
        const instance={};
        instance.C=new Values('Do', 'Do');
        instance.D=new Values('Re', 'Re');
        instance.E=new Values('Mi', 'Mi');
        instance.F=new Values('Fa', 'Fa');
        instance.G=new Values('Sol', 'So');
        instance.A=new Values('La', 'La');
        instance.B=new Values('Si', 'Ti');
        function Values(es, en){
            this.es=es;
            this.en=en;
        };
        return instance;
    })();
    const fontSize=innerWidth>980?15:32;
    let ledgerLines='';
    let x=73, limitY=181, y;
    let hStep=innerWidth>980?43:41;
    for(let i=0; i<2; i++){
        let y=limitY-(i*20);
        ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    }
    x+=hStep;
    for(let i=0; i<2; i++){
        let y=limitY-(i*20);
        ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    }
    x+=hStep;
    y=limitY-=20;
    ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    x+=hStep;
    ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    x=73+18*hStep;

    for(let i=0; i<2; i++){
        let y=21+(i*20);
        ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    }
    x-=43;
    for(let i=0; i<2; i++){
        let y=21+(i*20);
        ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    }
    x-=hStep;
    y=41;
    ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    x-=hStep;
    ledgerLines+=`<line x1="${x}" x2="${x+38}" y1="${y}", y2="${y}" stroke="${darkColor}" stroke-width="2"/>`;
    let width=innerWidth>980?900:860;
    {
        let trebleClef=`<svg width="${width}" height="202" id="trebleClef">${createStaff(0, 61, width, 20, 0)}`;
        trebleClef+=`<svg x="5" y="26" width="58" height="144">`;
        trebleClef+=trebleClefPath;
        trebleClef+=`</svg>`;
        trebleClef+=ledgerLines;
        let ascendingNotes=``;
        for(let i=0; i<19; i++){
            ascendingNotes+=createSolidNoteHead(i*hStep+80, 181-i*10, 20, `treble-${i}`)
        }
        trebleClef+=ascendingNotes;
        let names='';
        for(let i=0; i<19; i++){
            names+=createSvgText(NoteClass[scorePlayer.sound.pitchValues[fullScale[i+12]].classKey][lang], 92+i*hStep, 186-i*10, `${lightColor}`, 12);
        }
        trebleClef+=names;
        trebleClef+=`</svg>`;
        appendSVGNode($('trebleClefWrapper'), trebleClef);
        let svgTrebleC=`<svg style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none">`;
        svgTrebleC+=createSvgText($str(`Este "Do" de clave de Sol...`, `This "Do" in the treble clef...`), innerWidth>980?460:600, innerWidth>980?200:220, 'undefined', fontSize, 'sans-serif', 'bold');
        svgTrebleC+=createCurvedArrow(innerWidth>980?360:402, innerWidth>980?210:232, innerWidth>980?275:287, innerWidth>980?210:227, innerWidth>980?-15:-15, 0.75);
        svgTrebleC+=`</svg>`;
        appendSVGNode($('trebleClefWrapper'), svgTrebleC);
    }
    {
        let bassClef=`<svg width="${width}" height="202" id="bassClef">${createStaff(0, 61, width, 20, 0)}`;
        bassClef+=`<svg x="5" y="61" width="60" height="72">`;
        bassClef+=bassClefPath;
        bassClef+=`</svg>`;
        bassClef+=ledgerLines;
        let ascendingNotes=``;
        for(let i=0; i<19; i++){
            ascendingNotes+=createSolidNoteHead(i*hStep+80, 181-i*10, 20, `bass-${i}`)
        }
        bassClef+=ascendingNotes;
        let names='';
        for(let i=0; i<19; i++){
            names+=createSvgText(NoteClass[scorePlayer.sound.pitchValues[fullScale[i]].classKey][lang], 92+i*hStep, 186-i*10, `${lightColor}`, 12);
        }
        bassClef+=names;
        bassClef+=`</svg>`;
        appendSVGNode($('bassClefWrapper'), bassClef);
        let svgBassC=`<svg style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none">`;
        svgBassC+=createSvgText($str(`...en clave de Fa se escribe aquí`, `...in the bass cleff is written here`), innerWidth>980?543:400, innerWidth>980?53:60, 'undefined', fontSize, 'sans-serif', 'bold');
        svgBassC+=createCurvedArrow(innerWidth>980?660:634, innerWidth>980?60:72, innerWidth>980?767:752, innerWidth>980?53:71, innerWidth>980?-20:-15, 0.75);
        svgBassC+=`</svg>`;
        appendSVGNode($('bassClefWrapper'), svgBassC);
    }
    let clefsNotes=Array.from($('clefFiguresWrapper').getElementsByTagName('ellipse'));
    for(let i=0; i<clefsNotes.length; i++){
        clefsNotes[i].pitchValueIndex=fullScale[i<19?i+12:i-19];
        clefsNotes[i].addEventListener('click', (e)=>{play(e);}, false);
    }
} */