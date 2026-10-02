/* Search and printing read saved work without changing study sessions. */
(()=>{
 'use strict';
 const host=document.getElementById('study-resource-tools');if(!host)return;
 const node=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 const plain=value=>{const n=document.createElement('div');n.innerHTML=String(value||'');return n.textContent||'';};
 const qkey=q=>JSON.stringify([q.section||'',q.category||'',q.type,q.q]);
 const catalog=new Map((window.FIELD_NOTE_CARDS||[]).map(c=>[c.id,c]));
 const rows=[...quizData.map(q=>({id:qkey(q),kind:'questions',title:q.q,category:q.category,answer:q.answer,rationale:q.rationale,options:q.options,gridRows:q.rows,gridCols:q.cols,context:[q.history,q.physical,q.vitals].filter(Boolean).map(v=>typeof v==='object'?JSON.stringify(v):plain(v)).join('\n'),chain:q.chainID})),
 ...(window.STUDY_CLINICAL_CARDS||[]).map(c=>{const id=JSON.stringify(['clinical',c.category||'unknown',c.q]);return {id,kind:'clinical',title:c.q,category:catalog.get(id)?.deck||c.category,answer:c.answer,rationale:c.rationale};}),
 ...TERM_DECKS.map(c=>({id:JSON.stringify(['terms',c.cat,c.term]),kind:'terms',title:c.term,category:catalog.get(JSON.stringify(['terms',c.cat,c.term]))?.deck||c.cat,answer:c.def,rationale:plain(c.breakdown)}))];
 const label={questions:'Practice Question',clinical:'Clinical Flashcard',terms:'Terminology Card'};
 for(const r of rows)r.search=[r.title,r.category,r.answer,r.rationale,r.context,r.gridRows,r.gridCols].map(plain).join(' ').toLocaleLowerCase();
 let matches=[],shown=0;
 const input=document.getElementById('resource-search'),filter=document.getElementById('resource-type'),results=document.getElementById('resource-results'),status=document.getElementById('resource-search-status'),more=document.getElementById('resource-more');
 function renderMore(){
  for(const r of matches.slice(shown,shown+30)){
   const item=node('article',undefined,'resource-result');item.append(node('small',label[r.kind]+' · '+r.category),node('p',r.title));
   const detail=node('details'),summary=node('summary','Show answer');detail.append(summary,node('p',Array.isArray(r.answer)?r.answer.join(', '):r.answer));if(r.gridRows)detail.append(node('p','Match: '+r.gridRows.join('; ')+' — Choices: '+r.gridCols.join(', ')));if(r.rationale)detail.append(node('p',plain(r.rationale)));item.append(detail);
   if(r.kind==='questions'){const b=node('button','Practice Question','study-button');b.type='button';b.onclick=()=>startStudyCollection('Search',[r.id]);item.append(b);}
   else{const a=node('a','Open Card','study-button');a.href=(r.kind==='clinical'?'flashcards.html':'terminology-decks.html')+'?card='+encodeURIComponent(r.id);item.append(a);}
   results.append(item);
  }
  shown=Math.min(matches.length,shown+30);more.hidden=shown>=matches.length;
 }
 function search(){
  results.replaceChildren();shown=0;const words=input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if(!words.length){matches=[];status.textContent='Enter a condition, term, or topic to search questions and cards.';more.hidden=true;return;}
  matches=rows.filter(r=>(filter.value==='all'||r.kind===filter.value)&&words.every(w=>r.search.includes(w)));
  status.textContent=matches.length?`${matches.length} results. Answers are hidden until you open them.`:'No matches. Try a shorter term or choose All Content.';renderMore();
 }
 input.addEventListener('input',search);filter.addEventListener('change',search);more.onclick=renderMore;
 function saved(key){try{const s=JSON.parse(localStorage.getItem(key));return s?.version===1?s:{};}catch{return {};}}
 function collection(value){
  const q=saved('field_notes_study_v1'),c=window.CardStudy?.getState()||saved('field_notes_cards_v1');
  if(value==='missed'||value==='question-bookmarks'){
   const raw=value==='missed'?q.missed:q.bookmarks;const ids=new Set(Array.isArray(raw)?raw:[]);
   const selected=rows.filter(r=>r.kind==='questions'&&ids.has(r.id)),chains=new Set(selected.map(r=>r.chain).filter(Boolean));
   return rows.filter(r=>r.kind==='questions'&&(ids.has(r.id)||(r.chain&&chains.has(r.chain))));
  }
  return rows.filter(r=>r.kind!=='questions').filter(r=>{const record=c.records?.[r.id]||{};if(value==='card-bookmarks')return record.bookmark===true;if(value==='difficult')return typeof record.difficult==='boolean'?record.difficult:['again','hard'].includes(record.rating);return typeof record.known==='boolean'?record.known:['good','easy'].includes(record.rating);});
 }
 const dialog=document.getElementById('resource-print-dialog'),sheet=document.getElementById('resource-print-sheet'),notice=document.getElementById('resource-print-status'),select=document.getElementById('resource-print-collection');
 document.getElementById('resource-preview').onclick=()=>{
  const selected=collection(select.value);notice.textContent='';if(!selected.length){notice.textContent='This collection is empty. Save questions or mark cards first.';return;}
  sheet.replaceChildren(node('h1',"Eric J’s Field Notes — Study Sheet"),node('p',select.selectedOptions[0].textContent+' · '+selected.length+' items · '+new Date().toLocaleDateString()),node('p','Name: __________________________    Date: ______________'));
  const answers=document.getElementById('resource-print-answers').checked;
  selected.forEach((r,i)=>{const item=node('article',undefined,'resource-print-item');item.append(node('h2',`${i+1}. ${r.title}`),node('small',label[r.kind]+' · '+r.category));if(r.context)item.append(node('p',r.context));if(Array.isArray(r.options))for(const option of r.options)item.append(node('p','☐ '+option));if(r.gridRows){item.append(node('p','Match each item to: '+r.gridCols.join(', ')));for(const prompt of r.gridRows)item.append(node('p',prompt+' — __________________'));}if(answers){item.append(node('p','Answer: '+(Array.isArray(r.answer)?r.answer.join(', '):r.answer)));if(r.rationale)item.append(node('p','Explanation: '+plain(r.rationale)));}else item.append(node('div','Your answer: __________________________________________________\n\n________________________________________________________________','resource-answer-lines'));sheet.append(item);});
  dialog.showModal();
 };
 document.getElementById('resource-print').onclick=()=>window.print();document.getElementById('resource-close').onclick=()=>dialog.close();
 search();
})();
