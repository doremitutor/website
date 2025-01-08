const paths={};
const ctx=scorePlayer.ctx;
const tilt=-Math.PI/180*27.5;
const round=Math.PI*2;
const dotOffsetX=15;
//const stemHeight=34;
paths.wholeNote=function(x, y){
	ctx.beginPath();
	ctx.ellipse(x, y, 10, 6, 0, 0, round, true);
	ctx.fill();
	ctx.globalCompositeOperation="destination-out";
	ctx.beginPath();
	ctx.ellipse(x, y, 5.5, 4.5, Math.PI/180*45, 0, round, true);
	ctx.fill();
	ctx.globalCompositeOperation="source-over";
};
paths.halfDoubleDotNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	halfNoteHole(x, y);
	stem(x, y, up);
	dot(x+dotOffsetX, y, vertPos, true);
};
paths.halfDotNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	halfNoteHole(x, y);
	stem(x, y, up);
	dot(x+dotOffsetX, y, vertPos, false);
};
paths.halfNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	halfNoteHole(x, y);
	stem(x, y, up);
}
paths.quarterDoubleDotNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	stem(x, y);
	dot(x+dotOffsetX, y, vertPos, true);
};
paths.quarterDotNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	stem(x, y, up);
	dot(x+dotOffsetX, y, vertPos, false);
};
paths.quarterNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	stem(x, y, up);
};
paths.eighthDotNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	stem(x, y, up);
	dot(x+dotOffsetX, y, vertPos, false);
	x+=up?4:6;
	y-=4;

	ctx.fill(new Path2D('M '+x+' '+y+(up?flagUp:flagDown)));
};
paths.quarterTrippletNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	stem(x, y, up);
};
paths.eighthNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	stem(x, y, up);
	x+=up?4:6;
	y-=4;

	ctx.fill(new Path2D('M '+x+' '+y+(up?flagUp:flagDown)));
};
paths.eighthTrippletNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	stem(x, y, up);
	x+=up?4:6;
	y-=4;

	ctx.fill(new Path2D('M '+x+' '+y+(up?flagUp:flagDown)));
};
paths.sixteenthNote=function(x, y, vertPos){
	let up=vertPos>9;
	noteHead(x, y);
	stem(x, y, up);
	x+=up?4:6;
	y-=4;

	ctx.fill(new Path2D('m '+x+' '+y+(up?flagUp:flagDown)));
	y-=up?-8:8;
	ctx.fill(new Path2D('m '+x+' '+y+(up?flagUp:flagDown)));
};
paths.wholeRest=function(x, y){
	rectRest(x, y);
};
paths.halfDoubleDotRest=function(x, y){
	rectRest(x, y);
	dot(x+23, y+1, false, true);
};
paths.halfDotRest=function(x, y){
	rectRest(x, y);
	dot(x+23, y+1, false, false);
};
paths.halfRest=function(x, y){
	rectRest(x, y);
};
paths.quarterDoubleDotRest=function(x, y){
	plainQuarterRest(x, y);
	dot(x+20, y+13, false, true);
};
paths.quarterDotRest=function(x, y){
	plainQuarterRest(x, y);
	dot(x+20, y+13, false, false);
};
paths.quarterRest=function(x, y){
	plainQuarterRest(x, y);
};
paths.eighthDotRest=function(x, y){
	plainEighthRest(x, y);
	dot(x+20, y+15, false, false);
};
paths.quarterTrippletRest=function(x, y){
	plainQuarterRest(x, y);
};
paths.eighthRest=function(x, y){
	plainEighthRest(x, y);
}
paths.eighthTrippletRest=function(x, y){
	plainEighthRest(x, y);
};
paths.sixteenthRest=function(x, y){
	ctx.fill(new Path2D('m '+(10.4+x)+','+(17.7+y)+' '+
		'-7.16, 16, 3.1,0 12.56,-31.42 -1.3,0'+
		' c -2.8,3.1 -5.7,3.1 -7.3,2.7 1.7,-1.7 0.6,-4.98 -2.07,-4.98 -2.65, 0 '+
		'-4.58,2.78 -2.44,5.38 1.42,1.5 5.31,2.2 10.11,-0.1 l -4.2, 9.42,'+
		' m -10, 2.8 c 1.348,1.4 4.898,2.1 9.428,0.2 '+
		' m -4.33,-1.5 c 0.69,-1.8 -0.44,-4 -2.66,-4 -2.64,0 -4.59,2.7 -2.438,5.3'));
}
paths.ledgerLines=function (x, barY, upper=false, two=false){
	let halfSpan=15;
	let y=barY+(upper?24:96);
	paths.tempStrokeStyle('black');
	ctx.beginPath();
	ctx.moveTo(x-halfSpan, y);
	ctx.lineTo(x+halfSpan, y);
	if(two){
		y=y+(upper?-12:12);
		ctx.moveTo(x-halfSpan, y);
		ctx.lineTo(x+halfSpan, y);
	}
	ctx.stroke();
	paths.tempStrokeStyle();
};
function noteHead(x, y){

	ctx.beginPath();
	ctx.ellipse(x, y, 8.25, 5.75, tilt, 0, round, true);
	ctx.fill();
};
function halfNoteHole(x, y){

	ctx.globalCompositeOperation="destination-out";
	ctx.beginPath();
	ctx.ellipse(x, y, 7.5, 2.75, tilt, 0, round, true);
	ctx.fill();
	ctx.globalCompositeOperation="source-over";
};
function stem(x, y, up){
	x+=up?7:-7;

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x, y+(up?-41:41));
	ctx.stroke();
};
function dot(x, y, vertPos, dual){
	if(vertPos%2){y-=6;}

	ctx.beginPath();
	arc();
	if(dual){x+=10; arc();}
	ctx.fill();
	function arc(){ctx.arc(x, y, 3.5, 0, round, true);}
};
function rectRest(x, y){
	ctx.fillRect(x, y, 15, 6);
};
function plainQuarterRest(x, y){
	ctx.fill(new Path2D('m '+(2.42+x)+','+(0+y)+' '+
		'9.08,12.8 c -6.34,3.4 -6.24,9.3 0.5,16.4 -5.96,-2.8 -11.157,0.8 -5.66,8.9 -13.42,-10.7 '+
		'-1.48,-15.7 0.49,-13.9 l -6.376,-8.5 c 6.946,-5.9 4.406,-10.42 0.916,-14.78 z'));
};

