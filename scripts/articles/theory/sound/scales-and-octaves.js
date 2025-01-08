const template=$ce('template');
template.innerHTML=`<style>
	#buttonsWrapper{
		display:flex;
		flex-direction:row;
		justify-content:space-evenly;
		margin-bottom:0.5rem;
	}
	#buttonsWrapper button{
		width:180px;
		height:75px;
		font-size:28px;
		font-weight:bold;

	}
	#largeScaleNotesSvg{
		display:block;
		width:928px;
		height:28px;
		margin:0 auto 1.5rem;
	}
	#svgWrapper{
		display:flex;
		flex-direction:row;
		justify-content:space-evenly;
	}
	#scalesTableWrapper{
		margin-bottom:1rem;
	}
	@media screen and (max-width:980){
		#buttonsWrapper{
			margin-bottom:0.5rem;
		}
	}
</style>`;
head.append(template.content);
window.doubleScale=false;
const buttons=`<button id="_29notesUp" class="button-like corner-hard">${$str('Hacia<br>arriba', 'Upwards')}<button id="_29notesDown" class="button-like corner-hard">${$str('Hacia<br>abajo', 'Downwards')}</button><button id="reset2" class="button-like corner-hard">${$str('Parar', 'Stop')}</button>`;
const largeScale=`<figure id="largeScaleWrapper"><figcaption>${$str('Pulse o toque los botones para escuchar la escala completa', 'Click or tap the buttons to hear the full scale')}</figcaption>
		<div id="buttonsWrapper">
			${buttons}
		</div>
	</figure>`;
const scalesTable=`<figure id="scalesTableWrapper">
		<figcaption>${$str('Diferentes escalas (de una octava) formadas a partir de diferentes notas', 'Different (one-octave) scales formed starting from different notes')}</figcaption>
		<div id="svgWrapper"></div>
	</figure>`;
export const article_en =`<h2>The octave, a particular measure of tonal distance or <em>interval</em></h2>
	<p>The distance between notes is in general referred to as an <strong>interval</strong>, and in particular as <strong>the feminine ordinal of the number of notes included in the separation</strong>, so the distance between <strong>two successive notes of the same name</strong> is called an <strong>octave</strong> for the eight notes involved. Likewise, the previous scales of eight notes are called "<strong>octaves</strong>".</p>
	<p>An example of more general use of the term is to refer to the previous 29-note scale repeated here in an audible -<strong>and singable</strong>- version as a <strong>four-octave scale</strong>, that is, four seven-note scales plus the repetition of the initial Do (C) of the last for melodic purposes.</p>
	<p>An important example of measuring with octaves is that of the extension of <strong>our vocal range</strong>, generally limited to <strong>less than two octaves</strong>. This would represent a problem for singing the scale presented below if it were not for consonance. Let me explain:</p>
	<h2>A little more extensive practice to apply the consonance</h2>
	<p>Since the span of this scale is <strong>four</strong> octaves and our normal voice range covers only <strong>two</strong>, it is impossible for most of us to sing it <strong>in the exact pitches</strong>. However, we can easily sing, in <strong>our own vocal range</strong>, <strong>consonant notes</strong>, either <strong>higher</strong> or <strong>lower</strong>, of those that seem unattainable.</p>
	<p>In fact, we could even sing the entire scale of over <strong>four octaves</strong> by repeating a <strong>single octave</strong> in whatever way is most comfortable for us. It costs nothing to try.
	</p>
	<p>Just do not try too hard in any way, the main goal of the exercise is to understand the effect of the consonance.</p>
	${largeScale}
	<h2>Confirmed: only seven names or classes</h2>
	<p>This last exercise is a demonstration that at the end of the day, all the available notes consist of successive repetitions of seven-note scales like the ones initially presented, and that is why we only need <strong>seven names</strong> to distinguish them all <strong>by class</strong>.</p>
	<p>For those attentive readers who wonder how to tell a specific scale from the many repeated ones, the answer is that there is an <strong>identification system of each octave</strong> that we will address in due course.</p>
	<h2>A scale can start from any note, which gives it its name
	</h2>
	<p>But from the repetitiveness of the general scale, it can be concluded that any series of eight successive notes forms a scale like the similar ones previously presented. In other words, <strong>a scale can start with any note</strong>, and <strong>any note can start a scale</strong>. And the scales thus formed <strong>take the name of their initial note</strong>.</p>
	<p>This means that our example eight-note scale turns out to be the <strong>scale of Do (C)</strong>. The one that begins and ends in Re <strong>scale of Re (D)</strong>, and so the rest. We will explore the possibilities this provides shortly.</p>
	<p>The following table shows the different similar one-octave scales that can be formed from the larger previous scale..</p>
	${scalesTable}
	<h2>Another benefit of consonance</h2>
	<p>An enormous advantage of the repetitive nature of the general scale is that the study of the several dozen notes that compose it is practically reduced to the analysis of single-octave scales like the ones just presented, as we will see with great relief.</p>
	<p>But returning to the concept of <strong>interval</strong> with which we began this lesson, we are in for a huge surprise, as it turns out that despite the melodious perceptible softness in our auditory examples, actually <strong>the intervals from note to note are not as even as they seem</strong>.</p>
	<p> Let us now explore their <strong>specific intervals</strong> on the <a href="/en/theory/sound/diatonic-scale-and-modes"><strong>diatonic scale</strong></a>.</p>`;
