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
		</style>`;
head.append(template.content);
export const article_en =`<h2>But the staff needs extensions</h2>
	<p>Since <strong>five</strong> lines and <strong>four</strong> spaces provide positions for writing only <strong>nine</strong> notes, it is often necessary to write in additional positions outside the staff.</p>
	<h2>Additional spaces</h2>
	<p>Of these additional positions, the immediately available are the upper and lower adjacent spaces, called the <strong>first upper</strong> and <strong>lower additional spaces</strong>, respectively.</p>
	<figure id="firstLedgerSpacesWrapper" class="svgWrapper"><figcaption>First additional spaces with a notehead on each</figcaption></figure>
	<h2>Ledger (o leger, but let's stick to ledger) lines</h2>
	<p>To write notes outside of this range, small lines such as those shown below, called <strong>ledger</strong> or <strong>leger lines</strong>, are added to the staff as needed, each providing <strong>its own position</strong> plus a <strong>new additional space</strong>.</p>
	<figure id="ledgerLinesWrapper" class="svgWrapper"><figcaption style="margin-bottom:24px;">Ledger lines above and below the staff</figcaption></figure>
	<p>It should be noted that <strong>all the additional lines between any note outside the staff and the staff must be drawn</strong>, since their omission would cause ambiguity in the reading, although it is correct to use pre-existing additional positions to write new notes, in this way:</p>
	<figure id="dontsWrapper" class="svgWrapper"><figcaption>Multiple positions can be used,<br>but all necessary lines must be drawn</figcaption></figure>
	<p>But the importance of these positions, natural or additional, is that they determine, from a special indication, <strong>the name and tone of the notes</strong>. Let's continue with <a href="/en/theory/notation/clefs-and-both-name-and-pitch-of-notes"><strong>clefs and note names</strong></a>.</p>`;
export const article_es =`<h2>Pero el pentagrama necesita extensiones</h2>
	<p>Dado que <strong>cinco</strong> líneas y <strong>cuatro</strong> espacios aportan posiciones para escribir únicamente <strong>nueve</strong> notas, frecuentemente resulta necesario escribir en <strong>posiciones adicionales</strong> externas al pentagrama.</p>
	<h2>Espacios adicionales</h2>
	<p>De estas posiciones adicionales, las inmediatamente disponibles son los espacios adyacentes superior e inferior, llamados <strong>primer espacio adicional superior e inferior</strong>, respectivamente.</p>
	<figure id="firstLedgerSpacesWrapper" class="svgWrapper"><figcaption>Primeros espacios adicionales con cabezas de notas</figcaption></figure>
	<h2>Líneas adicionales</h2>
	<p>Para escribir notas fuera de este rango, se agregan al pentagrama pequeñas líneas como las mostradas a continuación llamadas <strong>línea</strong>s <strong>adicional</strong>es según sea necesario, aportando cada una su propia posición más la de un <strong>nuevo espacio adicional</strong>.</p>
	<figure id="ledgerLinesWrapper" class="svgWrapper"><figcaption style="margin-bottom:24px;">Líneas adicionales arriba y abajo del pentagrama</figcaption></figure>
	<p>Es de señalarse que <strong>deben trazarse todas las líneas adicionales comprendidas entre cualquier nota fuera del pentagrama y éste</strong>, pues su omisión ocasionaría ambigüedad en la lectura, aunque es correcto utilizar posiciones adicionales preexistentes para escribir nuevas notas, de esta manera:</p>
	<figure id="dontsWrapper" class="svgWrapper"><figcaption>Pueden utilizarse múltiples posiciones,<br>pero deben dibujarse todas las líneas necesarias</figcaption></figure>
	<p>Pero la importancia de estas posiciones, naturales o adicionales, es que son las que determinan, a partir de una indicación especial, <strong>el nombre y tono de las notas</strong>. Continuemos con <a href="/es/teoria/notacion/claves-y-nombre-y-tono-de-las-notas"><strong>claves y nombres de notas</strong></a>.</p>`;
import('/scripts/logicSupport/articles/notation.js').catch(e=>{console.error('Error: ', e.message)});



