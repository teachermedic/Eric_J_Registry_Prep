/* Independent browser-local challenge practice; exam and flashcard progress are untouched. */
(()=>{
 'use strict';
 const cases=window.CHANGE_FINDING_CASES||[],KEY='field_notes_finding_v1';if(!cases.length)return;
 const $=id=>document.getElementById(id);let index=0,variant=0,answers={},available=true;
 try{const raw=JSON.parse(localStorage.getItem(KEY));if(raw?.version===1){index=Math.max(0,cases.findIndex(c=>c.id===raw.current));variant=raw.variant===1?1:0;for(const c of cases)for(const v of [0,1]){const a=raw.answers?.[c.id]?.[v];if(Number.isInteger(a)&&a>=0&&a<c.choices.length){answers[c.id]??={};answers[c.id][v]=a;}}}}catch(e){if(!(e instanceof SyntaxError))available=false;}
 function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,current:cases[index].id,variant,answers}));available=true;}catch{available=false;}storage();}
 function storage(){$('challenge-storage').textContent=available?'Progress is saved in this browser on this device.':'This browser cannot save progress. You can still practice.';}
 for(const [i,c]of cases.entries()){const o=document.createElement('option');o.value=i;o.textContent=`${c.level?c.level+' · ':''}${c.category} — ${c.title}`;$('challenge-select').append(o);}
 function render(){
  const c=cases[index],v=c.variants[variant],a=answers[c.id]?.[variant];$('challenge-select').value=index;
  $('challenge-category').textContent=`${c.level?c.level+' · ':''}${c.category} · Challenge ${index+1} of ${cases.length}`;$('challenge-title').textContent=c.title;$('challenge-scene').textContent=c.scene;$('challenge-finding').textContent=v.finding;$('challenge-prompt').textContent=c.prompt;
  $('finding-original').setAttribute('aria-pressed',String(variant===0));$('finding-changed').setAttribute('aria-pressed',String(variant===1));
  $('challenge-choices').replaceChildren();c.choices.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.textContent=String.fromCharCode(65+i)+' · '+text;b.setAttribute('aria-pressed',String(a===i));b.onclick=()=>{answers[c.id]??={};answers[c.id][variant]=i;save();window.StudyStreak?.record({type:'finding-attempt',id:c.id,variant,date:Date.now()});window.StudyBadges?.record({type:'activity',id:c.id,date:Date.now()});if(i===v.correct)window.StudyBadges?.record({type:'finding',id:c.id,variant,date:Date.now()});render();};$('challenge-choices').append(b);});
  $('challenge-feedback').hidden=a===undefined;
  if(a!==undefined){$('challenge-result').textContent=a===v.correct?'✓ You identified the deciding clue.':'Look again at the deciding clue.';$('challenge-correct').textContent='Best answer: '+c.choices[v.correct];$('challenge-note').textContent=v.note;$('challenge-source').textContent=c.source.label;$('challenge-source').href=c.source.url;$('challenge-checked').textContent='Reference checked '+c.checkedOn;$('challenge-compare').textContent=answers[c.id]?.[1-variant]===undefined?'Try the other finding, then compare your decisions.':'You have tried both findings. Compare the clues and field notes.';}
  $('challenge-extra-sources').replaceChildren();
  if(a!==undefined)for(const src of [...(c.sources||[]).filter(s=>s.url!==c.source.url),...(c.level&&c.scopeSource?[c.scopeSource]:[])]){const p=document.createElement('p'),link=document.createElement('a');link.textContent=src.label;link.href=src.url;link.target='_blank';link.rel='noopener noreferrer';p.append(link);$('challenge-extra-sources').append(p);}
  const tried=cases.reduce((n,c)=>n+[0,1].filter(v=>answers[c.id]?.[v]!==undefined).length,0),complete=cases.filter(c=>[0,1].every(v=>answers[c.id]?.[v]!==undefined)).length;
  $('challenge-progress').textContent=`${complete}/${cases.length} challenges explored · ${tried}/${cases.length*2} findings tried. Practice progress is separate from exam scores.`;storage();
 }
 $('challenge-select').onchange=()=>{index=Number($('challenge-select').value);variant=0;save();render();};
 $('finding-original').onclick=()=>{variant=0;save();render();};$('finding-changed').onclick=()=>{variant=1;save();render();};
 const move=d=>{index=(index+d+cases.length)%cases.length;variant=0;save();render();};$('challenge-prev').onclick=()=>move(-1);$('challenge-next').onclick=()=>move(1);
 try{document.body.classList.toggle('dark-mode',localStorage.getItem('ems_theme')==='dark');}catch{}
 $('challenge-theme').onclick=()=>{const dark=document.body.classList.toggle('dark-mode');try{localStorage.setItem('ems_theme',dark?'dark':'light');}catch{}};
 render();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();

