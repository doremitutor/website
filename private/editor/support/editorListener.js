const listener=(function(){
	let octave, alteration, basicRhythm, modifier, linked, grouped;
	const instance={};
	instance.onKeyDown=function(e){
		switch(e.code){
			case 'Digit1': setCurrentOctave(1); break;
			case 'Digit2': setCurrentOctave(2); break;
			case 'Digit3': setCurrentOctave(3); break;
			case 'Digit4': setCurrentOctave(4); break;
			case 'Digit5': setCurrentOctave(5); break;
			case 'Digit6': setCurrentOctave(6); break;
			case 'Numpad1': toggleFermata(); break;
			case 'Numpad2': setBasicRhythm('SIXTEENTH'); break;
			case 'Numpad3': setBasicRhythm('EIGHTH'); break;
			case 'Numpad4': setBasicRhythm('QUARTER'); break;
			case 'Numpad5': setBasicRhythm('HALF'); break;
			case 'Numpad6': setBasicRhythm('WHOLE'); break;
			case 'Numpad7': toggleAlteration('SHARP'); break;
			case 'Numpad8': toggleAlteration('FLAT'); break;
			case 'Numpad9': toggleAlteration('NATURAL'); break;
			case 'Numpad0': tryRest(); break;
			case 'NumpadDecimal': toggleModifier(!e.ctrlKey&&!e.altKey?'DOT':!e.ctrlKey&&e.altKey?'TRIPPLET':'DOUBLE_DOT'); break;
			case 'NumpadEnter': if(e.ctrlKey){toggleGrouped();}else{toggleLinked();}; break;
			case 'KeyA': tryNote('A'); break;
			case 'KeyB': tryNote('B'); break;
			case 'KeyC': tryNote('C'); break;
			case 'KeyD': tryNote('D'); break;
			case 'KeyE': tryNote('E'); break;
			case 'KeyF': tryNote('F'); break;
			case 'KeyG': tryNote('G'); break;
			case 'KeyO': iterator.moveBar(true); break;
			case 'KeyL': iterator.moveBar(); break;
			case 'KeyU': loader.octaveTranspose(true); break;
			case 'KeyJ': loader.octaveTranspose(false); break;
			case 'ArrowLeft': iterator.goPrevious(e.ctrlKey); break;
			case 'ArrowRight': iterator.goNext(e.ctrlKey); break;
			case 'Insert': iterator.insertBar(); break;
			case 'Delete': iterator.deleteBar(); break;
			case 'Home': goHome(); break;
			case 'End': iterator.goToEnd(); break;
		}
	};
	instance.initialize=function (reset){
		if(reset){
			document.getElementById('OCTAVE').textContent='UNDEFINED';
			octave=undefined;
		}else{
			document.getElementById('OCTAVE').textContent=octave=Clef[loader.getClef()]===Clef.TREBLE?4:3;
		}
		basicRhythm='QUARTER';
		modifier='NONE';
		alteration='NONE';
		linked=false;
		grouped=false;
	};
	function setCurrentOctave(oct){
		document.getElementById('OCTAVE').textContent=octave=oct;
	};
	function setBasicRhythm(key){
		document.getElementById('RHYTHM').textContent=(basicRhythm=key);//
	};
	function toggleAlteration(key){
		switch(key){
			case 'SHARP':
				if(alteration!=='SHARP'){
					clearIndicator();
					alteration='SHARP';
				}else{
					alteration='NONE';
				}
				document.getElementById('SHARP').style.backgroundColor=(alteration==='SHARP')?'red':'yellow';
				break;
			case 'FLAT':
				if(alteration!=='FLAT'){
					clearAlterationIndicator();
					alteration='FLAT';
				}else{
					alteration='NONE';
				}
				document.getElementById('FLAT').style.backgroundColor=(alteration==='FLAT')?'red':'yellow';
				break;
			case 'NATURAL':
				if(alteration!=='NATURAL'){
					clearAlterationIndicator()
					alteration='NATURAL';
				}else{
					alteration='NONE';
				}
				document.getElementById('NATURAL').style.backgroundColor=(alteration==='NATURAL')?'red':'yellow';
				break;
			default:
				break;
		};
		function clearIndicator(){
			if(alteration!=='NONE'){
				document.getElementById(alteration.name).style.backgroundColor='yellow';
			}
		};
	};
	function toggleModifier(key){
		switch(key){
			case 'DOT':
				if(modifier!=='DOT'){
					clearIndicator();
					modifier='DOT';
				}else{
					modifier='NONE';
				}
				document.getElementById('DOT').style.backgroundColor=(modifier==='DOT')?'red':'yellow';
				break;
			case 'DOUBLE_DOT':
				if(modifier!=='DOUBLE_DOT'){
					clearIndicator();
					modifier='DOUBLE_DOT';
				}else{
					modifier='NONE';
				}
				document.getElementById('DOUBLE_DOT').style.backgroundColor=(modifier==='DOUBLE_DOT')?'red':'yellow';
				break;
			case 'TRIPPLET':
				if(modifier!=='TRIPPLET'){
					clearIndicator();
					modifier='TRIPPLET';
				}else{
					modifier='NONE';
				}
				document.getElementById('TRIPPLET').style.backgroundColor=(modifier==='TRIPPLET')?'red':'yellow';
				break;
			default:
				break;
		};
		function clearIndicator(){
			if(modifier!=='NONE'){
				document.getElementById(Modifier[modifier].name).style.backgroundColor='yellow';
			}
		};
	};
	function toggleGrouped(){
		document.getElementById('GROUPED').style.backgroundColor=(grouped=!grouped)?'red':'yellow';
	};
	function toggleLinked(){
		document.getElementById('LINKED').style.backgroundColor=(linked=!linked)?'red':'yellow';
	};
	function toggleFermata(){ //futuristic
		console.log('Fermata');
	}
	function tryNote(classKey){
		let pitchValueIndexInScale=null;
		let tonalIndexInScale;
		let scale=KeySignature[loader.getKey()].scale;
		for(let i=0; i<scale.length; i++){
			if(scale[i].octave===octave&&scale[i].classKey===classKey){
				pitchValueIndexInScale=i;
			}
		}
		if(pitchValueIndexInScale===null){
			throw new Error('Pitch not found in scale');
		}else{
			tonalIndexInScale=pitchValueIndexInScale-KeySignature[loader.getKey()].firstTonicIndex;
		}
		iterator.applyFigure(defineRhythm(), tonalIndexInScale, alteration, linked);
	};
	function tryRest(){
		iterator.applyFigure(defineRhythm(), null);
	};
	function defineRhythm(){
		switch(basicRhythm){
			case 'WHOLE':
				return 'WHOLE';
				break;
			case 'HALF':
				if(modifier==='DOT'){
					return 'HALF_DOT';
				}else if(modifier==='DOUBLE_DOT'){
					return 'HALF_D_DOT';
				}else{
					return 'HALF';
				}
				break; //unreachable, I know
			case 'QUARTER':
				if(modifier==='DOT'){
					return 'QUARTER_DOT';
				}else if(modifier==='DOUBLE_DOT'){
					return 'QUARTER_D_DOT';
				}else if(modifier==='TRIPPLET'){
					return 'QUARTER_TRIPPLET';
				}else{
					return 'QUARTER';
				}
				break; //unreachable, I know
			case 'EIGHTH':
				if(modifier==='DOT'){
					return 'EIGHTH_DOT';
				}else if(modifier==='TRIPPLET'){
					return 'EIGHTH_TRIPPLET';
				}else{
					return 'EIGHTH';
				}
				break; //unreachable, I know
			case 'SIXTEENTH':
				return 'SIXTEENTH';
				break; //unreachable, I know
			default:
				throw new Error('Invalid basic rhythm');
		}
	};
	return instance;
})();