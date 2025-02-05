<?php
$langs=array('en', 'es');
function getString($es, $en){
	global $lang;
	return $lang==='es'?$es:$en;
}
class Clef{
	public function __construct($id, $label, $pathFragment){
		$this->id=$id;
		$this->label=$label;
		$this->pathFragment=$pathFragment;
	}
}
class Key{
	public function __construct($id, $label){
		$this->id=$id;
        $this->label=$label;
    }
}
class Subject{
	public function __construct($id, $nameFragment, $header){
		$this->id=$id;
		$this->nameFragment=$nameFragment;
		$this->header=$header;
	}
}
class Measure{
	public function __construct($id, $title, $nameFragment){
		$this->id=$id;
		$this->title=$title;
		$this->nameFragment=$nameFragment;
	}
}
function getClefs(){
	global $lang;
	return array(
	new Clef('treble', getString('Clave de Sol', 'Treble Clef'), getString('clave-sol', 'treble-clef')),
	new Clef('bass', getString('Clave de Fa', 'Bass Clef'), getString('clave-fa', 'bass-clef')));
}
function getKeys(){
	global $lang;
	return array(
	new Key('c', getString('Do', 'C')),
    new Key('g', getString('Sol', 'G')),
	new Key('f', getString('Fa', 'F')),
	new Key('d', getString('Re', 'D')),
	new Key('bb', getString('Si bemol', 'B flat')),
	new Key('a', getString('La', 'A')),
	new Key('eb', getString('Mi bemol', 'E flat')) /* */);
}
function getSubjects(){
	global $lang;
	return array(
	new Subject('tonic', getString('tonica', 'tonic'), getString('Tónica', 'Tonic')),
	new Subject('supertonic', getString('supertonica', 'supertonic'), getString('Supertónica', 'Supertonic')),
	new Subject('upperTonic', getString('tonica-superior', 'upper-tonic'), getString('Tónica superior', 'Upper tonic')),
	new Subject('leadingTone', getString('sensible', 'leading-tone'), getString('Sensible', 'Leading tone')),
	new Subject('lowerLeading', getString('sensible-inferior', 'lower-leading'), getString('Sensible inferior', 'Lower Leading Tone')),
	new Subject('review1', getString('repaso1', 'review1'), getString('Repaso-1', 'Review-1')) ,
	new Subject('highSupertonic', getString('supertonica-alta', 'high-supertonic'), getString('Supertónica alta', 'High supertonic')),
	new Subject('review2', getString('repaso2', 'review2'), getString('Repaso-2', 'Review-2')),
	new Subject('dominant1', getString('dominante1', 'dominant1'), getString('Dominante-1', 'Dominant-1')),
	new Subject('dominant2', getString('dominante2', 'dominant2'), getString('Dominante-2', 'Dominant-2')),
	new Subject('mediant', getString('mediante', 'mediant'), getString('Mediante', 'Mediant')),
	new Subject('submediant', getString('submediante', 'submediant'), getString('Submediante', 'Submediant')),
	new Subject('subdominant', getString('subdominante', 'subdominant'), getString('Subdominante', 'Subdominant')),
	new Subject('lowerTetrachord', getString('tetracordo-inferior', 'lower-tetrachord'), getString('Tetracordo inferior', 'Lower tetrachord')),
	new Subject('upperTetrachord', getString('tetracordo-superior', 'upper-tetrachord'), getString('Tetracordo superior', 'Upper tetrachord')),
	new Subject('bothTetrachords', getString('tetracordos-ambos', 'both-tetrachords'), getString('Ambos tetracordos', 'Both tetrachords')));
}
function getMeasures(){
	global $lang;
	return array(NULL, NULL,
	new Measure(24, getString('dos por cuatro', 'two-four'), getString('-dos-por-cuatro', '-two-four')),
	new Measure(34, getString('tres por cuatro', 'three-four'), getString('-tres-por-cuatro', '-three-four')),
	new Measure(44, getString('cuatro por cuatro', 'four-four'), getString('-cuatro-por-cuatro', '-four-four')));
}
$specsArrayEs=[];
$specsArrayEn=[];
$lessonCommonEnglishPathFragmentsArray=[];
foreach($langs as $l){
	$lang=$l;
	$clefs=getClefs();
	foreach($clefs as $clef){
		$clefKey=array_search($clef, $clefs);
		$keys=getKeys();
		foreach($keys as $key){
			$fileBasePath='\\'.$lang.getString('\solfeo-basico\\', '\basic-sight-singing\\').$clef->pathFragment.'\\'.$key->id;
			$directoryPath='..'.$fileBasePath;
			mkdir($directoryPath, 0777, true);
			$keyKey=array_search($key, $keys);
			$subjects=getSubjects();
			foreach($subjects as $subject){
				$subjectKey=array_search($subject, $subjects);
				$measures=getMeasures();
				for($measureKey=2; $measureKey<5; $measureKey++){
					$measure=$measures[$measureKey];
					$filePath=$fileBasePath.'\\'.$subject->nameFragment.$measure->nameFragment;
					if($lang==='en'){
						$lessonCommonPathFragment=$subject->nameFragment;
						array_push($lessonCommonEnglishPathFragmentsArray, $lessonCommonPathFragment);
					}else{
						$lessonCommonPathFragment=array_shift($lessonCommonEnglishPathFragmentsArray);
					}
					$specs=array('lang'=>$lang, 'clef'=>$clef, 'key'=>$key, 'subject'=>$subject, 'measure'=>$measure, 'filePath'=>$filePath, 'lessonPathFragment'=>$lessonCommonPathFragment);
					if($lang==="es"){
						array_push($specsArrayEs, $specs);
					}else{
						array_push($specsArrayEn, $specs);
					}
				}
			}
		}
	}
}
for($i=0; $i<count($specsArrayEs); $i++){
	$specsArrayEs[$i]['mirror']=str_replace('\\', '/', $specsArrayEn[$i]['filePath']);
	$specsArrayEn[$i]['mirror']=str_replace('\\', '/', $specsArrayEs[$i]['filePath']);
	if($i===0){
		$specsArrayEs[$i]['prev']=NULL;
		$specsArrayEn[$i]['prev']=NULL;
	}else{
		$specsArrayEs[$i]['prev']=str_replace('\\', '/', $specsArrayEs[$i-1]['filePath']);
		$specsArrayEn[$i]['prev']=str_replace('\\', '/', $specsArrayEn[$i-1]['filePath']);
	}
	if($i==count($specsArrayEs)-1){
		$specsArrayEs[$i]['next']=NULL;
		$specsArrayEn[$i]['next']=NULL;
	}else{
		$specsArrayEs[$i]['next']=str_replace('\\', '/', $specsArrayEs[$i+1]['filePath']);
		$specsArrayEn[$i]['next']=str_replace('\\', '/', $specsArrayEn[$i+1]['filePath']);
	}
}
$lessonsDir='..\\scripts\\logicSupport\\score';
mkdir($lessonsDir, 0777, true);
$indexFile=fopen($lessonsDir.'\\lessonsIndex.js', 'w');
fwrite($indexFile, "export const lessonsIndex=[];");
foreach($specsArrayEs as $specs){
	$file=fopen('..'.$specs['filePath'].'.html', 'w');
	fwrite($file, createHTML($specs));
	fclose($file);
}
foreach($specsArrayEn as $specs){
	$file=fopen('..'.$specs['filePath'].'.html', 'w');
	fwrite($file, createHTML($specs));
	fclose($file);
}
//fwrite($indexFile, PHP_EOL."scorePlayer.lessonsIndex=lessonsIndex;");
fclose($indexFile);
function createHTML($specs){
	global $lang, $indexFile;
	$lang=$specs['lang'];
	$clef=$specs['clef']->id;
	$key=$specs['key']->id;
	$subject=$specs['subject']->id;
	$measure=$specs['measure']->id;
	$lessonCommonPathFragment=$specs['lessonPathFragment'];
	$mirror=$specs['mirror'];
	$prev=$specs['prev'];
	$next=$specs['next'];
	$lesson="{$clef}-{$key}-{$lessonCommonPathFragment}-{$measure}";
	$title="{$specs['subject']->header} | {$specs['key']->label} ".getString('Mayor', 'Major')." | {$specs['clef']->label} (".getString('en', 'in')." {$specs['measure']->title})";
	$header=$specs['subject']->header.getString(' de ', ' of ').$specs['key']->label.getString(' Mayor en ', ' Major in ').$specs['clef']->label.getString(' (en ', ' (in ').$specs['measure']->title.')';
	$indexName=$specs['subject']->header.' ('.$specs['measure']->title.')';
	$description=getString('Una lección de solfeo: ', 'A sight singing lesson: ').$header;
	$canonical=getString('es/solfeo-basico/clave-sol/c/tonica-dos-por-cuatro', 'en/basic-sight-singing/treble-clef/c/tonic-two-four');
	$analyticsID=getString('2SYQQHRNMS', '9W7N3G01MW');
	fwrite($indexFile, PHP_EOL."lessonsIndex.push({" . "lang:'{$lang}', clef:'{$clef}', key:'{$specs['key']->label}', title:'{$indexName}', path:'" .  str_replace('\\', '/', "{$specs['filePath']}") . "'" . "});");
	return "<!DOCTYPE html>
<html id=\"html\" lang=\"{$lang}-us\" dir=\"ltr\">
	<head id=\"head\">
		<meta charset=\"UTF-8\">
		<meta name=\"viewport\" content=\"width=device-width, user-scalable=yes\">
		<meta name=\"author\" content=\"Jesús Díaz Rodríguez\">
		<meta name=\"description\" content=\"{$description}\">
		<link rel=\"icon\" href=\"/images/favicon.ico\" type=\"image/x-icon\">
		<link rel=\"stylesheet\" href=\"/css/main.css\">
		<link rel=\"stylesheet\" href=\"/css/basic.css\">
		<link rel=\"stylesheet\" href=\"/css/extended.css\">
		<link rel=\"stylesheet\" href=\"/css/apps/player.css\">
		<link rel=\"canonical\" href=\"https://doremitutor.com/{$canonical}\"/>
		<title>{$title}</title>
		<script>
			const PAGE_TYPE = \"lesson\";
			const MIRROR_PAGE = \"{$mirror}\";
			const LESSON = \"{$lesson}\";
			const CLEF=\"{$clef}\";
			const KEY=\"{$key}\";
			const SUBJECT=\"{$subject}\";
			const MEASURE=\"{$measure}\";
			const HEADER = \"{$header}\";
			const PREVIOUS = \"{$prev}\";
			const NEXT = \"{$next}\";
            if(window.location.host.endsWith('.com')){
                import(\"https://www.googletagmanager.com/gtag/js?id=G-{$analyticsID}\")
                .catch(err=>{console.log('Error while importing Analytics: ', err.message);});
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-{$analyticsID}');
            }
		</script>
        <script async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0501143569623969\" crossorigin=\"anonymous\"></script>
		<script defer src=\"/scripts/createHTML.js\"></script>
	</head>
	<body id=\"body\"></body>
</html>";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    html {
        background-color: gray;
    }

    body {
        width: 100%;
        margin: 50px auto;
        text-align: center;
        color: yellow;
        background-color: teal;
    }

    p {
        text-align: left;
        padding-left: 20px;
    }
    </style>
    <title>Lesson Files Factory</title>
</head>

<body>
    <h1>File Factory</h1>
    <p>        
        This page generates all sight-reading degree files.
    </p>
</body>

</html>