const template=$ce('template');
template.innerHTML=`<style>
			#noteDegreesWrapper{
				display:flex;
				justify-content: center;
				align-items: center;
				margin:0 auto 18px;
			}
			#tensionDemoWrapper{
				display:flex;
				flex-direction:row;
				justify-content:space-around;
				align-items: center;
				margin:0 auto 18px;
				padding:0 20px;
			}
			#reset4{
				display:block;
				margin:0 auto 20px;
			}
			#tensionDemoWrapper button, #reset4{
				width:128px;
				height:50px;
				font-size:22px;
				font-weight:bold;
				border-radius:10px;
			}
			ul{
				font-size:0.9rem;
			}
			strong > a{
				font-weight:bold;
			}
			hr{width:90%;border-top:0.1rem solid var(--dark-color);margin:0.5rem auto 0;}
		</style>`;
head.append(template.content);
const figure1=`<figure>
		<figcaption>${$str('Muestras de estabilidad y tensión tonal', 'Samples of stability and tonal tension')}</figcaption>
		<button id="reset4">${$str('Parar', 'Stop')}</button>
		<div id="tensionDemoWrapper">
			<button>${$str('Ejemplo 1', 'Example 1')}</button><button>${$str('Ejemplo 2', 'Example 2')}</button><button>${$str('Ejemplo 3', 'Example 3')}</button><button>${$str('Ejemplo 4', 'Example 4')}</button><button>${$str('Ejemplo 5', 'Example 5')}</button>
		</div>
	</figure>`;
export const article_en=`<h2>Novelty as a cause of shock</h2>
    <p>When we become <strong>comfortably</strong> accustomed to any sensory stimulus, any variation of it causes us some degree of discomfort, usually with a certain expectation of recovering the lost comfort.</p>
	<p>The following application helps to verify this. Each button plays a sequence of three sounds of which the intermediate one has a different pitch. Once used to the first one, with some concentration we can perceive that discomfort in the second, which disappears when listening to the third one equal to the first one.</p>
	${figure1}
	<p>The above examples demonstrate the tendency of the ear to take any tone long enough as a <strong>comfortable reference</strong>, after which any other is perceived with <strong>some tension</strong>, suggesting the need to be alleviated by returning, or formally <strong>resolving</strong>, to the stable tone of the original reference.</p>
	<h2>Stability, tonal tension, resolution, tuning. Definitions</h2>
	<p>Musically, that initial comfort is interpreted as <strong>stability</strong>, discomfort as <strong>tonal tension</strong>, and relief from it as <strong>resolution</strong>. A similar phenomenon occurs when listening to any tune or melody: we tune ourselves to a <strong>main note</strong>, taking it as a <strong>stable reference</strong> for all the others, each of which is subsequently perceived with a unique, different <strong>tension</strong>.</p>
	<p>And it is precisely <strong>sequences of these tensions</strong> what we remember as those melodies or tunes, without the slightest notion of the specific names of their notes, although <strong>we can learn to distinguish and identify the different tensions</strong> with appropriate exercises.</p>
	<h2>Tones are forgotten, but tensions endure</h2>
	<p>It should be emphasized that <strong>pitch</strong> (<strong>tone</strong>) and <strong>tonal tension</strong> are completely different properties, and although most of us are practically incapable of remembering exact pitches (which is unnecessary), <strong>we recognize tensions with absolute precision</strong>. We just need to <strong>learn to identify</strong> them.</p>
	<h2>Just six instead of seven!</h2>
	<p>Another piece of good news is that like note names, there are only <strong>seven</strong> different tensions, and since one is the reference, there are only <strong>six</strong> left to recognize.</p>
	<h2>Description and identification</h2>
	<p>It is not easy to describe these tensions as the sensations are often indescribable, but the metaphor of a staircase with <strong>only six</strong> steps representing the tensions to be recognized helps to understand them, staircase of which <strong>two</strong> steps are somewhat <strong>stable</strong> rests, <strong>three</strong> are slippery or <strong>unstable</strong>, and <strong>one</strong> is <strong>moderately firm</strong>.</p>
	<p>Here, both <strong>the floor and the upper level represent the comfort of the reference note</strong>, and <strong>the steps represent the tensions</strong>, which are presented one by one in pleasant exercises.</p>
	<h2>An addictive sight-singing lessons</h2>
	<p>And more than enjoyable, they are as entertaining and difficult to interrupt as an absorbing video game, which is not surprising since they run in an <a href="/en/player"><strong>exclusive player</strong></a> fully customized by you for your convenience, presented in the next and last introduction to which it is time to move on.</p>
	`;
