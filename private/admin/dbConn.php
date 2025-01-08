<?php
if(isset($_POST['function'])){
	switch($_POST['function']){
		case 'fetchPagesLists':
			fetchPagesLists();
			break;
		case 'fetchPageVars':
			fetchPageVars();
			break;
		case 'insertNewPage':
			insertNewPage();
			break;
		case 'updatePageVars':
			updatePageVars();
			break;
		case 'deletePage':
			deletePage();
			break;
		case 'changeConsecutive':
			changeConsecutive();
			break;
		case 'fetchBlocksList':
			fetchBlocksList();
			break;
		case 'fetchBlocks':
			fetchBlocks();
			break;
		case 'insertNewBlock':
			insertNewBlock();
			break;
		case 'updateBlock':
			updateBlock();
			break;
		case 'deleteHtmlBlock':
			deleteHtmlBlock();
			break;
		case 'changeBlockName':
			changeBlockName();
			break;
		case 'fetchSummariesList':
			fetchSummariesList();
			break;
		case 'fetchSummaries':
			fetchSummaries();
			break;
		case 'insertNewSummary':
			insertNewSummary();
			break;
		case 'updateSummary':
			updateSummary();
			break;
		case 'deleteSummary':
			deleteSummary();
			break;
		case 'changeSummaryName':
			changeSummaryName();
			break;
		default:
			exit();
	}
	global $cnx;
	if($cnx){
		mysqli_close($cnx);
	}
}else{
	exit();
}
function connect(){
	global $cnx;
	$msg='<h1>Site under maintenance/Sitio en mantenimiento</h1>';
	//$cnx=@mysqli_connect('81.16.28.103', 'u490995379_admin', 'Abril134073', 'u490995379_doremitutor') OR DIE($msg . 'Error: ' . mysqli_connect_error());
	$cnx=@mysqli_connect('localhost', 'cms_admin', 'abril1338', 'doremitutor') OR DIE($msg . mysqli_connect_error());
	mysqli_set_charset($cnx, 'utf8');
}
function fetchPagesLists(){
	global $cnx;
	connect();
	$q="SELECT consecutive, path_es, path_en FROM htmlfields ORDER BY consecutive";
	$result=mysqli_query($cnx, $q);
	$row;
	$resultArray=[];
	while($row=mysqli_fetch_array($result, MYSQLI_NUM)){
		array_push($resultArray, $row);
	}
	echo json_encode($resultArray, JSON_UNESCAPED_SLASHES+JSON_UNESCAPED_UNICODE);
}
function fetchPageVars(){
	global $cnx;
	connect();
	$offset=false;
	if(isset($_POST['offset'])){
		$offset=$_POST['offset'];
	}
	if(!$offset||$offset==='this'){
		$q="SELECT * FROM htmlfields WHERE consecutive=" . "'" . $_POST['consecutive'] . "'";
	}else if($offset==='prev'){
		$q="SELECT * FROM htmlfields WHERE consecutive<" . "'" . $_POST['consecutive'] . "' ORDER BY consecutive DESC LIMIT 1";
	}else if($offset==='next'){
		$q="SELECT * FROM htmlfields WHERE consecutive>" . "'" . $_POST['consecutive'] . "' ORDER BY consecutive LIMIT 1";
	}else{
		echo 'This should never happen';
	}
	$result=mysqli_query($cnx, $q);
	$resultArray=mysqli_fetch_array($result, MYSQLI_ASSOC);
	echo json_encode($resultArray, JSON_UNESCAPED_SLASHES+JSON_UNESCAPED_UNICODE);
}
function getPageFieldsAndValues(){
	global $cnx;
	$fields=array_keys($_POST);
	$values=array_values($_POST);
	foreach($values as $value){
		$values[array_search($value, $fields)]=mysqli_real_escape_string($cnx, $values[array_search($value, $fields)]);
	}
	array_shift($fields);
	array_shift($values);
	foreach($values as &$v){
		$v="'" . $v . "'";
	}
	return [$fields, $values];
}
function insertNewPage(){
	global $cnx;
	connect();
	$data=getPageFieldsAndValues();
	$fields=implode(', ', $data[0]);
	$values=implode(', ', $data[1]);
	$q="INSERT INTO htmlfields ($fields) VALUES ($values)";
	if(mysqli_query($cnx, $q)){
		echo 'New page inserted';
	}else{
		echo "Insertion failed:\n", $q, "\n", mysqli_error($cnx);
	}
}
function updatePageVars(){
	global $cnx;
	connect();
	$data=getPageFieldsAndValues();
	$fields=$data[0];
	$values=$data[1];
	array_shift($fields);
	array_shift($values);
	$preQuery="UPDATE htmlfields SET ";
	$midQuery="";
	for($i=0; $i<count($fields);$i++){
		$midQuery.="$fields[$i]=$values[$i]";
		if($i<count($fields)-1){
			$midQuery.=", ";
		}
	}
	$postQuery=" WHERE consecutive=" . "'" . $_POST['consecutive'] . "'";
	$q=$preQuery . $midQuery . $postQuery;
	if(mysqli_query($cnx, $q)){
		echo 'Page updated';
	}else{
		echo "Update failed:\n", $q, "\n", mysqli_error($cnx);
	}
}
function deletePage(){
	global $cnx;
	connect();
	$q="DELETE FROM htmlfields WHERE consecutive='" . $_POST['consecutive'] . "'";
	if(mysqli_query($cnx, $q)){
		echo "Page " . $_POST['consecutive'] . " deleted with\n" . $q;
	}else{
		echo "Deletion of ", $_POST['consecutive'], " failed:\n", $q, "\n", mysqli_error($cnx);
	}
}
function changeConsecutive(){
	global $cnx;
	connect();
	$q="UPDATE htmlfields SET consecutive='" . $_POST['newConsecutive'] . "' WHERE consecutive='" . $_POST['consecutive'] . "'";
	if(mysqli_query($cnx, $q)){
		echo 'Consecutive changed from ', $_POST['consecutive'], ' to ', $_POST['newConsecutive'], " was successfull!\nREFRESH YOUR VIEW!!!";
	}else{
		echo 'Consecutive change from ', $_POST['consecutive'], ' to ', $_POST['newConsecutive'], " failed\n", mysqli_error($cnx);
	}
}
function fetchBlocksList(){
	global $cnx;
	connect();
	$q="SELECT blockName FROM htmlblocks ORDER BY blockName";
	$result=mysqli_query($cnx, $q);
	$row;
	$resultArray=[];
	while($row=mysqli_fetch_array($result, MYSQLI_NUM)){
		array_push($resultArray, $row);
	}
	echo json_encode($resultArray);
}
function fetchBlocks(){
	global $cnx;
	connect();
	$q="SELECT * FROM htmlblocks WHERE blockName=" . "'" . $_POST['blockName'] . "'";
	$result=mysqli_query($cnx, $q);
	$resultArray=mysqli_fetch_array($result, MYSQLI_ASSOC);
	echo json_encode($resultArray, JSON_UNESCAPED_SLASHES+JSON_UNESCAPED_UNICODE);
}
function getHtmlBlocksNamesAndValues(){
	global $cnx;
	$fields=array_keys($_POST);
	$values=array_values($_POST);
	$values[array_search('blockContent_es', $fields)]=mysqli_real_escape_string($cnx, $values[array_search('blockContent_es', $fields)]);
	$values[array_search('blockContent_en', $fields)]=mysqli_real_escape_string($cnx, $values[array_search('blockContent_en', $fields)]);
	array_shift($fields);
	array_shift($values);
	foreach($values as &$v){
		$v="'" . $v . "'";
	}
	return [$fields, $values];
}
function insertNewBlock(){
	global $cnx;
	connect();
	$data=getHtmlBlocksNamesAndValues();
	$fields=implode(', ', $data[0]);
	$values=implode(', ', $data[1]);
	$q="INSERT INTO htmlblocks ($fields) VALUES ($values)";
	if(mysqli_query($cnx, $q)){
		echo 'New HtmlBlock inserted';
	}else{
		echo "Insertion failed:\n", $q, "\n", mysqli_error($cnx);
	}
}
function updateBlock(){
	global $cnx;
	connect();
	$data=getHtmlBlocksNamesAndValues();
	$fields=$data[0];
	$values=$data[1];
	array_shift($fields);
	array_shift($values);
	$preQuery="UPDATE htmlblocks SET ";
	$midQuery="";
	for($i=0; $i<count($fields);$i++){
		$midQuery.="$fields[$i]=$values[$i]";
		if($i<count($fields)-1){
			$midQuery.=", ";
		}
	}
	$postQuery=" WHERE blockName=" . "'" . $_POST['blockName'] . "'";
	$q=$preQuery . $midQuery . $postQuery;
	if(mysqli_query($cnx, $q)){
		echo 'Block updated';
	}else{
		echo "Update failed:\n", $q, "\n", mysqli_error($cnx);
	}
}
function deleteHtmlblock(){
	global $cnx;
	connect();
	$q="DELETE FROM htmlblocks WHERE blockName='" . $_POST['blockName'] . "'";
	if(mysqli_query($cnx, $q)){
		echo "Block " . $_POST['blockName'] . " deleted with:\n" . $q;
	}else{
		echo "Deletion of ", $_POST['blockName'], " failed with:\n" . $q, "\n", mysqli_error($cnx);
	}
}
function changeBlockName(){
	global $cnx;
	connect();
	$q="UPDATE htmlblocks SET blockName='" . $_POST['newBlockName'] . "' WHERE blockName='" . $_POST['blockName'] . "'";
	if(mysqli_query($cnx, $q)){
		echo 'BlockName changed from ', $_POST['blockName'], ' to ', $_POST['newBlockName'], " was successfull!\nREFRESH YOUR VIEW!!!";
	}else{
		echo 'BlockName change from ', $_POST['blockName'], ' to ', $_POST['newBlockName'], " failed\n", mysqli_error($cnx);
	}
}
function fetchSummariesList(){
	global $cnx;
	connect();
	$q="SELECT summaryName FROM htmlsummaries ORDER BY summaryName";
	$result=mysqli_query($cnx, $q);
	$row;
	$resultArray=[];
	while($row=mysqli_fetch_array($result, MYSQLI_NUM)){
		array_push($resultArray, $row);
	}
	echo json_encode($resultArray);
}
function fetchSummaries(){
	global $cnx;
	connect();
	$q="SELECT * FROM htmlsummaries WHERE summaryName=" . "'" . $_POST['summaryName'] . "'";
	$result=mysqli_query($cnx, $q);
	$resultArray=mysqli_fetch_array($result, MYSQLI_ASSOC);
	echo json_encode($resultArray, JSON_UNESCAPED_SLASHES+JSON_UNESCAPED_UNICODE);
}
function getSummaryNamesAndValues(){
	global $cnx;
	$fields=array_keys($_POST);
	$values=array_values($_POST);
	$values[array_search('summary_es', $fields)]=mysqli_real_escape_string($cnx, $values[array_search('summary_es', $fields)]);
	$values[array_search('paragraph_es', $fields)]=mysqli_real_escape_string($cnx, $values[array_search('paragraph_es', $fields)]);
	$values[array_search('summary_en', $fields)]=mysqli_real_escape_string($cnx, $values[array_search('summary_en', $fields)]);
	$values[array_search('paragraph_en', $fields)]=mysqli_real_escape_string($cnx, $values[array_search('paragraph_en', $fields)]);
	array_shift($fields);
	array_shift($values);
	foreach($values as &$v){
		$v="'" . $v . "'";
	}
	return [$fields, $values];
}
function insertNewSummary(){
	global $cnx;
	connect();
	$data=getSummaryNamesAndValues();
	$fields=implode(', ', $data[0]);
	$values=implode(', ', $data[1]);
	$q="INSERT INTO htmlsummaries ($fields) VALUES ($values)";
	if(mysqli_query($cnx, $q)){
		echo 'New Summary inserted';
	}else{
		echo "Insertion failed:\n", $q, "\n", mysqli_error($cnx);
	}
}
function updateSummary(){
	global $cnx;
	connect();
	$data=getSummaryNamesAndValues();
	$fields=$data[0];
	$values=$data[1];
	array_shift($fields);
	array_shift($values);
	$preQuery="UPDATE htmlsummaries SET ";
	$midQuery="";
	for($i=0; $i<count($fields);$i++){
		$midQuery.="$fields[$i]=$values[$i]";
		if($i<count($fields)-1){
			$midQuery.=", ";
		}
	}
	$postQuery=" WHERE summaryName=" . "'" . $_POST['summaryName'] . "'";
	$q=$preQuery . $midQuery . $postQuery;
	if(mysqli_query($cnx, $q)){
		echo 'Summary updated';
	}else{
		echo "Update failed:\n", $q, "\n", mysqli_error($cnx);
	}
}
function deleteSummary(){
	global $cnx;
	connect();
	$q="DELETE FROM htmlsummaries WHERE summaryName='" . $_POST['summaryName'] . "'";
	if(mysqli_query($cnx, $q)){
		echo "Summary " . $_POST['summaryName'] . " deleted with:\n" . $q;
	}else{
		echo "Deletion of ", $_POST['summaryName'], " failed with:\n" . $q, "\n", mysqli_error($cnx);
	}
}
function changeSummaryName(){
	global $cnx;
	connect();
	$q="UPDATE htmlsummaries SET summaryName='" . $_POST['newSummaryName'] . "' WHERE summaryName='" . $_POST['summaryName'] . "'";
	if(mysqli_query($cnx, $q)){
		echo 'SummaryName changed from ', $_POST['summaryName'], ' to ', $_POST['newSummaryName'], " was successfull!\nREFRESH YOUR VIEW!!!";
	}else{
		echo 'SummaryName change from ', $_POST['summaryName'], ' to ', $_POST['newSummaryName'], " failed\n", mysqli_error($cnx);
	}
}
?>