const template=$ce('template');
template.innerHTML=`<style>
	#metronome2figuresWrapper, #metronome2controls, #sliderBox{
		display:flex;
	}
	#metronome2figuresWrapper{
		justify-content:center;
		column-gap:0.5rem;
		margin:0 auto 1.5rem;
	}
	#metronome2controls{
		flex-direction:column;
		justify-content:space-between;
		align-items:center;
		row-gap:0.5rem;
	}
	#barSelection{
		display:grid;
		align-items:center;
		grid-template-columns: auto auto 1fr;
		grid-column-gap:1rem;
		grid-row-gap:0.5rem;
	}
	label.barSelection{
		grid-column:1/-1;
		justify-self: center;
	}
	label.radio{
		font-size:0.8rem;
		grid-column:1;
		justify-self: end;
	}
	input.radio{
		grid-column:2;
		width:40px;
		height:40px;
	}
	#sliderBox{
		flex-direction:column;
	}
	#metronome2Span{
		font-size:1.3rem;
		font-weight:800;
	}
	#tickMarks, #metronome2Button{
		width:500px;
	}
	#metronome2Button{
		font-size:0.9rem;
		font-weight:600;
		height:110px;
		touch-action:none;
	}
	#manualMarkingSVG{
		display:block;
		width:850px;
		margin:0 auto 1rem;
	}
	#metronome2Label, label.barSelection, label.radio{
		font-size:0.8rem;
		font-weight:600;
	}
	datalist{
		display:none;
	}
	@media screen and (min-width:981px){
		#metronome2figuresWrapper{
			column-gap:1rem;
			margin:0 auto 1.5rem;
		}
		#metronome2controls{
			row-gap:0.5rem;
		}
		#barSelection{
			grid-column-gap:1rem;
			grid-row-gap:1rem;
		}
		input.radio{
			width:20px;
			height:20px;
		}
		#metronome2Span{
			font-size:24px;
		}
		#tickMarks, #metronome2Button{
			width:350px;
		}
		#metronome2Button{
			font-size:1.5rem;
			font-weight:600;
			height:80px;
		}
		#manualMarkingSVG{
			width:850px;
			margin-bottom:1rem;
		}
		#metronome2Label, label.barSelection, label.radio{
			font-size:1rem;
		}
	}
</style>`;
head.append(template.content);
export const article_en =`<h2>Organizing time</h2>
	<p>In reality, the beats presented in the previous lesson are only uniform pulses without much meaning, inappropriate and insufficient to express the structure of any musical material, so they are invariably organized in <strong>groups of two, three or four</strong> of them.</p>
	<p>These groups are individually given the name of <strong>measure</strong> or, more colloquially, <strong>bar</strong>, generally known by the number of beats they contain. That is, as <strong>bars of two, three or four beats</strong>, beats the first of which is always considered <strong>stronger</strong> than the others.</p>
	<p>This slightly more sophisticated version of our metronome allows the grouping of beats in bars, <strong>marking the first beat with a tick higher than the others</strong>, thus highlighting its greater comparative strength. Take as much time as you need to explore it to secure the concepts presented.</p>
	<figure id="metronome2Wrapper">
		<figcaption>Metronome marker for beats and bars</figcaption>
		<div id="metronome2figuresWrapper">
			<figure id="barSelection">
				<label class="barSelection">Time signature selection</label>
				<label for="24" class="radio">Two beats</label>
				<input type="radio" id="24" name="barType" value="2" class="radio" checked>
				<label for="34" class="radio">Three beats</label>
				<input type="radio" id="34" name="barType" value="3" class="radio">
				<label for="44" class="radio">Four beats</label>
				<input type="radio" id="44" name="barType" value="4" class="radio">
			</figure>
			<figure id="metronome2controls">
				<label id="metronome2Label" for="metronome2"></label>
				<span id="metronome2Span"></span>
				<div id="sliderBox">
					<input id="metronome2Slider" name="metronome2" type="range" min="40" max="160" step="10">
				</div>
				<button id="metronome2Button" class="button-like corner-hard"></button>
			</figure>
		</div>
	</figure>
	<h2 id="manualMarking">Manual indication</h2>
	<p>However, it is highly recommended to learn to <strong>mark beats manually</strong>, with or without the metronome. And the common way to do it is with hand and arm movements according to the following illustration. Note that <strong>the first beat is always marked downwards</strong> and <strong>the last one upwards</strong>.</p>
	<figure id="manualMarkingSVGWrapper">
		<figcaption>Manual marking of beats</figcaption>
	</figure>
	<p>But these bars or measures are still simply units of a <strong>general type</strong>. To learn about their more specific forms, let's continue to the lesson of <a href="/en/theory/time/time-unit-duration-of-notes-and-rhythm"><strong>the unit of time</strong></a>.</p>`;
