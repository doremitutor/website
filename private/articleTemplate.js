const template=$ce('template');
template.innerHTML=``;
head.append(template.content);
export const article_en=``;
export const article_es=``;
/********************* SAMPLE CODE ***********************/
const scorePlayer=window.scorePlayer={};
import('/scripts/logicSupport/score/playerSound.js')
.then(import('/scripts/logicSupport/articles/sound.js'))
.catch(e=>{console.error('Error: ', e.message)});