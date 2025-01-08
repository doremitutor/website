<html>
<body bgcolor="white">
<h1>From /private</h1>
<?PHP
phpinfo();
?>
<h1>Extensions</h1>
<?PHP
$ext=get_loaded_extensions();
foreach($ext as $e){
	echo $e;?></br><?PHP
}
?>
</body>
</html>

