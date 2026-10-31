'use strict';
(()=>{
const T=window.HearthTrivia,$=id=>document.getElementById(id),node=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
let saved=null,storage=true,stale=false,turn=0,lastQuestion=null;
try{saved=localStorage.getItem(T.KEY);if(localStorage.getItem('ems_theme')==='dark')document.body.classList.add('dark');}catch{storage=false;}
const questions=T.bank(window.STUDY_CLINICAL_CARDS,window.QuestionModules),game=T.create(questions,saved);
function save(){try{localStorage.setItem(T.KEY,JSON.stringify(game.state()));storage=true;}catch{storage=false;}}
function reference(q,container){try{const url=new URL(q.reference);if(url.protocol!=='https:')return;const a=node('a','Source reference ↗');a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';container.append(a);}catch{}}
function render(){
 const s=game.state(),q=game.current(),done=game.complete(),roundEnd=!q&&s.roundAnswers>=T.ROUND;
 $('trivia-storage').replaceChildren();if(stale){$('trivia-storage').append(node('span','This collection changed in another tab. Reload before continuing. '));const b=node('button','Reload trivia');b.onclick=()=>location.reload();$('trivia-storage').append(b);}else if(!storage)$('trivia-storage').textContent='This browser cannot save trivia. You can play, but progress may be lost when you leave.';
 $('trivia-seals').replaceChildren();for(const c of game.status()){const box=node('div',null,'seal'+(c.earned?' earned':''));box.append(node('b',c.earned?'✦':'◇'),node('strong',c.name),node('span',c.total?c.earned?'Seal earned':Math.min(c.count,c.target)+' / '+c.target+' correct':'No questions yet'));$('trivia-seals').append(box);}
 $('trivia-progress').textContent='Round '+s.round+' · '+s.roundAnswers+' / '+T.ROUND+' answered';
 $('trivia-spin').disabled=stale||!!q||done||roundEnd||!questions.length;
 $('trivia-category').textContent=q?q.category:done?'COLLECTION COMPLETE':roundEnd?'ROUND COMPLETE':'YOUR NEXT CATEGORY';
 $('trivia-question').textContent=q?q.text:!questions.length?'Questions could not load. Reload this page.':done?'Six categories. Six seals.':roundEnd?'A little practice, a little stronger.':'Ready for a round?';
 $('trivia-help').textContent=q?(q.correct.length>1?'Select all correct answers, then check your answer.':'Choose one answer, then check your answer.'):done?s.correct+' correct answers from '+s.attempts+' attempts. Review the explanations below or start a fresh collection.':roundEnd?s.roundCorrect+' / '+T.ROUND+' correct this round. Your seals carry into the next round.':'There’s no timer. Read carefully and use the explanation to make the connection.';
 const options=$('trivia-options');options.replaceChildren(node('legend','Your answer','sr-only'));
 const feedback=$('trivia-feedback');feedback.replaceChildren();
 $('trivia-submit').hidden=!q||s.active.answer!==null;$('trivia-submit').disabled=true;
 $('trivia-next').hidden=!q||s.active.answer===null;$('trivia-next').disabled=stale;
 $('trivia-next').textContent=done?'See your collection':s.roundAnswers>=T.ROUND?'See round results':'Next spin';
 $('trivia-round').hidden=!roundEnd||done;$('trivia-round').disabled=stale;$('trivia-reset').disabled=stale;
 if(q){
  if(lastQuestion!==q.id){turn+=720;const index=T.CATEGORIES.indexOf(q.category);$('trivia-wheel').style.transform='rotate('+(turn-index*60-30)+'deg)';lastQuestion=q.id;}
  const answered=s.active.answer!==null;
  q.options.forEach((text,i)=>{const label=node('label',null,'answer');const input=node('input');input.type=q.correct.length>1?'checkbox':'radio';input.name='answer';input.value=String(i);input.disabled=answered||stale;input.checked=answered&&s.active.answer.includes(i);input.onchange=()=>{$('trivia-submit').disabled=stale||!options.querySelector('input:checked');};label.append(input,node('span',text));if(answered){if(q.correct.includes(i))label.classList.add('correct');else if(s.active.answer.includes(i))label.classList.add('incorrect');}options.append(label);});
  if(answered){const correct=T.grade(q,s.active.answer);feedback.append(node('h3',correct?'Correct. Well done.':'Keep this one for review.','verdict '+(correct?'good':'retry')),node('p','Correct answer'+(q.correct.length>1?'s':'')+': '+q.correct.map(i=>q.options[i]).join('; ')),node('p',q.rationale));const category=game.status().find(c=>c.name===q.category);if(correct&&category.earned&&category.count===category.target)feedback.append(node('p',q.category+' seal earned ✦'));reference(q,feedback);}
 }
 const missed=game.missed();$('trivia-missed-title').textContent='Review missed questions · '+missed.length;$('trivia-missed').replaceChildren();if(!missed.length)$('trivia-missed').append(node('p','Questions you miss will appear here with their explanations. A later correct answer removes them.'));
 for(const q of missed){const item=node('article');item.append(node('strong',q.category),node('h3',q.text),node('p','Correct answer: '+q.correct.map(i=>q.options[i]).join('; ')),node('p',q.rationale));reference(q,item);$('trivia-missed').append(item);}
}
$('trivia-spin').onclick=()=>{if(stale)return;if(game.spin()){save();render();$('trivia-question').focus();}};
$('trivia-form').onsubmit=e=>{e.preventDefault();if(stale)return;const answer=[...$('trivia-options').querySelectorAll('input:checked')].map(n=>Number(n.value));if(game.answer(answer)!==null){save();render();$('trivia-next').focus();}};
$('trivia-next').onclick=()=>{if(stale)return;if(game.next()){lastQuestion=null;save();render();if(!$('trivia-spin').disabled)$('trivia-spin').focus();else $('trivia-question').focus();}};
$('trivia-round').onclick=()=>{if(stale)return;if(game.nextRound()){save();render();$('trivia-spin').focus();}};
$('trivia-reset').onclick=()=>{if(stale||!confirm('Start a fresh trivia collection? This resets only trivia seals, round progress, and its missed-question list.'))return;game.reset();lastQuestion=null;save();render();$('trivia-spin').focus();};
$('trivia-theme').onclick=()=>{document.body.classList.toggle('dark');try{localStorage.setItem('ems_theme',document.body.classList.contains('dark')?'dark':'light');}catch{}};
window.addEventListener('storage',e=>{if(e.key===T.KEY||e.key===null){stale=true;render();}});
render();if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
