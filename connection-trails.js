/* Readable HTML first; guided navigation adds learning depth and direction. */
(()=>{'use strict';
const get=id=>document.getElementById(id),theme=get('trail-theme');
try{document.body.classList.toggle('dark-mode',localStorage.getItem('ems_theme')==='dark');}catch{}
theme.hidden=false;theme.onclick=()=>{const dark=document.body.classList.toggle('dark-mode');try{localStorage.setItem('ems_theme',dark?'dark':'light');}catch{}};
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
const complaint=get('trail-complaint');
if(complaint){
const covers=[...document.querySelectorAll('.trail-cover')],groups=[...document.querySelectorAll('.trail-library-group')];get('trail-library-controls').hidden=false;
function filterLibrary(){let count=0;for(const cover of covers){const matches=complaint.value==='all'||cover.dataset.complaints.split(' ').includes(complaint.value);cover.hidden=!matches;if(matches)count++;}for(const group of groups)group.hidden=![...group.querySelectorAll('.trail-cover')].some(c=>!c.hidden);get('trail-library-count').textContent=`${count} of ${covers.length} trails shown`;}
complaint.onchange=filterLibrary;filterLibrary();
}
const stones=[...document.querySelectorAll('.trail-step')];if(!stones.length)return;
const level=get('trail-level'),map=document.querySelector('.trail-map'),links=[...map.querySelectorAll('a')],directions=[...document.querySelectorAll('[data-direction]')],checks={emt:new Set(),aemt:new Set(),paramedic:new Set()};let current=0,direction='science';
document.querySelector('.trail-controls').hidden=false;document.querySelector('.trail-paging').hidden=false;get('trail-direction-note').hidden=false;get('trail-check-status').hidden=false;
document.body.classList.add('trail-enhanced');
const path=()=>level.value==='emt'?[0,2,5]:[...stones.keys()];
const order=()=>direction==='patient'?path().reverse():path();
const hash=()=>`#step=${current+1}&level=${level.value}&direction=${direction}`;
function show(focus=false){
const sequence=order(),connected=checks[level.value];if(!sequence.includes(current))current=sequence[0];for(const i of sequence)map.append(links[i].parentElement);
document.body.dataset.trailLevel=level.value;
stones.forEach((stone,i)=>{stone.hidden=i!==current;stone.querySelector('.stone-reading-position').textContent=`Stepping stone ${sequence.indexOf(i)+1} of ${sequence.length}`;const advanced=level.value==='paramedic'&&i===5;for(const check of stone.querySelectorAll('.trail-check'))check.hidden=(check.dataset.checkLevel==='paramedic')!==advanced;for(const explanation of stone.querySelectorAll('[data-explanation-level]'))explanation.hidden=(explanation.dataset.explanationLevel==='paramedic')!==advanced;});
for(const depth of document.querySelectorAll('.trail-depth'))depth.hidden=depth.dataset.level!==level.value;
links.forEach((a,i)=>{a.parentElement.hidden=!sequence.includes(i);a.href=`#step=${i+1}&level=${level.value}&direction=${direction}`;if(i===current)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');a.parentElement.classList.toggle('connected',connected.has(i));const label=a.querySelector('.stone-label');if(label)label.textContent=level.value==='emt'?({0:'Normal function',2:'What changes',5:'Patient & care'}[i]||label.dataset.fullLabel):label.dataset.fullLabel;a.querySelector('.stone-number').textContent=String(sequence.indexOf(i)+1);});
directions.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.direction===direction)));
const position=sequence.indexOf(current);get('trail-prev').disabled=position===0;get('trail-next').disabled=position===sequence.length-1;get('trail-position').textContent=`Stop ${position+1} of ${sequence.length} · ${level.options[level.selectedIndex].text}`;
get('trail-direction-note').textContent=direction==='patient'?'Trace the patient findings back toward the science. This reverses your reading order, not the biological process.':'Follow the science toward patient findings. Choose any stepping stone to explore its connection.';
get('trail-check-status').textContent=`${sequence.filter(i=>connected.has(i)).length} of ${sequence.length} connections checked in this ${level.value.toUpperCase()} view. Checks do not affect exam scores.`;
if(focus)stones[current].querySelector('h2').focus();
}
function read(){if(/^#source-\d+$/.test(location.hash)){show();return;}const p=new URLSearchParams(location.hash.slice(1));const n=Number(p.get('step'));current=Number.isInteger(n)&&n>=1&&n<=stones.length?n-1:0;level.value=['emt','aemt','paramedic'].includes(p.get('level'))?p.get('level'):'emt';direction=p.get('direction')==='patient'?'patient':'science';if(!p.has('step')&&direction==='patient')current=stones.length-1;show();}
function move(n,focus=true){current=n;history.pushState(null,'',hash());show(focus);}
map.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();move(links.indexOf(a));});
level.onchange=()=>{if(!path().includes(current))current=order()[0];history.replaceState(null,'',hash());show();};
directions.forEach(b=>b.onclick=()=>{direction=b.dataset.direction;current=direction==='patient'?stones.length-1:0;history.pushState(null,'',hash());show(true);});
get('trail-prev').onclick=()=>{const sequence=order(),p=sequence.indexOf(current);if(p>0)move(sequence[p-1]);};
get('trail-next').onclick=()=>{const sequence=order(),p=sequence.indexOf(current);if(p<sequence.length-1)move(sequence[p+1]);};
get('trail-print').onclick=()=>window.print();window.addEventListener('popstate',read);window.addEventListener('hashchange',read);
stones.forEach((stone,i)=>{for(const check of stone.querySelectorAll('.trail-check')){const buttons=[...check.querySelectorAll('button')];for(const b of buttons)b.onclick=()=>{buttons.forEach(a=>a.setAttribute('aria-pressed',String(a===b)));const correct=b.dataset.correct==='true';check.querySelector('[role="status"]').textContent=(correct?'Connection made. ':'Revisit the connection. ')+check.dataset.feedback;if(correct)checks[level.value].add(i);show();if(path().every(n=>checks[level.value].has(n))){window.StudyStreak?.record({type:'challenge-complete',id:'trail:'+location.pathname.split('/').pop()});get('trail-check-status').textContent=`All ${path().length} connections checked in this ${level.value.toUpperCase()} view. Daily study activity completed. Checks do not affect exam scores.`;}};}});
read();
})();
