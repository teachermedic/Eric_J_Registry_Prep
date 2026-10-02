/* Permanent, browser-local learning milestones. No exam scores are modified. */
((root)=>{
 'use strict';
 const KEY='field_notes_badges_v1',groups=['sessions','days','recovered','known','findingParts','findings','orders','blocks'];
 const validId=id=>typeof id==='string'&&id.length>0&&id.length<=2048&&!['__proto__','constructor','prototype'].includes(id);
 const validTime=n=>Number.isFinite(n)&&n>=0&&n<=8640000000000000;
 const day=n=>{const d=new Date(n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
 function empty(){return {version:1,...Object.fromEntries(groups.map(g=>[g,{}])),unknownAt:{},earned:{}};}
 function clean(raw){const s=empty();if(raw?.version!==1)return s;for(const g of groups)if(raw[g]&&typeof raw[g]==='object'&&!Array.isArray(raw[g]))for(const [id,v]of Object.entries(raw[g]))if(validId(id)&&v===true)s[g][id]=true;
  for(const g of ['unknownAt','earned'])if(raw[g]&&typeof raw[g]==='object'&&!Array.isArray(raw[g]))for(const [id,v]of Object.entries(raw[g]))if(validId(id)&&validTime(v))s[g][id]=v;return s;}
 function record(s,e){if(!e||!validId(e.id))return;const date=validTime(e.date)?e.date:Date.now();
  if(e.type==='activity'){s.days[day(date)]=true;return;}
  if(e.type==='card'){
   if(e.know===false)s.unknownAt[e.id]=Math.min(s.unknownAt[e.id]??date,date);
   if(e.know===true){s.known[e.id]=true;if(Object.hasOwn(s.unknownAt,e.id)&&date>=s.unknownAt[e.id])s.recovered[e.id]=true;}
  }else if(e.type==='finding'&&[0,1].includes(e.variant)){s.findingParts[JSON.stringify([e.id,e.variant])]=true;if([0,1].every(v=>s.findingParts[JSON.stringify([e.id,v])]))s.findings[e.id]=true;
  }else{const g={session:'sessions',order:'orders',block:'blocks'}[e.type];if(g)s[g][e.id]=true;}
  if(e.activity!==false)s.days[day(date)]=true;
 }
 function definitions(s,catalog=[]){const count=g=>Object.keys(s[g]).length,path=catalog.filter(c=>c.kind==='clinical'&&c.deck==='Pathophysiology'),p=path.filter(c=>s.known[c.id]).length;
  return [
   {id:'first-shift',icon:'🚑',name:'First Shift',goal:1,value:count('sessions'),rule:'Complete your first study session.',unit:'sessions',href:'quick-study.html'},
   {id:'showing-up',icon:'🔟',name:'Showing Up',goal:10,value:count('sessions'),rule:'Complete 10 study sessions.',unit:'sessions',href:'quick-study.html'},
   {id:'steady-student',icon:'📅',name:'Steady Student',goal:5,value:count('days'),rule:'Study on five different days. They do not need to be consecutive.',unit:'study days',href:'study-plan.html'},
   {id:'pathophysiology-pass',icon:'🧠',name:'Pathophysiology Pass',goal:path.length||null,value:p,rule:'Reveal and mark every Pathophysiology flashcard Know at least once.',unit:'cards marked Know',href:'flashcards.html'},
   {id:'comeback-kid',icon:'🔄',name:'Comeback Kid',goal:10,value:count('recovered'),rule:'Mark 10 different cards Know after previously marking them Don’t Know.',unit:'cards recovered',href:'flashcards.html?mode=difficult'},
   {id:'finding-difference',icon:'🔍',name:'Finding the Difference',goal:5,value:count('findings'),rule:'Correctly answer both findings in five different Change One Finding cases.',unit:'cases',href:'change-finding.html'},
   {id:'priorities-order',icon:'🪜',name:'Priorities in Order',goal:5,value:count('orders'),rule:'Complete five different What Comes First cases with all priority links correct.',unit:'cases',href:'what-first.html'},
   {id:'following-through',icon:'🎯',name:'Following Through',goal:5,value:count('blocks'),rule:'Mark five different scheduled study-plan blocks complete after doing the work.',unit:'blocks',href:'study-plan.html'}
  ];
 }
 function award(s,catalog,now=Date.now()){const earned=[];for(const b of definitions(s,catalog))if(b.goal&&b.value>=b.goal&&!Object.hasOwn(s.earned,b.id)){s.earned[b.id]=now;earned.push(b.id);}return earned;}
 // Inline vector emblems render consistently without an emoji font or network request.
 const emblems={
  'first-shift':'<path d="M10 4h12v6h6v12h-6v6H10v-6H4V10h6z" fill="currentColor" stroke="none"/>',
  'showing-up':'<text x="16" y="23" text-anchor="middle" fill="currentColor" stroke="none" font-family="Arial,sans-serif" font-weight="bold" font-size="22">10</text>',
  'steady-student':'<rect x="4" y="6" width="24" height="23" rx="3"/><path d="M4 13h24M10 3v6M22 3v6"/><text x="16" y="24" text-anchor="middle" fill="currentColor" stroke="none" font-family="Arial,sans-serif" font-size="12" font-weight="bold">5</text>',
  'pathophysiology-pass':'<path d="M16 5C9 0 5 5 6 9 1 10 1 16 5 18 2 23 7 29 12 26 13 29 16 28 16 24V5zm0 0c7-5 11 0 10 4 5 1 5 7 1 9 3 5-2 11-7 8-1 3-4 2-4-2"/><path d="M8 10l4 3-3 4m15-7-4 3 3 4M7 23l5-3m13 3-5-3"/>',
  'comeback-kid':'<path d="M26 12A11 11 0 0 0 7 7L3 11m0-7v7h7M6 20a11 11 0 0 0 19 5l4-4m0 7v-7h-7"/>',
  'finding-difference':'<circle cx="13" cy="13" r="9"/><path d="m20 20 9 9M9 13h8m-4-4v8"/>',
  'priorities-order':'<path d="M3 28h9v-8h8v-8h9M5 17 20 2m-8 0h8v8"/>',
  'following-through':'<circle cx="16" cy="16" r="13"/><circle cx="16" cy="16" r="8"/><circle cx="16" cy="16" r="3" fill="currentColor" stroke="none"/>'
 };
 const engine={KEY,empty,clean,record,definitions,award};if(typeof module==='object'&&module.exports){module.exports=engine;return;}
 root.StudyBadgeEngine=engine;
 let memory=empty(),available=true,toastTimer;
 const node=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 function read(){try{const s=clean(JSON.parse(localStorage.getItem(KEY)));available=true;return s;}catch(e){if(e instanceof SyntaxError)return empty();available=false;return clean(memory);}}
 function source(key){try{const s=JSON.parse(localStorage.getItem(key));return s?.version===1?s:{};}catch{return {};}}
 function save(s){memory=s;try{const json=JSON.stringify(s);if(localStorage.getItem(KEY)!==json)localStorage.setItem(KEY,json);available=true;}catch{available=false;}}
 const catalog=()=>root.FIELD_NOTE_CARDS||[];
 function scan(s){
  const quiz=source('field_notes_study_v1'),quick=source('field_notes_quick_v1'),cards=root.CardStudy?.getState()||source('field_notes_cards_v1'),order=source('field_notes_order_v1'),finding=source('field_notes_finding_v1'),plan=source('field_notes_plan_v1');
  for(const h of Array.isArray(quiz.history)?quiz.history:[]){const date=Date.parse(h?.date);if(validId(h?.id)&&validTime(date)&&h.total>0&&h.completed===h.total)record(s,{type:'session',id:'quiz:'+h.id,date});}
  for(const h of Array.isArray(quick.history)?quick.history:[])if(validTime(h?.date)&&h.tried===8&&h.badgeComplete!==false)record(s,{type:'session',id:h.id||`quick:${h.date}:${h.level}`,date:h.date});
  const ids=new Set(catalog().map(c=>c.id));
  for(const h of (Array.isArray(cards.history)?cards.history:[]).filter(h=>ids.has(h?.id)&&validTime(h?.date)).sort((a,b)=>a.date-b.date))if(['again','hard','good','easy'].includes(h.rating))record(s,{type:'card',id:h.id,know:['good','easy'].includes(h.rating),date:h.date});
  for(const [id,r]of Object.entries(cards.records||{})){if(!ids.has(id)||!r)continue;const know=r.known===true||(!Object.hasOwn(r,'known')&&['good','easy'].includes(r.rating)),unknown=r.difficult===true||(!Object.hasOwn(r,'difficult')&&['again','hard'].includes(r.rating));if(know||unknown)record(s,{type:'card',id,know:know&&!unknown,date:validTime(r.reviewedAt)?r.reviewedAt:Date.now(),activity:validTime(r.reviewedAt)});}
  for(const c of root.CHANGE_FINDING_CASES||[])for(const variant of [0,1])if(finding.answers?.[c.id]?.[variant]===c.variants[variant].correct)record(s,{type:'finding',id:c.id,variant,activity:false});
  const orders=new Map((root.WHAT_FIRST_CASES||[]).map(c=>[c.id,c]));for(const h of Array.isArray(order.history)?order.history:[]){const c=orders.get(h?.id);if(!c||!Array.isArray(h.order)||h.order.length!==c.steps.length||new Set(h.order).size!==c.steps.length||!c.steps.every(t=>h.order.includes(t.id))||!validTime(h.date))continue;record(s,{type:'activity',id:c.id,date:h.date});if(c.dependencies.every(([a,b])=>h.order.indexOf(a)<h.order.indexOf(b)))record(s,{type:'order',id:c.id,date:h.date});}
  for(const t of Array.isArray(plan.plan?.tasks)?plan.plan.tasks:[])if(t?.done===true&&validId(t.id))record(s,{type:'block',id:t.id,activity:false});
 }
 function render(s){const host=document.getElementById('badge-case');if(!host)return;const list=definitions(s,catalog()),earned=list.filter(b=>Object.hasOwn(s.earned,b.id));host.replaceChildren();
  const title=node('div',undefined,'badge-case-heading');title.append(node('h3','My Badge Case'),node('span',`${earned.length} / ${list.length} earned`,'badge-total'));host.append(title,node('p','Celebrate the work you put in. Earned badges stay yours, even when a topic needs another review.','badge-help'));
  const grid=node('div',undefined,'badge-grid');
  for(const b of list){const unlocked=Object.hasOwn(s.earned,b.id),card=node('article',undefined,'achievement'+(unlocked?' earned':' locked')),seal=node('div',undefined,'badge-seal');seal.setAttribute('aria-hidden','true');seal.innerHTML='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">'+emblems[b.id]+'</svg>';card.append(seal,node('h4',b.name),node('p',b.rule,'badge-rule'));
   if(unlocked)card.append(node('p','✓ Earned '+new Date(s.earned[b.id]).toLocaleDateString(),'badge-earned-date'));
   else{const p=node('progress');p.max=b.goal||1;p.value=Math.min(b.value,b.goal||0);p.setAttribute('aria-label',b.name+' progress');card.append(p,node('p',b.goal?`${Math.min(b.value,b.goal)} / ${b.goal} ${b.unit}`:'Open flashcards to load this deck.','badge-progress'));}
   const a=node('a',unlocked?'Keep Practicing':'Work Toward This Badge','badge-action');a.href=b.href;card.append(a);grid.append(card);
  }
  host.append(grid);const info=node('details'),summary=node('summary','What counts toward badges?');info.append(summary,node('p','A study session means a finished question session, all eight items in a 10-minute session, or a finished flashcard deck (individual search-card views do not count). Simply opening or leaving an activity does not count. Study days use your device’s local date. Cases, recovered cards, and plan blocks count once each.','badge-help'),node('p','These milestones recognize participation and self-rated recall. They do not measure clinical competence or exam readiness. Saved activity can receive credit when its history contains enough detail.','badge-help'));host.append(info,node('p',available?'Badges are saved in this browser on this device.':'This browser cannot save badges. They may be lost when you leave.','badge-help badge-storage'));
 }
 function celebrate(ids,s){if(!ids.length)return;document.getElementById('badge-celebration')?.remove();clearTimeout(toastTimer);const box=node('aside',undefined,'badge-celebration');box.id='badge-celebration';box.setAttribute('aria-label','New accomplishment');const msg=node('p',undefined);msg.setAttribute('role','status');const defs=definitions(s,catalog());msg.textContent='🏅 '+ids.map(id=>defs.find(b=>b.id===id)?.name||id).join(' · ')+' earned!';const a=node('a','View My Badges');a.href='index.html#badge-case';const close=node('button','Dismiss');close.type='button';close.onclick=()=>box.remove();box.append(msg,a,close);document.body.append(box);toastTimer=setTimeout(()=>box.remove(),20000);}
 function refresh(e){const s=read();scan(s);if(e)record(s,e);const earned=award(s,catalog());save(s);render(s);celebrate(earned,s);return s;}
 root.StudyBadges={record:e=>refresh(e),refresh:()=>refresh(),getState:()=>clean(read()),storageKey:KEY};
 refresh();window.addEventListener('storage',e=>{if(e.key?.startsWith('field_notes_'))refresh();});window.addEventListener('focus',()=>refresh());
})(typeof window==='object'?window:globalThis);
