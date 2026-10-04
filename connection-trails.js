/* Readable HTML first; guided navigation adds learning depth and direction. */
(()=>{'use strict';
const get=id=>document.getElementById(id),theme=get('trail-theme');
try{document.body.classList.toggle('dark-mode',localStorage.getItem('ems_theme')==='dark');}catch{}
theme.hidden=false;theme.onclick=()=>{const dark=document.body.classList.toggle('dark-mode');try{localStorage.setItem('ems_theme',dark?'dark':'light');}catch{}};
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
const stones=[...document.querySelectorAll('.trail-step')];if(!stones.length)return;
const level=get('trail-level'),map=document.querySelector('.trail-map'),links=[...map.querySelectorAll('a')],directions=[...document.querySelectorAll('[data-direction]')],connected=new Set();let current=0,direction='science';
document.querySelector('.trail-controls').hidden=false;document.querySelector('.trail-paging').hidden=false;get('trail-direction-note').hidden=false;get('trail-check-status').hidden=false;
for(const check of document.querySelectorAll('.trail-check'))check.hidden=false;
document.body.classList.add('trail-enhanced');
const order=()=>direction==='patient'?[...stones.keys()].reverse():[...stones.keys()];
const hash=()=>`#step=${current+1}&level=${level.value}&direction=${direction}`;
function show(focus=false){
const sequence=order();for(const i of sequence)map.append(links[i].parentElement);
stones.forEach((stone,i)=>{stone.hidden=i!==current;for(const depth of stone.querySelectorAll('.trail-depth'))depth.hidden=depth.dataset.level!==level.value;});
links.forEach((a,i)=>{a.href=`#step=${i+1}&level=${level.value}&direction=${direction}`;if(i===current)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');a.parentElement.classList.toggle('connected',connected.has(i));});
directions.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.direction===direction)));
const position=sequence.indexOf(current);get('trail-prev').disabled=position===0;get('trail-next').disabled=position===sequence.length-1;get('trail-position').textContent=`Stop ${position+1} of ${stones.length} · ${level.options[level.selectedIndex].text}`;
get('trail-direction-note').textContent=direction==='patient'?'Trace the patient findings back toward the science. This reverses your reading order, not the biological process.':'Follow the science toward patient findings. Choose any stepping stone to explore its connection.';
get('trail-check-status').textContent=`${connected.size} of ${stones.length} connections checked in this session. Checks do not affect exam scores.`;
if(focus)stones[current].querySelector('h2').focus();
}
function read(){const p=new URLSearchParams(location.hash.slice(1));const n=Number(p.get('step'));current=Number.isInteger(n)&&n>=1&&n<=stones.length?n-1:0;level.value=['emt','aemt','paramedic'].includes(p.get('level'))?p.get('level'):'emt';direction=p.get('direction')==='patient'?'patient':'science';if(!p.has('step')&&direction==='patient')current=stones.length-1;show();}
function move(n,focus=true){current=n;history.pushState(null,'',hash());show(focus);}
map.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();move(links.indexOf(a));});
level.onchange=()=>{history.replaceState(null,'',hash());show();};
directions.forEach(b=>b.onclick=()=>{direction=b.dataset.direction;current=direction==='patient'?stones.length-1:0;history.pushState(null,'',hash());show(true);});
get('trail-prev').onclick=()=>{const sequence=order(),p=sequence.indexOf(current);if(p>0)move(sequence[p-1]);};
get('trail-next').onclick=()=>{const sequence=order(),p=sequence.indexOf(current);if(p<sequence.length-1)move(sequence[p+1]);};
get('trail-print').onclick=()=>window.print();window.addEventListener('popstate',read);window.addEventListener('hashchange',read);
stones.forEach((stone,i)=>{const check=stone.querySelector('.trail-check'),buttons=[...check.querySelectorAll('button')];for(const b of buttons)b.onclick=()=>{buttons.forEach(a=>a.setAttribute('aria-pressed',String(a===b)));const correct=b.dataset.correct==='true';check.querySelector('[role="status"]').textContent=(correct?'Connection made. ':'Revisit the connection. ')+check.dataset.feedback;if(correct)connected.add(i);show();if(connected.size===stones.length){window.StudyStreak?.record({type:'challenge-complete',id:'trail:'+location.pathname.split('/').pop()});get('trail-check-status').textContent='All six connections checked. Daily study activity completed. Checks do not affect exam scores.';}};});
read();
})();
