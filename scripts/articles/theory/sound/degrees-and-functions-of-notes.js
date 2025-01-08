const template=$ce('template');
template.innerHTML=`<style>
			#noteDegreesWrapper{
				display:flex;
				flex-direction:column;
				justify-content: center;
				align-items: center;
				margin:0 auto 1rem;
			}
		</style>`;
head.append(template.content);
const noteDegrees=`<figure id="noteDegreesWrapper">
		<figcaption>${$str('Escala modelo de Do mayor con sus grados indicados<br>(tensiones y funciones tonales a presentar en los ejercicios)', 'Do major model scale with its degrees indicated<br>(tonal tensions and functions to be presented in the exercises)')}</figcaption>
	</figure>`;
export const article_en =`<h2>A little more patience: the best is coming</h2>
	<p>Studying scales requires distinguishing each of their notes, but we have already seen that when starting with any of them <strong>their order changes from scale to scale</strong>, so it is preferable to refer to each of them <strong>by the position it occupies</strong> in the scale to which it belongs, regardless of its name.</p>
	<h2>The structure of the scale: the degrees</h2>
	<p>This position is formally called <strong>degree</strong>, which is expressed in ordinal form, naturally from the first to the seventh, and is represented by a <strong>Roman numeral in capital letters</strong>, so that the first note of the scale is said to be the first degree, the second the second, and so on.</p>
	<p>But <strong>in addition to its position</strong>, the degree of a note determines the <strong>tonal function</strong> of that note in the scale, which is the result of that <strong>unique auditory sensation</strong> presented and described in the <a href="/en/tonal-tension" target="_blank"><strong>introduction to tonal tension</strong></a>, which is its <strong>true element of musical identity</strong>.</p>
	<p>In short, each note generates a <strong>unique auditory sensation</strong>, its <strong>true musical identity</strong>, which determines the <strong>tonal function</strong> it performs in the scale and depends on its <strong>position or degree</strong> in it.</p>
	<p>For example, although the following illustration presents again our model scale of Do (C) major with its degrees indicated, that <strong>musical identity</strong> that assigns a <strong>tonal function</strong> to each note <strong>depends directly on its position or corresponding degree, independently of its name</strong>, which is susceptible to change from scale to scale.</p>
	${noteDegrees}
	<h2>About the sensations</h2>
	<p>Those sensations can be described as different levels of comfort or <strong>stability</strong> on the one hand, and discomfort or tonal <strong>tension</strong> on the other, concepts already presented and discussed in some detail in the <a href="/en/tonal-tension" target="_blank"><strong>introduction to tonal tension</strong></a>, whose recognition, identification and evocation represent the cornerstone of sight singing (or solfège).</p>
	<p>Fortunately, of the <strong>seven</strong> notes or degrees of the scale, <strong>one</strong> of them is the <strong>reference</strong> for the others, so we just have to learn to tune ourselves to that <strong>reference</strong> and to identify and evoke <strong>six</strong> levels of tension: <strong>two moderately stable</strong>, <strong>three overtly unstable</strong> and <strong>one acceptably steady</strong>, like the steps of our metaphorical staircase.</p>
	<h2>This section has not been short, but hopefully profitable.</h2>
	<p>As for the part of sound in music, this section has presented the fundamental concepts (although some not so much) to understand <strong>our sight reading program</strong> and prepare us for greater depth in the future.</p>
	<p>It is not material for a single reading, but a first one will surely give us an initial idea of the sound concepts to be found in our adventure. Now it is the turn of the temporal aspect in the section on <a href="/en/theory/time/beat-and-metronome"><strong>time in music</strong></a>.</p>`;
