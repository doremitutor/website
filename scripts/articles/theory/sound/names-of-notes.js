const template=$ce('template');
template.innerHTML=`<style>
			#article .noteNameParagraph{
				text-align:center;
				margin-left:0;
			}
			#article .noteNameParagraph strong{
				font-weight:800;
			}
			#largeScaleNotesSvg{
				display:block;
				width:928px;
				height:60px;
				margin:0 auto 1.5rem;
			}
			#kbNotesSvg{
				display:block;
				width:928px;
				height:120px;
				margin:0 auto 1.5rem;
			}
			#buttonsWrapper{
				display:flex;
				flex-direction:row;
				justify-content:center;
				align-items: center;
				margin-bottom:1rem;
			}
			#buttonsWrapper button{
				width:180px;
				height:75px;
				margin:0 20px;
				font-size:28px;
				font-weight:bold;
			}
			#horizNamedNotesSvg{
				display:block;
				width:880px;
				height:88x;
				margin:0 auto 1.5rem;
			}
			@media screen and (max-width:980px){
				.noteNameParagraph{
					font-size:0.8rem;
					letter-spacing:-1px;
				}
				#largeScaleNotesSvg{
					margin-bottom:0.5rem;
				}
				#kbNotesSvg{
					margin-bottom:0.5rem;
				}
				#buttonsWrapper{
					margin-bottom:0.5rem;
				}
				#horizNamedNotesSvg{
					margin-bottom:0.5rem;
				}
			}
			@media screen and (max-width:980px) and (orientation:landscape){
				.noteNameParagraph{
					font-size:1.4rem;
				}
			}
			@media screen and (min-width:981px){
				.noteNameParagraph{
					font-size:2rem;
				}
			}
		</style>`;
head.append(template.content);
window.doubleScale=true;
const largeScale=`<figure id="largeScaleWrapper">
		<figcaption>${$str('Fragmento de la escala general con nombres en ambos sistemas', 'Fragment of the general scale labelled in both systems')}</figcaption>
	</figure>`;
const kbNotes=`<figure id="kbNotesWrapper">
		<figcaption>${$str('Ubicación de las notas del fragmento anterior en un instrumento de teclado', 'Location of the notes of the previous fragment on a keyboard instrument')}</figcaption>
	</figure>`;
const buttons=`<button id="_8notesUp" class="button-like corner-hard">${$str('Hacia<br>arriba', 'Upwards')}<button id="_8notesDown" class="button-like corner-hard">${$str('Hacia<br>abajo', 'Downwards')}</button></button><button id="reset1" class="button-like corner-hard">${$str('Parar', 'Stop')}</button>`;
const horizNamedScale=`<figure id="horizNamedScaleWrapper">
	<figcaption>${$str('Pulse o toque los botones para escuchar -y cantar- la escala completa', 'Click or tap the buttons to hear - and sing - the full scale')}</figcaption>
		<div id="buttonsWrapper">
			${buttons}
		</div>
	</figure>`;
export const article_en =`<h2>In the end, it all comes down to seven names or classes</h2>
	<p>The seven names mentioned in the previous lesson are simple the first seven letters of the alphabet, <strong>always capitalized</strong>, in their natural order <strong>but starting in C</strong>, like this:</p>
	<p class="noteNameParagraph"><strong>C</strong>, &nbsp <strong>D</strong>, &nbsp <strong>E</strong>, &nbsp <strong>F</strong>, &nbsp <strong>G</strong>, &nbsp <strong>A</strong>, &nbsp and &nbsp <strong>B</strong></p>
	<p>These names are assigned in this strict order and repeated successively throughout the general scale, as will be illustrated below. All notes that share a name are considered to form a class to which that name is assigned.
	</p>
	<p><strong>But wait!!</strong> Speaking of those note or class names, we have <strong>more than a single choice</strong>, and the former are just the ones used in <strong>English-</strong> and <strong>Dutch-speaking</strong> regions, but there is another system to name them that comes from <strong>some syllabes of the Latin Hymn to St. John the Baptist</strong>, a little stilted and that may seem somewhat pretentious but with some advantage. Luckily, memorizing the corresponding equivalences presented below is as easy as it is necessary:</p>
	<p class="noteNameParagraph"><strong>C - Do</strong>, <strong>D - Re</strong>, <strong>E - Mi</strong>, <strong>F - Fa</strong>, <strong>G - So</strong>, <strong>A - La</strong>, &nbsp;and &nbsp;<strong>B - Ti</strong></p>
	<p>It is pretty obvious the counterintuitive equivalence between the third letter <strong>C</strong> and the first note <strong>Do</strong> as well as the others, but it is just a matter of habit and memorization. Nothing to worry about.</p>
	<p>It is worth mentioning that although all formal documentation and even computer programs utilize the letter-names, singing music with the latin ones may be more suitable (and perhaps elegant). Just for that reason, let's stick to the latin names for a while to see if we can get used to them.</p>
	<p>The following shows the representation of the same fragment of the general scale with the names of the notes in both systems. Note the cyclical repetition of the names:</p>
	${largeScale}
	<p>It is important to clarify that the names and the tones or heights of the notes are <strong>conventionally preset</strong> properties and <strong>specific</strong> for each one of them, which means that each note corresponds to a <strong>fixed</strong> name and a <strong>unique</strong> and <strong>invariable</strong> particular tone.</p>
	<h2>Keyboards show them white</h2>
	<p>These notes are attributed the status of <strong>natural</strong>, and an interesting fact is that they correspond to the uniformly and continuously distributed white keys on keyboard instruments such as the piano. We will take care of the exploration of the others soon.</p>
	${kbNotes}
	<h2>This is our first vocal practice</h2>
	<p>The following demonstration reuses the scale from the previous lessons, this time identifying the notes by their names as an exhortation to sing them in sync with their ascending and descending playback. Explore it at your leisure to become familiar with it.</p>
	<p>It is to be remembered that the eighth note is like a repetition of the first one, included to induce an effect of returning to the initial sensation of rest at the end of the scale, but that it is actually the first note of a next similar scale, such as it can be seen in the fragment of the general scale just illustrated.</p>
	<p>In addition, with some attention, the same sensation of completion or auditory satisfaction can be noted when listening to or singing the scale in <strong>descending direction</strong>. A sensation of greater interest and importance, as we will see a little later in this section.
	</p>
	${horizNamedScale}
	<p>This scale, made up of the seven musical notes, that is, with a note from each class plus the repetition of the first, is our starting point for the presentation of some fundamental concepts such as <strong>extension</strong> or <strong>distance</strong> in the next lesson, <a href="/en/theory/sound/scales-and-octaves">scales and octaves</a>.</p>`;
