const sectionContentWrapper=$('sectionContentWrapper');
sectionContentWrapper.innerHTML=`
<h3 id="inThisSection">${$str('Más sobre el tiempo en la música:', 'More about time in music:')}</h3>
<menu role="navigation">
    <li><a href="${$str('/es/teoria/tiempo/tiempo-y-metronomo', '/en/theory/time/beat-and-metronome')}">${$str('El tiempo y el metrónomo', 'Time and metronome')}</a></li>
    <li><a href="${$str('/es/teoria/tiempo/compas-y-su-marcado', '/en/theory/time/measure-and-its-marking')}">${$str('El compás y su marcado', 'Measure and its marking')}</a></li>
    <li><a href="${$str('/es/teoria/tiempo/unidad-de-tiempo-duracion-de-notas-y-ritmo', '/en/theory/time/time-unit-duration-of-notes-and-rhythm')}">${$str('Unidad de tiempo, duración de notas y ritmo', 'Time unit, duration of notes and rhythm')}</a></li>
</menu>`;
const beepDuration=0.05, attack=0.03, decay=0.02, release=0.05, lfoDelay=attack+0.5, beepHi=1800, beepLow=1200, beepGainValue=0.1;
let beepGain, beepOsc, timeOutMetronome, duration, initialTempo=100, numOfTicks=2, currentTickNumber=0, beepBars=false, ac;
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
function beep(){
    ac=getAC();
    beepOsc=ac.createOscillator();
    beepGain=ac.createGain();
    beepOsc.type='square';
    beepOsc.frequency.value=(beepBars&&currentTickNumber===0)?beepHi:beepLow;
    beepOsc.connect(beepGain);
    beepGain.gain.value=beepGainValue;
    beepGain.connect(ac.destination);
    beepOsc.onended=function(){
        if(beepBars){
            currentTickNumber++;
            if(currentTickNumber===numOfTicks){
            currentTickNumber=0;
            }
        }
        timeOutMetronome=setTimeout(beep, duration-1000*beepDuration);
    }
    beepOsc.start(ac.currentTime);
    beepOsc.stop(ac.currentTime+beepDuration);
};
function stopBeep(){
    clearTimeout(timeOutMetronome);
};
let tickMarks;
{
    const width=400, height=30, step=(width-16)/12, y=30;
    tickMarks=`<svg id="tickMarks" viewBox="0 0 ${width} ${height}" style="fill:none;stroke:black;stroke-width:2;">`;
    tickMarks+=`<path style="fill:none;stroke:black;stroke-width:2;" d="`;
    for(let i=0; i<=12; i+=2){
        tickMarks+=`M ${8+Math.ceil(i*step)} ${y} v -${y} `;
    }
    for(let i=1; i<=12; i+=2){
        tickMarks+=`M ${8+Math.ceil(i*step)} ${y} v -${y*2/3} `;
    }
    tickMarks+=`"/>`;
    tickMarks+=`</svg>`;
}
const buttonLabel=innerWidth>980?$str('Sostenga para escuchar', 'Keep pressed to listen'):$str('Pulse para encender/apagar', 'Click to turn on/off');
if($('metronome1Wrapper')){
    const metro1Label=$('metronome1Label'), metro1Meter=$('metronome1Meter'), metro1Slider=$('metronome1Slider'), metro1Button=$('metronome1Button');
    metro1Button.textContent=buttonLabel;
    metro1Label.textContent=$str('Tempo', 'Tempo');
    duration=60000/initialTempo;
    metro1Meter.textContent=metro1Slider.value=initialTempo;
    metro1Slider.addEventListener('change', (e)=>{
        let v=e.target.value;
        metro1Meter.textContent=v;
        duration=60000/v;
    }, false);
    insertSVGNode(metro1Slider, tickMarks);
    setMetronomeButton(metro1Button);
};
if($('metronome2Wrapper')){
    const metro2Label=$('metronome2Label'), metro2Span=$('metronome2Span'), metro2Slider=$('metronome2Slider'), metro2Button=$('metronome2Button');
    metro2Button.textContent=buttonLabel;
    metro2Label.textContent=$str('Tempo', 'Tempo');
    duration=60000/initialTempo;
    metro2Span.textContent=metro2Slider.value=initialTempo;
    metro2Slider.addEventListener('change', (e)=>{
        let v=e.target.value;
        metro2Span.textContent=v;
        duration=60000/v;
    }, false);
    const radioButtons=Array.from(document.getElementsByName('barType'));
    for(let i=0; i<radioButtons.length; i++){
        radioButtons[i].addEventListener('change', (e)=>{
            numOfTicks=parseInt(e.target.value);
        }, false);
    }
    beepBars=true;
    insertSVGNode(metro2Slider, tickMarks);
    setMetronomeButton(metro2Button, true);
};
function setMetronomeButton(button, bars=false){
    if(innerWidth>980){
        button.addEventListener('mousedown', e=>{
            if(button.getAttribute('beeping')){
                return;
            }
            if(bars){
                beepBars=true;
            }
            button.setAttribute('beeping', 'true');
            beep();
        }, false);
        button.addEventListener('mouseup', e=>{
            button.removeAttribute('beeping');
            stopBeep();
        }, false);
        button.addEventListener('mouseout', e=>{
            button.removeAttribute('beeping');
            stopBeep();
        }, false);
        button.addEventListener('mouseleave', e=>{
            button.removeAttribute('beeping');
            stopBeep();
        }, false);
    }else{
        button.addEventListener('mousedown', mobileClickHandler, {capture:false});
        let stopMetronome;
        function mobileClickHandler(e){
            e.stopPropagation();
            if(e.target.getAttribute('beeping')){
                e.target.removeAttribute('beeping');
                clearTimeout(stopMetronome);
                stopBeep();
            }else{
                e.target.setAttribute('beeping', true);
                stopMetronome=setTimeout(stopBeep, 6000);
                beep();
            }
        }
    }
};
if($('manualMarkingSVGWrapper')){
    const top=35, bottom=120, middle=80, side=50, style='fill:none;stroke:rgb(58, 43, 28);stroke-width:4px;stroke-linecap:round';
    let x=20;// width="800" height="145"
    let manualMarkingSVG=`<svg id="manualMarkingSVG" viewBox="0 0 516 145">
                <path d="M ${x} ${top+10} V${bottom} m -10 -10 L ${x} ${bottom} l 10 -10 M ${x+20} ${bottom-10} V ${top-10} m -10 10 L ${x+20} ${top-10} l 10 10" style="${style}" />
                <text x="${x}" y="${bottom+5}" fill="rgb(58, 43, 28)" text-anchor="middle" dominant-baseline="hanging" style="font-size:28px;font-family:sans-serif;font-weight:bold;pointer-events:none">1</text>
                <text x="${x+20}" y="${top-35}" fill="rgb(58, 43, 28)" text-anchor="middle" dominant-baseline="hanging" style="font-size:28px;font-family:sans-serif;font-weight:bold;pointer-events:none">2</text>`;

    x=240;
    manualMarkingSVG=manualMarkingSVG+`<path d="M ${x} ${top+10} V${bottom} m -10 -10 L ${x} ${bottom} l 10 -10
                        M ${x-10} ${bottom-20} Q ${x-side/4} ${middle} ${x-side} ${middle} M ${x-side+10} ${middle-10} L ${x-side} ${middle} L ${x-side+10} ${middle+10}
                        M ${x-side+20} ${middle-10} Q ${x-side/4} ${middle-10} ${x-10} ${top-10} M ${x-10-10} ${top} L ${x-10} ${top-10} L${x} ${top}" style="${style}" />
                <text x="${x}" y="${bottom+5}" fill="rgb(58, 43, 28)" text-anchor="middle" dominant-baseline="hanging" style="font-size:28px;font-family:sans-serif;font-weight:bold;pointer-events:none">1</text>
                <text x="${x-side-15}" y="${middle-12}" fill="rgb(58, 43, 28)" text-anchor="middle" dominant-baseline="hanging" style="font-size:28px;font-family:sans-serif;font-weight:bold;pointer-events:none">2</text>
                <text x="${x-10}" y="${top-35}" fill="rgb(58, 43, 28)" text-anchor="middle" dominant-baseline="hanging" style="font-size:28px;font-family:sans-serif;font-weight:bold;pointer-events:none">3</text>`;
    x=434;
    manualMarkingSVG=manualMarkingSVG+`<path d="M ${x} ${top+10} V${bottom} m -10 -10 L ${x} ${bottom} l 10 -10
                        M ${x-10} ${bottom-20} Q ${x-side/2} ${middle} ${x-side} ${middle} M ${x-side+10} ${middle-10} L ${x-side} ${middle} L ${x-side+10} ${middle+10}
                        M ${x-side+40} ${middle} H ${x+side} M ${x+side-10} ${middle-10} ${x+side} ${middle} ${x+side-10} ${middle+10}
                        M ${x+side-20} ${middle-10} Q ${x+side/6} ${middle-10} ${x+10} ${top-10} M ${x} ${top} L${x+10} ${top-10} L ${x+20} ${top}" style="${style}" />
                <text x="${x}" y="${bottom+5}" fill="rgb(58, 43, 28)" text-anchor="middle" dominant-baseline="hanging" style="font-size:28px;font-family:sans-serif;font-weight:bold;pointer-events:none">1</text>
                <text x="${x-side-15}" y="${middle-12}" fill="rgb(58, 43, 28)" text-anchor="middle" dominant-baseline="hanging" style="font-size:28px;font-family:sans-serif;font-weight:bold;pointer-events:none">2</text>
                <text x="${x+side+15}" y="${middle-12}" fill="rgb(58, 43, 28)" text-anchor="middle" dominant-baseline="hanging" style="font-size:28px;font-family:sans-serif;font-weight:bold;pointer-events:none">3</text>
                <text x="${x+10}" y="${top-35}" fill="rgb(58, 43, 28)" text-anchor="middle" dominant-baseline="hanging" style="font-size:28px;font-family:sans-serif;font-weight:bold;pointer-events:none">4</text></svg>`;
    appendSVGNode($('manualMarkingSVGWrapper'), manualMarkingSVG);
}