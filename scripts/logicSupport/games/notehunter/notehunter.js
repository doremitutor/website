const pagesList=$('sectionContentWrapper');
pagesList.innerHTML=`
<h3>${$str('Versiones (claves) del Cazanotas', 'Notehunter\'s versions (clefs)')}</h3>
<hr />
<ul>
<li><a href="${$str('/es/juegos/cazanotas/cazanotas-clave-sol', '/en/games/notehunter/notehunter-treble-clef')}">${$str('El cazanotas en clave de sol', 'Notehunter in treble clef')}</a></li>
<li><a href="${$str('/es/juegos/cazanotas/cazanotas-clave-fa', '/en/games/notehunter/notehunter-bass-clef')}">${$str('El cazanotas en clave de fa', 'Notehunter in bass clef')}</a></li>
</ul>`;
(function(){
	let ac, ctx, currentStatus, blurSavedStatus, currentLevel, currentScore, launchTimer, frameTimer, running=false;
	const leftPadding=152, vertStep=16, colorLight='#ffcc99', colorDark='#3a2b1c', notePool=[];
	const text=(function getTexts(){
		const instance={}
		instance.noteButtonTxt=$str('Eliminar nota adelantada con botón o tecleando<br>(PCs) la letra del nombre en Inglés (cuenta doble)', 'Shoot leading note by clicking or (PCs) typing its name<br>(Typing yields twice as much!)');
		instance.gKey=$str('Sol', 'So');
		instance.bKey=$str('Si', 'Ti');
		instance.descriptionLabel=$str('Descripción', 'Description (very brief)');// (breve resumen)
		instance.rangeLabel=$str('Rango', 'Range');
		instance.recordLabel=$str('Su récord', 'Your record');
		instance.scoreLabel=$str('Puntuación', 'Score');
		instance.statusLabel=$str('Estado', 'Status');
		instance.rangeFull=$str('Todo', 'Full');
		instance.rangeHigh=$str('Alto', 'High');
		instance.rangeCenter=$str('Centro', 'Center');
		instance.rangeLow=$str('Bajo', 'Low');
		instance.statusSessionOver=$str('Sesión terminada', 'Session over');
		instance.statusSessionLost=$str(`Ha perdido`, `You've lost`);
		instance.statusSessionEnded=$str('Sesión terminada', 'Session over');
		instance.statusPaused=$str('Sesión suspendida', 'Session suspended');
		instance.buttonStartLabel=$str('Jugar', 'Play');
		instance.buttonPauseLabel=$str('Suspender', 'Pause');
		instance.buttonResumeLabel=$str('Reanudar', 'Resume');
		instance.buttonEndSessionLabel=$str('Terminar sesión', 'End session');
		instance.buttonResetLabel=$str('Reiniciar', 'Reset');
		instance.buttonClearRecordLabel=$str('Borrar récord', 'Erase record');
		instance.descriptionContentHTML=$str(`<li>Notas eliminadas acreditan en puntos el número del compás de eliminación, escapadas quitan 25.</li>
											<li>Errores cuestan inversamente (seis, menos el número de compás).</li>
											<li>Cada nivel incrementa velocidad y frecuencia de lanzamiento, y el nivel cinco oculta sus nombres.</li>
											<li>Pausas quitan 25 puntos. Puntuación negativa termina la sessión.</li>`,
											`<li>Deleted notes score as many points as its deletion bar's number. Escaped ones subtract 25.</li>
											<li>Mistakes subtract inversely (six, minus the bar number).</li>
											<li>Each level increases speed and launch frecuency, and level five hides note names.</li>
											<li>Pauses subtract 25 points. Negative score ends the session.</li>`);
		return instance;
	})();
	const level=(function getLevels(){
		const zero=$str('Demo', 'Demo');
		const one=$str('Nivel uno', 'Level 1');
		const two=$str('Nivel dos', 'Level 2');
		const three=$str('Nivel tres', 'Level 3');
		const four=$str('Nivel cuatro', 'Level 4');
		const five=$str('Nivel 5', 'Level 5');
		const six=$str('Nivel 6', 'Level 6');
		const seven=$str('Nivel 7', 'Level 7');
		const eight=$str('Nivel 8', 'Level 8');
		const nine=$str('Nivel 9', 'Level 9');
		const ten=$str('Nivel 10', 'Level 10');
		const instance=[];
		let step=1.358;
		instance[0]=new Level(3000, 34, 1, true, 0, 0, zero);
		instance[1]=new Level(3000, 16.7, step*=1.1, true, 0, 99, one);
		instance[2]=new Level(2500, 16.7, step*=1.1, true, 100, 199, two);
		instance[3]=new Level(2000, 16.7, step*=1.1, true, 200, 299, three);
		instance[4]=new Level(3000, 16.7, step*=1.1, true, 300, 499, four);
		instance[5]=new Level(2500, 16.7, step*=1.1, false, 500, 599, five);
		instance[6]=new Level(2000, 16.7, step*=1.1, false, 600, 699, six);
		instance[7]=new Level(1875, 16.7, step*=1.1, false, 700, 799, seven);
		instance[8]=new Level(1750, 16.7, step*=1.1, false, 800, 899, eight);
		instance[9]=new Level(1625, 16.7, step*=1.1, false, 900, 999, nine);
		instance[10]=new Level(1500, 16.7, step*=1.1, false, 1000, Infinity, ten);
		function Level(launchPeriod, framePeriod, frameStep, showNames, min, max, statusText){
			this.launchPeriod=launchPeriod;
			this.framePeriod=framePeriod;
			this.frameStep=frameStep;
			this.showNames=showNames;
			this.min=min;
			this.max=max;
			this.statusText=statusText;
		};
		return instance;
	})();
	const Status=(function(){
		const instance={};
		instance.EXHIBIT=1;
		instance.SESSION_ON=2;
		instance.PAUSED=3;
		instance.SESSION_OVER=4;
		instance.OUT_OF_FOCUS=5;
		return instance;
	})();
	const Range=(function(){
		const instance={};
		function Range(min, max){
			this.min=min;
			this.max=max;
		};
		instance.HIGH=new Range(0, 8);
		instance.CENTER=new Range(5, 13);
		instance.LOW=new Range(10, 18);
		instance.FULL=new Range(0, 18);
		return instance;
	})();
	const getAC=function(){
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
	const canvas=$('canvas');
	const clef=canvas.getAttribute('data-clef');
	canvas.style.backgroundImage='url("/images/noteHunter952x324'+clef+'.svg")';
	try{
		ctx=canvas.getContext("2d", {alpha:'false'});
		ctx.lineWidth=2;
		ctx.lineCap='round';
		ctx.strokeStyle=ctx.fillStyle='black';
	}catch{
		alert("Sorry, no canvas here");
	}
	ctx.font='22px serif';
	$('noteButtonsLabel').innerHTML=text.noteButtonTxt;
	$('G').textContent=text.gKey+' / G';
	$('B').textContent=text.bKey+' / B';
	$('descriptionLabel').textContent=text.descriptionLabel;
	$('descriptionContent').innerHTML=text.descriptionContentHTML;
	$('rangeLabel').textContent=text.rangeLabel;
	$('rangeAll').textContent=text.rangeFull;
	$('rangeHigh').textContent=text.rangeHigh;
	$('rangeCenter').textContent=text.rangeCenter;
	$('rangeLow').textContent=text.rangeLow;
	$('scoreLabel').textContent=text.scoreLabel;
	$('recordLabel').textContent=text.recordLabel;
	$('statusLabel').textContent=text.statusLabel;
	const scoreContent=$('scoreContent');
	const recordContent=$('recordContent');
	const statusContent=$('statusContent');
	const noteButtons=[];
	noteButtons.push($("C"));
	noteButtons.push($("D"));
	noteButtons.push($("E"));
	noteButtons.push($("F"));
	noteButtons.push($("G"));
	noteButtons.push($("A"));;
	noteButtons.push($("B"));
	noteButtons.forEach(button => button.addEventListener('click', shoot, false));
	const buttonPlayPause=$("playPause");
	buttonPlayPause.addEventListener('click', playPause, false);
	const buttonEndReset=$("endReset");
	buttonEndReset.addEventListener('click', endReset, false);
	const buttonClearRecord=$("clearRecord");
	buttonClearRecord.textContent=text.buttonClearRecordLabel;
	buttonClearRecord.addEventListener('click', clearRecord, false);
	const rangeForm=$('rangeForm');
	rangeForm.addEventListener('change', changeRange, false);
	function playPause(){
		switch(currentStatus){
			case Status.EXHIBIT:
				setStatus(Status.SESSION_ON);
				break;
			case Status.SESSION_ON:
				setStatus(Status.PAUSED);
				break;
			case Status.PAUSED:
				setStatus(Status.SESSION_ON);
				break;
			default:
				throw new Error('Start/Stop button should be disabled!');
		}
	};
	function endReset(){
		switch(currentStatus){
			case Status.PAUSED:
				setStatus(Status.SESSION_OVER);
				break;
			case Status.SESSION_OVER:
				setStatus(Status.EXHIBIT);
				break;
			default:
				throw new Error('End/Reset button should be disabled!');
		}
	};
	function clearRecord(){
		if(localStorage.getItem('noteHunterRecord-'+clef)){
			localStorage.removeItem('noteHunterRecord-'+clef);
			recordContent.textContent='0000';
			buttonClearRecord.setAttribute('disabled', '');
		}
	};
	function focusedBack(){
		setStatus(blurSavedStatus);
	};
	function setStatus(newStatus){
		switch (newStatus){
			case Status.EXHIBIT:
				if(currentStatus!==Status.OUT_OF_FOCUS){
					clear();
					notePool.length=0;
				}
				if(!getRecord()){
					buttonClearRecord.setAttribute('disabled', '');
				}
				toggleShooting(false);
				buttonPlayPause.removeAttribute('disabled');
				buttonPlayPause.textContent=text.buttonStartLabel;
				buttonEndReset.setAttribute('disabled', '');
				buttonEndReset.textContent=text.buttonEndSessionLabel;
				toggleRangeForm(true);
				currentLevel=level[0];
				currentScore=0;
				scoreContent.textContent='0000';
				statusContent.textContent=currentLevel.statusText;
				recordContent.textContent=getRecord()?getRecord():'0000';
				start();
				break;
			case Status.SESSION_ON:
				switch(currentStatus){
					case Status.EXHIBIT:
						stop();
						buttonEndReset.setAttribute('disabled', '');
						buttonClearRecord.setAttribute('disabled', '');
						scoreContent.textContent=currentScore;
						notePool.length=0;
						clear();
						currentLevel=level[1];
						break;
					case Status.PAUSED:
						start();
						break;
					case Status.OUT_OF_FOCUS:
						start();
						break;
				}
				toggleRangeForm(false);
				toggleShooting(true);
				buttonPlayPause.textContent=text.buttonPauseLabel;
				statusContent.textContent=currentLevel.statusText;
				start();
				break;
			case Status.PAUSED:
				stop();
				toggleShooting(false);
				updateScore(-25);
				if(currentScore<0){
					return;
				}
				buttonEndReset.removeAttribute('disabled');
				buttonPlayPause.textContent=text.buttonResumeLabel;
				statusContent.textContent=text.statusPaused;
				break;
			case Status.SESSION_OVER:
				stop();
				toggleShooting(false);
				buttonPlayPause.setAttribute('disabled', '');
				buttonEndReset.removeAttribute('disabled');
				buttonClearRecord.removeAttribute('disabled');
				buttonEndReset.textContent=text.buttonResetLabel;
				switch(currentStatus){
					case Status.SESSION_ON:
						statusContent.innerHTML=text.statusSessionLost;
						break;
					case Status.PAUSED:
						statusContent.innerHTML=text.statusSessionEnded;
						if((currentScore+=25)>getRecord()){
							setRecord(recordContent.textContent=scoreContent.textContent=currentScore);
							if(buttonClearRecord.disabled){
								buttonClearRecord.removeAttribute('disabled');
							}
						}
						break;
					case Status.OUT_OF_FOCUS:
						break;
					default:
						throw new Error('Unexpected previous status for session over!!');
				}
				break;
			case Status.OUT_OF_FOCUS:
				blurSavedStatus=currentStatus;
				switch(currentStatus){
					case Status.EXHIBIT:
						stop();
						break;
					case Status.SESSION_ON:
						stop();
						updateScore(-25);
						break;
					case Status.PAUSED:
						break;
					case Status.SESSION_OVER:
						break;
					default:
						throw new Error('Where did we get out of focus from?');
				}
				break;
			default:
				throw new Error('What\'s this '+newStatus+'?');
		}
		currentStatus=newStatus;
	}
	function updateFrame(){
		clear();
		if(currentStatus===Status.SESSION_ON&&notePool.length>0){
			toggleShooting(true);
		}else{
			toggleShooting(false);
		}
		if(notePool.length<1){
			return;
		}
		if((notePool[0]).x<=leftPadding+Note.size){
			if(currentStatus===Status.SESSION_ON){
				updateScore(-25);
				playPitch(notePool[0].vertPos, true);
			}
			notePool.shift();
		}
		for(let i=0; i<notePool.length; i++){
			notePool[i].x-=currentLevel.frameStep;
			notePool[i].draw();
		}
	};
	function shoot(e){
		let hitValue;
		if(e.currentTarget){
			if(e.currentTarget.id===notePool[0].id){
				hitValue=notePool[0].getValue(true);
			}else{
				hitValue=notePool[0].getValue(false);
			}
		}
		if(e.key){
			if(e.key.toUpperCase()===notePool[0].id){
				hitValue=notePool[0].getValue(true)*2;
			}else{
				hitValue=notePool[0].getValue(false);
			}
		}
		if(hitValue>0){
			playPitch(notePool[0].vertPos, false);
			notePool.shift();
		}else{
			playWrong();
		}
		updateScore(hitValue);
	};
	function changeRange(e){
		clear();
		notePool.length=0;
		currentRange=Range[e.currentTarget.range.value.toUpperCase()];
	};
	function updateScore(value){
		scoreContent.textContent=(currentScore+=value);
		if(currentScore<0){
			setStatus(Status.SESSION_OVER);
			return;
		}
		let dueLevelIndex=Math.floor(currentScore/100)+1;
		if(level.indexOf(currentLevel)!==dueLevelIndex){
			if(dueLevelIndex<=10)
			currentLevel=level[dueLevelIndex];
		}
		statusContent.textContent=currentLevel.statusText;
	};
	function start(){
		if(running){
			return;
		}
		running=true;
		launchTimer=setTimeout(launch, currentLevel.launchPeriod);
		frameTimer=setTimeout(update, currentLevel.framePeriod);
		function launch(){
			if(!running){return;}
			Note.launch();
			launchTimer=setTimeout(launch, currentLevel.launchPeriod);
		};
		function update(){
			if(!running){return;}
			updateFrame();
			frameTimer=setTimeout(update, currentLevel.framePeriod);};
	};
	function stop(){
		running=false;
		clearTimeout(launchTimer);
		clearTimeout(frameTimer);
	};
	function playPitch(noteVertPos, full){
		let ac=getAC();
		let freq=oscParam[pitches[noteVertPos][clef]][0];
		let gainValue=oscParam[pitches[noteVertPos][clef]][1];
		let	wave=ac.createPeriodicWave(real, imag, {disableNormalization: true});
		let duration=full?1:0.5;
		let osc=ac.createOscillator();
		osc.setPeriodicWave(wave);
		osc.frequency.value=freq;
		let gain=ac.createGain();
		gain.gain.setValueAtTime(0, ac.currentTime);
		gain.gain.linearRampToValueAtTime(gainValue, ac.currentTime+0.03);
		gain.gain.linearRampToValueAtTime(gainValue, ac.currentTime+duration-0.05);
		gain.gain.linearRampToValueAtTime(0.0, ac.currentTime+duration);
		osc.connect(gain);
		gain.connect(ac.destination);
		osc.start(ac.currentTime);
		osc.stop(ac.currentTime+duration);
		setTimeout(duration, function(){ac.close(); ac=undefined;});
	};
	function playWrong(){
		let ac=getAC();
		let duration=0.3;
		let osc=ac.createOscillator();
		osc.frequency.value=100;
		osc.type='square';
		let gain=ac.createGain();
		gain.gain.value=0.03;
		osc.connect(gain);
		gain.connect(ac.destination);
		osc.start(ac.currentTime);
		osc.stop(ac.currentTime+duration);
		setTimeout(duration, function(){ac.close(); ac=undefined;});
	}
	function clear(){
		ctx.clearRect(130, 0, canvas.width-130, canvas.height);
	};
	function toggleShooting(enable){
		if(enable){
			noteButtons.forEach(button => button.removeAttribute('disabled'));
			window.addEventListener('keydown', shoot, false);
		}else{
			noteButtons.forEach(button => button.setAttribute('disabled', ''));
			window.removeEventListener('keydown', shoot);
		}
	}
	function toggleRangeForm(enable){
		for(const e of rangeForm.elements){
			if(enable){
				e.removeAttribute('disabled');
			}else{
				e.setAttribute('disabled', '');
			}
		}
	};
	function getRecord(){
		return parseInt(localStorage.getItem('noteHunterRecord-'+clef))||0;
	}
	function setRecord(newRecord){
		if(localStorage){
			localStorage.setItem('noteHunterRecord-'+clef, newRecord);
		}
	}
	function Note(){
		this.vertPos=Math.floor(Math.random() * (currentRange.max - currentRange.min + 1)) + currentRange.min;//random(currentRange.min, currentRange.max)
		this.y=(this.vertPos+1)*vertStep+2;
		this.x=canvas.width+Note.size/2;
		this.name=namePool[this.vertPos][clef==='treble'?0:1][lang==='es'?0:1];//
		this.id=idPool[this.vertPos][clef==='treble'?0:1];
		this.draw();
	};
	Note.size=20;
	Note.stemHeight=58;
	Note.launch=function(){
		notePool.push(new Note());
	};
	Note.prototype.draw = function() {
		const height=20;
		ctx.translate(this.x, this.y);
		if(ledgerPool[this.vertPos]){
			ledgerPool[this.vertPos].draw(0, 0);
		}
		ctx.strokeStyle=colorDark;
		ctx.lineWidth=3;
		ctx.beginPath();
		ctx.moveTo(this.vertPos<9?-Note.size:Note.size, 0);
		ctx.lineTo(this.vertPos<9?-Note.size:Note.size, this.vertPos<9?Note.stemHeight:-Note.stemHeight);
		ctx.stroke();
		ctx.lineWidth=2;
		ctx.rotate(-(Math.PI / 180) * 20);
		ctx.scale(1, 0.7);
		ctx.beginPath();
		let gradient=ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
		gradient.addColorStop(0, colorLight);
		gradient.addColorStop(1, colorDark);
		ctx.fillStyle=gradient;
		ctx.strokeStyle=colorDark;
		ctx.arc(0, 0, Note.size, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.scale(1, 1/0.7);
		ctx.rotate((Math.PI / 180) * 20);
		if(currentLevel.showNames){
			let temp=ctx.fillStyle;
			ctx.fillStyle='white';
			let text=ctx.measureText(this.name);
			ctx.fillText(this.name, -text.width/2, 7);
			ctx.fillStyle=temp;
		}
		ctx.translate(-this.x, -this.y);
	};
	Note.prototype.getValue=function(hit){
		let hitScore=5-Math.floor((canvas.width-this.x)/160);
		if(hit){
			return hitScore;
		}else{
			return -6+hitScore;
		}
	};
	const Sound=(function(){
		const instance={};
		instance.HIT;
		instance.MISSED;
		instance.ESCAPED;
		instance.PAUSE;
		instance.LOST;
		return instance;
	})();
	const Clef=(function(){
		const instance={};
		instance.TREBLE;
		instance.BASS;
		return instance;
	})();
	const LedgerGroup=(function(){
		const instance={};
		function LedgerGroup(above3, above2, above1, center, below1, below2, below3){
			this.above3=above3;
			this.above2=above2;
			this.above1=above1;
			this.center=center;
			this.below1=below1;
			this.below2=below2;
			this.below3=below3;
		};
		const xDev=34;
		LedgerGroup.prototype.draw=function(){
			if(this.above3){
				ctx.beginPath();
				ctx.moveTo(-xDev, -3*vertStep);
				ctx.lineTo(xDev, -3*vertStep);
				ctx.stroke();
			}
			if(this.above2){
				ctx.beginPath();
				ctx.moveTo(-xDev, -2*vertStep);
				ctx.lineTo(xDev, -2*vertStep);
				ctx.stroke();
			}
			if(this.above1){
				ctx.beginPath();
				ctx.moveTo(-xDev, -vertStep);
				ctx.lineTo(xDev, -vertStep);
				ctx.stroke();
			}
			if(this.center){
				ctx.beginPath();
				ctx.moveTo(-xDev, 0);
				ctx.lineTo(xDev, 0);
				ctx.stroke();
			}
			if(this.below1){
				ctx.beginPath();
				ctx.moveTo(-xDev, vertStep);
				ctx.lineTo(xDev, vertStep);
				ctx.stroke();
			}
			if(this.below2){
				ctx.beginPath();
				ctx.moveTo(-xDev, 2*vertStep);
				ctx.lineTo(xDev, 2*vertStep);
				ctx.stroke();
			}
			if(this.below3){
				ctx.beginPath();
				ctx.moveTo(-xDev, 3*vertStep);
				ctx.lineTo(xDev, 3*vertStep);
				ctx.stroke();
			}
		};
		instance.ABOVE_DUAL=new LedgerGroup(true, false, true, false, false, false, false);
		instance.CENTER_AND_ABOVE=new LedgerGroup(false, true, false, true, false, false, false);
		instance.ABOVE_SINGLE=new LedgerGroup(false, false, true, false, false, false, false);
		instance.CENTER=new LedgerGroup(false, false, false, true, false, false, false);
		instance.BELOW_SINGLE=new LedgerGroup(false, false, false, false, true, false, false);
		instance.CENTER_AND_BELOW=new LedgerGroup(false, false, false, true, false, true, false);
		instance.BELOW_DUAL=new LedgerGroup(false, false, false, false, true, false, true);
		return instance;
	})();
	const ledgerPool=[];
	ledgerPool[0]=LedgerGroup.BELOW_DUAL;
	ledgerPool[1]=LedgerGroup.CENTER_AND_BELOW;
	ledgerPool[2]=LedgerGroup.BELOW_SINGLE;
	ledgerPool[3]=LedgerGroup.CENTER;
	ledgerPool[15]=LedgerGroup.CENTER;
	ledgerPool[16]=LedgerGroup.ABOVE_SINGLE;
	ledgerPool[17]=LedgerGroup.CENTER_AND_ABOVE;
	ledgerPool[18]=LedgerGroup.ABOVE_DUAL;
	const namePool=[]; /***** [[treble-es, treble-en], [bass-es, bass-en]] *****/
	namePool[0]=namePool[7]=namePool[14]=[['Re', 'Re'], ['Fa', 'Fa']];
	namePool[1]=namePool[8]=namePool[15]=[['Do', 'Do'], ['Mi', 'Mi']];
	namePool[2]=namePool[9]=namePool[16]=[['Si', 'Ti'], ['Re', 'Re']];
	namePool[3]=namePool[10]=namePool[17]=[['La', 'La'], ['Do', 'Do']];
	namePool[4]=namePool[11]=namePool[18]=[['Sol', 'So'], ['Si', 'Ti']];
	namePool[5]=namePool[12]=[['Fa', 'Fa'], ['La', 'La']];
	namePool[6]=namePool[13]=[['Mi', 'Mi'], ['Sol', 'So']];
	const idPool=[];
	idPool[0]=idPool[7]=idPool[14]=['D', 'F'];
	idPool[1]=idPool[8]=idPool[15]=['C', 'E'];
	idPool[2]=idPool[9]=idPool[16]=['B', 'D'];
	idPool[3]=idPool[10]=idPool[17]=['A', 'C'];
	idPool[4]=idPool[11]=idPool[18]=['G', 'B'];
	idPool[5]=idPool[12]=['F', 'A'];
	idPool[6]=idPool[13]=['E', 'G'];
	const pitches=[];
	pitches[18]={'treble':12, 'bass':7}
	pitches[17]={'treble':13, 'bass':8}
	pitches[16]={'treble':14, 'bass':9}
	pitches[15]={'treble':15, 'bass':10}
	pitches[14]={'treble':16, 'bass':11}
	pitches[13]={'treble':17, 'bass':12}
	pitches[12]={'treble':18, 'bass':13}
	pitches[11]={'treble':19, 'bass':14}
	pitches[10]={'treble':20, 'bass':15}
	pitches[9]={'treble':21, 'bass':16}
	pitches[8]={'treble':22, 'bass':17}
	pitches[7]={'treble':23, 'bass':18}
	pitches[6]={'treble':24, 'bass':19}
	pitches[5]={'treble':25, 'bass':20}
	pitches[4]={'treble':26, 'bass':21}
	pitches[3]={'treble':27, 'bass':22}
	pitches[2]={'treble':28, 'bass':23}
	pitches[1]={'treble':29, 'bass':24}
	pitches[0]={'treble':30, 'bass':25}
	const oscParam=[];
	oscParam[7]=[123.47, 0.8074074074074074];
	oscParam[8]=[130.81, 0.7925925925925925];
	oscParam[9]=[146.83, 0.762962962962963];
	oscParam[10]=[164.81, 0.7333333333333334];
	oscParam[11]=[174.61, 0.7185185185185186];
	oscParam[12]=[196, 0.6888888888888889];
	oscParam[13]=[220, 0.6592592592592592];
	oscParam[14]=[246.94, 0.6296296296296295];
	oscParam[15]=[261.63, 0.6148148148148148];
	oscParam[16]=[293.66, 0.5851851851851851];
	oscParam[17]=[329.63, 0.5555555555555556];
	oscParam[18]=[349.23, 0.5407407407407407];
	oscParam[19]=[392, 0.5111111111111111];
	oscParam[20]=[440, 0.4814814814814815];
	oscParam[21]=[493.88, 0.45185185185185184];
	oscParam[22]=[523.25, 0.437037037037037];
	oscParam[23]=[587.33, 0.40740740740740744];
	oscParam[24]=[659.26, 0.37777777777777777];
	oscParam[25]=[698.46, 0.36296296296296293];
	oscParam[26]=[783.99, 0.33333333333333326];
	oscParam[27]=[880, 0.3037037037037037];
	oscParam[28]=[987.77, 0.274074074074074];
	oscParam[29]=[1046.5, 0.2592592592592592];
	oscParam[30]=[1174.66, 0.22962962962962963];
	const real=new Float32Array(13), imag=new Float32Array(real.length);
	{real[0]=0; real[1]=0.0566; real[2]=0.0816; real[3]=0.0327; real[4]=0.0314; real[5]=0.0138; real[6]=0.0021;
	real[7]=0.0025; real[8]=0.0028; real[9]=0.0001; real[10]=0.0008; real[11]=0.0; real[12]=0.0002;};
	window.addEventListener('blur', function(){setStatus(Status.OUT_OF_FOCUS);}, false);
	window.addEventListener('focus', focusedBack, false);
	const currentRange=Range.FULL;
	setStatus(Status.EXHIBIT);
})();