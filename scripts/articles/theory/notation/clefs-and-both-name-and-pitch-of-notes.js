const template=$ce('template');
template.innerHTML=`<style>
			.svgWrapper{
				position:relative;
				display:flex;
				flex-direction:column;
				justify-content:space-around;
				align-items:center;
				margin:18px 0px;
			}
			#noteHeadWrapper{
				float:right;
				margin-left:18px;
				margin-right:18px;
			}
			#clefFiguresWrapper{
				position:relative;
			}
			@media screen and (max-width:980px){
				#bassClefWrapper{
					margin-top:20px;
				}
			}
		</style>`;
head.append(template.content);
export const article_en =`<h2 id="clefAnchor">The clef: pitch and name indicator</h2>
	<p>Although the relative pitch of a note corresponds to its position: treble notes up and bass down, its specific pitch and name are determined by a symbol called <strong>clef</strong> that is placed <strong>to the left of each staff</strong>, and associates <strong>one of the lines</strong> with both a <strong>fixed pitch</strong> and <strong>name</strong>, consequently defining those of the other positions in the order already known.</p>
	<p>About this clef, the only thing we  need to know for now is that there are two main versions: <strong>treble</strong>, which assigns the pitch and name of <strong>So (G) to the second line</strong>, and <strong>bass</strong>, which gives the name of <strong>Fa (F) to the fourth</strong>.</p>
	<p>It should be noted that the treble clef is the most used when approaching musical studies, while the bass clef is especially used for instruments or voices with a low tone or the low part of some with a wide range such as the piano.</p>
	<p>This illustration presents the distribution of the names in both clefs with <strong>audible notes</strong> to help you become familiar with their corresponding pitches. <strong>Explore it at will!</strong>.</p>
	<figure id="clefFiguresWrapper">
		<figure id="trebleClefWrapper" class="svgWrapper"><figcaption>Assignment of the notes in the treble clef</figcaption></figure>
		<figure id="bassClefWrapper" class="svgWrapper"><figcaption>Assignment of the notes in the bass clef</figcaption></figure>
	</figure>
	<p>And once the procedure to represent the name and tone of the notes is known, the indication of their duration or rhythmic value, as well as that of the occasional lapses of silence between them, remains pending. Let's find out about it in <a href="/en/theory/notation/notes-and-rests">notes and silences</a>.</p>`;
export const article_es =`<h2>La clave: indicador de tonos y nombres</h2>
	<p>Si bien el <strong>tono relativo</strong> de una nota corresponde a su <strong>posición</strong>, agudas hacia arriba y graves hacia abajo, su <strong>tono y nombre específicos</strong> los determina un símbolo llamado <strong>clave</strong> que se coloca <strong>a la izquierda de cada pentagrama</strong>, y asocia <strong>una de las líneas</strong> a una <strong>altura</strong> y <strong>nombre fijos</strong>, definiendo los de las demás posiciones en el orden ya conocido.</p>
	<p>De esta clave, lo único que ahora necesitamos saber es que existen <strong>dos versiones principales</strong> que son la de <strong>Sol</strong>, que asigna su nombre a la segunda línea, y la de <strong>Fa</strong>, que lo da a la cuarta.</p>
	<p>Cabe destacar que la de Sol es la más utilizada al abordar los estudios musicales, mientras que la de Fa es utilizada especialmente para instrumentos o voces de tono grave o la parte grave de algunos de rango extenso como el piano.</p>
	<p>Esta ilustración presenta la distribución de los nombres en ambas claves con <strong>notas audibles</strong> para ayudar a familiarizarse con sus alturas correspondientes. <strong>¡Explórela a placer!</strong>.</p>
	<figure id="clefFiguresWrapper">
		<figure id="trebleClefWrapper" class="svgWrapper"><figcaption>Asignación de las notas en la clave de Sol</figcaption></figure>
		<figure id="bassClefWrapper" class="svgWrapper"><figcaption>Asignación de las notas en la clave de Fa</figcaption></figure>
	</figure>
	<p>Y ya conocido el procedimiento para representar el nombre y tono de las notas, queda pendiente la indicación de su duración o valor rítmico, así como la de los ocasionales lapsos de silencio entre ellas. Pasemos a <a href="/es/teoria/notacion/notas-y-silencios"><strong>notas y silencios</strong></a>.</p>`;
const scorePlayer=window.scorePlayer={};
await import('/scripts/logicSupport/score/playerSound.js')
.then(import('/scripts/logicSupport/articles/notation.js')).catch(e=>{console.error('Error: ', e.message)});



