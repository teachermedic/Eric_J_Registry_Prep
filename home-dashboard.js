/* Arrange existing study tools without changing their IDs, events, or saved data. */
(() => {
 'use strict';
 const setup=document.getElementById('setup-area');
 if(!setup)return;
 const node=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
 const get=id=>document.getElementById(id);
 const nav=node('nav',null,'dashboard-nav');nav.setAttribute('aria-label','Student navigation');
 const panels={};
 for(const [id,title,help] of [
  ['today','Your next small step.','Pick up where you left off, revisit a card, or fit in ten minutes.'],
  ['study','Make it stick.','Choose a way to practice. Take it one session at a time.'],
  ['my-progress','Look how far you’ve come.','Your study history, accomplishments, and plans in one place.'],
  ['resources','Keep your curiosity.','Find an explanation, build a presentation, or take your notes with you.']
 ]){
  const p=node('section',null,'dashboard-panel');p.id=id;p.hidden=true;
  const h=node('h2',title,'dashboard-heading');h.id=id+'-heading';h.tabIndex=-1;p.setAttribute('aria-labelledby',h.id);
  p.append(h,node('p',help,'dashboard-intro'));panels[id]=p;
  const a=node('a',{'today':'Today','study':'Study','my-progress':'My Progress','resources':'Resources'}[id]);a.href='#'+id;nav.append(a);
 }
 const tile=(title,description,href,mark='→')=>{
  const a=node('a',null,'dashboard-tile');a.href=href;
  const icon=node('span',mark,'tile-mark');icon.setAttribute('aria-hidden','true');
  const text=node('span',null,'tile-copy');text.append(node('strong',title),node('span',description));a.append(icon,text);return a;
 };
 const action=(title,description,fn,mark)=>{const b=tile(title,description,'#study',mark);b.addEventListener('click',e=>{e.preventDefault();fn();});return b;};
 const grid=node('div',null,'dashboard-grid');
 const practice=setup.querySelector('.quiz-setup-group');
 const practiceBox=node('details',null,'practice-settings');practiceBox.id='practice-settings';practiceBox.append(node('summary','Practice questions · choose your session'),practice);
 practice.querySelector('h3').textContent='Practice Questions & Exams';
 grid.append(action('Practice Questions','Review explanations or test yourself in Exam Mode.',()=>{practiceBox.open=true;practiceBox.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});get('topic-select').focus({preventScroll:true});},'01'));
 const old=setup.querySelector('.independent-study-group');
 const descriptions={
  'flashcards.html':['Clinical Flashcards','Reveal, recall, then choose Know or Don’t Know.','02'],
  'terminology-decks.html':['Terminology','Build confidence with roots, prefixes, and suffixes.','03'],
  'anatomy/':['Anatomy Atlas','Explore the structures behind the medicine.','04'],
  'research-present.html':['Research & Present','Follow your questions and share what you learn.','↗'],
  'change-finding.html':['Change One Finding','See how a single detail changes your clinical thinking.','05'],
  'what-first.html':['What Comes First?','Practice the order of your next decisions.','06'],
  'study-plan.html':['Build My Study Plan','Give your next study session a little direction.','↗']
 };
 for(const b of [...old.querySelectorAll('button')]){
  const href=b.getAttribute('onclick').match(/href='([^']+)'/)?.[1];const item=descriptions[href];if(!item)continue;
  const t=tile(...item.slice(0,2),href,item[2]);
  if(href==='research-present.html'){t.classList.add('tile-research');panels.resources.append(t);}
  else if(href==='study-plan.html')panels['my-progress'].append(t);
  else grid.append(t);
 }
 old.remove();panels.study.append(grid,practiceBox);
 const library=get('study-library'),resume=get('resume-card');
 const welcome=node('div',null,'today-welcome');welcome.append(node('span','A LITTLE PRACTICE, EVERY DAY','eyebrow'));
 const start=tile('Start studying','Choose questions, flashcards, or a clinical challenge.','#study','→');start.classList.add('tile-primary');start.id='today-start';
 const cardResume=tile('Continue your last deck','Pick up your saved flashcard session.','flashcards.html?resume=1','→');cardResume.classList.add('tile-primary');cardResume.hidden=true;
 welcome.append(resume,cardResume,start);panels.today.append(welcome);
 const todayGrid=node('div',null,'dashboard-grid today-grid');
 todayGrid.append(tile('I Have 10 Minutes','A short session with questions, cards, and confidence checks.','quick-study.html','10'));
 const review=node('details',null,'today-review');review.id='today-review';const reviewSummary=node('summary','Review what I don’t know');review.append(reviewSummary,node('p','Choose clinical cards or terminology. Your choices are saved separately from exam scores.','study-help'));
 const reviewLinks=node('div',null,'review-links');review.append(reviewLinks);todayGrid.append(review);panels.today.append(todayGrid);
 const streak=get('study-streak'),streakPreview=node('a',null,'streak-preview');streakPreview.href='#my-progress';streakPreview.append(node('span','YOUR STUDY STREAK','eyebrow'));const streakText=node('strong');streakPreview.append(streakText,node('span','See daily goals & accomplishments →'));panels.today.append(streakPreview);
 const reviewStats=()=>{
  const state=window.CardStudy?.getState(),catalog=window.FIELD_NOTE_CARDS||[];if(!state)return;
  let total=0;reviewLinks.replaceChildren();
  const savedKind=['clinical','terms'].find(kind=>state.sessions[kind]);
  cardResume.hidden=!resume.hidden||!savedKind;
  cardResume.href=(savedKind==='terms'?'terminology-decks.html':'flashcards.html')+'?resume=1';
  cardResume.querySelector('strong').textContent=savedKind==='terms'?'Continue terminology':'Continue your last deck';
  start.hidden=!resume.hidden||!!savedKind;
  for(const kind of ['clinical','terms']){
   const count=catalog.filter(c=>c.kind===kind).filter(c=>state.records[c.id]?.difficult===true).length;total+=count;
   reviewLinks.append(tile(kind==='clinical'?'Clinical cards':'Terminology',`${count} ${count===1?'card':'cards'} marked Don’t Know`,(kind==='clinical'?'flashcards.html':'terminology-decks.html')+'?mode=difficult',String(count)));
  }
  reviewSummary.textContent=`Review what I don’t know · ${total} ${total===1?'card':'cards'}`;
 };
 const syncResume=()=>{reviewStats();};syncResume();new MutationObserver(syncResume).observe(resume,{attributes:true,attributeFilter:['hidden']});
 const syncStreak=()=>{streakText.textContent=streak.querySelector('.streak-total')?.textContent||'Start with one study day.';};syncStreak();new MutationObserver(syncStreak).observe(streak,{childList:true,subtree:true});
 library.querySelector('h3').textContent='Saved study work';
 const cardDetails=node('details',null,'card-progress-details');cardDetails.append(node('summary','Flashcard progress & exact review lists'),get('card-study-dashboard'));library.append(cardDetails);
 panels['my-progress'].append(library,streak,get('badge-case'),get('progress-backup'));
 panels.resources.append(get('study-resource-tools'));
 const posts=get('substack-sidebar');posts.classList.add('dashboard-posts');panels.resources.append(posts);
 const instructor=setup.querySelector('[aria-labelledby="instructor-tools-heading"]');instructor.querySelector('h3').textContent='Instructor Corner';
 const footer=node('div',null,'dashboard-footer');footer.append(instructor,setup.querySelector('.sponsor-banner'));
 // Keep the original visit-streak elements for existing quiz callbacks, out of the student dashboard.
 const oldStreak=get('streak-container');oldStreak.hidden=true;oldStreak.setAttribute('aria-hidden','true');
 for(const child of [...setup.children])if(child!==oldStreak)child.remove();
 setup.prepend(nav,...Object.values(panels),footer);
 const activate=(focus=false)=>{
  const id=location.hash.slice(1);const target=Object.hasOwn(panels,id)?id:'today';
  for(const [key,p] of Object.entries(panels))p.hidden=key!==target;
  for(const a of nav.children){if(a.hash==='#'+target)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');}
  if(focus){panels[target].querySelector('h2').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
 };
 nav.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();if(location.hash!==a.hash)history.pushState(null,'',a.hash);activate(true);});
 window.addEventListener('popstate',()=>activate(true));window.addEventListener('hashchange',()=>activate(true));activate();reviewStats();
 // Saving or reloading a quiz returns to Today, where its resume action lives.
 new MutationObserver(()=>{if(setup.style.display==='none'){history.replaceState(null,'','#today');activate();}else if(setup.style.display==='block')activate(true);}).observe(setup,{attributes:true,attributeFilter:['style']});
 window.addEventListener('focus',reviewStats);window.addEventListener('storage',reviewStats);setInterval(reviewStats,60000);
 const title=document.querySelector('h1 .home-link');title.querySelector('img')?.remove();
 const sketch=node('span',null,'brand-sketch');sketch.setAttribute('aria-hidden','true');
 sketch.innerHTML='<svg viewBox="0 0 80 90" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 12v22c0 22 29 23 30 0V12M14 12h7m22 0h7M32 51v14c0 19 31 18 31-2V48"/><path d="M20 15v19c0 17 22 18 24 0M34 54v10" opacity=".4"/><circle cx="63" cy="40" r="8"/><circle cx="63" cy="40" r="4"/></svg>';
 title.prepend(sketch);document.querySelector('h2.subtitle').textContent='EMS & Registry Prep · One study session at a time.';
 const theme=get('theme-toggle');theme.setAttribute('aria-label','Toggle dark mode');get('theme-icon').setAttribute('aria-hidden','true');
 document.body.classList.add('dashboard-ready');
})();
