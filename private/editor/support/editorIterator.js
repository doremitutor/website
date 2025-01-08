const iterator=(function(){
	const height=staffHeight+14;
	let staffIndex=null;
	let barIndexInStaff=null;
	let figureIndexInBar=null;
	let x, y;
	function show(){
		x=getX();
		y=getY();
		paths.tempFillStyle('red');
		loader.getCtx().fillRect(x, y, 3, height);
		paths.tempFillStyle();
	};
	function clear(){
		if(x!==undefined&&y!==undefined){
			loader.getCtx().clearRect(x-1, y-1, 5, height+2);
		}
	};
	function getStaff(){return Staff.staves[staffIndex];};
	function getBar(){return getStaff().bars[barIndexInStaff];};
	function getFigure(){return getBar().figures[figureIndexInBar];};
	function getX(){return figureIndexInBar!==null?getFigure().getX()-5:canvas.width-BarLine.FINAL.width-5;};
	function getY(){return getStaff().getY()+5};
	function getTickPosition(){
		let tickPosition=0;
		if(figureIndexInBar!==null){
			let figures=getBar().figures;
			for(let i=0; i<figures.indexOf(getFigure());i++){
				tickPosition+=figures[i].getTicksSpan();
			}
		}else{
			tickPosition=loader.getTime().barDuration;
		}
		return tickPosition;
	};
	function getTicksRemainingInBar(){return TimeSignature[loader.getTime()].barDuration-getTickPosition();};
	const instance={};
	instance.reset=function(){
		clear();
		staffIndex=null;
		barIndexInStaff=null;
		figureIndexInBar=null;
		x=y=undefined;
	};
	instance.goPrevious=function(byBar){
		clear();
		if(figureIndexInBar===null){
			staffIndex=Staff.staves.length-1;
			barIndexIStaff=getStaff().bars.length-1;
			figureIndexInBar=getBar().figures.length-1;
			show();
			return;
		};
		if(!byBar){
			if(!getFigure().isFirstInBar()){
				figureIndexInBar--
			}else{
				if(!getBar().isFirstInStaff()){
					barIndexInStaff--;
					figureIndexInBar=getStaff().bars[barIndexInStaff].figures.length-1;
				}else{
					if(!getStaff().isFirst()){
						staffIndex--;
						barIndexInStaff=getStaff().bars.length-1;
					}else{
						alert('This is the beggining of the score\n-You\'d better create a new bar-');
					}
				}
			}
		}else{
			if(!getBar().isFirstInStaff()){
				barIndexInStaff--;
			}else{
				if(!getStaff().isFirst()){
					staffIndex--;
					barIndexInStaff=getStaff().bars.length-1;
				}else{
					alert('You have arrived at the beggining of the score\n-You\'d better create a new bar-');
				}
			}
			figureIndexInBar=0;
		}
		show();
	};
	instance.goNext=function(byBar, postInsert=false){
		if(figureIndexInBar===null){
			alert('This is the end of the score\n-You\'d better create a new bar-');
			return;
		}
		if(!byBar){
			if(!postInsert){
				clear();
			};
			if(!getFigure().isLastInBar()){
				figureIndexInBar++;
			}else{
				if(!getBar().isLastInStaff()){
					barIndexInStaff++;
					figureIndexInBar=0;
				}else{
					if(!getStaff().isLast()){
						staffIndex++;
						barIndexInStaff=0;
						figureIndexInBar=0;
					}else{
						figureIndexInBar=null;
					}
				}
			}
		}else{
			clear();
			if(!getBar().isLastInStaff()){
				barIndexInStaff++;
			}else{
				if(!getStaff().isLast()){
					staffIndex++;
					barIndexInStaff=0;
				}else{
					figureIndexInBar=null;
					show();
					alert('You have arrived at the end of the score\n-You\'d better create a new bar-');
					return;
				}
			}
			figureIndexInBar=0;// all cases???
		}
		show();
	};
	instance.goToBeginning=function(){
		clear();
		staffIndex=0;
		barIndexInStaff=0;
		figureIndexInBar=0;
		show();
	};
	instance.goToEnd=function(){
		clear();
		staffIndex=Staff.staves.length-1;
		barIndexInStaff=getStaff().bars.length-1;;
		figureIndexInBar=null;
		show();
	};
	instance.applyFigure=function(rhythmValue, tonalIndexInScale, alteration, linked=false){
		let newFigure=getNewFigure(rhythmValue, tonalIndexInScale, alteration, linked);
		clear();
		if(figureIndexInBar===null){
			alert('Append a new bar with this starting figure');
			return;
		};
		let spanAvailableInFigure=getFigure().getTicksSpan();
		let spanRequired=RhythmValue[rhythmValue].tickSpan;
		let freeSpan;
		let figuresToDelete;
		let nextRests=[];
		if(spanRequired<spanAvailableInFigure){
			figuresToDelete=1;
			freeSpan=spanAvailableInFigure-spanRequired;
			nextRests=getNextRests(freeSpan);
			replaceAndRefill(figuresToDelete);
			rebuildStaffAndAdvance();
		}else if(spanRequired>spanAvailableInFigure){
			figuresToDelete=1;
			if(spanRequired<=getTicksRemainingInBar()){
				freeSpan=spanAvailableInFigure-spanRequired;
				let tempIndex=figureIndexInBar;
				let figures=getBar().figures;
				while(freeSpan<0){
					freeSpan+=figures[++tempIndex].getTicksSpan();
					figuresToDelete++;
				}
				if(freeSpan>0){
					nextRests=getNextRests(freeSpan);
				}
				replaceAndRefill(figuresToDelete);
				rebuildStaffAndAdvance();
			}else{
				alert('Not enough room in bar');
				show();
			}
		}else if(spanRequired===spanAvailableInFigure){
			figuresToDelete=1;
			replaceAndRefill(figuresToDelete);
			rebuildStaffAndAdvance();
		}
		function getNextRests(freeSpan){
			let rhythmValuesForNextRests=RhythmValue.getRestsArray(freeSpan);
			for(let i=0; i<rhythmValuesForNextRests.length; i++){
				nextRests.push(new Rest(getBar(), rhythmValuesForNextRests[i], null));
			}
			return nextRests;
		};
		function replaceAndRefill(figuresToDelete){
			getBar().figures.splice(figureIndexInBar, figuresToDelete, newFigure, ...nextRests);
		};
		function rebuildStaffAndAdvance(){
			Staff.redrawStaves();
			staffIndex=newFigure.getParentBar().getParentStaff().getIndex();
			barIndexInStaff=newFigure.getParentBar().getIndexInStaff();
			instance.goNext(false, true);
		}
		function getNewFigure(rhythmValue, tonalIndexInScale, alteration, linked){
			if(tonalIndexInScale!==null){
				return new Note(getBar(), rhythmValue, tonalIndexInScale, alteration, linked);
			}else{
				return new Rest(getBar(), rhythmValue);
			}
		};
	};
	instance.update=function(newStaffIndex, newBarIndex){
		staffIndex=newStaffIndex;
		barIndexInStaff=newBarIndex;
	};
	instance.insertBar=function(){
		loader.insertBar(staffIndex, barIndexInStaff);
		figureIndexInBar=0;
		show();
	}
	instance.deleteBar=function(){
		loader.deleteBar(staffIndex, barIndexInStaff);
		figureIndexInBar=0;
		show();
	}
	instance.moveBar=function(up=false){
		if(staffIndex===0&&up||staffIndex>=Staff.staves.length-1&&!up){
			alert('No staff '+(up?'above':'below'));
			return;
		}
		Staff.staves[staffIndex].transferBar(up);
		show();
	};
	instance.show=show;
	return instance;
})();