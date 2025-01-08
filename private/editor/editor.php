<?php
if(isset($_POST['function'])){
	if(isset($_POST['type'])){
		$path=$_POST['type']==='true'?'../../scripts/logicSupport/score/lessons/':'./lessonsMasterFiles/';
	}
	switch($_POST['function']){
		case 'loadLesson':
			echo file_get_contents($path.$_POST['fileName'].'.js');
			break;
		case 'saveLesson':
			file_put_contents($path.$_POST['fileName'] . '.js', $_POST['lesson']);
			echo 'file saved';//;$path.$_POST['fileName'].'.js'
			break;
		case 'showLessons':
			$fileList=scandir($path);
			echo implode("\n", $fileList);
			break;
	}
	exit();
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Score Editor</title>
		<meta name="viewport" content="width=device-width">
		<link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
		<link rel="stylesheet" href="support/editor.css">
		<script src="support/editorSoundData.js"></script>
		<script src="support/editorPaths.js"></script>
		<script src="support/editorEnumerators.js"></script>
		<script src="support/editorClasses.js"></script>
		<script src="support/editorLoader.js"></script>
		<script src="support/editorListener.js"></script>
		<script src="support/editorIterator.js"></script>
	</head>
	<body>
		<h1>Score editor - Canvas 952x450</h1>
		<h2>Lesson parameters</h2>
		<div class="lessonNames">
			<label class="lessonNames" for="lessonNames">Nombres(es/en):</label>
			<input id="lessonNames" class="lessonNames" type="text" name="lessonNames" size="80" required value="">
		</div>
		<form  id="specs"class="specs">
			<fieldset class="clef" id="clefFieldset">
				<legend>CLEF</legend>
				<input type="radio" name="clef" value="TREBLE" checked><label for="treble">Treble</label><br>
				<input type="radio" name="clef" value="BASS"><label for="bass">Bass</label><br>
			</fieldset>
			<fieldset class="key" id="keyFieldset">
				<legend>KEY</legend>
				<input type="radio" name="key" value="C" checked><label for="C">C&nbsp;&nbsp;</label>
				<input type="radio" name="key" value="G"><label for="G">G&nbsp;</label>
				<input type="radio" name="key" value="F"><label for="F">F&nbsp;</label>
				<input type="radio" name="key" value="D"><label for="D">D&nbsp;</label><br>
				<input type="radio" name="key" value="Bb"><label for="Bb">Bb</label>
				<input type="radio" name="key" value="A"><label for="A">A&nbsp;</label>
				<input type="radio" name="key" value="Eb"><label for="Eb">Eb</label>
			</fieldset>
			<fieldset class="time" >
				<legend>TIME</legend>
				<input type="radio" name="time" value="TWO_BY_FOUR"><label for="2x4">2X4</label>
				<input type="radio" name="time" value="THREE_BY_FOUR"><label for="3x4">3X4</label><br>
				<input type="radio" name="time" value="FOUR_BY_FOUR" checked><label for="4x4">4X4</label>
				<input type="radio" name="time" value="SIX_BY_EIGHT"><label for="6x8">6X8</label>
			</fieldset>
			<fieldset class="tempo">
				<legend>TEMPO</legend>
				<span class="tempo" id="tempoLabel"></span><br>
				<input type="range" name="tempo" id="tempo">
			</fieldset>
		</form>
		<div class="buttonWrapper">
			<button class="ab" id="new">New Lesson</button>
			<button class="ab" id="loadMasterLesson">Load master lesson</button>
			<button class="ab" id="loadPlayerLesson">Load player lesson</button>
			<button class="ab" id="showPlayerLessons">Show player lessons</button>
		</div>
		<div class="buttonWrapper">
			<button class="ab" id="reset">Reset</button>
			<button class="ab" id="saveMasterLesson">Save master lesson</button>
			<button class="ab" id="savePlayerLesson">Save player lesson</button>
			<button class="ab" id="showMasterLessons">Show master lessons</button>
		</div>
		<canvas id="canvas" width="952" height="450" tabindex="6"></canvas>
		<div class="indicators">
			<div class="indicatorBlock">
				<span class="indicator" id="SHARP">SHARP</span>
				<span class="indicator" id="FLAT">FLAT</span>
				<span class="indicator" id="NATURAL">NATURAL</span>
			</div><div class="indicatorBlock">
				<span class="indicator" id="DOT">DOT</span>
				<span class="indicator" id="DOUBLE_DOT">DOUBLE DOT</span>
				<span class="indicator" id="TRIPPLET">TRIPPLET</span>
			</div><div class="indicatorBlock">
				<span class="indicator" id="LINKED">LINKED</span>
				<span class="indicator" id="GROUPED">GROUPED</span>
			</div><div class="indicatorBlock">
				<span class="indicator">OCTAVE: <span id="OCTAVE">UNDEFINED</span></span>
				<span class="indicator">RHYTHM: <span id="RHYTHM">QUARTER</span></span>
			</div>
		</div>
		<div class="buttonWrapper">
			<button type="button" class="ab transport" id="loadSequence">Load Sequence</button>
			<button type="button" class="ab transport" id="rw">Rewind</button>
			<button type="button" class="ab transport" id="playPause"></button>
		</div>
	</body>
</html>