export const article_es=`<h2>La novedad causa alguna conmoción</h2>
    <p>Cuando nos acostumbramos <strong>cómodamente</strong> a un estímulo sensorial cualquiera, cualquier variación de éste nos ocasiona algún grado de <strong>incomodidad</strong>, usualmente con cierta expectación de recuperar la comodidad perdida.</p>
	<p>La siguiente aplicación ayuda a comprobar esto. Cada botón reproduce una secuencia de tres sonidos de los que el intermedio tiene un tono diferente. Acostumbrados al primero, con algo de concentración podemos percibir esa incomodidad en el segundo, que desaparece al escuchar el tercero igual al primero.</p>
	${figure1}
	<p>Los ejemplos anteriores demuestran la tendencia del oído a tomar un tono cualquiera lo suficientemente prolongado como una <strong>referencia cómoda</strong>, después de lo cual cualquier otro es percibido con alguna <strong>tensión</strong>, que sugiere la necesidad de ser aliviada regresando, o formalmente <strong>resolviendo</strong>, al estable tono de referencia original.</p>
	<h2>Estabilidad, tensión tonal, resolución, afinación. Definiciones</h2>
	<p>Musicalmente, esa comodidad inicial se interpreta como <strong>estabilidad</strong>, la incomodidad como <strong>tensión tonal</strong>, y el alivio de ésta como <strong>resolución</strong>. Un fenómeno similar ocurre al escuchar cualquier tonada o melodía: nos <strong>afinamos con una nota principal</strong>, tomándola como <strong>referencia</strong> estable para todas las demás, cada una de las cuales se percibe posteriormente con una <strong>tensión</strong> única, diferente.</p>
	<p>Y son precisamente <strong>secuencias de estas tensiones</strong> lo que recordamos como esas melodías o tonadas, sin la menor noción de los nombres específicos de sus notas, aunque <strong>puede aprenderse a distinguir e identificar las diferentes tensiones</strong> con ejercicios adecuados.</p>
	<h2>Los tonos se olvidan, las tensiones perduran</h2>
	<p>Es de enfatizarse que <strong>tono</strong> y <strong>tensión tonal</strong> son propiedades completamente diferentes, y aunque la mayoría de nosotros somos prácticamente incapaces de recordar tonos exactos (lo que es innecesario), <strong>reconocemos tensiones con absoluta precisión</strong>. Sólo necesitamos <strong>aprender a identificarlas</strong>.</p>
	<h2>¡Sólo seis en lugar de siete!</h2>
	<p>Otra buena noticia es que al igual que los nombres de las notas, sólo hay <strong>siete</strong> tensiones diferentes, y como una es la referencia, únicamente quedan <strong>seis</strong>  a reconocer.</p>
	<h2>Descripción e identificación</h2>
	<p>No es fácil describir estas tensiones pues las sensaciones suelen ser indescriptibles, pero ayuda a comprenderlas la metáfora de una escalera de <strong>sólo seis</strong> escalones representando las tensiones a reconocer, de los que <strong>dos</strong> son oportunos descansos algo <strong>estables</strong>, <strong>tres</strong> son resbaladizos o <strong>inestables</strong>, y <strong>uno</strong> medianamente <strong>firme</strong>.</p>
	<p>Aquí, tanto <strong>el piso como el nivel superior representan la comodidad de la nota de referencia</strong>, y <strong>los escalones las tensiones</strong>, las que se presentan <strong>una por una</strong> en amenos ejercicios.</p>
	<h2>Unas lecciones de solfeo adictivas</h2>
	<p>Y más que amenos, son tan entretenidos y difíciles de interrumpir como un absorbente videojuego, lo que no es de extrañar pues se ejecutan en un exclusivo <a href="/es/reproductor"><strong>reproductor</strong></a> totalmente <strong>personalizado</strong> por y para comodidad de <strong>usted</strong>, presentado en la siguiente y última introducción a la cual es momento de pasar.</p>
	`;
    const scorePlayer=window.scorePlayer={};
    import('/scripts/logicSupport/score/playerSound.js')
    .then(import('/scripts/logicSupport/articles/sound.js'))
    .catch(e=>{console.error('Error: ', e.message)});


