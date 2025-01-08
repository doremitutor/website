<?php
$title='Glosario';
$keywords='';
$description='';
$mirrorPath='en/glossary';
$pageType='general';
ob_start();
insertHtmlAndStartHead();
?>
		<link rel="stylesheet" href="/css/generalPage.css">
		<style>
            def{
                font-weight:bold;
            }
            #glossary h2{
                font-size:1.2rem;
                font-weight:normal;
                margin-left:0;
                text-align:center;
                color:var(--bg-color);
                background-color:var(--dark-color);
            }
            dl{
                margin-left:1rem;
            }
            dt{
                margin-top:0.5rem;
                margin-left:3rem;
                margin-bottom:0.5rem;
                font-size:1.1rem;
                font-weight:bold;
            }
            dt::after{
                content:':';
            }
            dd{
                margin-bottom:1rem;
            }
		</style>
        <script>

        </script>
<?php
closeHeadOpenBodyBeginHeader();
?>
            <h1>Glosario de términos</h1>
            <p>Definiciones y explicaciones</p>
        </header>
        <article id="glossary">
            <h2>Tipos de compás</h2>
            <dl>
                <dt id="two-by-four">Dos por cuatro</dt>
                <dd>El compás de dos por cuatro es un compás de dos tiempos a cada uno de los cuales corresponde una negra como unidad de tiempo, único valor rítmico utilizado en el ejercicio tanto para las notas como para los silencios. El primero de ellos es fuerte, lo que se indica con un tick agudo del metrónomo, y el segundo débil, indicado con otro grave.<br>Para indicaciones sobre su marcado manual, consultar <a href="/es/teoria/tiempo#manualMarking" target="_blank">el tiempo en la música</a>.</dd>
                <dt id="three-by-four">Tres por cuatro</dt>
                <dd>El compás de tres por cuatro se compone de tres tiempos, a cada uno de los cuales corresponde una negra como unidad de tiempo, único valor rítmico utilizado en el ejercicio tanto para las notas como para los silencios. El primero de ellos es fuerte, lo que se indica con un tick agudo del metrónomo, y los otros dos débiles, lo que se indica con ticks graves.<br>Para indicaciones sobre su marcado manual, consultar <a href="/es/teoria/tiempo#manualMarking" target="_blank">el tiempo en la música</a>.</dd>
                <dt id="four-by-four">Cuatro por cuatro</dt>
                <dd>El compás de cuatro por cuatro se forma con cuatro tiempos, a cada uno de los cuales corresponde una negra como unidad de tiempo, único valor rítmico utilizado en el ejercicio tanto para las notas como para los silencios. El primero de ellos es fuerte, lo que se indica con un tick agudo del metrónomo, y los demás débiles, indicados con ticks graves.<br>Para indicaciones sobre su marcado manual, consultar <a href="/es/teoria/tiempo#manualMarking" target="_blank">el tiempo en la música</a>.</dd>
            </dl>
            <h2>Tonalidades</h2>
            <dl>
                <dt id="c-major">Do mayor</dt>
                <dd>Es la escala escala modelo utilizada para iniciar el estudio musical debido a utilizar únicamente notas naturales, las que corresponden a las teclas continuas y casi siempre blancas en los instrumentos de teclados, misma razón por la que carece de armadura. Se le atribuye el modo mayor por la distribución de las distancias tonales o intervalos entre sus notas. Toda escala se designa con el nombre de su nota inicial, a partir de la cual todas las demás se ordenan asignándoles grados que equivalen a funciones tonales. En consecuencia, el primer grado de esta escala es la nota Do, correspondiendo el séptimo a Si.</dd>
                <dt id="g-major">Sol mayor</dt>
                <dd>Para preservar el patrón diatónico en modo mayor iniciando en Sol, esta escala requiere alterar todas las ocurrencias del séptimo grado, en este caso Fa, presentándolo como sostenido, lo que es indicado por el símbolo correspondiente después del de la clave en una única posición determinada de dicha nota que afecta a todas las notas de ese nombre. Esta indicación recibe el nombre de <strong>armadura</strong>.</dd>
                <dt id="f-major">Fa mayor</dt>
                <dd>En ésta, la alteración necesaria es un bemol para el cuarto grado. Y es la única escala que emplea bemoles que inicia en una nota natural.</dd>
                <dt id="d-major">Re mayor</dt>
                <dd>Iniciando en Re, se requieren dos sostenidos, tercero y séptimo grados,  para conservar la distribución tonal de la escala mayor: Fa y Do, en ese orden, como lo indica la armadura en cada pentagrama. Esto permite identificar rápidamente una escala mayor con varios sostenidos como la del nombre de la nota siguiente al último.</dd>
                <dt id="bFlat-major">Si bemol mayor</dt>
                <dd>Emplea dos bemoles, en el primero y cuarto grados. En escalas con bemoles es la siguiente nota al penúltimo bemol la que indica el nombre de la escala.</dd>
                <dt id="a-major">La mayor</dt>
                <dd>Esta escala requiere de tres sostenidos, en sexto, tercero y séptimo grados, que es el número máximo de alteraciones necesarias de estudiar en el solfeo dado que la escala de Mi, de cuatro sostenidos se canta de manera similar a la de Mi bemol de tres bemoles y viceversa.</dd>
                <dt id="eFlat-major">Mi bemol mayor</dt>
                <dd>Esta escala requiere tres bemoles en sendos quinto, primero y cuarto grados. La siguiente escala en la serie de bemoles, La bemol mayor, con cuatro, se canta como la de La (natural) mayor de tres sostenidos, como ya se advirtió en el resumen de ésta.</dd>
            </dl>
            <h2>Claves</h2>
            <dl>
                <dt id="treble-clef">Clave de Sol</dt>
                <dd>En la clave de sol los nombres de las notas de asignan a partir de la segunda línea a la que se asocia el de la clave, como se muestra en la página de <a href="/es/teoria/notacion/claves-y-nombre-y-tono-de-las-notas#trebleClefWrapper" target="_blank">la escritura</a>.</dd>
                <dt id="bass-clef">Clave de Fa</dt>
                <dd>En la clave de fa los nombres de las notas se asignan a partir de la cuarta línea a la que asocia el de la clave, como se muestra en la página de <a href="/es/teoria/notacion/claves-y-nombre-y-tono-de-las-notas#bassClefWrapper" target="_blank">la escritura</a>.</dd>
            </dl>
            <h2>Temas de las lecciones</h2>
            <dl>
                <dt id="tonic">Primer grado o tónica</dt>
                <dd>La <strong>tónica</strong> o <strong>primer grado</strong> de la escala funciona como <strong>referencia tonal</strong>, por lo que se le atribuye <strong>estabilidad absoluta</strong>, siendo el tono hacia el que los demás necesitan regresar, o formalmente, <strong>resolver</strong> para satisfacer al oído.<br>Al carecer de tensión, esta función induce una sensación de tranquilidad, seguridad, quietud, descanso, satisfacción, pero también de monotonía. Sin embargo, el tedio que pueda inducir el ejercicio queda más que compensado por la familiaridad <strong>consciente</strong> obtenida con la estabilidad de la tónica, punto de partida para desarrollar la capacidad de identificar la tensión tonal de los demás grados o funciones.</dd>
                <dt id="supertonic">Segundo grado o supertónica</dt>
                <dd>La <strong>supertónica</strong> o <strong>segundo grado</strong> es la nota vecina inmediata superior de la tónica, lo que le confiere una tensión considerable, pues a mayor cercanía, mayor tensión. Tensión cuya mejor descripción metafórica quizá sea la del ascenso al primer peldaño de una escalera en el que al perder la seguridad del piso firme se adquiere la certeza (o al menos necesidad) de que en algún momento se deberá regresar a él.<br>Reconocer esta primera tensión es crucial pues implica la comprensión del fenómeno con el que intentamos familiarizarnos, comprensión que una vez adquirida convertirá en un juego el aprender a reconocer las cinco restantes, pues al ser la tónica la referencia estable, una buena noticia es que <strong>sólo hay seis tensiones que identificar</strong></dd>
                <dt id="upper-tonic">Tónica superior</dt>
                <dd>Tónica superior es sólo una forma conveniente de referirnos a la repetición de la tónica "propia" o primer grado que en realidad corresponde a la octava siguiente, por lo que carece igualmente de tensión.<br>Este ejercicio es realmente una práctica de consonancia para dar sentido y facilitar la presentación de los grados superiores, como ya veremos.<br>Dada la notable diferencia tonal entre las dos tónicas de este ejercicio, puede resultar algo difícil cantarlo, pero no se esfuerce demasiado. Lo principal es adquirir la idea de cómo se escucha. Ya podrá regresar a practicarlo cuando lo sienta alcanzable.</dd>
                <dt id="leading-tone">Séptimo grado o sensible</dt>
                <dd>La <strong>sensible</strong> o séptimo grado es la otra vecina inmediata de la tónica, pero inferior. Además, la distancia tonal hacia ella es menor aún que la de la supertónica o segundo grado, lo que la distingue como el grado más tenso, con la ventaja para nosotros de poder reconocer su tensión con mayor facilidad.<br>Nada más que al quedar lejos de la tónica propia de la escala, resulta más cómodo compararla con la tónica superior, hacia la que claramente se percibe la necesidad de resolver para aliviar su tensión y recuperar la estabilidad (en este caso, de la tónica superior). Volviendo al terreno metafórico, podría decirse que es como bajar un peldaño de escalera desde la firmeza de un techo y extrañar la estabilidad de éste (y recuperarla al volver a subir).<br>Es de aclararse que la tensión de los grados superiores son más reconocibles comparados con la tónica superior y sus combinaciones con ésta más fáciles de cantar que con la propia. Pero ya los cantaremos sin consideraciones especiales en su momento.</dd>
                <dt id="lower-leading">Sensible inferior</dt>
                <dd>Esta lección repite el ejercicio anterior pero con la tónica propia y la sensible o séptimo grado de la octava anterior. (Sensible a la que llamamos informalmente "inferior"). Nada nuevo salvo la consonancia entre este ejercicio y el anterior, pero nos prepara para lo que sigue.</dd>
                <dt id="review-1">Resumen 1</dt>
                <dd>Este ejercicio presenta simultáneamente la tónica y sus funciones vecinas inmediatas, aunque la sensible elegida es la de la octava anterior para mejor percepción y comparación de las tensiones correspondientes.</dd>
                <dt id="high-supertonic">Supertónica alta</dt>
                <dd>La supertónica alta es simplemente como llamamos informalmente a la supertónica que utilizaremos en el Repaso 2 con la tónica superior y la sensible propia de la escala, a diferencia del Repaso 1 en el que empleamos la de la octava anterior.</dd>
                <dt id="review-2">Resumen 2</dt>
                <dd>Este repaso es repetición del Repaso 1 en la parte superior del pentagrama.</dd>
                <dt id="dominant-1">Quinto grado o dominante (1)</dt>
                <dd>La <strong>dominante</strong> o quinto grado es la función con más afinidad con la tónica, lo que le concede una considerable estabilidad que se percibe en su escasa aunque presente tensión que permite cantarla sin gran necesidad de movimiento o resolución, al mismo tiempo que una notable facilidad para cantar sus combinaciones tanto con la tónica propia de la escala o la superior (a cuatro y tres notas, respectivamente), a pesar de la distancia que la separa de ellas, pues a diferencia de los ejercicios anteriores con funciones vecinas inmediatas de la tónica, la presentada en éste implica cambios o movimientos de cuatro y cinco notas.<br>Es oportuno mencionar que los cambios entre notas inmediatas son llamados <strong>movimientos conjuntos</strong>, mientras que los que incluyen notas intermedias como los de este ejercicio, <strong>movimientos disjuntos</strong>.</dd>
                <dt id="dominant-2">Quinto grado o dominante (2)</dt>
                <dd>Este ejercicio es un repaso con las funciones presentadas en los anteriores.</dd>
                <dt id="mediant">Tercer grado o mediante</dt>
                <dd>La <strong>mediante</strong> o tercer grado es otra función con suficiente estabilidad para exhibir poca necesidad de resolución, lo que le atribuye junto con la tónica y dominante la atribución de <strong>grado</strong>s <strong>estables</strong>.</dd>
                <dt id="submediant">Sexto grado o submediante</dt>
                <dd>El caso de la <strong>submediante</strong> o sexto grado es por demás interesante, pues por su afinidad intermedia con la tónica no exhibe demasiada tensión ni suficiente estabilidad para clasificar como las dos últimas funciones presentadas.<br>De hecho la tensión que se le percibe se orienta más hacia la más estable vecina inmediata inferior dominante mediante un movimiento conjunto que a la tónica superior que requiere uno disjunto.<br>En otras palabras, resulta más fácil resolver su tensión hacia la dominante que a la tónica superior e incluso mucho más que a la remota tónica propia.<br>Un truco para dominar ese movimiento disjunto hacia la tónica superior es el de practicarlo intercalando la sensible.</dd>
                <dt id="subdominant">Cuarto grado o subdominante</dt>
                <dd>La <strong>subdominante</strong> o cuarto grado es todavía más interesante, pues a pesar de localizarse a las mismas distancias recíprocas hacia las tónicas propia y superior (en este caso a tres y cuatro notas) que la estable dominante, a diferencia de ésta es de lo más inestable, sólo que por encontrarse lejos de ellas resulta mucho más fácil la resolución hacia la mediante o tercer grado a un solo semitono de ella.</dd>
                <dt id="lower-tetrachord">Tetracordo inferior</dt>
                <dd>Este ejercicio es un repaso  de las cuatro primeras notas de la escala, que forman el llamado <strong>tetracordo inferior</strong>.</dd>
                <dt id="upper-tetrachord">Tetracordo superior</dt>
                <dd>Este ejercicio es un repaso  de las tres últimas notas de las siete de la escala más la tónica superior, que forman el llamado <strong>tetracordo superior</strong>.</dd>
                <dt id="both-tetrachords">Ambos tetracordos</dt>
                <dd>Y este último ejercicio de la serie repasa ambos tetracordos.</dd>
            </dl>
            <h2>Reproductor</h2>
            <dl>
                <dt id="player">Instrucciones</dt>
                <dd>
                    <ul>
                        <li>El botón de <b>Regresar al inicio</b> se habilita al avanzar por lo menos al segundo compás. El regreso es automático al terminar el ejercicio.</li>
                        <li>El botón de <b>Repetir último arranque</b> se habilita cuando se ha detenido y reanudado la reproducción del segundo compás en adelante para permitir el repaso de un pasaje específico.</li>
                        <li><strong>¡Importante!</strong>: la activación de estos botones pueden simularse pulsando o tocando las áreas correspondientes a éstos <b>directamente sobre la partitura</b>.</li>
                        <li>Para obtener o recordar la tónica del ejercicio, el botón de <b>Tónica para entonación (2 seg)</b> permanece activado mientras el reproductor esté detenido.</li>
                        <li>El control <b>Volumen Metrónomo</b> es un recurso de compensación, para silenciar el metrónomo desactívese la casilla <b>Metrónomo audible</b>.</li>
                        <li>A excepción del valor del <b>Tempo</b> que es propio de cada ejercicio, las preferencias de uso son recordadas por la aplicación si el explorador tiene habilitado el almacenamiento temporal.</li>
                    </ul>
                </dd>
                <dt id="ode">Oda a la Alegría (Ludwig van Beethoven)</dt>
                <dd>De la obra probablemente más conocida de este autor clásico, es este pequeño pasaje adaptado para la presentación a la comunidad doremitutor de esta aplicación para aprender o practicar el solfeo.</dd>
            </dl>
        </article>
    </main>
<?php
insertAdsScript();
//insertLogoAndLangButtonScript();
closePage();
ob_flush();
ob_end_clean();
?>