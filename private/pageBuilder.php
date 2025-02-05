<?php
if(isset($_GET['path'])){
	$path=trim($_GET['path'], '/');
	if(!preg_match('/e[s|n]\//', substr($path, 0, 3))){
		header('Location: /includes/error.php?msg=Sorry, no language to select!');
		exit();
	}
	$lang=substr($path, 0, 2);
	$path=substr($path, 3);
	$altLang=$lang==='es'?'en':'es';
	$contentFile="contentIncludes/$lang/$path.php";
}else{
	header('Location: /includes/error.php?msg=With .htaccess working fine, this will never happen, index.html always redirects to landing page');
	exit();
}
require_once($contentFile);
function insertHtmlAndStartHead(){
	header('Cache-Control: no-cache, no-store, must-revalidate');
	header('Pragma: no-cache');
	header('Expires: 0');
	global $lang, $altLang, $mirrorPath, $description, $keywords, $title, $pageType;
?>
<!DOCTYPE html>
<html id="html" lang="<?php echo $lang;?>" dir="ltr" data-mirror="/<?php echo $mirrorPath;?>" data-altLang="<?php echo $altLang;?>" data-pageType="<?php echo $pageType;?>">
	<head id="head">
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-201212848-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-2SYQQHRNMS');
		gtag('config', 'G-8H6597K8C9');
		gtag('config', 'G-XFGY582620');
	</script> -->
	<!-- <script data-ad-client="ca-pub-0501143569623969" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> -->
	<!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0501143569623969" crossorigin="anonymous"></script> -->
		<meta charset="UTF-8">
		<meta http-equiv="Cache-Control" content="private, no-store, must-revalidate" />
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="0" />
		<meta name="viewport" content="width=device-width, user-scalable=yes">
		<meta name="author" content="Jesús Díaz Rodríguez">
		<meta name="description" content="<?php echo $description;?>">
		<meta name="keywords" content="<?php echo $keywords;?>">
		<title><?php echo $title;?></title>
		<link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
		<link rel="manifest" href="/app.webmanifest">
		<!-- SERVICE WORKER STUFF
		<script>
            const registerServiceWorker = async () => {
                if ('serviceWorker' in navigator) {
                    try {
                        const registration = await navigator.serviceWorker.register(
                            '/serviceWorker.js' ,
							{
								scope: '/',
							}
                        );
                        if (registration.installing) {
                            console.log('Service worker installing');
                        } else if (registration.waiting) {
                            console.log('Service worker installed');
                        } else if (registration.active) {
                            console.log('Service worker active');
                        }
                    } catch (error) {
                        console.error(`Registration failed with ${error}`);
                    }
                }
            };
            registerServiceWorker();
        </script> -->
		<script src="/scripts/main.js"></script>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400;1,500&display=swap">
		<link rel="stylesheet" href="/css/main.css">
		<link rel="stylesheet" href="/css/nav.css">
<?php
}
function declareServiceWorker($serviceWorker, $scope){
?>		<script>
			const registerServiceWorker = async () => {
			if ('serviceWorker' in navigator) {
				try {
					const registration = await navigator.serviceWorker.register(
						'<?php echo $serviceWorker; ?>',
						{
							scope: '<?php echo $scope; ?>',
						}
					);
					if (registration.installing) {
						console.log('Service worker installing');
					} else if (registration.waiting) {
						console.log('Service worker installed');
					} else if (registration.active) {
						console.log('Service worker active');
					}
				} catch (error) {
					console.error(`Registration failed with ${error}`);
				}
			}
		};
		registerServiceWorker();
		</script>
<?php
}
function closeHeadOpenBodyBeginHeader(){
?>
	</head>
	<body id="body">
		<main id="mainWrapper">
			<h1 id="orientationHint">****** <?php echo getString('Gráficos vistos mejor horizontalmente', 'Graphics better seen horizontally'); ?> ******</h1>
			<header id="header">
<?php
}
function insertAdsScript(){
/* ?>        <script src="/scripts/ads.js"></script>
<?php */
}
function closePage(){
	echo "\t</body>\n</html>";
}
function getString($es, $en){
	global $lang;
	return $lang==='es'?$es:$en;
}
?>