const template=$ce('template');
template.innerHTML=`<style>
	#metronome1Wrapper{
		margin-bottom:0.5rem;
	}
	#metronome1Label, #metronome1Button{
		font-weight:600;
	}
	#metronome1Label, #metronome1Meter{
		display:block;
	}
	#metronome1Meter{
		font-size:1.4rem;
		font-weight:800;
		margin-top:0.2rem;
		margin-bottom:0.3rem;

	}
	#sliderBox{
		display:flex;
		flex-direction:column;
		justify-content:start;
		align-items:center;
		margin-bottom:0.5rem;
	}
	#metronome1Button{
		font-size:1rem;
		height:110px;
		touch-action:none;
	}
	#metronome1Slider, #tickMarks, #metronome1Button{
		width:700px;
	}
	#metronome1Wrapper label{
		font-size:1rem;
	}
	#tickMarks{
		display:block;
		margin:0 auto;
	}
	datalist{
		display:none;
	}
	@media screen and (min-width:981px){
		#metronome1Label{
			font-size:1.5rem;
		}
		#metronome1Meter{
			font-size:2rem;
		}
		#metronome1Wrapper{
			margin-bottom:1.5rem;
		}
		#metronome1Button{
			font-size:1.5rem;
			height:80px;
		}
	}
</style>`;
head.append(template.content);
export const article_en =`<h2>Music only exists for some time</h2>
	<p>While sound is the raw material of music, <strong>time is the context in which music exists</strong>, the display or case in which it is displayed or delivered. Music can only exist in some span of time, although time in music is special. Music can only exist in some span of time, but the passage and measurement of time in music is different from the ordinary.</p>
	<p>For example, the notes in <a href="/en/theory/sound/note-pitch-scale" target="_blank"><strong>the previous section about sound</strong></a> last exactly one second, but this is musically meaningless. The expression of the speed of time in music and the units for measuring it are unique.</p>
	<h2>Beats: pulses at uniform intervals but of varying duration</h2>
	<p>And the main reason for this is that the speed of the music can vary <strong>at the will of the author or performer</strong> while reasonably preserving the idea or message, so the units used are of <strong>variable duration</strong> in terms of those known.	</p>
	<p>These units are the <strong>lapses between uniform pulses</strong> known simply as <strong>beats</strong>, of precise but relatively arbitrary duration.</p>
	<h2>Speed has a special name: tempo</h2>
	<p>Since the specific duration of a beat depends on the speed of the music, this speed is usually expressed as the number of beats to elapse <strong>in one minute</strong>. This expression is called <strong>tempo</strong>.</p>
	<h2>The metronome, a handy indicator</h2>
	<p>To continue, it is necessary to present an auxiliary device in the marking of the times that generates audible pulses or <strong>ticks</strong> indicating the <strong>beats</strong> at a variable speed (or formally, tempo) whose name is <strong>metronome</strong>, an initial version of ours presented below to familiarize ourselves with the usual tempos in the music. Explore it at your leisure.</p>
	<figure id="metronome1Wrapper">
		<figcaption>Simple metronome marker for pulses (formally beats)</figcaption>
		<div id="metronome1FigureWrapper">
			<span id="metronome1Label"></span>
			<span id="metronome1Meter"></span>
			<input id="metronome1Slider" name="metronome1" type="range" min="40" max="160" step="10">
			<button id="metronome1Button" class="button-like corner-hard"></button>
		</div>
	</figure>
	<p>To find a really practical meaning to the above, let's move on to the next lesson: <a href="/en/theory/time/measure-and-its-marking"><strong>the measure and its marking</strong></a>.</p>`;
export const article_es =`<h2>La música sólo existe por algún tiempo</h2>
	<p>Si bien el sonido es la materia prima de la música, <strong>el tiempo es el contexto en el que la música existe</strong>, el exhibidor o estuche en el que ésta se muestra o entrega. La música únicamente puede existir en algún lapso de tiempo, pero el transcurso y medición del tiempo en la música son diferentes de lo ordinario.</p>
	<p>Por ejemplo, las notas de la <a href="/es/teoria/sonido/nota-tono-escala" target="_blank"><strong>sección anterior sobre el sonido</strong></a> duran exactamente un segundo, pero esto musicalmente carece de sentido. La expresión de la rapidez del tiempo en la música y las unidades para medirlo son exclusivas.</p>
	<h2>Tiempos: pulsos a intervalos uniformes pero de duración variable</h2>
	<p>Y la razón principal de ello es que la rapidez de la música puede variar <strong>a voluntad del autor o ejecutante</strong> conservando razonablemente la idea o mensaje, por lo que las unidades empleadas son de <strong>duración variable</strong> en términos de las conocidas.</p>
	<p>Estas unidades son los <strong>lapsos entre pulsos uniformes</strong> conocidos simplemente como <strong>tiempo</strong>s, de duración <strong>precisa</strong> pero relativamente arbitraria.</p>
	<h2>La velocidad tiene un nombre especial: tempo</h2>
	<p>Como la duración concreta de un tiempo depende de la rapidez de la música, esta rapidez se expresa usualmente indicando el número de tiempos a transcurrir <strong>en un minuto</strong>. Expresión que recibe el nombre de <strong>tempo</strong>.</p>
	<h2>El metrónomo, oportuno indicador</h2>
	<p>Para continuar, es necesario presentar un dispositivo auxiliar en el marcado de los tiempos que genera pulsos audibles o <strong>ticks</strong> indicadores de los <strong>tiempos</strong> a velocidad (o formalmente, <strong>tempo</strong>) variable cuyo nombre es <strong>metrónomo</strong>, una versión inicial del nuestro presentada a continuación para familiarizarmos con los tempos usuales en la música. Explórelo a placer.</p>
	<figure id="metronome1Wrapper">
		<figcaption>Metrónomo simple marcador de pulsos (formalmente tiempos)</figcaption>
		<span id="metronome1Label" for="metronome1"></span>
		<span id="metronome1Meter"></span>
		<div id="sliderBox">
			<input id="metronome1Slider" name="metronome1" type="range" min="40" max="160" step="10">
		</div>
		<button id="metronome1Button" class="button-like corner-hard""></button>
	</figure>
	<p>Para encontrarle un significado realmente práctico a lo anterior, pasemos a la siguiente lección: <a href="/es/teoria/tiempo/compas-y-su-marcado"><strong>el compás y su marcado</strong></a>.</p>`;
import('/scripts/logicSupport/articles/time.js').catch(e=>{console.error('Error: ', e.message)});
