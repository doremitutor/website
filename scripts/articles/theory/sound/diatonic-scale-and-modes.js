const template=$ce('template');
template.innerHTML=`<style>
			#diatonicScaleSvg{
				display:block;
				margin:0 auto;
			}
			#buttonsAndSvgsWrapper{
				display:flex;
				flex-direction:row;
				justify-content:space-evenly;
			}
			#buttonsWrapper{
				display:grid;
				align-content:space-between;
				grid-template-columns:1fr 1fr;
				grid-template-rows:auto;
				grid-auto-flow:row;
				width:184px;
				height:315px;
			}
			#scalesWrapper{
				display:grid;
				grid-template-columns:1fr;
				grid-template-rows:auto;
				grid-auto-flow:row;
				width:740px;
				height:315px;
			}
			#modesTableWrapper{
				margin-bottom:1rem;
			}
			#buttonsWrapper button{
				font-size:22px;
				font-weight:bold;
				width:90px;
				height:41px;
			}
			#reset3{
				font-size:28px;
				font-weight:bold;
				width:120px;
				height:50px;
				margin-bottom:1rem;
			}
			@media screen and (max-width:980px){
				#reset3{
					margin-bottom:0.5rem;
				}
			}
		</style>`;
head.append(template.content);
const diatonicPattern=`<figure id="diatonicPatternWrapper">
		<figcaption>${$str('Patrón diatónico (T=tono, S=semitono)', 'Diatonic pattern (T = tone, S = semitone)')}</figcaption>
	</figure>`;
	const modesTable=`<figure id="modesTableWrapper">
		<figcaption id="scalesModes">${$str('Modos de las escalas (nombres omitidos por simplicidad, no se necesitan por ahora)', 'Scale modes (names omitted for simplicity, not needed for now)')}</figcaption>
		<button id="reset3" class="button-like corner-hard">${$str('Parar', 'Stop')}</button>
		<div id="buttonsAndSvgsWrapper">
			<div id="buttonsWrapper"></div>
			<div id="scalesWrapper"></div>
		</div>
	</figure>`;
