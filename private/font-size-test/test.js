const stdFontSize=18, fontSizeFactor=25;
function $(id){return document.getElementById(id);};
if(typeof(window.orientation) !== "undefined"){
    updateFontSize();
    window.addEventListener("orientationchange", updateFontSize, false);
}else{
    $('html').style=`font-size:${stdFontSize}px;`;
}
function updateFontSize(){
    const screenWidth=screen.width;
    const screenHeight=screen.height;
    const innerWidth=window.innerWidth;
    const innerHeight=window.innerHeight;
    const availableWidth=screen.availWidth;
    const availableHeight=screen.availHeight;
    const ratio=980/availableWidth;
    const fontSize=fontSizeFactor*ratio;
    $('orientation').textContent=window.orientation;
    $('stdFontSize').textContent=stdFontSize;
    $('fontSizeFactor').textContent=fontSizeFactor;
    $('screenWidth').textContent=screenWidth
    $('screenHeight').textContent=screenHeight
    $('innerWidth').textContent=innerWidth;
    $('innerHeight').textContent=innerHeight;
    $('availableWidth').textContent=availableWidth;
    $('availableHeight').textContent=availableHeight;
    $('ratio').textContent=ratio;
    $('fontSize').textContent=fontSize;
    $('html').style=`font-size:${fontSize}px;`;
};