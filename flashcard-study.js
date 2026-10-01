/* Shared, browser-local card progress. Self-ratings are separate from exam scores. */
(() => {
 'use strict';
 const KEY='field_notes_cards_v1', DAY=86400000;
 const catalog=window.FIELD_NOTE_CARDS || [], byId=new Map(catalog.map(c=>[c.id,c]));
 const labels={clinical:'Clinical Flashcards',terms:'Terminology Decks',prefix:'Prefixes',suffix:'Suffixes',root:'Root Words',all:'All Cards'};
 const ratings=['again','hard','good','easy'];
 const isKnown=r=>typeof r.known==='boolean'?r.known:['good','easy'].includes(r.rating);
 const isDifficult=r=>typeof r.difficult==='boolean'?r.difficult:['again','hard'].includes(r.rating);
 let available=true, memory=null, state, active=null;
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 const button=(text,fn)=>{const b=el('button',text,'card-study-button');b.type='button';b.addEventListener('click',fn);return b;};
 const link=(text,href)=>{const a=el('a',text,'card-study-button');a.href=href;return a;};
 const empty=()=>({version:1,records:{},sessions:{},history:[],migrated:{}});
 function validSession(s,kind) {
  return s && Array.isArray(s.keys) && s.keys.length && s.keys.length<=catalog.length && new Set(s.keys).size===s.keys.length &&
   s.keys.every(id=>byId.get(id)?.kind===kind) && Number.isInteger(s.index) && s.index>=0 && s.index<s.keys.length &&
   typeof s.deck==='string' && ['learn','all','due','difficult','bookmarks','known','single'].includes(s.mode) && typeof s.flipped==='boolean';
 }
 function read() {
  try {
   const raw=JSON.parse(localStorage.getItem(KEY));available=true;
   if(!raw || raw.version!==1)return empty();
   const result=empty();
   for(const [id,r] of Object.entries(raw.records||{})) {
    if(!byId.has(id)||!r||typeof r!=='object')continue;
    const rated=ratings.includes(r.rating)&&Number.isFinite(r.due)&&r.due>=0&&Number.isFinite(r.interval)&&r.interval>=0;
    result.records[id]={bookmark:r.bookmark===true,...(typeof r.known==='boolean'?{known:r.known}:{}),...(typeof r.difficult==='boolean'?{difficult:r.difficult}:{}),...(rated?{rating:r.rating,due:r.due,interval:Math.min(r.interval,365),reviews:Number.isInteger(r.reviews)&&r.reviews>=0?r.reviews:0,reviewedAt:Number.isFinite(r.reviewedAt)?r.reviewedAt:null}:{})};
   }
   for(const kind of ['clinical','terms'])if(validSession(raw.sessions?.[kind],kind))result.sessions[kind]=raw.sessions[kind];
   result.history=Array.isArray(raw.history)?raw.history.filter(h=>h&&byId.has(h.id)&&ratings.includes(h.rating)&&Number.isFinite(h.date)&&h.date>=0).slice(-500):[];
   result.migrated={clinical:raw.migrated?.clinical===true,terms:raw.migrated?.terms===true};
   return result;
  } catch(e) {if(!(e instanceof SyntaxError)){available=false;return memory||empty();}return empty();}
 }
 function write() {
  memory=state;
  try {localStorage.setItem(KEY,JSON.stringify(state));available=true;}catch{available=false;}
  renderWarning();
 }
 function mutate(fn){state=read();fn(state);write();}
 function renderWarning(){document.querySelectorAll('.card-storage-warning').forEach(n=>n.textContent=available?'Saved in this browser on this device.':'This browser cannot save card progress. You can study, but changes may be lost when you leave.');}
 function migrate() {
  for(const kind of ['clinical','terms']) {
   if(state.migrated[kind])continue;
   let old;
   try {old=JSON.parse(localStorage.getItem(kind==='clinical'?'clinical-flashcards-progress-v4':'terminology-decks-progress-v1'))||{};}catch{old={};}
   for(const c of catalog.filter(c=>c.kind===kind)) {
    if(state.records[c.id]?.rating)continue;
    const rating=old.review?.[c.legacy]?'again':old.known?.[c.legacy]?'good':null;
    if(rating)state.records[c.id]={...state.records[c.id],rating,due:0,interval:0,reviews:0,reviewedAt:null};
   }
   state.migrated[kind]=true;
  }
  write();
 }
 const kindOfPage=document.getElementById('deckPicker')?'clinical':document.getElementById('termCard')?'terms':null;
 const pageFor=kind=>kind==='clinical'?'flashcards.html':'terminology-decks.html';
 function url(kind,params={}){return pageFor(kind)+'?'+new URLSearchParams(params);}
 function stats(cards) {
  const now=Date.now();return cards.reduce((s,c)=>{const r=state.records[c.id]||{};s.total++;if(r.rating)s.reviewed++;else if(!isKnown(r))s.new++;if(r.rating&&r.due<=now)s.due++;if(isDifficult(r))s.difficult++;if(r.bookmark)s.bookmarked++;if(isKnown(r))s.known++;return s;},{total:0,reviewed:0,new:0,due:0,difficult:0,bookmarked:0,known:0});
 }
 function renderDashboard() {
  const host=document.getElementById('card-study-dashboard');if(!host)return;
  const expanded=new Set([...host.querySelectorAll('details[open]')].map(d=>d.dataset.kind));
  host.replaceChildren(el('h4','Flashcards & Terminology'));
  host.append(el('p','Card familiarity uses your own ratings and is separate from question accuracy.','card-study-help'));
  for(const kind of ['clinical','terms']) {
   const cards=catalog.filter(c=>c.kind===kind),s=stats(cards),section=el('section',undefined,'card-dashboard-group');
   section.append(el('h5',labels[kind]),el('p',`${s.reviewed} of ${s.total} cards reviewed · ${s.new} new · ${s.due} due · ${s.difficult} difficult · ${s.known} known · ${s.bookmarked} bookmarked`));
   const actions=el('div',undefined,'card-study-actions');
   if(state.sessions[kind])actions.append(link('Continue Last Deck',url(kind,{resume:'1'})));
   actions.append(link('Review Due Cards',url(kind,{mode:'due'})),link('Review Difficult Cards',url(kind,{mode:'difficult'})),link('Card Bookmarks',url(kind,{mode:'bookmarks'})),link('Review Known Cards',url(kind,{mode:'known'})));
   section.append(actions);
   const details=el('details'),summary=el('summary','Progress by deck');details.dataset.kind=kind;details.open=expanded.has(kind);details.append(summary);
   for(const deck of [...new Set(cards.map(c=>c.deck))].sort()) {
    const d=stats(cards.filter(c=>c.deck===deck));details.append(el('p',`${labels[deck]||deck}: ${d.reviewed}/${d.total} reviewed · ${d.due} due · ${d.new} new`,'card-study-help'));
   }
   section.append(details);host.append(section);
  }
  const details=el('details');details.dataset.kind='history';details.open=expanded.has('history');details.append(el('summary','Recent Card Reviews'));
  for(const h of state.history.slice(-20).reverse()){const c=byId.get(h.id);details.append(el('p',`${new Date(h.date).toLocaleString()} · ${labels[c.kind]} · ${c.front} — ${h.rating[0].toUpperCase()+h.rating.slice(1)}`,'card-study-help'));}
  if(!state.history.length)details.append(el('p','Your card ratings will appear here.','card-study-help'));
  host.append(details);
 }
 let toolbar,statusNode,noticeNode,ratingPanel,bookmarkButton,difficultButton,knownButton,saveButton,resumeButton,viewMode='learn',selectedDeck='all';
 const sourceMap=new Map();
 function setupSources() {
  const raw=kindOfPage==='clinical'?quizData:TERM_DECKS;
  for(const c of raw){const id=JSON.stringify(kindOfPage==='clinical'?['clinical',c.category||'unknown',c.q]:['terms',c.cat,c.term]);if(byId.has(id))sourceMap.set(id,c);}
 }
 function filtered(deck,mode) {
  const now=Date.now();return catalog.filter(c=>c.kind===kindOfPage&&sourceMap.has(c.id)&&(deck==='all'||c.deck===deck)).filter(c=>{
   const r=state.records[c.id]||{};
   if(mode==='due')return r.rating&&r.due<=now;
   if(mode==='difficult')return isDifficult(r);
   if(mode==='bookmarks')return r.bookmark;
   if(mode==='known')return isKnown(r);
   if(mode==='learn')return (!r.rating&&!isKnown(r))||(r.rating&&r.due<=now);
   return true;
  }).map(c=>c.id);
 }
 function persistActive(){if(!active)return;const copy=JSON.parse(JSON.stringify(active));mutate(s=>{s.sessions[kindOfPage]=copy;});}
 function start(deck='all',mode='learn',ids=null) {
  state=read();
  if(state.sessions[kindOfPage]&&!confirm('Starting a new card session replaces your unfinished card session. Continue?'))return;
  selectedDeck=deck;viewMode=mode;
  const keys=ids||filtered(deck,mode);
  active=keys.length?{deck,mode,keys,index:0,flipped:false}:null;
  mutate(s=>{if(active)s.sessions[kindOfPage]=JSON.parse(JSON.stringify(active));else delete s.sessions[kindOfPage];});
  enterCardView();renderCard();
 }
 function resume() {
  state=read();const s=state.sessions[kindOfPage];if(!s)return;
  active=JSON.parse(JSON.stringify(s));selectedDeck=s.deck;viewMode=s.mode;enterCardView();renderCard();
 }
 function enterCardView(){if(kindOfPage==='clinical'){document.getElementById('deckPicker').style.display='none';document.getElementById('cardView').classList.add('visible');}}
 function saveExit(){persistActive();active=null;if(kindOfPage==='clinical'){document.getElementById('cardView').classList.remove('visible');document.getElementById('deckPicker').style.display='block';renderPicker();renderToolbar();}else location.href='index.html';}
 function renderToolbar(){
  const s=stats(catalog.filter(c=>c.kind===kindOfPage&&(selectedDeck==='all'||c.deck===selectedDeck)));
  statusNode.textContent=`${s.reviewed}/${s.total} reviewed · ${s.due} due · ${s.new} new · ${s.difficult} difficult · ${s.known} known · ${s.bookmarked} bookmarked`;
  const selector=document.getElementById('card-study-mode');if(selector)selector.value=viewMode==='single'?'all':viewMode;
  resumeButton.hidden=!state.sessions[kindOfPage]||!!active;saveButton.hidden=!active;
 }
 function renderPicker() {
  if(kindOfPage!=='clinical')return;
  const grid=document.getElementById('deckGrid');grid.replaceChildren();
  const decks=['all',...[...new Set(catalog.filter(c=>c.kind==='clinical').map(c=>c.deck))].sort()];
  for(const deck of decks){const s=stats(catalog.filter(c=>c.kind==='clinical'&&(deck==='all'||c.deck===deck)));const b=button('',()=>start(deck));b.className='deck-tile';b.append(el('p',deck==='all'?'All Clinical Cards':deck,'deck-tile-name'),el('p',`${s.reviewed}/${s.total} reviewed · ${s.due} due · ${s.new} new`,'deck-tile-stats'));grid.append(b);}
 }
 function current(){return active?active.keys[active.index]:null;}
 function flip(){if(!active)return;active.flipped=!active.flipped;renderFlip();persistActive();}
 function renderFlip(){const card=document.getElementById(kindOfPage==='clinical'?'main-card':'termCard');card.classList.toggle(kindOfPage==='clinical'?'is-flipped':'flipped',!!active?.flipped);ratingPanel.hidden=!active?.flipped;}
 function showEmpty() {
  const complete=document.getElementById('completionScreen');complete.classList.add('visible');
  if(kindOfPage==='clinical'){
   ['.flashcard-wrapper','.fc-controls','.fc-secondary-controls','.fc-progress-bar','.fc-meta'].forEach(sel=>document.querySelector(sel).style.display='none');
   document.getElementById('completionTitle').textContent='Card Session Complete';
  }else{document.body.classList.add('deck-finished');document.querySelector('#completionScreen h2').textContent='Card Session Complete';}
  document.getElementById('completionMessage').textContent=viewMode==='due'?'No more cards are due in this session. New cards are available with Study New & Due.':'No cards remain in this session. Your ratings schedule future reviews; you can also study all cards anytime.';
  document.querySelector('.card-reveal-button').hidden=true;ratingPanel.hidden=true;bookmarkButton.hidden=true;difficultButton.hidden=true;knownButton.hidden=true;renderToolbar();
 }
 function renderCard() {
  state=read();renderToolbar();if(!active){showEmpty();return;}
  const id=current(),c=sourceMap.get(id),meta=byId.get(id),r=state.records[id]||{};
  document.getElementById('completionScreen').classList.remove('visible');
  document.querySelector('.card-reveal-button').hidden=false;
  const difficult=isDifficult(r);
  document.getElementById('cardReviewBadge').textContent='Difficult';
  if(kindOfPage==='clinical'){
   ['.flashcard-wrapper','.fc-controls','.fc-secondary-controls','.fc-progress-bar','.fc-meta'].forEach(sel=>document.querySelector(sel).style.display='');
   document.getElementById('card-question-text').textContent=c.q;
   document.getElementById('card-answer-text').textContent=Array.isArray(c.answer)?c.answer.join(', '):c.answer;
   document.getElementById('card-rationale-text').textContent=c.rationale||'';
   let references=document.getElementById('card-sources');
   if(!references){references=el('div',undefined,'card-source-links');references.id='card-sources';document.querySelector('.card-back').append(references);}
   references.replaceChildren();
   for(const ref of c.references||[]){
    if(!ref||typeof ref.url!=='string'||!ref.url.startsWith('https://'))continue;
    const a=el('a',ref.label||'Source');a.href=ref.url;a.target='_blank';a.rel='noopener noreferrer';a.addEventListener('click',e=>e.stopPropagation());references.append(a);
   }
   if(c.reviewedOn)references.append(el('small','Sources checked '+c.reviewedOn));
   const cs=document.getElementById('card-cheat-sheet');cs.style.display=c.cheatSheet?'block':'none';cs.innerHTML=c.cheatSheet?'<strong>Field Note Summary:</strong> '+c.cheatSheet:'';
   document.getElementById('card-progress').textContent=`Card ${active.index+1} of ${active.keys.length} remaining`;
   document.getElementById('fcDeckLabel').textContent=labels[active.deck]||active.deck;
   document.getElementById('fcProgressFill').style.width=`${(active.index+1)/active.keys.length*100}%`;
   document.getElementById('cardReviewBadge').style.display=difficult?'block':'none';
  }else{
   document.body.classList.remove('deck-finished');
   document.getElementById('termText').textContent=c.term;document.getElementById('termSub').textContent=c.sub||'';
   document.getElementById('termDef').textContent=c.def;document.getElementById('termBreakdown').innerHTML=c.breakdown||'';
   document.getElementById('termCardCounter').textContent=`Card ${active.index+1} of ${active.keys.length} remaining`;
   document.getElementById('termDeckLabel').textContent=labels[active.deck]||active.deck;
   document.getElementById('termProgressFill').style.width=`${(active.index+1)/active.keys.length*100}%`;
   document.getElementById('cardReviewBadge').style.display=difficult?'block':'none';
   document.querySelectorAll('.deck-tab').forEach(t=>t.classList.toggle('active',t.dataset.deck===active.deck));
  }
  const s=stats(catalog.filter(c=>c.kind===kindOfPage&&(active.deck==='all'||c.deck===active.deck)));
  document.getElementById(kindOfPage==='clinical'?'knownCount':'termKnownCount').textContent=s.reviewed;
  document.getElementById(kindOfPage==='clinical'?'reviewCount':'termReviewCount').textContent=s.difficult;
  document.getElementById(kindOfPage==='clinical'?'remainingCount':'termRemainingCount').textContent=active.keys.length;
  bookmarkButton.hidden=false;bookmarkButton.textContent=r.bookmark?'Bookmarked ✓':'Bookmark Card';bookmarkButton.setAttribute('aria-pressed',String(!!r.bookmark));
  difficultButton.hidden=false;difficultButton.textContent=difficult?'Difficult ✓':'Mark Difficult';difficultButton.setAttribute('aria-pressed',String(difficult));
  knownButton.hidden=false;knownButton.textContent=isKnown(r)?'Known ✓':'Mark Known';knownButton.setAttribute('aria-pressed',String(isKnown(r)));
  renderFlip();
 }
 function rate(rating){
  if(!active?.flipped||!ratings.includes(rating))return;
  const id=current(),now=Date.now();
  mutate(s=>{
   const old=s.records[id]||{},prior=old.interval||0;
   const interval=rating==='again'?0:rating==='hard'?Math.min(60,Math.max(1,prior*1.2)):rating==='good'?Math.min(180,Math.max(1,prior*2.5)):Math.min(365,Math.max(4,prior*3.5));
   s.records[id]={bookmark:!!old.bookmark,difficult:['again','hard'].includes(rating),known:['good','easy'].includes(rating),rating,interval,due:now+(rating==='again'?600000:Math.round(interval*DAY)),reviews:(old.reviews||0)+1,reviewedAt:now};
   s.history.push({id,rating,date:now});s.history=s.history.slice(-500);
   active.keys.splice(active.index,1);active.index=active.index%Math.max(1,active.keys.length);active.flipped=false;
   if(active.keys.length)s.sessions[kindOfPage]=JSON.parse(JSON.stringify(active));else{delete s.sessions[kindOfPage];active=null;}
  });renderCard();
  noticeNode.textContent=`${rating[0].toUpperCase()+rating.slice(1)} saved. Next review: ${new Date(state.records[id].due).toLocaleString()}.`;
 }
 function move(delta){if(!active)return;active.index=(active.index+delta+active.keys.length)%active.keys.length;active.flipped=false;persistActive();renderCard();}
 function shuffle(){if(!active)return;for(let i=active.keys.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[active.keys[i],active.keys[j]]=[active.keys[j],active.keys[i]];}active.index=0;active.flipped=false;persistActive();renderCard();}
 function reset(all=false){
  if(!confirm(all?'Clear ratings, known and difficult flags, and review schedules for all cards on this page? Bookmarks will remain.':'Reset ratings, known and difficult flags, and review schedules for this deck? Bookmarks will remain.'))return;
  mutate(s=>{for(const c of catalog.filter(c=>c.kind===kindOfPage&&(all||selectedDeck==='all'||c.deck===selectedDeck))){const r=s.records[c.id];if(r?.bookmark)s.records[c.id]={bookmark:true};else delete s.records[c.id];}delete s.sessions[kindOfPage];});active=null;start(selectedDeck,'learn');
 }
 function setupPage(){
  setupSources();try{if(localStorage.getItem('ems_theme')==='dark')document.body.classList.add('dark-mode');}catch{}
  toolbar=el('section',undefined,'card-study-toolbar');toolbar.setAttribute('aria-label','Saved card study tools');
  toolbar.append(el('p','Bookmark cards or mark them difficult or known anytime. Known Cards saves familiar cards for later review. Reveal the answer to rate your recall and schedule a review.','card-study-help'));
  const warn=el('p','','card-study-help card-storage-warning');warn.setAttribute('role','status');toolbar.append(warn);
  statusNode=el('p','','card-study-summary');toolbar.append(statusNode);
  noticeNode=el('p','','card-study-help');noticeNode.setAttribute('role','status');toolbar.append(noticeNode);
  const actions=el('div',undefined,'card-study-actions');
  resumeButton=button('Continue Last Deck',resume);saveButton=button('Save & Exit',saveExit);
  bookmarkButton=button('Bookmark Card',()=>{const id=current();if(!id)return;mutate(s=>{s.records[id]={...s.records[id],bookmark:!s.records[id]?.bookmark};});renderCard();});bookmarkButton.hidden=true;
  difficultButton=button('Mark Difficult',()=>{const id=current();if(!id)return;mutate(s=>{const old=s.records[id]||{};s.records[id]={...old,difficult:!isDifficult(old),...(isDifficult(old)?{}:{known:false})};});renderCard();});difficultButton.hidden=true;
  knownButton=button('Mark Known',()=>{const id=current();if(!id)return;mutate(s=>{const old=s.records[id]||{};s.records[id]={...old,known:!isKnown(old),...(isKnown(old)?{}:{difficult:false})};});renderCard();});knownButton.hidden=true;
  actions.append(resumeButton,saveButton);
  toolbar.append(actions);
  const modeRow=el('div',undefined,'card-study-mode');
  const modeLabel=el('label','Study mode');modeLabel.htmlFor='card-study-mode';
  const modeSelect=el('select');modeSelect.id='card-study-mode';
  for(const [title,mode] of [['New & Due','learn'],['Due Cards','due'],['Difficult Cards','difficult'],['Bookmarked Cards','bookmarks'],['Known Cards','known'],['All Cards','all']]){const option=el('option',title);option.value=mode;modeSelect.append(option);}
  modeRow.append(modeLabel,modeSelect,button('Start Selected Mode',()=>start(selectedDeck,modeSelect.value)));toolbar.append(modeRow);
  const header=document.querySelector(kindOfPage==='clinical'?'.fc-header':'.term-header');header.after(toolbar);
  ratingPanel=el('div',undefined,'card-rating-panel');ratingPanel.hidden=true;ratingPanel.setAttribute('aria-label','Rate your recall');
  ratingPanel.append(el('p','How well did you recall this card?','card-study-help'));
  const row=el('div',undefined,'card-study-actions');for(const [label,rating,hint] of [['Again','again','10 min'],['Hard','hard','at least 1 day'],['Good','good','at least 1 day'],['Easy','easy','at least 4 days']]){const b=button(label,()=>rate(rating));b.title='Next review: '+hint;row.append(b);}ratingPanel.append(row);
  const controls=document.querySelector(kindOfPage==='clinical'?'.fc-controls':'.term-controls');controls.before(ratingPanel);
  if(kindOfPage==='clinical'){
   document.querySelector('.fc-secondary-controls button:last-child').textContent='Reset Deck Ratings';
   document.querySelector('.flashcard-wrapper').removeAttribute('onclick');document.querySelector('.flashcard-wrapper').addEventListener('click',flip);
   document.querySelector('.back-to-decks').removeAttribute('onclick');document.querySelector('.back-to-decks').addEventListener('click',saveExit);
   document.querySelectorAll('.fc-controls button').forEach((b,i)=>{b.removeAttribute('onclick');if(i===1||i===2)b.hidden=true;else b.addEventListener('click',()=>move(i===0?-1:1));});
   document.querySelectorAll('.fc-secondary-controls button').forEach((b,i)=>{b.removeAttribute('onclick');b.addEventListener('click',i===0?shuffle:i===1?()=>start(selectedDeck,'difficult'):()=>reset());});
   document.getElementById('resetFromCompleteBtn').textContent='Study New & Due';document.getElementById('resetFromCompleteBtn').addEventListener('click',()=>start(selectedDeck,'learn'));
   document.getElementById('backFromCompleteBtn').addEventListener('click',saveExit);
   document.querySelector('.fc-stats small').textContent='Reviewed';document.querySelector('.stat-review small').textContent='Difficult';renderPicker();
  }else{
   document.getElementById('termResetBtn').textContent='Reset Deck Ratings';
   document.getElementById('clearProgressBtn').textContent='Clear All Card Ratings';
   document.getElementById('termCard').addEventListener('click',flip);
   for(const [id,fn] of [['termPrevBtn',()=>move(-1)],['termNextBtn',()=>move(1)],['termShuffleBtn',shuffle],['termResetBtn',()=>reset()],['reviewOnlyBtn',()=>start(selectedDeck,'difficult')],['clearProgressBtn',()=>reset(true)],['resetFromCompleteBtn',()=>start(selectedDeck,'learn')],['reviewMissedFromCompleteBtn',()=>start(selectedDeck,'difficult')]])document.getElementById(id).addEventListener('click',fn);
   document.getElementById('termKnowBtn').hidden=true;document.getElementById('termReviewBtn').hidden=true;
   document.getElementById('resetFromCompleteBtn').textContent='Study New & Due';
   document.querySelector('.term-stat.known .lbl').textContent='Reviewed';document.getElementById('termReviewCount').parentElement.querySelector('.lbl').textContent='Difficult';
   document.querySelectorAll('.deck-tab').forEach(tab=>tab.addEventListener('click',()=>start(tab.dataset.deck)));
  }
  // Accessible reveal button also supports cards without relying on pointer interaction.
  const reveal=button('Reveal / Hide Answer',flip);reveal.classList.add('card-reveal-button');controls.before(reveal);
  controls.classList.add('card-navigation');
  const center=el('div',undefined,'card-mark-actions');center.append(bookmarkButton,difficultButton,knownButton);
  const prev=button('◀ Prev',()=>move(-1)),next=button('Next ▶',()=>move(1));prev.classList.add('card-prev');next.classList.add('card-next');
  controls.replaceChildren(prev,center,next);
  document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT','BUTTON','A','SUMMARY'].includes(e.target.tagName)||!active)return;
   if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1);if(e.key===' '){e.preventDefault();flip();}
   if(['1','2','3','4'].includes(e.key))rate(ratings[Number(e.key)-1]);if(e.key==='Escape')saveExit();});
  const params=new URLSearchParams(location.search);
  if(params.has('card')&&sourceMap.has(params.get('card')))start(byId.get(params.get('card')).deck,'single',[params.get('card')]);
  else if(params.get('resume')==='1')resume();
  else if(['due','difficult','bookmarks','known'].includes(params.get('mode')))start('all',params.get('mode'));
  else if(kindOfPage==='terms'){if(state.sessions.terms)resume();else start();}
  if(!active&&state.sessions[kindOfPage]&&kindOfPage==='terms')resume();
  renderToolbar();renderWarning();
  if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
 }
 state=read();migrate();
 if(kindOfPage)setupPage();else renderDashboard();
 window.addEventListener('storage',e=>{if(e.key===KEY){state=read();renderDashboard();if(kindOfPage){renderToolbar();renderPicker();}}});
 const refresh=()=>{state=read();renderDashboard();if(kindOfPage)renderToolbar();};
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
 window.addEventListener('focus',refresh);
 setInterval(refresh,60000);
 window.CardStudy={storageKey:KEY,refresh:()=>{state=read();renderDashboard();},getState:()=>JSON.parse(JSON.stringify(state))};
})();
