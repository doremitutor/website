export const article_en=`
    <h2>"A picture is worth a thousand words"</h2>
    <p>If this is true, an animation or video must be worth much more. But not even these could compete with an <strong>interactive multimedia application with animation and sound</strong>, all under the control of the user, like this unique player offered by <strong>Doremitutor</strong>.</p>
    <h2>Meet your solfège tutor!</h2>
    <p>Each of the sight singing lessons is presented in a player like the one shown here, with a link to this introduction and appropiate descriptions of the concepts presented in each, that is, the <strong>tonal function</strong>, the <strong>scale</strong> or <strong>tonality</strong>, the type of <strong>measure</strong>, and the <strong>clef</strong> used.</p>
    <p>At the moment it is not necessary to understand the musical content of this presentation. The goal is to familiarize yourself with using the player, so explore it at your leisure. The basic instructions are displayed with the link below. <strong>Enjoy full control!</strong></p>
    <section id="playerDetails" data-player="player" data-oda="oda"></section>
    <p>Well, once we get to know the player, we may continue with the theory in the <a href="/en/theory/sound/note-pitch-scale"><strong>sound section</strong></a> or go directly to the exercises, either in the <a href="/en/basic-sight-singing/treble-clef/c/tonic-two-four" target="_blank"><strong>treble of G cleff</strong></a> or in the <a href="/en/basic-sight-singing/bass-clef/c/tonic-two-four" target="_blank"><strong>bass or F one</strong></a>.</p>`;
export const article_es=`
    <h2>"Una imagen vale mil palabras"</h2>
    <p>Si esto es cierto, una animación o un video deben valer mucho más. Pero aún ni siquiera éstos podrían competir con una <strong>aplicación multimedia interactiva con animación y sonido</strong>, toda bajo el total control del usuario, como este exclusivo reproductor que le ofrece <strong>Doremitutor</strong>.</p>
    <h2>¡Conozca su tutor de solfeo!</h2>
    <p>Cada lección o ejercicio de solfeo es presentado en un reproductor como éste, con un vínculo a esta introducción y oportunas descripciones de los conceptos presentados en cada una: la <strong>función tonal</strong>, la <strong>escala</strong> o <strong>tonalidad</strong>, el tipo de <strong>compás</strong> y la <strong>clave</strong> utilizada.</p>
    <p>De momento no es necesario comprender el contenido musical de esta presentación. El objetivo inmediato es familiarizarse con el manejo del reproductor, así que explórelo a placer. Las instrucciones básicas se despliegan con el vínculo a continuación. <strong>¡Disfrute del control total!</strong></p>
    <section id="playerDetails" data-player="player" data-oda="oda"></section>
    <p>Bien, ya conocido el reproductor, podemos continuar con la teoría en la <a href="/es/teoria/sonido/nota-tono-escala"><strong>sección de sonido</strong></a> o ir directamente a los ejercicios, bien en <a href="/es/solfeo-basico/clave-sol/c/tonica-dos-por-cuatro" target="_blank"><strong>clave de Sol</strong></a> o bien en <a href="/es/solfeo-basico/clave-fa/c/tonica-dos-por-cuatro" target="_blank"><strong>la de Fa</strong></a></p>`;
import('/scripts/logicSupport/score/scorePlayer.js')
.catch(e=>{console.error('Error: ', e.message)});
