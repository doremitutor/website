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
export const article_en =`<h2>Indication of the passage of time</h2>
	<p>A third equally important need in music is the <strong>representation of time</strong>, which is considered to run from left to right, with measures represented as sections of the staff separated by vertical lines like these called <strong>barlines</strong>, although the last bar, like it is appreciated, is always different.</p>
	<figure id="barLinesWrapper" class="svgWrapper"><figcaption>Barlines</figcaption></figure>
	<p>It is important to mention and emphasize that the duration of the measures <strong>is totally independent of their graphic length</strong>, which can vary at will, mainly depending on the contained notes.</p>
	<h2>Measure indication</h2>
	<p>The <strong>type of bar</strong> is represented by symbols like these called <strong>time signature</strong>, similar to a common fraction but without the fraction bar, in which <strong>the top number indicates the number of beats in the measure</strong>, and <strong>the bottom number the rhythmic value assigned to the beat</strong>, corresponding to our known quarter the <strong>four</strong>.</p>
	<p>This time signature is placed to the right of the clef on the first staff, as presented in this illustration with the symbols for the <strong>two-four</strong>, <strong>three-four</strong>, and <strong>four-four</strong> measures referred to in the <a href="/en/theory/time/time-unit-duration-of-notes-and-rhythm" target="_blank"><strong>previous lesson on time</strong></a>.</p>
	<figure id="timeSignatureWrapper" class="svgWrapper"><figcaption>Time signature</figcaption></figure>
	<h2>Tempo indication</h2>
	<p>As for the <strong>tempo</strong>, or speed of the music, it is expressed, as we also anticipate, in specific values of beats per minute with this symbol called the <strong>metronome mark</strong>, although for now it is of secondary interest because the metronome will be conveniently adjusted for us in every lesson. The metronome mark is placed on the first staff, to the right of the clef, roughly aligned with the time signature.</p>
	<figure id="metronomeMarkWrapper" class="svgWrapper"><figcaption>Metronome mark</figcaption></figure>
	<h2>To conclude the theory, an advanced topic</h2>
	<p>Finally, to indicate when the scale or key is <strong>different from C major or A minor</strong> (of the available diversity presented in <a href="/en/theory/sound/other-major-scales" target="_blank"><strong>Other major scales</strong></a>) a symbol composed of the accidentals used is used, discussed in the next lesson, the <a href="/en/theory/notation/key-signature"><strong>key signature</strong></a>.</p>`;
export const article_es =`<h2>Indicación del transcurso del tiempo</h2>
	<p>Una tercera necesidad igualmente importante en la música es <strong>la representación del tiempo</strong>, el que se considera que transcurre de izquierda a derecha, con los compases representados como secciones del pentagrama separadas por líneas verticales como éstas llamadas <strong>barra</strong>s <strong>de compás</strong>, aunque la última barra, como se aprecia, siempre es diferente.</p>
	<figure id="barLinesWrapper" class="svgWrapper"><figcaption>Barras de compás</figcaption></figure>
	<p>Es importante mencionar y enfatizar que la duración de los compases es <strong>totalmente independiente de su longitud gráfica</strong>, la que puede variar a discreción, principalmente dependiendo de las notas contenidas.</p>
	<h2>Indicación del compás</h2>
	<p>El <strong>tipo de compás</strong> se representa con símbolos como éstos llamados <strong>marca</strong>s <strong>de compás</strong>, parecidos a una fracción común pero sin la raya de quebrado, en el que <strong>el número de arriba indica los tiempos en el compás</strong>, y <strong>el de abajo el valor rítmico asignado a cada tiempo</strong>, correspondiendo a nuestra conocida negra el <strong>cuatro</strong>.</p>
	<p>Esta marca de compás se coloca a la derecha de la clave en el primer pentagrama, como se presenta en esta ilustración con los símbolos de los compases de <strong>dos por cuatro</strong>, <strong>tres por cuatro</strong> y <strong>cuatro por cuatro</strong> referidos en la <a href="/es/teoria/tiempo/unidad-de-tiempo-duracion-de-notas-y-ritmo" target="_blank"><strong>lección anterior sobre el tiempo</strong></a>.</p>
	<figure id="timeSignatureWrapper" class="svgWrapper"><figcaption>Marca de tiempo</figcaption></figure>
	<h2>Indicación del <strong>tempo</strong></h2>
	<p>En cuanto al <strong>tempo</strong>, o rapidez de la música, éste se expresa, como también anticipamos, en <strong>valores específicos de tiempos por minuto</strong> con este símbolo llamado <strong>marca de metrónomo</strong>, que en este ejemplo indica <strong>80 negras por minuto</strong>, y se coloca sobre el primer pentagrama, a la derecha de la clave, aproximadamente alineada con la marca de compás.</p>
	<figure id="metronomeMarkWrapper" class="svgWrapper"><figcaption>Marca de metrónomo</figcaption></figure>
	<h2>Para finalizar la teoría, un tema avanzado</h2>
	<p>Por último, para indicar cuando la escala o tonalidad es <strong>diferente de Do mayor o La menor</strong> (de la diversidad disponible presentada en <a href="/es/teoria/sonido/otras-escalas-mayores" target="_blank"><strong>Otras escalas mayores</strong></a>) se emplea un símbolo compuesto por las alteraciones utilizadas discutido en la siguiente lección, <a href="/es/teoria/notacion/armadura" target="_blank"><strong>la armadura</strong></a>.</p>`;
import('/scripts/logicSupport/articles/notation.js').catch(e=>{console.error('Error: ', e.message)});