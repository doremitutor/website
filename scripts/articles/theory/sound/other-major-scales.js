const template=$ce('template');
template.innerHTML=`<style>
			.otherScaleWrapper{
				margin-bottom:1.5rem;
			}
			.otherScaleSvg{
				width:930px;
				height:60px;
			}
			span{
				background-color:var(--light-color);
			}
			@media screen and (min-width:981px){
				.otherScales{
					margin-bottom:1.5rem;
				}
			}
		</style>`;
head.append(template.content);
function otherScale(id, caption){
	return `<figure id="${id}MajorScale" class="otherScaleWrapper">
		<figcaption>${caption}</figcaption>
	</figure>`;
};
export const article_en =`<h2>An unexpected difficulty</h2>
	<p>Often real life turns out to be more complicated than expected, as in music, which although we can start studying it in the <strong>Do</strong> (<strong>C</strong>) scale whose natural mode is model <strong>major</strong>, it often requires using <strong>other scales whose modes are different</strong>.</p>
	<h2>However, the important thing is the correct pattern</h2>
	<p>This requires <strong>altering these other scales</strong> to restore the diatonic pattern to the form initially presented corresponding to the desired major mode: <strong style="white-space:nowrap;">T-T-S-T-T-T-S</strong>, which is achieved by substituting some of their notes for the intermediate notes between those separated by a whole tone, discussed at the end of <a href="/en/theory/sound/diatonic-scale-and-modes" target="_blank"><strong>the previous lesson</strong></a> and corresponding to the <strong>black keys on keyboards</strong> like the one illustrated in <a href="/en/theory/sound/names-of-notes#noteNames" target="_blank"><strong>names of notes</strong></a>.</p>
	<h2>Altered notes to the rescue: sharps and flats</h2>
	<p>These intermediate notes are generally referred to as <strong>alterations</strong>, which although lacking a proper name such as the natural ones, are referred to according to the notes between which they are found, so they can be called in <strong>two different ways</strong>.</p>
	<p>Each of them can be called as the previous natural note plus the <strong>sharp</strong> attribute, which is represented by the symbol <span>&nbsp;<strong>&#9839</strong>&nbsp;</span>, or as the next plus the <strong>flat</strong> attribute, which is represented by the symbol <span>&nbsp;<strong>&#9837</strong>&nbsp;</span>.</p>
	<p>These names, applicable to the same note, are <strong>interchangeable in general terms</strong>, but in the context of a specific scale <strong>only the one determined by that scale is valid</strong>, since each note in a scale <strong>must have a different name</strong>, natural or altered.</p>
	<p>It should be clarified that in any scale, the necessary modifications always use <strong>only one type of alteration</strong>. <strong>Either sharps or flats</strong>, but <strong>not both</strong>.</p>
	<p>Another important situation to comment on is that in this context, the term scale is often referred to as <strong>tonality</strong>.</p>
	<h2>Really, nothing to worry about</h2>
	<p>It is also worth mentioning that although at the beginning <strong>it is more comfortable to read the Do (C) scale without accidentals</strong>, with practice the initial complications of the others disappear and you end up <strong>reading them all with the same fluency</strong>.</p>
	<h2 id="majorScales">A straightforward informational table</h2>
	<p>There is a procedure to calculate the modifications required for each scale, but for our purpose a reasonable provisional understanding of them is sufficient, which is the objective of the following illustrations of the scales already converted to a progressively major mode with up to three accidentals, first with sharps , and then with flats.</p>
	<p>This first illustration presents the <strong>scale of C</strong> (<strong>Do</strong>) - it is understood that major -, taken as a model because it lacks alterations and as a sample of the diatonic pattern.</p>
	${otherScale('c', 'C (Do) Major model scale (without alterations)')}
	<p>The following scales show crossed out the notes whose substitution is necessary to recover the major mode pattern, as well as the necessary accidentals indicated by an arrow in the direction of the substitution.</p>
	${otherScale('g', 'G (So) Major scale (one sharp: Fa♯)')}
	${otherScale('d', 'D (Re) Major scale (two sharps: Fa♯ and Do♯)')}
	${otherScale('a', 'A (La) Major scale (three sharps: Do♯, Fa♯ and So♯)')}
	${otherScale('f', 'F (Fa) Major scale (one flat: Ti♭)')}
	<p>Oddly enough, the following scales of only two and three flats start on a flat note, proving that a scale can start on any note. On the other hand, the corresponding -naturals- Ti and Mi use 4 and 5 sharps, respectively, which for now is unnecessary to discuss.</p>
	${otherScale('bb', 'B♭ (Ti♭) Major scale (two flats: Ti♭ and Mi♭)')}
	${otherScale('eb', 'E♭ (Mi♭) Major scale (three flats: Mi♭, La♭ and Ti♭)')}
	<p>Well, these are the scales on which all the lessons in this initial <strong>sight-singing</strong> course are available, but we still need to present a couple of additional properties of the notes: <a href="/en/theory/sound/degrees-and-functions-of-notes"><strong>their degree and function on the scale</strong></a>.</p>`;
	export const article_es =`<h2>Una dificultad inesperada</h2>
	<p>A menudo la vida real resulta más complicada de lo esperado. Como en la música, que si bien podemos empezar a estudiarla en la escala de <strong>Do</strong> cuyo modo natural es nuestro modelo <strong>mayor</strong>, a menudo requiere utilizar otras escalas <strong>cuyos modos son diferentes</strong>.</p>
	<h2>No obstante, lo importante es el patrón correcto</h2>
	<p>Esto requiere <strong>alterar esas otras escalas</strong> para restablecer el patrón diatónico a la forma inicialmente presentada correspondiente al modo <strong>mayor</strong> deseado: <strong style="white-space:nowrap;">T-T-S-T-T-T-S</strong>, lo que se consigue sustituyendo algunas de sus notas por las intermedias entre las separadas por un tono completo, comentadas al final de <a href="/es/teoria/sonido/escala-diatonica-y-modos#paraMuyObservadores" target="_blank"><strong>la lección anterior</strong></a> y correspondientes a las <strong>teclas negras en teclados</strong> como el ilustrado en <a href="/es/teoria/sonido/nombres-de-notas#nombresDeNotas" target="_blank"><strong>los nombres de notas</strong></a>.</p>
	<h2>Notas alteradas al rescate: sostenidos y bemoles</h2>
	<p>Esas notas intermedias son referidas en lo general como <strong>alteraciones</strong>, que a falta de un nombre propio, son llamadas de acuerdo a las notas naturales entre las que se encuentran, por lo que son susceptibles de llamarse de <strong>dos maneras distintas</strong>.</p>
	<p>Cada una puede llamarse como la nota natural anterior más el atributo <strong>sostenido</strong>, representado con el símbolo <span>&nbsp;<strong>&#9839</strong>&nbsp;</span>, o como la siguiente más el de <strong>bemol</strong>, representado como <span>&nbsp;<strong>&#9837</strong>&nbsp;</span>.</p>
	<p>Estos nombres, aplicables a una misma nota, resultan <strong>intercambiables</strong> en términos generales, pero en el contexto de una escala específica <strong>sólo es válido el determinado por esa escala</strong>, pues cada nota en una escala <strong>debe tener diferente nombre</strong>, natural o alterado.</p>
	<p>Es de aclarar que en cualquier escala, las modificaciones necesarias siempre utilizan <strong>un solo tipo de alteración</strong>. O bien se utilizan sostenidos, o bien bemoles, <strong>pero no ambos tipos</strong>.</p>
	<p>Es importante comentar que una escala así ajustada, es frecuentemente referida como <strong>tonalidad</strong>.</p>
	<h2>De verdad, nada de qué preocuparse</h2>
	<p>Si bien al principio <strong>es más cómodo leer la escala de Do sin alteraciones</strong>, con práctica las complicaciones iniciales de las otras desaparecen y <strong>se termina leyendo todas con la misma fluidez</strong>. Lo de que las cosas difíciles "<strong>tienen sus bemoles</strong>" no aplica realmente a la música con bemoles (ni con sostenidos).</p>
	<h2 id="majorScales">Una tabla informativa directa</h2>
	<p>Existe un procedimiento para calcular las modificaciones requeridas por cada escala, pero para nuestro propósito es suficiente con una razonable comprensión provisional de ellas, lo que intentan generar las siguientes ilustraciones de las escalas ya convertidas a modo mayor hasta con tres alteraciones, primero con sostenidos, y después con bemoles.</p>
	<p>Esta primera ilustración presenta la <strong>escala de Do</strong> -se entiende que mayor-, tomada como modelo por carecer de alteraciones y como muestra del patrón diatónico.</p>
	${otherScale('c', 'Escala modelo de Do M (sin alteraciones)')}
	<p>Las siguientes escalas muestran tachadas las notas cuya sustitución es necesaria para recuperar el patrón del modo mayor, así como las alteraciones necesarias indicadas con una flecha en el sentido de la sustitución.</p>
	${otherScale('g', 'Escala de Sol M (un sostenido: Fa&#x266f)')}
	${otherScale('d', 'Escala de Re M (dos sostenidos: Fa&#x266f y Do&#x266f)')}
	${otherScale('a', 'Escala de La M (tres sostenidos: Do&#x266f, Fa&#x266f y Sol&#x266f)')}
	${otherScale('f', 'Escala de Fa M (un bemol: Si&#x266d)')}
	<p>Por extraño que parezca, las escalas siguientes de sólo dos y tres bemoles inician en una nota bemol, comprobando que una escala puede iniciar en cualquier nota. Por otro lado, las correspondientes de Si y Mi utilizan 4 y 5 sostenidos, respectivamente, lo que por ahora es innecesario discutir.</p>
	${otherScale('bb', 'Escala de Si&#9837 M (dos bemoles: Si&#x266d y Mi&#x266d)')}
	<figure class="otherScales">
	${otherScale('eb', 'Escala de Mi&#9837 M (tres bemoles: Mi&#x266d, La&#x266d y Si&#x266d)')}
	<p>Pues éstas son las escalas en que están disponibles todas las lecciones de este curso inicial de <strong>solfeo</strong>, pero todavía necesitamos presentar un par de propiedades adicionales de las notas: <a href="/es/teoria/sonido/grados-y-funciones-de-las-notas"><strong>su grado y función en la escala</strong></a>.</p>`;
const scorePlayer=window.scorePlayer={};
await import('/scripts/logicSupport/score/playerSound.js').catch(e=>{console.error('Error: ', e.message)});
import('/scripts/logicSupport/articles/sound.js').catch(e=>{console.error('Error: ', e.message)});



