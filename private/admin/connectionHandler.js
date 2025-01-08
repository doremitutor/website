let consecutivesList, pathEsList, pathEnList, pagesListWindow, showPages, getNextPrev, applyPage, deletePage,
	changeConsecutive, changeBlockName, changeSummaryName, blockNamesList, blocksListWindow, showBlocks, applyBlocks, deleteBlock,
	summaryNamesList, summariesListWindow, showSummaries, applySummaries, deleteSummary, cloneEnabled=false;
	
window.addEventListener('load', setUpApp, false);
function post(data, callback, extraParam=null){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(xhttp.responseText, extraParam);
		}
	};
	xhttp.open("POST", "dbConn.php");
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(data);
};
function $(id){return document.getElementById(id);};
function setUpApp(){
	PageVar.consecutive=new PageVar('consecutive');
	PageVar.ordertype=new PageVar('ordertype');
	PageVar.previous=new PageVar('previous');
	PageVar.next=new PageVar('next');
	PageVar.lesson=new PageVar('lesson');
	PageVar.path_es=new PageVar('path_es');
	PageVar.path_en=new PageVar('path_en');
	PageVar.title_es=new PageVar('title_es');
	PageVar.title_en=new PageVar('title_en');
	PageVar.header_es=new PageVar('header_es');
	PageVar.header_en=new PageVar('header_en');
	PageVar.subheader_es=new PageVar('subheader_es');
	PageVar.subheader_en=new PageVar('subheader_en');
	PageVar.youtube_es=new PageVar('youtube_es');
	PageVar.youtube_en=new PageVar('youtube_en');
	PageVar.headextras_es=new PageVar('headextras_es');
	PageVar.headextras_en=new PageVar('headextras_en');
	PageVar.keywords_es=new PageVar('keywords_es');
	PageVar.keywords_en=new PageVar('keywords_en');
	PageVar.description_es=new PageVar('description_es');
	PageVar.description_en=new PageVar('description_en');
	HtmlBlock.blockName=new HtmlBlock('blockName');
	HtmlBlock.blockContent_es=new HtmlBlock('blockContent_es');
	HtmlBlock.blockContent_en=new HtmlBlock('blockContent_en');
	Summary.summaryName=new Summary('summaryName');
	Summary.summary_es=new Summary('summary_es');
	Summary.summary_en=new Summary('summary_en');
	Summary.paragraph_es=new Summary('paragraph_es');
	Summary.paragraph_en=new Summary('paragraph_en');
	PageVar.consecutive.textField.addEventListener('change', function(e){
			if(!this.value.match(/^\d{1,4}$/)){
				alert('From 0 to 9999, please!');
				this.select();
				return;
			}
			if(isValueInList(this.value, consecutivesList)){
				alert('This consecutive already exists:\nUse 9999 as a temporary value\nwhile you release the desired one');
				this.select();
			}
		}, false);
	HtmlBlock.blockName.textField.addEventListener('change', function(e){
			if(isValueInList(this.value, blockNamesList)){
				alert('This blocksName already exists in database');
				this.select();
			}else{
				for(p in HtmlBlock){					
					if(HtmlBlock[p].textField.id!=='blockName'){
						HtmlBlock[p].textField.value='';					
					}
				}				
			}	
		}, false);
	Summary.summaryName.textField.addEventListener('change', function(e){
			if(isValueInList(this.value, summaryNamesList)){
				alert('This summaryName already exists in database');
				this.select();
			}else{
				for(p in Summary){					
					if(Summary[p].textField.id!=='summaryName'){
						Summary[p].textField.value='';					
					}
				}				
			}	
		}, false);
	showPages=$('showPages');
	showPages.addEventListener('click', createPagesWindow, false);
	showPages.tabIndex='-1';
	getNextPrev=$('getNextPrev');
	getNextPrev.addEventListener('click', getNextPrevPage, false);
	getNextPrev.tabIndex='-1';
	applyPage=$('applyPage');
	applyPage.addEventListener('click', insertOrUpdatePage, false);
	applyPage.tabIndex='-1';
	deletePage=$('deletePage');
	deletePage.addEventListener('click', deleteWholePage, false);
	deletePage.tabIndex='-1';
	changeConsecutive=$('changeConsecutive');
	changeConsecutive.addEventListener('click', changePageConsecutive, false);
	changeConsecutive.tabIndex='-1';
	showBlocks=$('showBlocks');
	showBlocks.addEventListener('click', createBlocksWindow, false);
	showBlocks.tabIndex='-1';
	applyBlock=$('applyBlock');
	applyBlock.addEventListener('click', insertOrUpdateBlock, false);
	applyBlock.tabIndex='-1';
	deleteBlock=$('deleteBlock');
	deleteBlock.addEventListener('click', deleteWholeBlock, false);
	deleteBlock.tabIndex='-1';
	changeBlockName=$('changeBlockName');
	changeBlockName.addEventListener('click', changeJustBlockName, false);
	changeBlockName.tabIndex='-1';	
	showSummaries=$('showSummaries');
	showSummaries.addEventListener('click', createSummariesWindow, false);
	showSummaries.tabIndex='-1';
	applySummary=$('applySummary');
	applySummary.addEventListener('click', insertOrUpdateSummary, false);
	applySummary.tabIndex='-1';
	deleteSummary=$('deleteSummary');
	deleteSummary.addEventListener('click', deleteWholeSummary, false);
	deleteSummary.tabIndex='-1';
	changeSummaryName=$('changeSummaryName');
	changeSummaryName.addEventListener('click', changeJustSummaryName, false);
	changeSummaryName.tabIndex='-1';	
	/* fetchPagesLists(false);
	fetchBlocksList(false);
	fetchSummariesList(false); */
};
function PageVar(str){
	this.textField=$(str);
	this.getNameString=function(){return str;};
	this.setValue=function(value){this.textField.value=value;};
	this.getValue=function(){return this.textField.value;};
};
function HtmlBlock(str){
	this.textField=$(str);
	this.getNameString=function(){return str;};
	this.setValue=function(value){this.textField.value=value;};
	this.getValue=function(){return this.textField.value;};	
}
function Summary(str){
	this.textField=$(str);
	this.getNameString=function(){return str;};
	this.setValue=function(value){this.textField.value=value;};
	this.getValue=function(){return this.textField.value;};	
}
function createPagesWindow(){
	pagesListWindow=createPopUpTableWindow('pagesList.html', 1080);
}
function fetchPagesLists(createTablePage){
	post('function=fetchPagesLists', createPagesList, createTablePage);
};
function createPagesList(data, createTablePage){
	consecutivesList=[];
	pathEsList=[];
	pathEnList=[];
	let resultArray=JSON.parse(data);
	resultArray.forEach((arr)=>{
		consecutivesList.push(arr[0]);
		pathEsList.push(arr[1]);
		pathEnList.push(arr[2]);
	});
	if(createTablePage){
		let tBody=pagesListWindow.document.getElementById('tbody');	
		for(i=0; i<resultArray.length; i++){
			let dataTr=pagesListWindow.document.createElement('tr');
			dataTr.style='cursor:pointer;';
			dataTr.addEventListener('click', fetchPageVarsFromList, false);
			tBody.appendChild(dataTr);
			for(let j=0; j<resultArray[i].length; j++){
				let td=document.createElement('td');
				td.textContent=resultArray[i][j];
				dataTr.appendChild(td);			
			}			
		}
	}
};
function getNextPrevPage(e){
	if(e.ctrlKey){
		getPrevConsecutive(PageVar.consecutive.getValue());
	}else if(e.altKey){
		let consecutive=prompt('Consecutive to retrieve?');
		if(consecutive){
			getConsecutive(consecutive);
		}
	}else{
		getNextConsecutive(PageVar.consecutive.getValue());		
	}
};
function getConsecutive(consecutive){
	fetchPageVarsFromConsecutive(consecutive, 'this');
};
function getPrevConsecutive(consecutive){
	fetchPageVarsFromConsecutive(consecutive, 'prev');
};
function getNextConsecutive(consecutive){
	fetchPageVarsFromConsecutive(consecutive, 'next');
};
function fetchPageVarsFromConsecutive(consecutive, offset){
	post('function=fetchPageVars&consecutive='+consecutive+'&offset='+offset, fillInPageVarsText, false);	
}
function fetchPageVarsFromList(e){
	let consecutive=e.currentTarget.children[0].textContent;
	post('function=fetchPageVars&consecutive='+consecutive, fillInPageVarsText, e.ctrlKey);
	pagesListWindow.close();
};
function fillInPageVarsText(data, ctrlKeyPressed){
	if(data==='null'){
		return;
	}
	let resultArray=JSON.parse(data);
	for(p in resultArray){
		if(typeof PageVar[p] !== 'undefined'){
			if(p==='consecutive'&&ctrlKeyPressed){
				PageVar[p].setValue('New consecutive?')
				continue;
			} 
			PageVar[p].setValue(resultArray[p]);
		}
	} 
	PageVar['consecutive'].textField.select();
};
function insertOrUpdatePage(){
	if(isValueInList(PageVar.consecutive.getValue(), consecutivesList)){
		if(confirm('Are you willing to overwrite previous page values?')){
			updatePageVars();
		}else{
			return;
		}		
	}else{
		insertNewPage();
	}
};
function getPageVarValues(){
	let values=''
	for(p in PageVar){
			values+='&'+PageVar[p].getNameString()+'='+PageVar[p].getValue();
	}
	console.log(values);
	return values;
};
function insertNewPage(){
	let query='function=insertNewPage';
	post(query+getPageVarValues(), usePageVarResponse);
};
function updatePageVars(){
	console.log('updating');
	let query='function=updatePageVars&consecutive='+PageVar.consecutive.getValue();
	post(query+getPageVarValues(), usePageVarResponse);	
	console.log(query);
};
function deleteWholePage(){
	let consecutiveValue=PageVar.consecutive.getValue();
	if(!consecutiveValue){
		alert('No page to delete');
		return;
	}
	if(!isValueInList(consecutiveValue, consecutivesList)){
		alert('Page not in database!');
		return;
	}
	if(confirm('Are you sure you want\nto delete this page?')){
		let query='function=deletePage&consecutive='+consecutiveValue;
		post(query, usePageVarResponse);
		for(p in PageVar){
			PageVar[p].setValue('');
		}
	}		
};
function changePageConsecutive(){
	let newConsecutive;
	if(!(newConsecutive=prompt('New consecutive?'))){
		return;
	}
	let query='function=changeConsecutive&consecutive='+PageVar.consecutive.getValue()+'&newConsecutive='+newConsecutive;
	post(query, usePageVarResponse);
};
function usePageVarResponse(data){
	alert('Response:\n'+data);
};
function createBlocksWindow(){
	blocksListWindow=createPopUpTableWindow('blocksList.html', 500);
};
function fetchBlocksList(createTablePage){
	post('function=fetchBlocksList', createBlocksList, createTablePage);
};
function createBlocksList(data, createTablePage){
	blockNamesList=[];
	let resultArray=JSON.parse(data);
	resultArray.forEach((arr)=>{		
		blockNamesList.push(arr[0]);
	});	
	if(createTablePage){
		let tBody=blocksListWindow.document.getElementById('tbody');
		for(i=0; i<resultArray.length; i++){
			let dataTr=blocksListWindow.document.createElement('tr');
			dataTr.style='cursor:pointer;';
			dataTr.addEventListener('click', fetchBlocksFormData, false);
			tBody.appendChild(dataTr);
			let td=document.createElement('td');
			td.textContent=resultArray[i][0];
			dataTr.appendChild(td);
		}	
	}
};
function fetchBlocksFormData(e){
	let blockName=e.currentTarget.children[0].textContent;
	post('function=fetchBlocks&blockName='+blockName, fillInBlocksText, e.ctrlKey);
	blocksListWindow.close();	
};
function fillInBlocksText(data, ctrlKeyPressed){
	if(data==='null'){
		return;
	}
	let resultArray=JSON.parse(data);
	for(p in resultArray){
		if(typeof HtmlBlock[p] !== 'undefined'){
			if(p==='blockName'&&ctrlKeyPressed){
				HtmlBlock[p].setValue('New name?')
				continue;
			} 			
			HtmlBlock[p].setValue(resultArray[p]);
		}
		HtmlBlock['blockName'].textField.select();
	}
};
function insertOrUpdateBlock(){debugger;
	if(isValueInList(HtmlBlock.blockName.getValue(), blockNamesList)){
		if(confirm('Are you willing to overwrite previous blocks values?')){
			updateBlock();
		}else{
			return;
		}
	}else{
		insertNewBlock();
	}	
};
function getBlockValues(){
	let values=''
	for(p in HtmlBlock){
		if(HtmlBlock[p].getValue()!==''){
			values+='&'+HtmlBlock[p].getNameString()+'='+HtmlBlock[p].getValue();
		}
	}
	return values;
};
function insertNewBlock(){
	let query='function=insertNewBlock&blockName='+HtmlBlock.blockName.getValue();
	post(query+getBlockValues(), useHtmlBlockResponse);
};
function updateBlock(){
	let query='function=updateBlock&HtmlBlock.blockName='+HtmlBlock.blockName.getValue();
	post(query+getBlockValues(), useHtmlBlockResponse);	
	console.log(query);		
};
function deleteWholeBlock(){
	let blockNameValue=HtmlBlock.blockName.getValue();
	if(!blockNameValue){
		alert('No HtmlBlock to delete');
		return;
	}
	if(!isValueInList(blockNameValue, blockNamesList)){
		alert('HtmlBlock not in database (yet)!');
		return
	}
	if(confirm('Are you sure you want\nto delete this HtmlBlock?')){
		let query='function=deleteHtmlBlock&blockName='+blockNameValue;
		post(query, useHtmlBlockResponse);
		for(p in HtmlBlock){
			HtmlBlock[p].setValue('');
		}
	}		
};
function changeJustBlockName(){
	let newBlockName;
	if(!(newBlockName=prompt('New block name?'))){
		return;
	}
	let query='function=changeBlockName&blockName='+HtmlBlock.blockName.getValue()+'&newBlockName='+newBlockName;
	post(query, usePageVarResponse);
};
function useHtmlBlockResponse(data){
	alert('Response:\n'+data);
};
function createSummariesWindow(){
	summariesListWindow=createPopUpTableWindow('summariesList.html', 510);
};
function fetchSummariesList(createTablePage){
	post('function=fetchSummariesList', createSummariesList, createTablePage);
};
function createSummariesList(data, createTablePage){
	summaryNamesList=[];
	let resultArray=JSON.parse(data);
	resultArray.forEach((arr)=>{
		summaryNamesList.push(arr[0]);
	});
	if(createTablePage){
		let tBody=summariesListWindow.document.getElementById('tbody');	
		for(i=0; i<resultArray.length; i++){
			let dataTr=summariesListWindow.document.createElement('tr');
			dataTr.style='cursor:pointer;';
			dataTr.addEventListener('click', fetchSummaryFormData, false);
			tBody.appendChild(dataTr);
			let td=document.createElement('td');
			td.textContent=resultArray[i][0];
			dataTr.appendChild(td);
		}
	}
};
function fetchSummaryFormData(e){
	let summaryName=e.currentTarget.children[0].textContent;
	post('function=fetchSummaries&summaryName='+summaryName, fillInSummariesText, e.ctrlKey);
	summariesListWindow.close();	
};
function fillInSummariesText(data, ctrlKeyPressed){
	if(data==='null'){
		return;
	}
	let resultArray=JSON.parse(data);
	for(p in resultArray){
		if(typeof Summary[p] !== 'undefined'){
			if(p==='summaryName'&&ctrlKeyPressed){
				Summary[p].setValue('New name?')
				continue;
			} 			
			Summary[p].setValue(resultArray[p]);
		}
		Summary['summaryName'].textField.select();
	}
};
function insertOrUpdateSummary(){
	if(isValueInList(Summary.summaryName.getValue(), summaryNamesList)){
		if(confirm('Are you willing to overwrite previous summary values?')){
			updateSummary();
		}else{
			return;
		}
	}else{
		insertNewSummary();
	}	
};
function getSummaryValues(){
	let values=''
	for(p in Summary){
		if(Summary[p].getValue()!==''){
			values+='&'+Summary[p].getNameString()+'='+Summary[p].getValue();
		}
	}
	return values;
};
function insertNewSummary(){
	let query='function=insertNewSummary&summaryName='+Summary.summaryName.getValue();
	post(query+getSummaryValues(), useSummaryResponse);
};
function updateSummary(){
	let query='function=updateSummary&Summary.summaryName='+Summary.summaryName.getValue();
	post(query+getSummaryValues(), useSummaryResponse);	
	console.log(query);		
};
function deleteWholeSummary(){
	let summaryNameValue=Summary.summaryName.getValue();
	if(!summaryNameValue){
		alert('No Summary to delete');
		return;
	}
	if(!isValueInList(summaryNameValue, summaryNamesList)){
		alert('Summary not in database (yet)!');
		return
	}
	if(confirm('Are you sure you want\nto delete this Summary?')){
		let query='function=deleteSummary&summaryName='+summaryNameValue;
		post(query, useSummaryResponse);
		for(p in Summary){
			Summary[p].setValue('');
		}
	}		
};
function changeJustSummaryName(){
	let newSummaryName;
	if(!(newSummaryName=prompt('New summary name?'))){
		return;
	}
	let query='function=changeSummaryName&summaryName='+Summary.summaryName.getValue()+'&newSummaryName='+newSummaryName;
	post(query, usePageVarResponse);
};
function useSummaryResponse(data){
	alert('Response:\n'+data);
};
function createPopUpTableWindow(url, width){
	let height=800, top=80;
	let left=(window.screen.width-width)/2;
	let features=`width=${width},left=${left},height=${height},top=${top},`+
				 'menubar=0,toolbar=0,location=0,status=0,resizable=0,scrollbars=yes';
	return open(url, '', features);
};
function verifyUniqueness(e){
	let value=e.currentTarget;//.value;.constructor
	console.log(value);
};
function clearForm(form){
	for(p in form){
		
		form[p].setValue('');
	}	
};
function isValueInList(value, list){
	return list.indexOf(value)>=0;
};