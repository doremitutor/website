const headerHeight=36, numOfStaves=4, barsPerNewStaff=4, barLeftPadding=15, barRightPadding=5, noteFont='bold 16px sans-serif';
function Staff(index){
	let y=headerHeight+staffHeight*index;
	let xOverHead=Clef.getWidth()+KeySignature[loader.getKey()].width+(index==0?TimeSignature.getWidth():0);
	this.bars=[];
	this.getIndex=function(){return index;};
	this.getY=function(){return y;};
	this.getXOverhead=function(){return xOverHead;};
}
Staff.staves=new Array(numOfStaves);
Staff.initializeStaves=function(fill){
	for(let i=0; i<numOfStaves; i++){
		Staff.staves[i]=fill?new Staff(i):null;
		if(fill){
			let startingX=Staff.staves[i].getXOverhead();
			for(let j=0; j<barsPerNewStaff; j++){
				Staff.staves[i].bars[j]=new Bar(Staff.staves[i]);
			}
		}
	}
	if(fill){
		Staff.staves[numOfStaves-1].bars[barsPerNewStaff-1].setBarLineType('FINAL');
		for(let i=0; i<numOfStaves; i++){
			Staff.staves[i].layOut();
		}
		iterator.goToBeginning();
	}else{
		loader.getCtx().clearRect(0, 0, 960, 540);
	}
};
Staff.loadLesson=function(lessonStaves){
	console.assert(lessonStaves.length===Staff.staves.length, 'Different number of staves!!');
	for(let i=0; i<lessonStaves.length; i++){
		let lessonStaff=lessonStaves[i];
		let staff=Staff.staves[i]=new Staff(i);
		for(let j=0; j<lessonStaff.bars.length; j++){
			let lessonBar=lessonStaff.bars[j];
			let bar=staff.bars[j]=new Bar(staff, lessonBar.barLineType, lessonBar.figures);
		}
	}
	Staff.redrawStaves();
	iterator.goToBeginning();
};
Staff.redrawStaves=function(){
	for(let i=0; i<Staff.staves.length; i++){
		let staff=Staff.staves[i];
		let x=staff.getXOverhead();
		loader.getCtx().clearRect(x, staff.getY(), canvas.width-x, staffHeight+36);
	}
	for(let i=0; i<Staff.staves.length; i++){
		Staff.staves[i].layOut();
	}
};
Staff.prototype.isFirst=function(){return this.getIndex()===0;};
Staff.prototype.isLast=function(){return this.getIndex()>=Staff.staves.length-1;};
Staff.prototype.getExpansionFactor=function(){
	let bars=this.bars, fixedWidth=0, expandableWidth=0;
	for(let i=0; i<bars.length; i++){
		fixedWidth+=bars[i].getFixedWidth();
		expandableWidth+=bars[i].getExpandableWidth();
	}
	let absoluteMinWidth=fixedWidth+expandableWidth;
	let vacancy=canvas.width-this.getXOverhead()-absoluteMinWidth;
	return (vacancy+expandableWidth)/expandableWidth;
};
Staff.prototype.layOut=function(){
	let bars=this.bars;
	let bar;
	let figure;
	let expansionFactor=this.getExpansionFactor();
	if(expansionFactor<1){
		if(!this.isLast()){
			this.transferBar(false);
			return;
		}else{
			alert('Last staff too crowded!!\nMake some correction');
		}
	}
	let tempX=this.getXOverhead();
	for(let i=0; i<bars.length; i++){
		bar=bars[i];
		bar.setX(tempX);
		tempX+=barLeftPadding;
		if(bar.figures[0].getRhythmValue()==='BAR'){
			let margin=Math.round(RhythmValue.BAR.minTrail*expansionFactor);
			bar.figures[0].setX(tempX+=margin);
			tempX+=(RhythmValue.BAR.restWidth+margin);
		}else{
			for(let j=0; j<bar.figures.length; j++){
				figure=bar.figures[j];
				figure.setX(tempX);
				let trail=Math.round(figure.getMinTrail()*expansionFactor);
				tempX+=(figure.getWidth()+trail);
			}
		}
		tempX+=barRightPadding;
		if(bar.isLastInScore()){
			bar.setBarLineX(canvas.width-11);
		}else if(bar.isLastInStaff()){
			bar.setBarLineX(canvas.width-1);
		}else{
			bar.setBarLineX(tempX);
			tempX+=bar.getBarLine().width;
		}
		bar.getBarLine().draw(bar.getBarLineX(), bar.getBarLineY());
	}
	for(let i=0; i<bars.length; i++){
		bar=bars[i];
		for(let j=0; j<bar.figures.length; j++){
			bar.figures[j].draw();
		}
	}
	for(let i=0; i<bars.length; i++){
		bar=bars[i];
		for(let j=0; j<bar.figures.length; j++){
			figure=bar.figures[j]
			if(figure instanceof Note)figure.drawName();
		}
	}
}
Staff.prototype.transferBar=function(upward){
	let indexFrom=this.getIndex();
	let transferredBar;
	let staffTo;
	if(upward&&indexFrom>0){
		transferredBar=this.bars.shift();
		staffTo=Staff.staves[this.getIndex()-1];
		staffTo.bars.push(transferredBar);
	}else if(!upward&&indexFrom<Staff.staves.length-1){
		transferredBar=this.bars.pop();
		staffTo=Staff.staves[this.getIndex()+1];
		staffTo.bars.unshift(transferredBar);
	}else{
		throw new Error('No staff to transfer bar to');
	}
	transferredBar.setParentStaff(staffTo);
	Staff.redrawStaves();
}
/**************************** End of Staff, Bar begins ****************************/
function Bar(parentStaff, barLineType='SINGLE', figures){
	this.barLineType=barLineType;
	let barLineX;
	let x;
	let isBreak=false;
	this.getParentStaff=function(){return parentStaff;}
	this.setParentStaff=function(newStaff){parentStaff=newStaff;}
	this.setBarLineType=function(newBarLineType){barLineType=newBarLineType;};
	this.getBarLineType=function(){return barLineType;};
	this.getBarLine=function(){return BarLine[this.getBarLineType()];};
	this.setBarLineX=function(x){barLineX=x};
	this.getBarLineX=function(){return barLineX;};
	this.getX=function(){return x;};
	this.setX=function(newX){x=newX;};
	this.isBreak=function(){return isBreak;};
	this.setBreak=function(){isBreak=true;};
	this.figures=[];
	if(!figures){
		this.figures[0]=new Rest(this, 'BAR');
	}else{
		for(let i=0; i<figures.length; i++){
			let figure=figures[i];
			if(figure.pitchIndex!==undefined){
				this.figures[i]=new Note(this, figure.rhythmValue, figure.pitchIndex);
			}else{
				this.figures[i]=new Rest(this, figure.rhythmValue);
			}
		}
	}
}
Bar.prototype.getY=function(){return this.getParentStaff().getY()};
Bar.prototype.getBarLineY=function(){return this.getY()+36;};
Bar.prototype.getIndexInStaff=function(){return this.getParentStaff().bars.indexOf(this);};
Bar.prototype.isFirstInStaff=function(){return this.getIndexInStaff()===0;};
Bar.prototype.isLastInStaff=function(){return this.getIndexInStaff()>=this.getParentStaff().bars.length-1;};
Bar.prototype.isFirstInScore=function(){return this.getParentStaff().isFirst()&&this.isFirstInStaff()};
Bar.prototype.isLastInScore=function(){return this.getParentStaff().isLast()&&this.isLastInStaff()};
Bar.prototype.getFixedWidth=function(){
	let fixedWidth=0;
	let figures=this.figures;
	let figure;
	for(let i=0; i<figures.length; i++){
		figure=figures[i];
		fixedWidth+=figure.getWidth();
	}
	fixedWidth+=(barLeftPadding+this.getBarLine().width+barRightPadding);
	return fixedWidth;
};
Bar.prototype.getExpandableWidth=function(){
	if(this.figures[0].getRhythmValue()==='BAR'){
		return RhythmValue.BAR.minTrail*2;
	}
	let expandableWidth=0;
	let figures=this.figures;
	for(let i=0; i<figures.length; i++){
		let figure=figures[i];
		if(figure instanceof Rest){
			expandableWidth+=figure.getMinTrail();
		}else{
			expandableWidth+=figures[i].getMinTrail();
		}
	}
	return expandableWidth;
};
/************************************* End of Bar, Figure begins *************************/
function Figure(parentBar, rhythmValue){
	let x;
	this.getX=function(){return x;};
	this.setX=function(newX){x=newX;};
	this.getParentBar=function(){return parentBar;};
	this.getRhythmValue=function(){return rhythmValue;};
	let path=this.getPath();
	this.getPath=function(){return path;};
}
Figure.prototype.getIndexInBar=function(){return this.getParentBar().figures.indexOf(this);};
Figure.prototype.isFirstInBar=function(){return this.getIndexInBar()===0;};
Figure.prototype.isLastInBar=function(){return this.getIndexInBar()>=this.getParentBar().figures.length-1;};
Figure.prototype.isFirstInStaff=function(){return this.isFirstInBar()&&this.getParentBar().isFirstInStaff();};
Figure.prototype.isLastInStaff=function(){return this.isLastInBar()&&this.getParentBar().isLastInStaff};
Figure.prototype.isFirstInScore=function(){return this.isFirstInStaff()&&this.getParentBar().getParentStaff().isFirst();};
Figure.prototype.isLastInScore=function(){return this.isLastInStaff()&&this.getParentBar().getParentStaff().isLast();};
Figure.prototype.getY=function(){return this.getYOverhead()+(this instanceof Note?this.getVertPosition()*stepHeight+6:RhythmValue[this.getRhythmValue()].restY);};
Figure.prototype.getMinTrail=function(){
	let mt=RhythmValue[this.getRhythmValue()].minTrail;
	if(this.getRhythmValue()==='BAR'){//
		return mt;
	}else if(this instanceof Note){
		return mt;
	}else{
		return mt*0.75;
	}
};
Figure.prototype.getYOverhead=function(){return this.getParentBar().getParentStaff().getY();};
Figure.prototype.getTicksSpan=function(){
	let rv=RhythmValue[this.getRhythmValue()];
	if(this instanceof Note){
		return rv.tickSpan;
	}else{
		return rv!==RhythmValue.BAR?rv.tickSpan:TimeSignature[loader.getTime()].barDuration;
	}
};
Figure.prototype.getPath=function(){
	let rhythmValue=RhythmValue[this.getRhythmValue()];
	return this instanceof Note?rhythmValue.drawNote:rhythmValue.drawRest;
};
Figure.prototype.serialize=function(toPublish){
	let obj={};
	obj.rhythmValue=this.getRhythmValue();
	if(toPublish){
		obj.x=this.getX();
		obj.y=this.getY();
	}
	if(this instanceof Note){
		obj.pitchIndex=this.tonalIndexInScale+(toPublish?KeySignature[loader.getKey()].firstTonicIndex:0);
	}
	return obj;
};
/************************************* End of Figure, Rest begins *************************/
function Rest(parentBar, rhythmValue){
	Figure.call(this, parentBar, rhythmValue);
};
Rest.prototype=Object.create(Figure.prototype);
Rest.prototype.getWidth=function(){return RhythmValue[this.getRhythmValue()].restWidth;};
Rest.prototype.draw=function(enlight=false){
	this.getPath()(this.getX(), this.getY());
};
/************************************* End of Rest, Note begins *************************/
function Note(parentBar, rhythmValue, tonalIndexInScale, alteration='NONE', linked=false){
	Figure.call(this, parentBar, rhythmValue);
	this.tonalIndexInScale=tonalIndexInScale;
	this.getPitchValue=function(){return KeySignature[loader.getKey()].scale[this.tonalIndexInScale+KeySignature[loader.getKey()].firstTonicIndex];};
	this.oscParamIndex=this.getPitchValue().oscParamIndex;
	//this.op=oscParam[this.oscParamIndex];
	this.alteration=alteration;
	this.linked=linked;
};
Note.prototype=Object.create(Figure.prototype);
Note.prototype.getWidth=function(){
	return RhythmValue[this.getRhythmValue()].noteWidth;
};
Note.prototype.getVertPosition=function(){
	return this.getPitchValue().vertPosTreble+(Clef[loader.getClef()]===Clef.BASS?-12:0);
};
Note.prototype.hasStemUp=function(){return this.getVertPosition()>9};
Note.prototype.hasLedgerLines=function(){
	switch(this.getVertPosition()){
	case 0:
	case 1:
	case 2:
	case 3:
	case 15:
	case 16:
	case 17:
	case 18:
		return true;
	default:
		return false;
	}
};
Note.prototype.draw=function(enlight=false){
	let x=this.getX()+(this.getRhythmValue()==='WHOLE'?10:8);
	if(this.hasLedgerLines()){
		this.drawLedgerLines();
	}
	this.getPath()(x, this.getY(), this.getVertPosition(), this.hasStemUp());
};
Note.prototype.drawLedgerLines=function(){
	let x=this.getX()+(this.getRhythmValue()==='WHOLE'?10:8);
	let staffIndex=this.getParentBar().getParentStaff().getIndex()
	switch(this.getVertPosition()){
	case 0:
	case 1:
		paths.ledgerLines(x, staffIndex, true, true);
		break;
	case 2:
	case 3:
		paths.ledgerLines(x, staffIndex, true, false);
		break;
	case 15:
	case 16:
		paths.ledgerLines(x, staffIndex, false, false);
		break;
	case 17:
	case 18:
		paths.ledgerLines(x, staffIndex, false, true);
		break;
	default:
		break;
	}
};
Note.prototype.drawName=function(){
	let noteName=NoteClass[this.getPitchValue().classKey].es;
	let textX=this.getX()+this.getWidth()+2;//(this.getRhythmValue()==='WHOLE'?22:18);//
	let textY=this.getY()+6;//-8
	let ctx=loader.getCtx();
	paths.tempFont(noteFont);
	paths.tempTextAlign('left');
	let metrix=ctx.measureText(noteName);
	let xOffsetLeft=metrix.actualBoundingBoxLeft;
	let xOffsetRight=metrix.actualBoundingBoxRight;
	paths.tempFillStyle('rgb(184, 228, 250)');
	ctx.fillRect(textX-xOffsetLeft, textY-13, Math.ceil(xOffsetLeft+xOffsetRight), 14);
	paths.tempFillStyle();
	paths.tempFillStyle('black');
	ctx.fillText(noteName, textX, textY);
	paths.tempFillStyle();
	paths.tempFont();
	paths.tempTextAlign();
};
Note.prototype.getOscParamIndex=function(){return this.getPitchValue().oscParamIndex;};