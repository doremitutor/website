const template=$ce('template');
template.innerHTML=`<style>
			#horizNumberedNotesSvg{
				display:block;
				width:800px;
				height:80px;
				margin:0 auto 1.5rem;
			}
			@media screen and (max-width:980px){
				#horizNumberedNotesSvg{
				width:900px;
				height:90px;
				margin-bottom:0.5rem;
				}
			}
		</style>`;
head.append(template.content);
const horizNumberedScaleWrapper=`<figure id="horizNumberedScaleWrapper">
		<figcaption>${$str('Pulse o toque cualquier nota de la segunda a la octava para escuchar su comparación con la primera', 'Click or tap any note from the second to the octave to hear how it compares to the first')}</figcaption>
	</figure>`;
export const article_en =`<h2>Now, let's listen to the differences between pitches</h2>
	<p>To justify that reduction of all possible tones to only <strong>seven</strong> let's explore the same scale, now arranged horizontally, as follows: <strong>click or tap each note from the second to the eighth</strong> to hear the sequence that the first forms with each of the others, both successively and simultaneously.</p>
	<h2>Not all are completely different!</h2>
	<p>Clearly you will hear that any of the others is indisputably different from the first one <strong>except for the octave</strong>, which despite also undoubtedly having a different tone, has a certain identity or affinity with the first one. As if they were only <strong>different versions</strong> of same note or <strong>equivalent to each other</strong>.</p>
	${horizNumberedScaleWrapper}
	<h2>A great affinity</h2>
	<p>This effect is caused by a phenomenon called <strong>consonance</strong>, which although it can occur in varying degrees for different combinations of different notes, reaches its greatest expression <strong>every eight notes</strong>, as we have heard.</p>
	<p>For those interested in listening to some other combinations, the free execution of individual notes in the vertical scale of <a href="/en/theory/sound/note-pitch-scale#vertFigure" target="_blank">the previous lesson</a> allows you to hear arbitrary pairs.</p>
	<h2>If every eight are consonant ...</h2>
	<p>A fortunate consequence of consonance every eight notes is that the general scale, comprising all available notes, turns out to be a series of repetitions of seven-note scales, notes that are just different consonant cases of each other in all those scales.</p>
	<h2>... then only seven are really different!</h2>
	<p>This allows us to classify all the available notes into only seven <strong>classes</strong> using a name for each class, which means that <strong>there are only seven note names</strong>, greatly facilitating the management of all the available notes. Those names are the subject of the next lesson, <a href="/en/theory/sound/names-of-notes"><strong>note names</strong></a>.</p>`;
export const article_es =`
	<h2>Ahora, escuchemos las diferencias entre tonos</h2>
	<p>Para justificar esa reducción de todos los tonos necesarios de aprender a identificar a sólo <strong>siete</strong> exploremos la misma escala, dispuesta ahora horizontalmente, de la siguiente manera: <strong>pulse o toque cada nota de la segunda a la octava</strong> para escuchar la secuencia que la primera forma con cada una de las otras, tanto sucesiva como simultáneamente.</p>
	<h2>¡No todas son completamente diferentes!</h2>
	<p>Claramente escuchará que cualquiera de las otras es indiscutiblemente diferente de la primera <strong>a excepción de la octava</strong>, la que a pesar de tener también indudablemente un tono distinto presenta una cierta identidad o afinidad con la primera. Como si fueran únicamente <strong>versiones diferentes de una misma nota</strong> o <strong>equivalentes entre sí</strong>.</p>
	${horizNumberedScaleWrapper}
	<h2>Una gran afinidad</h2>
	<p>Este efecto es causado por un fenómeno llamado <strong>consonancia</strong>, que puede presentarse en grados variables para diferentes combinaciones de notas distintas, pero alcanza su mayor expresión <strong>cada ocho notas</strong> como hemos escuchado.</p>
	<p>Para los interesados en escuchar algunas otras combinaciones, la libre ejecución de notas individuales en la escala vertical de <a href="/es/teoria/sonido/nota-tono-escala#vertFigure" target="_blank"><strong>la lección anterior</strong></a> permite escuchar pares arbitrarios.</p>
	<h2>Si cada ocho son consonantes...</h2>
	<p>Una afortunada consecuencia de la consonancia <strong>cada ocho notas</strong> es que la escala general, que comprende todas las notas disponibles, resulta ser una serie de repeticiones de <strong>escalas de siete notas</strong>, notas que sólo son diferentes casos consonantes de <strong>cada una de ellas en todas esas escalas.</strong>.</p>
	<!--<p>Una forma diferente de interpretar lo anterior es que cada octava nota es la primera de una escala de siete, consonante de una previa también de siete, y cada nota cualquiera es la siguiente de una escala anterior de siete de cuya primera nota es consonante.</p>
	<p>Otra manera más es que <strong>cada ocho notas se repite la serie o escala completa de las siete anteriores</strong>, o que cada nota se repite indefinidamente cada ocho posiciones, aunque en realidad las notas repetidas son diferentes pero consonantes entre ellas.</p>-->
	<h2>...¡entonces sólo siete son realmente diferentes!</h2>
	<p>Esto nos permite clasificar a todas las notas disponibles en únicamente siete <strong>clases</strong> utilizando un <strong>nombre</strong> para cada <strong>clase</strong>, lo que significa que <strong>existen sólo siete nombres de notas</strong>, facilitando enormemente el manejo de todas las notas disponibles. Esos nombres son el tema de la siguiente lección, <a href="/es/teoria/sonido/nombres-de-notas"><strong>nombres de notas</strong></a>.</p>`;
const scorePlayer=window.scorePlayer={};
await import('/scripts/logicSupport/score/playerSound.js').catch(e=>{console.error('Error: ', e.message)});
import('/scripts/logicSupport/articles/sound.js').catch(e=>{console.error('Error: ', e.message)});