export const article_es =`<h2>Finalmente, todo se reduce a siete nombres o clases</h2>
	<p>Los siete nombres mencionados en la lección anterior tienen como origen algunas sílabas iniciales del Himno a San Juan Bautista en Latín y son:</p>
	<p class="noteNameParagraph"><strong>Do</strong>, &nbsp <strong>Re</strong>, &nbsp <strong>Mi</strong>, &nbsp <strong>Fa</strong>, &nbsp <strong>Sol</strong>, &nbsp <strong>La</strong> &nbsp y &nbsp <strong>Si</strong></p>
	<p>Estos nombres son asignados en este orden estricto y repetidos sucesivamente por toda la escala general, como se ilustrará enseguida. Todas las notas que comparten nombre se consideran formar una <strong>clase</strong> a la que se le asigna ese nombre.</p>
	<p>Sin embargo, estos nombres no siempre predominan en la literatura ni la notación musical serias. En algunos casos se utilizan los <strong>nombres en Inglés</strong>, que simplemente son las primeras siete letras del alfabeto, <strong>invariablemente en mayúsculas</strong>, en su orden natural pero <strong>empezando con la C</strong>.</p>
	<p class="noteNameParagraph"><strong>Do - C</strong>, <strong>Re - D</strong>, <strong>Mi - E</strong>, <strong>Fa - F</strong>, <strong>Sol - G</strong>, <strong>La - A</strong> &nbsp;y &nbsp;<strong>Si - B</strong></p>
	<p>Por suerte, memorizar estas equivalencias resulta tan fácil como necesario, aunque salta a la vista la contraintuitiva relación entre la primera nota <strong>Do</strong> y la tercera letra <strong>C</strong> así como las subsecuentes, pero es simplemente cuestión de costumbre y memorización. Nuevamente, nada de qué preocuparse.</p>
	<p>Vale la pena mencionar que aunque en Español siempre cantamos las notas pronunciando los nombres presentados inicialmente, en la documentación formal, incluyendo programas de computadora, predomina el sistema Inglés.</p>
	<p>A continuación se muestra la representación de un mismo fragmento de la escala general con los nombres de las notas o la <strong>clase</strong> de éstas en ambos sistemas. Nótese la repetición cíclica de los nombres, consecuencia de la consonancia:</p>
	${largeScale}
	<p>Es de aclarar que los nombres y los tonos o alturas de las notas son propiedades <strong>preestablecidas convencionalmente</strong> y <strong>específicas</strong> para cada una de ellas, lo que significa que a cada nota corresponde un nombre <strong>fijo</strong> y un tono particular <strong>único</strong> e <strong>invariable</strong>.</p>
	<h2>Los teclados las muestran blancas</h2>
	<p>A estas notas se les atribuye la condición de <strong>naturales</strong>, y un dato interesante es que éstas corresponden a las <strong>teclas blancas</strong> distribuidas uniforme y continuamente en los instrumentos de teclado como el piano. De la exploración de las otras nos encargaremos pronto.</p>
	${kbNotes}
	<h2>Ésta es nuestra primera práctica vocal</h2>
	<p>La demostración siguiente reutiliza la escala de las lecciones anteriores, esta vez identificando las notas por sus nombres como exhortación a cantarlos en sincronía con su reproducción ascendente y descendente. Explórela a placer para familiarizarse con ella.</p>
	<p>Es de recordar que la octava nota es como una repetición de la primera, incluida para inducir un efecto de regreso a la sensación inicial de reposo al término de la escala, pero que en realidad es la primera nota de una siguiente escala similar, como se puede observar en el fragmento de la escala general recién ilustrado.</p>
	<!--<h2>Una sensación para tomar en cuenta</h2>-->
	<p>Además, con algo de atención, es de notarse la misma sensación de terminación o satisfacción auditiva al escucharse o cantarse la escala en <strong>direccion descendente</strong>. Sensación del mayor interés e importancia, como veremos un poco más adelante en esta misma sección.</p>
	${horizNamedScale}
	<p>Esta escala, formada por las siete notas musicales, es decir, con una nota de cada clase más la repetición de la primera, es nuestro punto de partida para la presentación de algunos conceptos fundamentales como <strong>extensión</strong> o <strong>distancia</strong> en la siguiente lección, <a href="/es/teoria/sonido/escalas-y-octavas"><strong>escalas y octavas</strong></a>.</p>`;
const scorePlayer=window.scorePlayer={};
await import('/scripts/logicSupport/score/playerSound.js').catch(e=>{console.error('Error: ', e.message)});
import('/scripts/logicSupport/articles/sound.js').catch(e=>{console.error('Error: ', e.message)});