export const article_es =`<h2>Un poco más de paciencia: viene lo mejor</h2>
	<p>Estudiar las escalas requiere distinguir cada una de sus notas, pero ya vimos que al iniciar con cualquiera <strong>el orden de éstas cambia</strong> de escala en escala, por lo que es preferible referirse a cada una de ellas <strong>por la posición que ocupa</strong> en la escala a la que pertenece, independientemente de su nombre.</p>
	<h2>La estructura de la escala: los grados</h2>
	<p>Esa posición es formalmente llamada <strong>grado</strong>, el que se expresa en forma ordinal, naturalmente del <strong>primero</strong> al <strong>séptimo</strong>, y es representado con un <strong>número romano en mayúsculas</strong>, de manera que se dice que la primera nota de la escala es el primer grado, la segunda el segundo grado, y así sucesivamente.</p>
	<p>Pero <strong>además de su posición</strong>, el grado de una nota determina la <strong>función tonal</strong> de esa nota <strong>en la escala</strong>, resultado de esa <strong>sensación auditiva única</strong> presentada y descrita en la <a href="/es/tension-tonal" target="_blank"><strong>introducción a la tensión tonal</strong></a>, que es su verdadero <strong>elemento de identidad musical</strong>.</p>
	<p>En pocas palabras, cada nota genera una <strong>sensación auditiva única</strong>, su <strong>verdadera identidad musical</strong>, que determina la <strong>función tonal</strong> que realiza en la escala y que depende de su <strong>posición o grado</strong> en ella.</p>
	<p>Por ejemplo, si bien la siguiente ilustración presenta nuevamente nuestra escala modelo de Do mayor con sus grados indicados, esa <strong>identidad musical</strong> que le asigna una <strong>función tonal</strong> a cada nota <strong>depende directamente de su posición o grado</strong> correspondiente, <strong>independientemente de su nombre</strong>, el que es susceptible de cambiar de escala en escala.</p>
	${noteDegrees}
	<h2>En cuanto a las sensaciones</h2>
	<p>Esas sensaciones pueden describirse como diferentes niveles de comodidad o <strong>estabilidad</strong> por un lado, e incomodidad o <strong>tensión</strong> tonal por otro, conceptos ya presentados y discutidos en algún detalle en la <a href="/es/tension-tonal" target="_blank"><strong>introducción a la tensión tonal</strong></a>, cuyos reconocimiento, identificación y evocación representas la piedra angular del solfeo.</p>
	<p>Por suerte, de las <strong>siete</strong> notas o grados de la escala, una de ellas es la <strong>referencia</strong> para las demás, así que sólo debemos aprender a afinarnos con esa <strong>referencia</strong> y a identificar y evocar <strong>seis</strong> niveles de tensión: <strong>dos medianamente estables</strong>, <strong>tres abiertamente inestables</strong> y <strong>una aceptablemente firme</strong>, como los escalones de nuestra metafórica escalera.</p>
	<h2>Oigo, olvido; veo, recuerdo; hago, aprendo</h2>
	<p>Frase la anterior quizás de <strong>Confucio</strong>, pero que de seguro comprobaremos al comprender las relaciones entre las notas de la escala y sus grados y funciones, y empecemos a identificar esa condición de estabilidad o tensión tan misteriosa, una vez llegado el momento de empezar con los <a href="/es/solfeo-basico/clave-sol/c/tonica-dos-por-cuatro" target="_blank"><strong>ejercicios de solfeo</strong></a>. Nada de qué preocuparse.</p>
	<h2>Esta sección no ha sido corta, pero ojalá provechosa</h2>
	<p>En cuanto a la parte del sonido en la música, esta sección ha presentado los conceptos fundamentales (aunque algunos no tanto) para comprender <strong>nuestro programa de solfeo</strong> y prepararnos para mayor profundidad en el futuro.</p>
	<p>No es material para una sola lectura, pero una primera seguramente nos dará una idea inicial de los conceptos sonoros a encontrar en nuestra aventura. Ahora le toca el turno al aspecto temporal en la sección del <a href="/es/teoria/tiempo/tiempo-y-metronomo"><strong>tiempo en la música</strong></a>.</p>`;
	const scorePlayer=window.scorePlayer={};
	await import('/scripts/logicSupport/score/playerSound.js').catch(e=>{console.error('Error: ', e.message)});
	import('/scripts/logicSupport/articles/sound.js').catch(e=>{console.error('Error: ', e.message)});