const loader=(function(){
	function $(id){return document.getElementById(id)};
	const metronomeMarkX=43, metronomeMarkY=36, initialTempo=80;
	let specsLoaded, lessonNamesField, specs, clefFieldset, keyFieldset, tempoLabel, tempoSlider, buttonLabel={},
		buttonNew, buttonReset, buttonLoadMasterLesson, buttonSaveMasterLesson, buttonLoadPlayerLesson,
		buttonSavePlayerLesson, buttonLoadSequence, buttonPlayPause, buttonRw,
		currentIndex, status, metronomeOn=true, markStart=true, ctx,
		lesson={};
	function setUpApp(){
		if(canvas.getContext){
			ctx=canvas.getContext("2d");
			ctx.lineWidth=2;
			ctx.strokeStyle=ctx.fillStyle='black';
		}
		else{
			alert("Sorry, no canvas here");
			return;
		}
		lessonNamesField=$('lessonNames');
		lessonNamesField.addEventListener('change', ()=>{
			lesson.names=lessonNamesField.value;
			canvas.focus();
		}, false);
		specs=$('specs');
		buttonNew=$('new');
		buttonNew.addEventListener('click', ()=>{loadSpecs()}, false);
		buttonReset=$('reset');
		buttonReset.setAttribute('disabled', '');
		buttonReset.addEventListener('click', resetForm, false);
		buttonLoadMasterLesson=$('loadMasterLesson');
		buttonLoadMasterLesson.addEventListener('click', ()=>{loadLesson(false);}, false);
		buttonSaveMasterLesson=$('saveMasterLesson');
		buttonSaveMasterLesson.addEventListener('click', ()=>{saveLesson(false);}, false);
		buttonSaveMasterLesson.setAttribute('disabled', '');
		buttonLoadPlayerLesson=$('loadPlayerLesson');
		buttonLoadPlayerLesson.addEventListener('click', ()=>{loadLesson(true);}, false);
		buttonSavePlayerLesson=$('savePlayerLesson');
		buttonSavePlayerLesson.addEventListener('click', ()=>{saveLesson(true);}, false);
		buttonSavePlayerLesson.setAttribute('disabled', '');
		buttonShowMasterLessons=$('showMasterLessons');
		buttonShowMasterLessons.addEventListener('click', ()=>{showLessons(false);}, false);
		buttonShowPlayerLessons=$('showPlayerLessons');
		buttonShowPlayerLessons.addEventListener('click', ()=>{showLessons(true);}, false);
		buttonLabel.start='Start';
		buttonLabel.pause='Pause';
		buttonLoadSequence=$('loadSequence');
		buttonLoadSequence.addEventListener('click', loadSequence, false);
		buttonRw=$('rw');
		buttonRw.addEventListener('click', rewind, false);
		buttonRw.setAttribute('disabled', '');
		buttonPlayPause=$('playPause');
		buttonPlayPause.innerText=buttonLabel.start;
		buttonPlayPause.addEventListener('click', start, false);
		buttonPlayPause.setAttribute('disabled', '');
		clefFieldset=specs.elements.clef;
		keyFieldset=specs.elements.key;
		$('clefFieldset').addEventListener('change', changeClef, false);
		$('keyFieldset').addEventListener('change', changeKey, false);
		currentIndex=0;
		initializeTempoControl();
	};
	function initializeTempoControl(){
		tempoSlider=$('tempo');
		tempoLabel=$('tempoLabel');
		tempoSlider.min=60;
		tempoSlider.value=tempoLabel.textContent=initialTempo;
		tempoSlider.max=140;
		tempoSlider.step=5;
		tempoSlider.addEventListener('change', function(){
			tempoLabel.textContent=tempoSlider.value;
			lesson.tempo=tempoSlider.value;
			if(specsLoaded){
				updateMetronomeMark(true);
			}
		}, false);
	}
	function loadSpecs(lessonToLoad){
		if(lessonToLoad){
			lesson.names=lessonNamesField.value=lessonToLoad.specs.names;
			lesson.clef=specs.clef.value=clef=lessonToLoad.specs.clef;
			lesson.time=specs.time.value=lessonToLoad.specs.time;
			lesson.tempo=tempoSlider.value=tempoLabel.textContent=lessonToLoad.specs.tempo;
			if(lessonToLoad.specs.key){
				lesson.key=specs.key.value=lessonToLoad.specs.key;
				let firstTonicIndex=KeySignature[lesson.key].firstTonicIndex;
				lessonToLoad.staves.forEach(staff => {
					let bars=staff.bars;
					bars.forEach(bar => {
						let figures=bar.figures;
						figures.forEach(figure => {
							if(figure.pitchIndex){
								figure.pitchIndex-=firstTonicIndex;
							}
						})
					});
				});
			}else{
				lesson.key=specs.key.value;
			}
		}else{
			lesson.names=lessonNamesField.value;
			lesson.clef=specs.clef.value;
			lesson.time=specs.time.value;
			lesson.tempo=tempoSlider.value;
			lesson.key=specs.key.value;
		}
		specsLoaded=true;
		setUpEdition(true);
		if(lessonToLoad){
			Staff.initializeStaves(false)
			Staff.loadLesson(lessonToLoad.staves);
			createScoreMarks();
		}else{
			Staff.initializeStaves(true);
			createScoreMarks();
		}
		canvas.focus();
	};
	function resetForm(){
		if(confirm('Changes to be discarded or already JSONed?')){
			for(let i=1; i<specs.time.length; i++){
				specs.time[i].removeAttribute('disabled');
			}
			specs.reset();
		}else{
			return;
		}
		specs.reset()
		initializeTempoControl();
		specsLoaded=false;
		setUpEdition(false);
		Staff.initializeStaves(false);
		iterator.reset();
		sequence.length=0;
		instance.lesson={};
		currentIndex=0;
		buttonPlayPause.setAttribute('disabled', '');
	};
	function setUpEdition(ready){
		if(ready){
			buttonNew.setAttribute('disabled', '');
			buttonReset.removeAttribute('disabled');
			buttonLoadMasterLesson.setAttribute('disabled', '');
			buttonLoadPlayerLesson.setAttribute('disabled', '');
			buttonSavePlayerLesson.removeAttribute('disabled');
			buttonSaveMasterLesson.removeAttribute('disabled');
			canvas.addEventListener('keydown', listener.onKeyDown, false);
			for(let i=0; i<specs.time.length; i++){
				specs.time[i].setAttribute('disabled', '');
			}
			listener.initialize(false);
		}else{
			buttonNew.removeAttribute('disabled');
			buttonLoadMasterLesson.removeAttribute('disabled');
			buttonLoadPlayerLesson.removeAttribute('disabled');
			buttonSaveMasterLesson.setAttribute('disabled', '');
			buttonSavePlayerLesson.setAttribute('disabled', '');
			buttonReset.setAttribute('disabled', '');
			canvas.removeEventListener('keydown', listener.onKeyDown, false);
			for(let i=0; i<specs.time.length; i++){
				specs.time[i].removeAttribute('disabled');
			}
			listener.initialize(true);
		}
	}
	function createScoreMarks(){
		Clef.draw();
		KeySignature.drawAll(Clef[lesson.clef]===Clef.BASS);
		TimeSignature.draw(TimeSignature[lesson.time]);
		drawMetronomeMark();
		updateMetronomeMark(false);
	}
	function drawMetronomeMark(){
		ctx.beginPath();
		ctx.ellipse(metronomeMarkX+4, metronomeMarkY, 8.25*0.8, 5.75*0.8, -Math.PI/180*27.5, 0, Math.PI*2, true);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(metronomeMarkX+10, metronomeMarkY);
		ctx.lineTo(metronomeMarkX+10, metronomeMarkY-25);
		ctx.stroke();
	}
	function updateMetronomeMark(clear){
		if(clear){
			ctx.clearRect(metronomeMarkX+12.5, metronomeMarkY-22.5, 60, 26);
		}
		paths.tempFont('bold 26px sans-serif');
		ctx.fillText('='+lesson.tempo, metronomeMarkX+14, metronomeMarkY-2);//='+ x+14
		paths.tempFont();
	};
	function changeClef(){
		if(!specsLoaded||typeof lesson==='undefined')return;
		let staves=getStringifyStaves(false);
		lesson.clef=specs.elements.clef.value;
		iterator.reset();
		Staff.initializeStaves(false);
		createScoreMarks();
		Staff.loadLesson(staves);
	};
	function changeKey(){
		if(!specsLoaded||typeof lesson==='undefined')return;
		let staves=getStringifyStaves(false);
		lesson.key=specs.elements.key.value;
		iterator.reset();
		Staff.initializeStaves(false);
		createScoreMarks();
		Staff.loadLesson(staves);
	};
	function octaveTranspose(up){
		let staff;
		let bar;
		let figure;
		for(i=0; i<numOfStaves; i++){
			staff=Staff.staves[i];
			for(j=0; j<staff.bars.length; j++){
				bar=staff.bars[j];
				for(k=0; k<bar.figures.length; k++){
					figure=bar.figures[k];
					if(figure.tonalIndexInScale!==undefined){
						figure.tonalIndexInScale+=up?7:-7;
					}
				}
			}
		}
		Staff.redrawStaves();
		iterator.show();
	};
	function insertBar(staffIndex, barIndexInStaff){
		let staff=Staff.staves[staffIndex];
		staff.bars.splice(barIndexInStaff, 0, new Bar(staff));
		Staff.redrawStaves();
	}
	function deleteBar(staffIndex, barIndexInStaff){
		let staff=Staff.staves[staffIndex];
		staff.bars.splice(barIndexInStaff, 1);
		Staff.redrawStaves();
	}
	let ac, sequence=[]
	function setAC(){
		if(!ac){
			ac=new AudioContext({latencyHint: "interactive", sampleRate: 44100});
			wave=ac.createPeriodicWave(real, imag, {disableNormalization: true});
		}
	};
	function loadSequence(){
		beepGainValue=beepGainValueBase;
		createSequence();
		cursor(true);
		buttonPlayPause.removeAttribute('disabled');
		canvas.focus();
	};
	function createSequence(){
		let staves=Staff.staves;
		for(let i=0; i<staves.length; i++){
			let staff=staves[i];
			let bars=staff.bars;
			for(let j=0; j<bars.length; j++){
				let bar=bars[j];
				if(i===0&&j===0){
					bar.isFirst=true;
				}
				let figures=bar.figures;
				for(let k=0; k<figures.length; k++){
					sequence.push(figures[k]);
				}
			}
		}
	};
	let duration, wave, toneOsc, gainFactor, toneGain, volumeAttack, volumeSustain, volumeRelease, vibrato, vibratoGain,
		beepOsc, beepGain, beepGainValue, timeOutMetronome, metronomeDelay;
	const beepDuration=0.05, attack=0.03, decay=0.02, release=0.05, lfoDelay=attack+0.5,
		  beepHi=1800, beepLow=1200, beepGainValueBase=0.02;
	function play(){
		if(sequence[currentIndex].isFirstInBar()){
			if(metronomeOn){metronomeDelay=60000/lesson.tempo-beepDuration*1000;
				if(markStart&&(status===Status.IDDLE||status===Status.PAUSED)){
					status=Status.MARKING;
					startMetronome();
					return;
				}
				startMetronome();
			}
			status=Status.PLAYING
		}
		figure=sequence[currentIndex];
		duration=5*figure.getTicksSpan()/lesson.tempo;
		toneOsc=ac.createOscillator();
		if(figure instanceof Note){
			toneOsc.setPeriodicWave(wave);
			toneOsc.frequency.value=oscParam[figure.oscParamIndex].freq;
			gainFactor=oscParam[figure.oscParamIndex].gainFactor;
			toneGain=ac.createGain();
			toneGain.connect(ac.destination);
			toneOsc.connect(toneGain);
			volumeAttack=1*gainFactor;
			volumeSustain=0.9*gainFactor;
			volumeRelease=0.8*gainFactor;
			toneGain.gain.setValueAtTime(0, ac.currentTime);
			toneGain.gain.linearRampToValueAtTime(volumeAttack, ac.currentTime+attack);
			toneGain.gain.linearRampToValueAtTime(volumeSustain, ac.currentTime+attack+decay);
			toneGain.gain.linearRampToValueAtTime(volumeRelease, ac.currentTime+duration-release);
			toneGain.gain.linearRampToValueAtTime(0.0, ac.currentTime+duration);
			vibrato=ac.createOscillator();
			vibrato.frequency.value=4.5;
			vibratoGain=ac.createGain();
			vibrato.connect(vibratoGain);
			vibratoGain.connect(toneGain.gain);
			vibratoGain.gain.setValueAtTime(0.1*gainFactor, ac.currentTime+lfoDelay);
			vibrato.start(ac.currentTime+lfoDelay);
			vibrato.stop(ac.currentTime+duration);
		}else{
			toneOsc.frequency.value=gainFactor=0;
		}
		toneOsc.start(ac.currentTime);
		toneOsc.stop(ac.currentTime+duration);
		toneOsc.onended=function(){
			enlightFigure(false);
			if(status===Status.PLAYING){
				checkForEnding();
			}
		}
		enlightFigure(true);
	};
	function startMetronome(){
		metronomeRunning=true;
		let countFinished=false;
		let count=0;
		beep();
		function beep(){
			if(!metronomeRunning){
				return;
			}
			if(countFinished){
				play();
				return;
			}
			beepOsc=ac.createOscillator();
			beepGain=ac.createGain();
			beepOsc.type='square';
			beepOsc.frequency.value=count===0?beepHi:beepLow;
			beepOsc.connect(beepGain);
			beepGain.gain.value=beepGainValue;
			beepGain.connect(ac.destination);
			beepOsc.onended=function(){
				count++;
				if(count>=TimeSignature[lesson.time].upperNumber){
					if(status===Status.PLAYING){
						return;
					}else{
						countFinished=true;
					}
				}
				timeOutMetronome=setTimeout(beep, metronomeDelay);
			}
			beepOsc.start(ac.currentTime);
			beepOsc.stop(ac.currentTime+beepDuration);
		};
	};
	function checkForEnding(){
		cursor(false);
		if(sequence[currentIndex+1]){
			currentIndex++;
			play();
			cursor(true);
		}else{
			if(metronomeOn){
				beepOsc=ac.createOscillator();
				beepGain=ac.createGain();
				beepOsc.type='square';
				beepOsc.frequency.value=beepHi;
				beepOsc.connect(beepGain);
				beepGain.gain.value=beepGainValue;
				beepGain.connect(ac.destination);
				beepOsc.start(ac.currentTime);
				beepOsc.stop(ac.currentTime+beepDuration*8);
				rewind();
				buttonPlayPause.removeEventListener('click', stop);
				buttonPlayPause.addEventListener('click', start, false);
			}
		}
	};
	function enlightFigure(on){
		let color=on?'red':'black';
		paths.tempFillStyle(color);
		paths.tempStrokeStyle(color);
		figure.draw();
		paths.tempFillStyle();
		paths.tempStrokeStyle();
	};
	function cursor(show){
		let x=sequence[currentIndex].getX()-4;
		let y=sequence[currentIndex].getParentBar().y+19;
		if(show){
			paths.tempFillStyle('red');
			ctx.fillRect(x, y, 3, 82);
			paths.tempFillStyle();
		}else{
			ctx.clearRect(x-1, y-1, 5, 84);
			let figure=sequence[currentIndex]
			if((figure instanceof Note)&&figure.hasLedgerLines()){
				figure.drawLedgerLines();
			}
		};
	};
	function start(){
		buttonPlayPause.removeEventListener('click', start);
		buttonPlayPause.addEventListener('click', stop, false);
		buttonPlayPause.innerText=buttonLabel.pause;
		buttonRw.setAttribute('disabled', '');
		setAC();
		if(status===Status.IDDLE){
			play();
		}else if(status===Status.PAUSED){
			cursor(false);
			currentIndex=sequence.indexOf(sequence[currentIndex].getParentBar().figures[0]);
			cursor(true);
			play();
		}
		canvas.focus();
	};
	function stop(){
		buttonPlayPause.removeEventListener('click', stop);
		if(toneOsc){
			toneOsc.stop();
		}
		if(metronomeRunning){
			clearTimeout(timeOutMetronome);
			metronomeRunning=false;
		}
		if(status===Status.MARKING||sequence[currentIndex].getParentBar().isFirst){
			status=Status.IDDLE;
			cursor(false);
			currentIndex=0;
			cursor(true);
			buttonPlayPause.innerText=buttonLabel.start;
			buttonPlayPause.addEventListener('click', start, false);
		}else{
			status=Status.PAUSED;
			buttonPlayPause.innerText=buttonLabel.start;
			buttonRw.removeAttribute('disabled');
		}
		buttonPlayPause.addEventListener('click', start, false);
		canvas.focus();
	};
	function rewind(){
		buttonPlayPause.innerText=buttonLabel.start;
		buttonRw.setAttribute('disabled', '');
		cursor(false);
		currentIndex=0;
		cursor(true);
		status=Status.IDDLE;
		canvas.focus();
	};
	const Status=(function(){
		const instance={};
		instance.IDDLE=1;
		instance.MARKING=2;
		instance.PLAYING=3;
		instance.PAUSED=4;
		instance.TUNING=5;
		status=instance.IDDLE;
		return instance;
	})();
	const playerPreamble='export const lesson=';
	function loadLesson(player){
		let fileName=prompt('Filename?:', '');
		if(fileName===null||fileName==='')return;
		let query=`function=loadLesson&fileName=${fileName}&type=${player}`;
		post(query, parseAndLoadLesson);
	};
	function saveLesson(player){
		let fileName=prompt('Filename for '+(player?'player':'master')+' lesson?:', '');
		if(fileName===null||fileName==='')return;
		let query=`function=saveLesson&type=${player}&fileName=${fileName}&lesson=`+(player?playerPreamble:'')+getStringifiedLesson(player);
		post(query, showResponse);
	};
	function showLessons(player){
		let query=`function=showLessons&type=${player}`;
		post(query, showResponse);
	};
	function getStringifiedLesson(player){
		if(lesson.names===''||typeof lesson.names==='undefined'){
			alert('¿Y el name, apá?');
			return;
		}
		let lessonObj={};
		lessonObj.specs={names:instance.getNames(),
							clef:instance.getClef(),
							time:instance.getTime(),
							tempo:instance.getTempo()};
		if(player){
			lessonObj.specs.key=instance.getKey();
		}
		lessonObj.staves=getStringifyStaves(player);
		return JSON.stringify(lessonObj);
	}
	function getStringifyStaves(player){
		let staves=[];
		for(let i=0; i<Staff.staves.length; i++){
			let staffFrom=Staff.staves[i];
			let staff=staves[i]={bars:[]};
			for(let j=0; j<staffFrom.bars.length; j++){
				let bar=staff.bars[j]={};
				bar.barLineType=staffFrom.bars[j].getBarLineType();
				if(player){
					bar.x=staffFrom.bars[j].getX();
					bar.y=staffFrom.bars[j].getY();
					bar.barLineX=staffFrom.bars[j].getBarLineX();
				}
				bar.figures=[];
				for(let k=0; k<staffFrom.bars[j].figures.length; k++){
					staff.bars[j].figures[k]=staffFrom.bars[j].figures[k].serialize(player);
				}
			}
		}
		return staves;
	}
	function post(data, callback){
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				callback(xhttp.responseText);
			}
		};
		xhttp.open("POST", "editor.php");
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(data);
	};
	function showResponse(response){
		console.log(response);
	};
	function parseAndLoadLesson(response){
		response=response.replace(playerPreamble, '');
		let lesson=JSON.parse(response);
		loadSpecs(lesson);
	}
	const instance={};
	instance.getCtx=function(){return ctx;};
	instance.getNames=function(){return lesson.names;};
	instance.getClef=function(){return lesson.clef;};
	instance.getKey=function(){return lesson.key;};
	instance.getTime=function(){return lesson.time;};
	instance.getTempo=function(){return lesson.tempo;};
	instance.getSequence=function(){return sequence;};
	instance.octaveTranspose=octaveTranspose;
	instance.insertBar=insertBar;
	instance.deleteBar=deleteBar;
	window.addEventListener('load', setUpApp, false);
	return instance;
})();