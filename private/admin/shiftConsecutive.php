<?php
$msg='<h1>Site under maintenance/Sitio en mantenimiento</h1>';
$cnx=@mysqli_connect('gator4047.hostgator.com', 'cuatemoc_drmAdm', 'abril134073', 'cuatemoc_doremitutor') OR DIE($msg . 'Error: ' . mysqli_connect_error());
//$cnx=@mysqli_connect('localhost', 'cms_admin', 'abril1338', 'doremitutor') OR DIE($msg . mysqli_connect_error());
mysqli_set_charset($cnx, 'utf8');
$upperConsecutive=450;
while($upperConsecutive>0){
	$q="SELECT consecutive FROM htmlfields WHERE consecutive<'$upperConsecutive' ORDER BY consecutive DESC LIMIT 1";
	$result=mysqli_query($cnx, $q);
	$resultArray=mysqli_fetch_array($result, MYSQLI_ASSOC);
	$upperConsecutive=$resultArray['consecutive'];
	$newConsecutive=$upperConsecutive+1;
	echo "About changing consecutive from: ", $upperConsecutive, " to this: ", $newConsecutive, "<br>";
	$q="UPDATE htmlfields SET consecutive='$newConsecutive' WHERE consecutive='$upperConsecutive'";
	$result=mysqli_query($cnx, $q);
	echo "Sucess?: ", $result;
}
?>