export const article_en =`
	<h2>The unit of measurement and its subdivision: step and half-step</h2>
	<p>It has already been stated that the distance between notes is known as <strong>interval</strong>, but we need some specific unit to measure it.</p>
	<p>Well, that unit of measurement turns out to be the <strong>whole step</strong>, <strong>whole tone</strong>, or just <strong>tone</strong>, which is the distance or separation between any two consecutive notes, with two exceptions: from <strong>E (Mi)</strong> to <strong>Fa (F)</strong>, and from <strong>B (Ti)</strong> to <strong>C (Do)</strong>, which are separated by only <strong>the half of a step or tone</strong>, naturally called <strong>half-step</strong>, <strong>half-tone</strong>, or <strong>semitone</strong>.</p>   
	<h2>A slightly uneven interval pattern</h2>
	<p>This proves what was said before: <strong>the tonal distribution of the notes in the scale is not completely uniform</strong>, although in reality the only irregularity is that the separation between adjacent notes can only be either a <strong>whole step</strong> or a <strong>half step</strong>.</p>
	<h2>Diatonic pattern and diatonic scale</h2>
	<p>The illustration below shows the arrangement of the separations of the scale of <strong>Do</strong> (<strong>C</strong>), known as <strong>diatonic pattern</strong>, in which the only two pairs separated only by a half step are those from <strong>Mi (E)</strong> to <strong>Fa (F)</strong> and from <strong>Si (B)</strong> to <strong>Do (C)</strong>, forming the sequence <strong>TONE-TONE-SEMITONE-TONE-TONE-TONE-SEMITONE</strong>, or <strong>T</strong>-<strong>T</strong>-<strong>S</strong>-<strong>T</strong>-<strong>T</strong>-<strong>T</strong>-<strong>S</strong>.</p>
	${diatonicPattern}
	<p>An important fact to remember is that as this pattern determines the distribution of the notes of the general scale, this is also referred as <strong>diatonic scale</strong>.</p>
	<h2>All intervals between consecutive notes are seconds</h2>
	<p>It is obvious that according to the definition of interval in the <a href="/en/theory/sound/scales-and-octaves" target="_blank"><strong>previous lesson</strong></a>, all intervals between consecutive notes, despite their differences, result in <strong>intervals of a second</strong> or simply <strong>seconds</strong>.</p>
	<h2>Each scale has a different original or natural mode</h2>
	<p>Due to this diatonic irregularity, the notes of each of the seven possible scales of the previous lesson have a <strong>different order of separation</strong>. This order is known as the <strong>mode</strong> of the scale, of which of the seven resulting ones, to our relief, for the moment <strong>we only need to know one</strong>, since the others are relatively secondary.</p>
	
	<h2>The intervals between the notes are fixed but the pattern (or mode) changes with the scale</h2>
	<p>It should be noticed that the intervals (<strong>seconds</strong>, in all cases) between the notes does not change from scale to scale. Note in the illustration below that in all modes, the semitones invariably correspond to the <strong>Mi</strong>-<strong>Fa</strong> and <strong>Ti</strong>-<strong>Do</strong> pairs.</p>
	<p>The above introduces a complication in the idea presented in the table of scales of the <a href="/en/theory/sound/scales-and-octaves" target="_blank"><strong>previous lesson</strong></a>, since the different modes each produce <strong>a unique musical idea</strong>, which the following table, already updated below with the real separations, allows us to appreciate visually, but above all, <strong>auditory</strong>.</p>
	<h2>An auditory exercise of the utmost importance</h2>
	<p>Although the study of the different modes is out of our interest for now, it is highly recommended to listen carefully to each of the following scales trying to perceive the <strong>differences between seconds</strong>.</p>
	<p>With sufficient concentration, you will find that the only scale that ends up leaving a stable ending feeling in both directions is the first one (started at Do). All the others, with the debatable exception of the sixth (started in La) seem to end up leaving something unfinished.</p>
	${modesTable}
	<h2>A starting model scale</h2>
	<p>It is because of this stability, balance or solidity of the <strong>Do scale</strong>, whose mode is designated as <strong>major</strong>, which assigns the scale the full name of <strong>Do Major</strong>, that it is commonly used as a <strong>model scale</strong> to start musical studies.</p>
	<p>It should be mentioned that the major mode is usually implied. Thus, "<strong>Do scale</strong>" or "<strong>Do major scale</strong>" refer to our newly presented model scale, as well as "<strong>C scale</strong>" or "<strong>C major scale</strong>".</p>
	<h2>As there is a major mode, there is a minor one</h2>
	<p>By the way, just as a complement, <strong>there is a second main mode</strong>: the <strong>minor</strong> of the <strong>A scale</strong>, known as <strong>A minor</strong> and abbreviated as <strong>m</strong>, which designates it as <strong>La m</strong> or <strong>A m</strong>, which we will explore in due course. The other modes correspond to special situations at the moment outside our plan to learn music theory.</p>
	<h2 id="paraMuyObservadores">For very observant and curious</h2>
	<p>Those who find a certain match between the <strong>pitch separation</strong> cases and the <strong>dark keys of the keyboard</strong> shown in the lesson about the <a href="/en/theory/sound/names-of-notes#noteNames" target="_blank"><strong>note names</strong></a> will be correct in assuming that these keys correspond to intermediate notes that we will discuss next.</p>
	<h2>But music doesn't always use the model scale</h2>
	<p>At this point in our study, a complication appears that deserves our full attention, since understanding it prepares us to learn solfège in any scale <strong>other than the study model</strong>. To face this challenge, let's move on to <a href="/en/theory/sound/other-major-scales"><strong>other major scales</strong></a>.</p>`;
	export const article_es =`<h2>La unidad de medida y su subdivisión: tono y semitono</h2>
	<p>Ya se ha dicho que la distancia entre notas se conoce como intervalo, pero necesitamos alguna unidad específica para medirlo.</p>	
	<p>Pues bien, esa unidad de medida resulta ser el <strong>tono</strong>, que es la distancia o separación entre dos notas consecutivas cualesquiera, con dos excepciones: de <strong>Mi</strong> a <strong>Fa</strong>, y de <strong>Si</strong> a <strong>Do</strong>, que están separadas sólo por <strong>la mitad de un tono</strong>, naturalmente llamado <strong>semitono</strong>.</p>
	<h2>Un patrón de intervalos ligeramente irregular</h2>
	<p>Esto comprueba lo dicho anteriormente: la <strong>distribución tonal de las notas en la escala no es completamente uniforme</strong>, aunque en realidad la única irregularidad es que la separación entre notas adyacentes sólo puede ser o bien de un <strong>tono</strong>, o bien de un <strong>semitono</strong>.</p>
	<h2>El patrón diatónico y escala diatónica</h2>
	<p>La siguiente ilustración muestra la disposición de las separaciones de la <strong>escala de Do</strong>, conocida como <strong>patrón diatónico</strong>, en el que los dos únicos pares separados sólo por un semitono son el de <strong>Mi</strong> a <strong>Fa</strong> y el de <strong>Si</strong> a <strong>Do</strong>, formando la secuencia <strong>TONO-TONO-SEMITONO-TONO-TONO-TONO-SEMITONO</strong>, o <strong>T-T-S-T-T-T-S</strong>.</p>
	${diatonicPattern}
	<p>Un dato importante a recordar es que como este patrón determina la distribución de las notas de la escala general, ésta recibe igualmente la atribución de <strong>escala diatónica</strong>.</p>
	<h2>Todos los intervalos entre notas consecutivas son segundas</h2>
	<p>Salta a la vista que de acuerdo a la definición de intervalo en la <a href="/es/theoria/sonido/escalas-y-octavas" target="_blank"><strong>lección anterior</strong></a>, todas las separaciones entre notas consecutivas, a pesar de sus diferencias, resultan <strong>intervalos de segunda</strong> o simplemente <strong>segundas</strong>.</p>
	<h2>Cada escala tiene un modo original o natural diferente</h2>
	<p>Debido a esa irregularidad diatónica, las notas de cada una de las siete escalas posibles de la lección anterior presentan <strong>diferente orden de separación</strong>. Orden que se conoce como el <strong>modo</strong> de la escala, de los que de los siete resultantes, para nuestro alivio, de momento <strong>sólo necesitamos conocer uno</strong>, pues los demás resultan relativamente secundarios.</p>
	<h2>Los intervalos entre las notas son fijas pero el patrón (o modo) cambia con la escala</h2>
	<p>Es de subrayar que los intervalos (<strong>segundas</strong>, en todos los casos) entre las notas no cambian de escala en escala. Obsérvese en la siguiente ilustración que en todos los modos, los semitonos corresponden invariablemente a los pares <strong>Mi-Fa</strong> y <strong>Si-Do</strong>.</p>
	<p>Lo anterior introduce una complicación en la idea presentada en la tabla de escalas de la <a href="/es/teoria/sonido/escalas-y-octavas#scalesTable" target="_blank"><strong>lección anterior</strong></a>, pues los diferentes modos producen cada uno <strong>una idea musical única</strong>, lo que la tabla a continuación, ya actualizada con una ilustración realista de los intervalos, nos permite apreciar <em>visual</em>, pero sobre todo, <strong>auditivamente</strong>.</p>
	<h2>Un ejercicio auditivo de la mayor importancia</h2>
	<p>Aunque el estudio de los diferentes modos queda fuera de nuestro interés por ahora, es altamente recomendable escuchar atentamente cada una de las escalas a continuación tratando de percibir las <strong>diferencias entre segundas</strong>.</p>
	<p>Con la suficiente concentración, se encontrará que la única escala que termina dejando en ambos sentidos una sensación de final estable es la primera (iniciada en Do). Todas las demás, con la discutible excepción de la sexta (iniciada en La) parecen terminar dejando algo inconcluso.</p>
	${modesTable}
	<h2>Una escala modelo para empezar</h2>
	<p>Es esa estabilidad, equilibrio o solidez de la <strong>escala de Do</strong>, cuyo modo se designa como <strong>mayor</strong>, lo que le asigna el nombre completo de <strong>Do Mayor</strong>, por lo que ésta se prefiere como <strong>escala modelo</strong> para iniciar los estudios musicales.</p>
	<p>Es de mencionar que el modo mayor es usualmente sobreentendido. Así, "<strong>escala de Do</strong>" o "<strong>escala de Do mayor</strong>" se refieren a nuestra escala modelo recién presentada.</p>
	<h2>Como hay un modo mayor, hay otro menor</h2>
	<p>Sólo como complemento, les comentaré que hay un <strong>segundo modo principal</strong>: el <strong>menor</strong>, de la escala de <strong>La</strong>, conocida como <strong>La menor</strong> y abreviada como <strong>m</strong>, lo que la designa como <strong>La menor</strong> o <strong>La m</strong>, a explorar a su debido tiempo. Los demás modos corresponden a situaciones especiales por ahora ajenas a nuestro plan de aprender solfeo.</p>
	<h2 id="paraMuyObservadores">Para muy observadores y curiosos</h2>
	<p>Quienes encuentren cierta coincidencia de los casos de <strong>separación por tono</strong> de la escala diatónica con las <strong>teclas oscuras del teclado</strong> mostrado en la lección de los <a href="/es/teoria/sonido/nombres-de-notas#noteNames" target="_blank"><strong>nombres de notas</strong></a>, estarán en lo cierto al suponer que dichas teclas corresponden a notas intermedias que discutiremos a continuación.</p>
	<h2>Pero la musica no siempre utiliza la escala modelo</h2>
	<p>En este punto de nuestro estudio aparece una complicación que merece toda nuestra atención, pues comprenderla nos prepara para aprender solfeo en cualquier escala <strong>diferente al modelo de estudio</strong>. Para enfrentar este reto pasemos a <a href="/es/teoria/sonido/otras-escalas-mayores"><strong>otras escalas mayores</strong></a>.</p>`;
const scorePlayer=window.scorePlayer={};
await import('/scripts/logicSupport/score/playerSound.js').catch(e=>{console.error('Error: ', e.message)});
import('/scripts/logicSupport/articles/sound.js').catch(e=>{console.error('Error: ', e.message)});