function plainEighthRest(x, y){
	ctx.fill(new Path2D('m '+(5.35+x)+','+(4.85+y)+' '+
		'c 1.6,0.4 4.4,0.4 7.25,-2.7 l 1.3,0 -8.65,20.35 -3.2,0 8.85,-17.35 c -4.75,2.3 '+
		'-8.55,1.6 -9.951,0.1 -2.099,-2.6 -0.2,-5.25 2.401,-5.25 2.6,0 3.7,3.15 2,4.85 z'));
}
const flagUp=' m 2 -23 c 13.3,9.9 12.8,11.2 9.32,23 11.28,-17.4 -6.93,-20.1 -9.32,-33.3 z';
const flagDown=' m -14, 30 c 13.2,-9.9 12.7,-11.2 9.32,-23 11.28,17.4 -7,20.1 -9.32,33.3 z';
const sharp='';// all these need x, so they will be functions
const flat='';
const natural='';
const link='';
paths.tempLineWidth=function (tempLineWidth){
	if(tempLineWidth){
		this.savedLineWidth=ctx.lineWidth;
		ctx.lineWidth=tempLineWidth;
	}else{
		ctx.lineWidth=this.savedLineWidth;
	}
};
paths.tempStrokeStyle=function (tempStrokeStyle){
	if(tempStrokeStyle){
		this.savedStrokeStyle=ctx.strokeStyle;
		ctx.strokeStyle=tempStrokeStyle;
	}else{
		ctx.strokeStyle=this.savedStrokeStyle;
	}
}
paths.tempFillStyle=function(tempFillStyle){
	if(tempFillStyle){
		this.savedFillStyle=ctx.fillStyle;
		ctx.fillStyle=tempFillStyle;
	}else{
		ctx.fillStyle=this.savedFillStyle;
	}
}
paths.tempFont=function(tempFont){
	if(tempFont){
		this.savedFont=ctx.font;
		ctx.font=tempFont;
	}else{
		ctx.font=this.savedFont;
	}
}
paths.tempTextAlign=function(tempTextAlign){
	if(tempTextAlign){
		this.savedTextAlign=ctx.txtAlign;
		ctx.textAlign=tempTextAlign;
	}else{
		ctx.textAlign=this.savedTextAlign;
	}
}
scorePlayer.paths=paths;