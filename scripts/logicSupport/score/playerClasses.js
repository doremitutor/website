const classes={};
const sound=scorePlayer.sound;
const Bar=function (x, y, barLineType, barLineX, figuresFrom){
	this.x=x;
	this.y=y;
	this.barLineType=barLineType;
	this.barLineX=barLineX;
	this.figures=[];
	scorePlayer.enums.BarLine[barLineType].draw(barLineX, y+36);
	for(let i=0; i<figuresFrom.length; i++){
		let figureFrom=figuresFrom[i];
		let figure=figureFrom.pitchIndex?new Note(this, figureFrom.rhythmValue, figureFrom.x, figureFrom.y, figureFrom.pitchIndex, figureFrom.modifier, figureFrom.alteration, figureFrom.linked)
			:new Rest(this, figureFrom.rhythmValue, figureFrom.x, figureFrom.y);
		this.figures.push(figure);
		figure.draw(figure.getX(), figure.getY());
	}
};
classes.Bar=Bar;
const Figure=function Figure(parentBar, rhythmValue, x, y){
	this.getRhythmValueKey=function(){return rhythmValue};
	this.getX=function(){return Math.round(x);};
	this.getY=function(){return y;};
	this.getParentBar=function(){return parentBar;};
};
classes.Figure=Figure;
Figure.prototype.getRhythmValue=function(){return scorePlayer.enums.RhythmValue[this.getRhythmValueKey()];};
Figure.prototype.getPath=function(){
	let rv=this.getRhythmValue();
	return this instanceof Note?rv.drawNote:rv.drawRest;
};
Figure.prototype.getTicksSpan=function(){
	let rv=this.getRhythmValue();
	if(this instanceof Note){
		return rv.tickSpan;
	}else{
		return rv!==scorePlayer.enums.RhythmValue.BAR?rv.tickSpan:TimeSignature[scorePlayer.lesson.time].barDuration;
	}
};
Figure.prototype.isFirstInBar=function(){return this.getParentBar().figures.indexOf(this)===0};
Figure.prototype.isLastInBar=function(){return this.getParentBar().figures.indexOf(this)===this.getParentBar().figures.length-1};
const Rest=function(parentBar, rhythmValue, x, y){
	Figure.call(this, parentBar, rhythmValue, x, y);
};
classes.Rest=Rest;
Rest.prototype=Object.create(Figure.prototype);
Rest.prototype.draw=function(enlight=false){this.getPath()(this.getX(), this.getY());};
const Note=function(parentBar, rhythmValue, x, y, pitchValueIndexInScale, modifier, alteration, linked){
	Figure.call(this, parentBar, rhythmValue, x, y);
	this.getPitchValueIndexInScale=function(){return pitchValueIndexInScale};
	this.pitchValue=scorePlayer.enums.KeySignature[scorePlayer.lesson.specs.key].scale[pitchValueIndexInScale];
	this.oscParamIndex=this.pitchValue.oscParamIndex;
	this.name=scorePlayer.enums.NoteClass[this.pitchValue.classKey][lang];
};
classes.Note=Note;
Note.prototype=Object.create(Figure.prototype);
Note.prototype.getWidth=function(){
	return this.getRhythmValue().noteWidth;
};
Note.prototype.getVertPosition=function(){
	return this.pitchValue.vertPosTreble+(scorePlayer.enums.Clef[scorePlayer.lesson.specs.clef]===scorePlayer.enums.Clef.BASS?-12:0);
};
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
	let x=this.getX()+10;
	if(this.hasLedgerLines()){
		this.drawLedgerLines();
	}
	this.getPath()(x, this.getY(), this.getVertPosition());
};
Note.prototype.drawLedgerLines=function(){
	const paths=scorePlayer.paths;
	let x=this.getX()+(this.getRhythmValue()==='WHOLE'?10:8);
	let y=this.getParentBar().y;
	switch(this.getVertPosition()){
	case 0:
	case 1:
		paths.ledgerLines(x, y, true, true);
		break;
	case 2:
	case 3:
		paths.ledgerLines(x, y, true, false);
		break;
	case 15:
	case 16:
		paths.ledgerLines(x, y, false, false);
		break;
	case 17:
	case 18:
		paths.ledgerLines(x, y, false, true);
		break;
	default:
		break;
	}
};
Note.prototype.showName=function(show){
	let textX=this.getX()+this.getWidth()+3;
	let textY=this.getY()+6;
	let noteName=this.name;
	const paths=scorePlayer.paths;
	const ctx=scorePlayer.ctx;
	let noteFont='bold 16px sans-serif';
	paths.tempFont(noteFont);
	paths.tempTextAlign('left');
	let metrix=ctx.measureText(noteName);
	let xOffsetLeft=metrix.actualBoundingBoxLeft;
	let xOffsetRight=metrix.actualBoundingBoxRight;
	if(show){
		paths.tempFillStyle('rgb(184, 228, 250)');
		ctx.fillRect(textX-xOffsetLeft, textY-13, Math.ceil(xOffsetLeft+xOffsetRight), 14);
		paths.tempFillStyle();
		paths.tempFillStyle('black');
		ctx.fillText(noteName, textX, textY);
		paths.tempFillStyle();
	}else{
		ctx.clearRect(textX-xOffsetLeft-1, textY-14, Math.ceil(xOffsetLeft+xOffsetRight)+2, 16);
		if(this.hasLedgerLines){
			this.drawLedgerLines();
		}
	}
	paths.tempFont();
	paths.tempTextAlign();
};
scorePlayer.classes=classes;