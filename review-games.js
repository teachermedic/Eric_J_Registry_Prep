/* Session-only case game. Existing exam/card data remain independent. */
(()=>{
'use strict';
const $=id=>document.getElementById(id),data=window.REVIEW_GAME_DATA;
let dark=false;try{dark=localStorage.getItem('ems_theme')==='dark'}catch{}
document.body.classList.toggle('dark-mode',dark);$('game-theme').hidden=false;$('game-theme').onclick=()=>{dark=document.body.classList.toggle('dark-mode');try{localStorage.setItem('ems_theme',dark?'dark':'light')}catch{}};
if(!data?.cases?.length){$('start-game').textContent='Cases could not load. Reload to try again.';return;}
const day=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
let round=null,queue=[],position=0,choice=null,revealed=false,retrying=false;
function show(id){for(const name of ['game-setup','game-play','game-summary'])$(name).hidden=name!==id;}
function focus(id){$(id).focus({preventScroll:true});$(id).scrollIntoView({block:'nearest',behavior:'instant'});}
function renderCase(){
 const c=queue[position];choice=null;revealed=false;$('case-reflection').value='';$('reflection-panel').hidden=true;$('case-debrief').hidden=true;
 $('round-position').textContent=`${retrying?'Retry':'Case'} ${position+1} of ${queue.length} · ${round.level==='paramedic'?'Paramedic':round.level.toUpperCase()}`;$('case-tag').textContent=c.tag;$('case-title').textContent=c.title;$('case-scene').textContent=c.scene;$('case-lines').replaceChildren();
 c.lines.forEach((line,i)=>{const label=document.createElement('label');label.className='case-line';const input=document.createElement('input');input.type='radio';input.name='mistake-line';input.value=String(i);input.onchange=()=>{choice=i;$('reflection-panel').hidden=false;};const number=document.createElement('span');number.className='line-number';number.textContent=String(i+1).padStart(2,'0');number.setAttribute('aria-hidden','true');const text=document.createElement('span');text.textContent=line;label.append(input,number,text);$('case-lines').append(label);});
 show('game-play');focus('case-title');
}
function start(){const level=$('game-level').value;if(!['emt','aemt','paramedic'].includes(level))return;const length=Number($('round-length').value);if(![3,6].includes(length))return;round={level,cases:shuffle(data.cases).slice(0,length),first:new Map(),missed:new Set(),reviewed:new Map(),creditDay:null};queue=round.cases;position=0;retrying=false;renderCase();}
$('start-game').disabled=false;$('start-form').onsubmit=e=>{e.preventDefault();start();};
$('reveal-debrief').onclick=()=>{
 if(choice===null||revealed)return;revealed=true;const c=queue[position],correct=choice===c.mistake;
 if(!round.first.has(c.id))round.first.set(c.id,correct);if(correct)round.missed.delete(c.id);else round.missed.add(c.id);
 round.reviewed.set(c.id,day());$('debrief-heading').textContent=correct?'You found the mistake.':'A different line needs correcting.';
 $('selection-feedback').textContent=correct?'The line you selected is the deliberate mistake.':`You selected line ${choice+1}. The deliberate mistake is line ${c.mistake+1}: “${c.lines[c.mistake]}”`;
 const reflection=$('case-reflection').value.trim();$('your-reasoning').hidden=!reflection;$('reflection-copy').textContent=reflection;
 $('case-correction').textContent=c.correction;$('case-why').textContent=c.why;$('level-note').textContent=c.levels[round.level];$('level-note').className='level-note';const s=data.sources[c.source];$('case-source').textContent='Read the source: '+s.label;$('case-source').href=s.url;
 $('reflection-panel').hidden=true;$('case-debrief').hidden=false;for(const input of $('case-lines').querySelectorAll('input'))input.disabled=true;$('case-lines').children[c.mistake].classList.add('is-mistake');if(!correct)$('case-lines').children[choice].classList.add('was-selected');
 $('next-case').textContent=position===queue.length-1?'See round results →':'Next case →';focus('debrief-heading');
};
function summary(){
 show('game-summary');const score=[...round.first.values()].filter(Boolean).length,attempted=round.first.size,missed=round.cases.filter(c=>round.missed.has(c.id));$('summary-heading').textContent=attempted===round.cases.length?'Round complete':'Round ended early';$('round-score').textContent=`${score} of ${attempted} correct on the first submission`;$('retry-status').textContent=missed.length?`${missed.length} ${missed.length===1?'case needs':'cases need'} another look. Retrying keeps your first-pass score intact.`:attempted?'No missed cases remain in this round.':'Start a new round when you are ready.';
 $('missed-list').replaceChildren();if(missed.length){const h=document.createElement('h3');h.textContent='Return to these cases';const ul=document.createElement('ul');for(const c of missed){const li=document.createElement('li');li.textContent=c.title+' · '+c.tag;ul.append(li)}$('missed-list').append(h,ul)}
 $('retry-missed').hidden=missed.length===0;
 const todayCount=[...round.reviewed.values()].filter(d=>d===day()).length;
 if(todayCount>=3&&round.creditDay!==day()){window.StudyStreak?.record({type:'challenge-complete',id:'review-game:find-the-mistake',date:Date.now()});round.creditDay=day();}
 $('game-streak-status').textContent=round.creditDay===day()?'Three different debriefs completed today · counted toward your daily study goal.':`${Math.min(todayCount,3)} of 3 different debriefs completed today in this round. Finish three to count toward your study goal.`;
 focus('summary-heading');
}
$('next-case').onclick=()=>{if(!revealed)return;if(position+1<queue.length){position++;renderCase();}else summary();};
$('end-round').onclick=()=>summary();
$('retry-missed').onclick=()=>{queue=round.cases.filter(c=>round.missed.has(c.id));if(!queue.length)return;position=0;retrying=true;renderCase();};
$('new-round').onclick=()=>{round=null;show('game-setup');$('start-game').focus();};
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
