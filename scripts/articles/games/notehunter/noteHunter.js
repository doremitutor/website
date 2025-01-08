const UIcode=`<div id="noteHunterWrapper" class="flex column">
    <p id="noteButtonsLabel"></p>
    <canvas id="canvas" width="952" height="324" data-clef="${CLEF}"></canvas>
    <div id="noteButtonsWrapper" class="flex row">
        <button id="C" class="button-like noteHunter-corner-hard">Do / C</button>
        <button id="D" class="button-like noteHunter-corner-hard">Re / D</button>
        <button id="E" class="button-like noteHunter-corner-hard">Mi / E</button>
        <button id="F" class="button-like noteHunter-corner-hard">Fa / F</button>
        <button id="G" class="button-like noteHunter-corner-hard"></button>
        <button id="A" class="button-like noteHunter-corner-hard">La / A</button>
        <button id="B" class="button-like noteHunter-corner-hard"></button>
    </div>
    <div id="transportWrapper" class="flex row">
        <button id="clearRecord" class="clearRecord button-like noteHunter-corner-hard"></button>
        <button id="endReset" class="endReset button-like noteHunter-corner-hard"></button>
        <button id="playPause" class="playPause button-like noteHunter-corner-hard"></button>
    </div>
    <div id="panelWrapper">
        <div id="recordWrapper" class="noteHunterBorder flex column">
            <p id="recordLabel" class="wrapperLabel"></p>
            <p id="recordContent""></p>
        </div>
        <div id="scoreWrapper" class="noteHunterBorder flex column">
            <p id="scoreLabel" class="wrapperLabel"></p>
            <p id="scoreContent"></p>
        </div>
        <div id="rangeWrapper" class="noteHunterBorder flex column">
            <p id="rangeLabel" class="wrapperLabel"></p>
            <form id="rangeForm" class="flex row">
                <span>
                    <input type="radio" name="range" id="full" value="full" class="radioButton" checked>
                    <label id="rangeAll" for="full" ></label>
                </span>
                <span>
                    <input type="radio" name="range" id="high" value="high" class="radioButton">
                    <label id="rangeHigh" id="" for="high"></label>
                </span>
                <span>
                    <input type="radio" name="range" id="center" value="center" class="radioButton">
                    <label id="rangeCenter" for="center"></label>
                </span>
                <span>
                    <input type="radio" name="range" id="low" value="low" class="radioButton">
                    <label id="rangeLow" for="low"></label>
                </span>
            </form>
        </div>
        <div id="statusWrapper" class="noteHunterBorder flex column">
            <p id="statusLabel" class="wrapperLabel"></p>
            <div class="statusContentWrapper">
                <p id="statusContent"></h3>
            </div>
        </div>
        <div id="descriptionWrapper" class="noteHunterBorder flex column">
            <p id="descriptionLabel"></p>
            <menu id="descriptionContent" class="flex column"></menu>
        </div>
    </div>
</div>`;
const trebleEn=`<h2>Play, the most subtle way to learn.</h2>
    <p>Of all the clefs that have ever been used, the G clef is the predominant one whose mastery becomes more necessary, which with the Notehunter is far from being a matter of formal commitment to study.</p>
    <p>Just entertain yourself by practicing your aim challenging your own necessarily progressive marks. Inevitably, in less than you imagine, you will be completely familiar with all the treble clef staff positions.</p>
    <p>For those interested in the bass cleff, <a href="/en/games/notehunter/notehunter-bass-clef">here is that version</a>.</p>
    <p>More details can be found in <a href="/en/theory/notation/clefs-and-both-name-and-pitch-of-notes#trebleClefWrapper" target="_blank">the writing page</a>.</p>
    ${UIcode}`;
const trebleEs=`<h2>Jugar, la forma más inadvertida de aprender.</h2>
    <p>De todas las claves que alguna vez se han utilizado, es la de sol la predominante y cuyo dominio se hace más necesario, lo que con el Cazanotas queda muy lejos de ser cuestión de compromiso formal de estudio.</p>
    <p>Simplemente distráigase practicando su puntería desafiando sus propias marcas necesariamente progresivas. Inevitablemente, en menos de lo que imagina, le serán completamente familiares todas las posiciones del pentagrama en clave de sol.</p>
    <p>Para los interesados en dominar la clave de fa, <a href="/es/juegos/cazanotas/cazanotas-clave-fa">aquí está su versión</a>.</p>
    <p>Mayores detalles sobre ambas claves se pueden encontrar en <a href="/es/teoria/notacion/claves-y-nombre-y-tono-de-las-notas#trebleClefWrapper" target="_blank">la página de la escritura</a>.</p>
    ${UIcode}`;
const bassEn=`<h2>Now for adult male voices, bass guitar, trombone, tuba, cello, etc.</h2>
    <p>La música para varones adultos e instrumentos de tonos graves sería incómoda de escribir (y leer) en la clave de sol, por lo que se emplea la de fa. Aquí tenemos el Cazanotas correspondiente.</p>
    <p>Regresar a <a href="/es/juegos/cazanotas/cazanotas-clave-sol">Cazanotas en clave de Sol</a>.</p>
    <p>Mayores detalles sobre ambas claves se pueden encontrar en <a href="#clefAnchor" target="_blank">la página de la escritura</a>.</p>
    ${UIcode}
    <p>Esta modesta aplicación está diseñada especialmente para facilitar el dominio de la notación musical. Si le ha parecido de algún modo constructiva y edificante, <strong>considere contribuir a producir más material educativo como éste</strong>.</p>`;
const bassEs=`<h2>Ahora para voces adultas masculinas, guitarra bajo, trombón, tuba, chelo, etc.</h2>
    <p>La música para varones adultos e instrumentos de tonos graves sería incómoda de escribir (y leer) en la clave de sol, por lo que se emplea la de fa. Aquí tenemos el Cazanotas correspondiente.</p>
    <p>Regresar a <a href="/es/juegos/cazanotas/cazanotas-clave-sol">Cazanotas en clave de Sol</a>.</p>
    <p>Mayores detalles sobre ambas claves se pueden encontrar en <a href="/es/teoria/notacion/claves-y-nombre-y-tono-de-las-notas#trebleClefWrapper" target="_blank">la página de la escritura</a>.</p>
    ${UIcode}
    <p>Esta modesta aplicación está diseñada especialmente para facilitar el dominio de la notación musical. Si le ha parecido de algún modo constructiva y edificante, <strong>considere contribuir a producir más material educativo como éste</strong>.</p>`;
export const article_es=CLEF==='treble'?trebleEs:bassEs;
export const article_en=CLEF==='treble'?trebleEn:bassEn;
import('/scripts/logicSupport/games/notehunter/notehunter.js')
.catch(e=>{console.error('Error: ', e.message)});