export const article_es =`<h2>Organizando el tiempo</h2>
	<p>En realidad, los tiempos presentados en la lección anterior son únicamente pulsos uniformes sin gran sentido, inapropiados e insuficientes para expresar la estructura de material musical alguno, por lo que invariablemente se organizan en <strong>grupos de dos, tres o cuatro</strong> de ellos.</p>
	<p>A estos grupos en lo individual se les da el nombre de <strong>compás</strong>, conocidos en lo general por el número de tiempos que contienen. Es decir, como <strong>compases de dos, tres o cuatro tiempos</strong>, tiempos de los cuales <strong>el primero siempre es considerado más fuerte</strong> que los demás.</p>
	<p>Esta versión un poco más sofisticada de nuestro metrónomo permite la agrupación de los tiempos en compases, <strong>marcando el primer tiempo con un tick más agudo</strong> que los otros resaltando así su mayor fuerza comparativa. Dedique todo el tiempo necesario a su exploración para asegurar las ideas presentadas.</p>
	<figure id="metronome2Wrapper">
		<figcaption>Metrónomo marcador de tiempos y compases</figcaption>
		<div id="metronome2figuresWrapper">
			<figure id="barSelection">
				<label class="barSelection">Selección de compás</label>
				<label for="24" class="radio">Dos tiempos</label>
				<input type="radio" id="24" name="barType" value="2" class="radio" checked>
				<label for="34" class="radio">Tres tiempos</label>
				<input type="radio" id="34" name="barType" value="3" class="radio">
				<label for="44" class="radio">Cuatro tiempos</label>
				<input type="radio" id="44" name="barType" value="4" class="radio">
			</figure>
			<figure id="metronome2controls">
				<label id="metronome2Label" for="metronome2"></label>
				<span id="metronome2Span"></span>
				<div id="sliderBox">
					<input id="metronome2Slider" name="metronome2" type="range" min="40" max="160" step="10">
				</div>
				<button id="metronome2Button" class="button-like corner-hard"></button>
			</figure>
		</div>
	</figure>
	<h2 id="manualMarking">Indicación manual</h2>
	<p>Sin embargo, es altamente recomendable aprender a <strong>marcar los tiempos de compás manualmente</strong>, con o sin el metrónomo. Y la forma común de hacerlo es con movimientos de mano y brazo de acuerdo a la siguiente ilustración. Obsérvese que <strong>el primer tiempo siempre es marcado hacia abajo</strong> y el último hacia <strong>arriba</strong>.</p>
	<figure id="manualMarkingSVGWrapper">
		<figcaption>Marcado manual de los tiempos de compás</figcaption>
	</figure>
	<p>Pero estos compases son todavía simplemente unidades de <strong>carácter general</strong>. Para conocer sus formas más específicas, sigamos a la lección de <a href="/es/teoria/tiempo/unidad-de-tiempo-duracion-de-notas-y-ritmo"><strong>la unidad de tiempo</strong></a>.</p>`;
import('/scripts/logicSupport/articles/time.js').catch(e=>{console.error('Error: ', e.message)});


	/* #metronome2Wrapper, #metronome2FiguresWrapper, #metronome2Controls, #manualMarkingSVGWrapper, #manualMarkingDiv, #sliderBox{
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		align-items:center;
	}
	#metronome2FiguresWrapper{
		flex-direction:row;
	}
	#sliderBox{
		justify-content:flex-start;
	}
	#metronome2Span, #metronome2Wrapper label, #metronome2Wrapper button{
		font-weight:bold;
	}
	#barSelection{
		display:grid;
		justify-items:start;
		align-items:start;
		align-content:start;
	} */
	/* #manualMarkingSVGWrapper{
		width:100%;
		flex-direction:row;
		justify-content:space-between;
		padding:0 200px;
		margin:0;
	} */
	/* #metronome2Wrapper label.barSelection{
		grid-column:1/-1;
		justify-self: center;
	}
	#metronome2Wrapper label.radio{
		justify-self: end;
	} */
	/* @media screen and (max-width:980px){
		#metronome2Slider, tickMarks{
			width:15rem;
		}
		#barSelection{
			grid-template-columns:1fr 30px;
			grid-template-rows:90px 70px 70px 70px;
			grid-column-gap:35px;
			margin-right:70px;
			margin-top:150px;
		}
		#metronome2Wrapper label{
			font-size:34px;
		}
		#metronome2Wrapper label.radio{
			font-size:30px;
		}
		#metronome2Wrapper input.radio{
			width:40px;
			height:40px;
		}
		#metronome2Wrapper button{
			font-size:40px;
			width:400px;
			height:200px;
			border-radius:10px;
			touch-action:none;
		}
	}
	@media (orientation:portrait){
		#metronome2Slider, #tickMarks{
			width:calc(15rem * var(--portraitRate));
		}
	} */
	/* @media screen and (min-width:981px){
		#metronome2Slider, tickMarks{
			width:400px;
		}
		#barSelection{
			grid-template-columns:1fr 30px;
			grid-template-rows:40px 35px 35px 35px;
			grid-column-gap:20px;
			margin-right:50px;
		}
		#metronome2Wrapper label{
			font-size:17px;
		}
		#metronome2Wrapper label.radio{
			font-size:16px;
		}
		#metronome2Wrapper input.radio{
			width:30px;
			height:20px;
		}
		#metronome2Wrapper button{
			font-size:20px;
			width:300px;
			height:60px;
			border-radius:10px;
		}
		#manualMarkingSVG{
			width:516px;
			height:145px;
		}
	} */