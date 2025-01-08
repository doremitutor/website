const template=$ce('template');
template.innerHTML=`<style>
			/* .svgWrapper{
				position:relative;
				display:flex;
				flex-direction:column;
				justify-content:space-around;
				align-items:center;
				margin:18px auto;
			} */
			#staffPaper{
				background-color:white;
			}
			#noteHeadWrapper, #quarterNoteWrapper, #quarterRestWrapper{
				float:right;
				margin-left:18px;
				margin-right:18px;
			}
			#clefFiguresWrapper{
				position:relative;
			}
		</style>`;
head.append(template.content);
export const article_en =`<p>Essentially, music writing poses a double need: <strong>where to write the notes</strong> and <strong>how to represent them</strong>.</p>
	<h2>Where? On the staff</h2>
	<p>The solution to the first one is a format of <strong>five equidistant horizontal lines</strong> that is called a <strong>staff</strong> and is used like the lines of school notebooks or lined letter paper. Lines that, like their intermediate spaces, are identified by ordinally numbering them <strong>from bottom to top</strong>, as seen in this illustration.</p>
	<figure id="plainStaffWrapper" class="svgWrapper"><figcaption>Staff with spaces and numbered lines</figcaption></figure>
	<p>The paper with printed staves is known as <strong>manuscript</strong>, <strong>staff</strong>, or just <strong>music paper</strong>, and the following is a sample with four staves.</p>
	<figure id="staffPaperWrapper" class="svgWrapper"><figcaption>Staff paper sample with four staves</figcaption></figure>
	<figure id="noteHeadWrapper" class="svgWrapper"><figcaption>Notehead</figcaption></figure>
	<h2>How? With specific symbols</h2>
	<p>As for the second one, the writing or representation of the notes, for now we only need to know that it is done with a symbol that invariably has or consists of an oval called <strong>head</strong>, almost always tilted like the one shown, which for the moment will sufice to illustrate some of the following ideas.</p>
	<h2>Natural positions</h2>
	<p>Back to the staff, its <strong>lines</strong> and intermediate <strong>spaces</strong> are the vertical positions where the notes are drawn or written, logically corresponding successive notes to equally successive positions, whether they are lines or spaces, and also logically with the highest notes upwards and the lowest downwards.</p>
	<figure id="linesAndSpacesWrapper" class="svgWrapper"><figcaption>Note positions on the staff:<br>either on the lines, or in the intermediate spaces</figcaption></figure>
	<p>But these are just the ones immediately available directly on the staff. For more options, let's move on to the lesson on a <a href="/en/theory/notation/staff-extensions"><strong>staff extensions</strong></a>.</p>`;
export const article_es =`<p>Esencialmente, la escritura musical plantea una doble necesidad: <strong>dónde escribir las notas</strong> y <strong>cómo representarlas</strong>.</p>
	<h2>¿Dónde? En el pentagrama</h2>
	<p>La solución a la primera es un formato de <strong>cinco líneas horizontales equidistantes</strong> que recibe el nombre de <strong>pentagrama</strong> y es usado como los renglones de los cuadernos escolares o el papel carta rayado. Líneas que al igual que sus espacios intermedios se identifican enumerándolas ordinalmente de <strong>abajo hacia arriba</strong>, como se ve en esta ilustración.</p>
	<figure id="plainStaffWrapper" class="svgWrapper"><figcaption>Pentagrama con espacios y líneas enumeradas</figcaption></figure>
	<p>El papel con pentagramas impresos se conoce como <strong>papel pautado</strong>, y la siguiente es una muestra con cuatro pentagramas.</p>
	<figure id="staffPaperWrapper" class="svgWrapper"><figcaption>Muestra de papel pautado con cuatro pentagramas</figcaption></figure>
	<figure id="noteHeadWrapper" class="svgWrapper"><figcaption>Cabeza<br>de nota</figcaption></figure>
	<h2>¿Cómo? Con símbolos específicos</h2>
	<p>En cuanto a la segunda, la escritura o representación de las notas, por ahora sólo necesitamos saber que se realiza con un símbolo que invariablemente tiene o consiste de un óvalo llamado <strong>cabeza</strong>, casi siempre inclinado como el mostrado, el que de momento nos bastará para ilustrar algunas de las siguientes ideas.</p>
	<h2>Posiciones naturales</h2>
	<p>Regresando al pentagrama, son sus <strong>líneas</strong> y <strong>espacios</strong> intermedios las posiciones verticales en donde se trazan o escriben las notas, correspondiendo lógicamente notas sucesivas a posiciones igualmente sucesivas, ya sean líneas o espacios, y tambien lógicamente con las notas más agudas hacia arriba y las más graves hacia abajo.</p>
	<figure id="linesAndSpacesWrapper" class="svgWrapper"><figcaption>Posiciones de las notas en el pentagrama:<br>o bien sobre las líneas, o bien en los espacios intermedios</figcaption></figure>
	<p>Pero éstas son únicamente las disponibles de inmediato directamente sobre el pentagrama. Para conocer más opciones, pasemos a la lección sobre las <a href="/es/teoria/notacion/extensiones-del-pentagrama"><strong>extensiones del pentagrama</strong></a>.</p>`;
import('/scripts/logicSupport/articles/notation.js').catch(e=>{console.error('Error: ', e.message)});