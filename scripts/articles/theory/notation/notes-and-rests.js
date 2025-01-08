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
			#quarterNoteWrapper, #quarterRestWrapper{
				float:right;
				margin-left:18px;
				margin-right:18px;
			}
		</style>`;
head.append(template.content);
export const article_en =`<figure id="quarterNoteWrapper" class="svgWrapper"><figcaption>Quarter note</figcaption></figure>
	<h2>Duration</h2>
	<p>Now, since what determines the name and pitch of the notes is their position on the staff, we are only left with the issue of their <strong>durations</strong>.</p>
	<p>Curiously, the duration, rhythmic value, or simply the <strong>rhythm</strong> of a note is the only property indicated directly by its symbol, so there is a symbol for each different possible value, which for our convenience we will disregard for now, limiting ourselves to our well-known <strong>quarter</strong>.</p>
	<p>The symbol of a <strong>quarter note</strong>, a.k.a. <strong>chrochet</strong>, is simply the note head already presented with a small <strong>stem</strong>, drawn to the <strong>right and upwards</strong> in the notes of the <strong>lower half of the staff</strong>, while in those of the <strong>upper half</strong> or center line it is drawn to the <strong>left downwards</strong> but this is relatively discretionary and irrelevant to us for now.</p>
	<figure id="quarterRestWrapper" class="svgWrapper"><figcaption>Quarter rest</figcaption></figure>
	<h2>Duration of interruptions or pauses</h2>
	<p>Something relevant, and very much so, is that music is not always continuous, so to know when to read the next note after a pause or interruption, symbols called <strong>rest</strong>s are used to represent such periods of silence.</p>
	<p>The symbol of rest that interests us with the duration of a quarter, or simply <strong>quarter rest</strong> (<strong>crochet rest</strong>), is this, and its usual position is the vertical center of the staff.</p>
	<figure id="quarterNoteAndRestPositionWrapper" class="svgWrapper"><figcaption>Quarter note and quarter rest placement</figcaption></figure>
	<p>An advantage of using only quarter notes and quarter rests, as well as the <strong>quarter as a unit of time</strong>, is that <strong>each note will correspond to a metronome tick</strong> making it easier to read, as we will verify soon.</p>
	<p>And while we're on the subject of time, let's explore how to express its course, organization in measures, and tempo in the next lesson: <a href="/en/theory/notation/barlines-time-signature-metronome-mark">barlines, time signature and metronome</a>.</p>`;
export const article_es =`<figure id="quarterNoteWrapper" class="svgWrapper"><figcaption>Nota negra</figcaption></figure>
	<h2>Duración</h2>
	<p>Ahora, ya que lo que determina el nombre y altura de las notas es su posición en el pentagrama, únicamente nos queda el asunto de sus <strong>duraciones</strong>.</p>
	<p>Curiosamente la <strong>duración</strong>, <strong>valor rítmico</strong>, o sencillamente <strong>ritmo</strong> de una nota es la única propiedad indicada <strong>directamente por su símbolo</strong>, por lo que existe <strong>un símbolo para cada diferente valor posible</strong>, lo que para nuestra comodidad por ahora descuidaremos limitándonos a nuestra ya conocida <strong>negra</strong>.</p>
	<p>El símbolo de una negra es simplemente la cabeza de nota ya presentada, con un pequeño poste llamado <strong>plica</strong>, dibujado a la derecha y hacia arriba en las notas de la mitad inferior del pentagrama, mientras que en las de la mitad superior o línea central queda a la izquierda hacia abajo, pero esto es relativamente discrecional y para nosotros, por ahora irrelevante.</p>
	<figure id="quarterRestWrapper" class="svgWrapper"><figcaption>Silencio<br>de negra</figcaption></figure>
	<h2>Duración de las interrupciones o pausas</h2>
	<p>Algo relevante y mucho, es que la música <strong>no siempre es continua</strong>, por lo que para saber cuándo leer la siguiente nota después de alguna pausa o interrupción, se utilizan símbolos llamados <strong>silencio</strong>s para representar tales períodos de silencio.</p>
	<p>El símbolo del silencio que nos interesa con duración de una negra, o simplemente <strong>silencio de negra</strong>, es éste, y su posición usual es el centro vertical del pentagrama.</p>
	<figure id="quarterNoteAndRestPositionWrapper" class="svgWrapper"><figcaption>Colocación de negras y silencio de negra</figcaption></figure>
	<p>Una ventaja de emplear sólo notas negras y silencios de negras, así como la <strong>negra como unidad de tiempo</strong>, es que <strong>cada nota corresponderá a un tick de metrónomo</strong> facilitando la lectura, como comprobaremos muy pronto.</p>
	<p>Y a propósito de tiempo, pasemos a explorar la manera de expresar su transcurso, organización en compases y tempo en la siguiente lección: <a href="/es/teoria/notacion/barras-de-compas-marcas-de-compas-y-metronomo"><strong>barras de compás, marcas de compás y metrónomo</strong></a>.</p>`;
import('/scripts/logicSupport/articles/notation.js').catch(e=>{console.error('Error: ', e.message)});

