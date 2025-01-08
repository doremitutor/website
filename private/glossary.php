<?php
$title='Glossary';
$keywords='';
$description='';
$mirrorPath='es/glosario';
$pageType='general';
ob_start();
insertHtmlAndStartHead();
?>
        <link rel="stylesheet" href="/css/generalPage.css">
        <style>
            def{
                font-weight:bold;
            }
            #glossary h2{
                font-size:1.2rem;
                font-weight:normal;
                margin-left:0;
                text-align:center;
                color:var(--bg-color);
                background-color:var(--dark-color);
            }
            dl{
                margin-left:1rem;
            }
            dt{
                margin-top:0.5rem;
                margin-left:3rem;
                margin-bottom:0.5rem;
                font-size:1.1rem;
                font-weight:bold;
            }
            dt::after{
                content:':';
            }
            dd{
                margin-bottom:1rem;
            }
        </style>
<?php
closeHeadOpenBodyBeginHeader();
?>
            <h1>Glossary of terms</h1>
            <p>Definitions and explanations</p>
        </header>
        <article id="glossary">
            <h2>Types of measures</h2>
            <dl>
                <dt id="two-by-four">Two by four</dt>
                <dd>The two by four measure is a measure of two beats, a quarter note corresponding to each as its time unit. The first of them is strong, which is indicated by a high-pitch metronome tick, and the second weak, indicated by a lower-pich one. Manually. its marking is realized as indicated in the figure to the right: first beat downwards and second upwards.</dd>
                <dt id="three-by-four">Three by four</dt>
                <dd>The three by four measure is a measure of three beats, a quarter note corresponding to each as its time unit. The first of them is strong, which is indicated by a high-pitch metronome tick, and the other two weak, each indicated by a lower-pich one. For more detail and indications about keeping the measure manually, please consult <a href="/theory/time/measure-keeping.php#three-beats" target="_blank">Manual keeping of measure</a>.<br>For details about the quarter note and rest, see <a href="/theory/time/rhythm.php" target="_blank">Rhythm</a>.</dd>
                <dt id="four-by-four">Four by four</dt>
                <dd>The four by four measure is a measure of four beats, a quarter note corresponding to each as its time unit. The first of them is strong, which is indicated by a high-pitch metronome tick, and the rest of them weak, each indicated by a lower-pich one. For more detail and indications about keeping the measure manually, please consult <a href="/theory/time/measure-keeping.php#four-beats" target="_blank">Manual keeping of measure</a>.<br>For details about the quarter note and rest, see <a href="/theory/time/rhythm.php" target="_blank">Rhythm</a>.</dd>
            </dl>
            <h2>Keys</h2>
            <dl>
                <dt id="c-major">C major</dt>
                <dd></dd>
                <dt id="g-major">G major</dt>
                <dd></dd>
                <dt id="f-major">Fa major</dt>
                <dd></dd>
                <dt id="d-major">D major</dt>
                <dd></dd>
                <dt id="bFlat-major">B flat major</dt>
                <dd></dd>
                <dt id="a-major">A major</dt>
                <dd></dd>
                <dt id="eFlat-major">E flat major</dt>
                <dd></dd>
            </dl>
            <h2>Clefs</h2>
            <dl>
                <dt id="treble-clef">Treble clef</dt>
                <dd></dd>
                <dt id="bass-clef">Bass clef</dt>
                <dd></dd>
            </dl>
            <h2>Subjects of lessons</h2>
            <dl>
                <dt id="tonic">First degree or tonic</dt>
                <dd>In any scale, the function of the first degree or tonic is to serve as a tonal reference for the others, so it is attributed full stability, being the pitch toward which they need to resolve to satisfy the hearing.<br>This lesson presents exclusively the note Do (C) as the tonic of the scale of Do (C). Lacking any tension, this function induces a sensation of stillnes, safeness, restness, satisfaction, and even monotony. Nevertheless, the tediousness from the exercise proves more than compensated with the opportunity to get consciously acquainted with the stability from the tonic, besides being the starting point to develop the skill of recognition the remaining degrees.</dd>
                <dt id="supertonic">Second degree or supertonic</dt>
                <dd></dd>
                <dt id="upper-tonic">Upper tonic</dt>
                <dd></dd>
                <dt id="leading-tone">Leading tone</dt>
                <dd></dd>
                <dt id="lower-leading">Lower leading tone</dt>
                <dd></dd>
                <dt id="review-1">Review 1</dt>
                <dd></dd>
                <dt id="high-supertonic">High supertonic</dt>
                <dd></dd>
                <dt id="review-2">Review 2</dt>
                <dd></dd>
                <dt id="dominant-1">Fifth degree or dominant 1</dt>
                <dd></dd>
                <dt id="dominant-2">Fifth degree or dominant 2</dt>
                <dd></dd>
                <dt id="mediant">Third degree or mediant</dt>
                <dd></dd>
                <dt id="submediant">Sixth degree or submediant</dt>
                <dd></dd>
                <dt id="subdominant">Four degree os subdominant</dt>
                <dd></dd>
                <dt id="lower-tetrachord">Lower tetrachord</dt>
                <dd></dd>
                <dt id="upper-tetrachord">Upper tetrachord</dt>
                <dd></dd>
                <dt id="both-tetrachords">Both tetrachords</dt>
                <dd></dd>
            </dl>
            <h2>Player</h2>
            <dl>
                <dt id="player">Directions</dt>
                <dd>
                    <ul>
                        <li><b>Full rewind</b> button is enabled from the second bar on. Rewinding is automatic upon finishing the exercise.</li>
                        <li><b>Repeat last start</b> button is enabled when the exercise has been stopped and resumed from the second bar on to allow reviewing a specific passage.</li>
                        <li><b>Important!</b>: the activatation of these buttons may be simulated by clicking or touching the corresponding areas above them <b>directly on the score</b>.</li>
                        <li>To obtain or remember the exercise's tonic, <b>Tonic pitch for tunning (2 sec)</b> button is enabled whenever the player is stopped.</li>
                        <li><b>Metronome Volume</b> control is an offset resource. To mute the metronome uncheck the <b>Audible Metronome</b> box.</li>
                        <li>Excepting <b>Tempo</b> control value, which is particular to each exercise, all other preferences are remembered if the browser has local storage enabled.</li>
                    </ul>
                </dd>
                <dt id="ode">Ode to Joy (Ludwig van Beethoven)</dt>
                <dd>Of the probably best-known work from this classic author, is this small passage adapted for presentation to the doremitutor community of this application to learn or practice solfège.</dd>
            </dl>
        </article>
    </main>
<?php
insertAdsScript();
//insertLogoAndLangButtonScript();
closePage();
ob_flush();
ob_end_clean();
?>