export const article_es =`<h2>La octava, una medida particular de distancia tonal o <em>intervalo</em></h2>
	<p>La distancia entre notas es referida en lo general como <strong>intervalo</strong>, y en lo particular como <strong>el ordinal femenino del número de notas incluidas en la separación</strong>, por lo que la distancia entre <strong>dos notas sucesivas del mismo nombre</strong> es llamada <strong>octava</strong> por las ocho notas comprendidas. Asímismo, las escalas previas de ocho notas son llamadas "<strong>octavas</strong>".</p>
	<p>Esto nos permite referirnos a la escala anterior de 29 notas aquí repetida en versión audible -<strong>y cantable</strong>- como una <strong>escala de cuatro octavas</strong>, es decir, cuatro escalas de siete notas más la repetición del Do inicial de la última con fines melódicos.</p>
	<p>Un ejemplo importante de medición con octavas es la de la extensión de <strong>nuestro rango vocal</strong>, generalmente limitado a <strong>menos de dos octavas</strong>. Esto representaría un problema para cantar la escala presentada a continuación de no ser por la consonancia. Me explico:</p>
	<h2>Una práctica un poco más extensa para aplicar la consonancia</h2>
	<p>Dado que la extensión de esta escala es de <strong>cuatro</strong> octavas y nuestro rango de voz normal sólo cubre <strong>dos</strong>, resulta imposible para la mayoría de nosotros cantarla <strong>en los tonos exactos</strong>. No obstante, podemos cantar fácilmente, en <strong>nuestro propio rango vocal</strong>, notas consonantes, ya sea hacia arriba o hacia abajo, de las que nos resulten inalcanzables.</p>
	<p>De hecho, incluso podríamos cantar <strong>toda la escala de más de cuatro octavas</strong> repitiendo <strong>una sola</strong> de la manera que nos resulte más cómodo. No cuesta nada intentarlo.</p>
	<p>Sólo procuren no esforzarse demasiado en ningún sentido, el principal objetivo del ejercicio es la comprensión del efecto de la consonancia.</p>
	${largeScale}
	<h2>Confirmado: sólo siete nombres o clases</h2>
	<p>Este último ejercicio es una demostración de que al final de cuentas, todas las notas disponibles consisten en repeticiones sucesivas de escalas de siete notas como las presentadas inicialmente, y es por lo que únicamente necesitamos <strong>siete nombres</strong> para distinguirlas a todas <strong>por clase</strong>.</p>
	<p>Para aquellos lectores atentos que se pregunten cómo distinguir una escala concreta de las muchas que se repiten, la respuesta es que existe un <strong>sistema de identificación de cada octava</strong> que abordaremos en su momento.
	</p>
	<h2>Una escala puede iniciar a partir de cualquier nota, que le asigna su propio nombre</h2>
	<p>Pero por lo repetitivo de la escala general, puede concluirse que cualquier serie de ocho notas sucesivas forma una escala como las similares previamente presentadas. En otras palabras, <strong>una escala puede empezar con cualquier nota</strong>, y <strong>cualquier nota puede iniciar una escala</strong>, y las escalas así formadas <strong>toman el nombre de su nota inicial</strong>.</p>
	<p>Lo anterior significa que nuestra escala ejemplo de ocho notas resulta ser la <strong>escala de Do</strong>. La que inicia y termina en Re <strong>escala de Re</strong>, y así las restantes. En breve exploraremos las posibilidades que esto brinda.</p>
	<p>La siguiente tabla muestra las diferentes escalas similares de una octava posibles de formar en la más extensa escala anterior.</p>
	${scalesTable}
	<h2>Otro beneficio de la consonancia</h2>
	<p>Una enorme ventaja de la naturaleza repetitiva de la escala general, es que el estudio de las <strong>varias docenas de notas</strong> que la componen se reduce prácticamente al análisis de <strong>escalas de una sola octava</strong> como las recién presentadas, lo que iremos comprobando con gran alivio.</p>
	<p>Pero regresando al concepto de <strong>intervalo</strong> con el que comenzamos esta lección, nos espera una enorme sorpresa, pues resulta que a pesar de la melodiosa suavidad perceptible en nuestros ejemplos auditivos, en realidad <strong>los intervalos de nota a nota no son tan uniformes como parecen</strong>.</p>
	<p>Exploremos ahora sus <strong>intervalos específicos</strong> en la <a href="/es/teoria/sonido/escala-diatonica-y-modos"><strong>escala diatónica</strong></a>.</p>`;
const scorePlayer=window.scorePlayer={};
await import('/scripts/logicSupport/score/playerSound.js').catch(e=>{console.error('Error: ', e.message)});
import('/scripts/logicSupport/articles/sound.js').catch(e=>{console.error('Error: ', e.message)});