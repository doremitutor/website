const scorePlayer=window.scorePlayer={};
await import('/scripts/logicSupport/score/playerUI.js')
        .catch(e=>{console.error('Error: ', e.message)});
scorePlayer.canvas=$('playerCanvas');
const ctx=scorePlayer.ctx=scorePlayer.canvas.getContext("2d", {alpha:'false'});
ctx.lineWidth=2;
ctx.lineCap='round';
ctx.strokeStyle=scorePlayer.ctx.fillStyle='black';
const module=await import('/scripts/logicSupport/score/lessons/'+scorePlayer.canvas.getAttribute('data-lessonPath')+'.js');
scorePlayer.lesson=module.lesson;
await import('/scripts/logicSupport/score/details.js').catch(e=>{console.error('Error: ', e.message)});
await import('/scripts/logicSupport/score/playerSound.js').catch(e=>{console.error('Error: ', e.message)});
await import('/scripts/logicSupport/score/playerClasses.js').catch(e=>{console.error('Error: ', e.message)});
await import('/scripts/logicSupport/score/playerPaths.js').catch(e=>{console.error('Error: ', e.message)});
await import('/scripts/logicSupport/score/playerEnumerators.js').catch(e=>{console.error('Error: ', e.message)});
import('/scripts/logicSupport/score/playerEngine.js').catch(e=>{console.error('Error: ', e.message)});