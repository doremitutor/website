const template=$ce('template');
template.innerHTML=`
		<style>
			#vertNotesWrapper{
				float:right;
				width:120px;
			}
			#vertNotesSvg{
				display:block;
				width:100px;
				height:680px;
				margin-bottom:1rem;
			}
			@media screen and (max-width:980px){
				#vertNotesSvg{
					margin-bottom:0.5rem;
				}
			}
		</style>`;
		/* if(lang='en'){
			$cl($("body"));//.';vertNotesWrapper	 
		}	 */
head.append(template.content);
const vertScale=`<figure id="vertNotesWrapper" style="padding-left:10px"}>
		<figcaption>${$str('Notas agudas<br>hacia arriba', 'Treble notes<br>up')}</figcaption>
		<figcaption>${$str('Notas graves<br>hacia abajo', 'Bass notes<br>down')}</figcaption>
	</figure>`;
export const article_en =`<p>Given that physically music is essentially <strong>sound</strong> organized in <strong>time</strong>, as it was stated in the <a href="/en/music" target="_blank"><strong>introduction to music</strong></a>, is easily deduced that <strong>sound</strong> constitutes <strong>the raw material </strong>, while <strong>time</strong> represents the <strong>organizing context</strong>.</p>
	<p>This section focuses on the <strong>sound</strong>, whose individual emissions are called <strong>note</strong>s to which the following three <em>main</em> properties are attributed:</p>
	${vertScale}
	<ol>
		<li><strong>heigh,</strong></li>
		<li><strong>name,</strong> and</li>
		<li><strong>duratión</strong></li>
	</ol>
	<h2>Height, pitch, tone</h2>
	<p>The height of the notes is a fixed and invariable property used to order them in <strong>scales</strong>, which is the musical term for a series or sequence of notes, in which the higher a note is perceived or qualified as more <strong>treble</strong>, and the lower as more <strong>bass</strong> or "<strong>bassier</strong>".</p>
	<p>It should be noted that the term <strong>height</strong> has a certain technical connotation, so in practice this property is referred to much more frequently as <strong>pitch</strong> or <strong>tone</strong>.</p>
	<p>For a better understanding of the above, explore the scale represented by these eight vertically arranged voiced ellipses. The higher the note is more treble, while the lower the note is more bass. <strong>Click or tap them</strong> to ensure familiarity with these concepts. Explore them at will.</p>
	<p>If you find it difficult to distinguish between low notes or they seem somewhat confusing, never mind. The human ear distinguishes high-pitched sounds more easily than low-pitched, and it may also be a matter of practice. In this first approach, the main point is the understanding of the concept.</p>
	<h2>About scales</h2>
	<p>Actually, the concept of scale is certainly ambiguous, because although it can be used to refer to the set of <strong>all the notes</strong> available in music, which is known as the <strong>general scale</strong>, is commonly used to refer to less numerous series, such as this <strong>only-eight-note scale</strong>.</p>
	<h2>These are <em><strong>all</strong></em> the notes to learn. Incredible?</h2>
	<p>Naturally, there are many more than eight notes, but this scale already contains <strong>all the tones that we need to learn</strong> to recognize or sing (<strong>seven</strong> of those eight), amazing as it may sound. The next lesson, about <a href="/en/theory/sound/consonance" target="_blank"><strong>consonance</strong></a>, proves it.</p>
	<h2>Names, another sample of simplicity</h2>
	<p>Equally amazing is the naming of notes, which we'll explore in more detail a couple of lessons later, in <a href="/en/theory/sound/names-of-notes" target="_blank"><strong>names of the notes</strong></a>.</p>
	<h2>About the duration of the notes</h2>
	<p>This section focuses on the tonal aspect of scales and notes, which is already fun enough. The duration of the notes, <strong>more related to the temporal aspect</strong>, will be discussed in the section about <strong>time in music</strong>. Particularly on the page of <a href="/en/theory/time/time-unit-duration-of-notes-and-rhythm#duration" target="_blank"><strong>the unit of time</strong></a>. </p>`;
	export const article_es =`<p>Dado que físicamente la música es esencialmente <strong>sonido organizado en el tiempo</strong>, como se planteó en la <a href="/es/musica" target="_blank"><strong>introducción a la música</strong></a>, se deduce fácilmente que el <strong>sonido</strong> constituye <strong>la materia prima</strong>, mientras que el <strong>tiempo</strong> representa el <strong>contexto organizador</strong>.</p>
	<p>Esta sección se concentra en el <strong>sonido</strong>, cuyas emisiones individuales reciben el nombre de <strong>nota</strong>s a las que se les atribuyen las siguientes tres propiedades <em>principales</em>:</p>
	${vertScale}
	<ol>
		<li><strong>altura,</strong></li>
		<li><strong>nombre</strong> y</li>
		<li><strong>duración</strong></li>
	</ol>
	<h2>Altura o tono</h2>
	<p>La altura de las notas es una propiedad fija e invariable utilizada para ordenarlas en <strong>escala</strong>s, que es el término musical para una serie o secuencia de notas, en la que entre más alta es una nota se percibe o califica como más <strong>aguda</strong>, y entre más baja como más <strong>grave</strong>.</p>
	<p>Es de señalar que el término <strong>altura</strong> tiene cierta connotación técnica, por lo que en la práctica esta propiedad es referida mucho más frecuentemente como <strong>tono</strong>.</p>
	<p>Para mejor comprensión de lo anterior, explore la escala representada por estas ocho elipses sonoras dispuestas verticalmente. A mayor altura la nota es más aguda, mientras que a menor altura más grave. <strong>Púlselas o tóquelas para hacerlas sonar</strong> y familiarizarse con estos conceptos. Explórelas a placer.</p>
	<p>Si se le dificulta distinguir entre notas graves o le parecen algo confusas, descuide: el oído humano distingue más fácilmente los sonidos agudos que los graves, y también puede ser cosa de práctica. En este primer acercamiento, lo principal es la comprensión del concepto.</p>
	<h2>Sobre las escalas</h2>
	<p>En realidad el concepto de escala es ciertamente ambiguo, pues tanto puede utilizarse para referirse al conjunto de <strong>todas las notas</strong> disponibles en la música, conocido como <strong>escala general</strong>, comúnmente se emplea para referirse a series menos numerosas, como esta <strong>escala de sólo ocho notas</strong>.</p>
	<h2>Y éstas son <em><strong>todas</strong></em> las notas a aprender. Increíble?</h2>
	<p>Naturalmente, hay muchas más que ocho notas, pero esta escala ya contiene <strong>todos los tonos que necesitamos aprender</strong> a reconocer o cantar (<strong>siete</strong> de esos ocho), por asombroso que parezca. La siguiente lección, acerca de la <a href="/es/teoria/sonido/consonancia" target="_blank"><strong>consonancia</strong></a>, lo demuestra.</p>
	<h2>Los nombres, otra muestra de simplicidad</h2>
	<p>Igualmente increíble es la designacion o nombrado de las notas, que exploraremos en amplio detalle un par de lecciones más adelante, en <a href="/es/teoria/sonido/nombres-de-notas" target="_blank"><strong>nombres de notas</strong></a></p>
	<h2>Sobre la duración de las notas</h2>
	<p>Esta sección se enfoca en el aspecto tonal de escalas y notas, que ya incluye suficiente diversión. La duración de las notas, <strong>más relacionada con el aspecto temporal</strong>, será discutido en la sección sobre el <strong>tiempo en la música</strong>. Particularmente en la página de <a href="/es/teoria/tiempo/unidad-de-tiempo-duracion-de-notas-y-ritmo#duration" target="_blank"><strong>la unidad de tiempo</strong></a>.</p>`;
const scorePlayer=window.scorePlayer={};
await import('/scripts/logicSupport/score/playerSound.js').catch(e=>{console.error('Error: ', e.message)});
import('/scripts/logicSupport/articles/sound.js').catch(e=>{console.error('Error: ', e.message)});