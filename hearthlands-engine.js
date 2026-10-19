/* Instructor-owned campaign state. No student identities or answer keys are persisted. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.Hearthlands=api;})(typeof window==='object'?window:globalThis,function(){
'use strict';
const KEY='field_notes_hearthlands_v1',VERSION=1;
const BUILDINGS=[{id:'lodge',name:'Lodge',icon:'⌂'},{id:'library',name:'Library',icon:'▤'},{id:'infirmary',name:'Infirmary',icon:'✚'},{id:'watchtower',name:'Watchtower',icon:'♜'},{id:'garden',name:'Garden',icon:'❀'},{id:'bridge',name:'Bridge',icon:'∩'}];
const uid=()=>typeof crypto==='object'&&crypto.randomUUID?crypto.randomUUID():'h'+Date.now().toString(36)+Math.random().toString(36).slice(2);
const clone=v=>JSON.parse(JSON.stringify(v));
const label=(s,max=70)=>{if(typeof s!=='string'||!s.trim()||s.trim().length>max)throw Error('Use a name between 1 and '+max+' characters.');return s.trim();};
const activity=s=>label(s,80).normalize('NFKC').toLowerCase().replace(/\s+/g,' ');
const empty=()=>({version:VERSION,campaigns:[],activeCampaignId:'',activeClassId:''});
function campaign(s,id=s.activeCampaignId){const c=s.campaigns.find(c=>c.id===id);if(!c)throw Error('Choose a saved campaign.');return c;}
function classroom(c,id){const cl=c.classes.find(x=>x.id===id);if(!cl)throw Error('Choose a class in this campaign.');return cl;}
function team(cl,id){const t=cl.teams.find(t=>t.id===id);if(!t)throw Error('Team no longer exists.');return t;}
function createCampaign(s,name){if(s.campaigns.length>=10)throw Error('Up to 10 campaigns can be saved here. Export backups before starting elsewhere.');const c={id:uid(),name:label(name),classes:[]};s.campaigns.push(c);s.activeCampaignId=c.id;s.activeClassId='';return c;}
function createClass(s,cid,name,names){const c=campaign(s,cid);if(c.classes.length>=10)throw Error('A campaign allows up to 10 classes.');if(!Array.isArray(names)||names.length<1||names.length>30)throw Error('Use 1–30 teams.');names=names.map(n=>label(n,40));if(new Set(names.map(n=>n.toLowerCase())).size!==names.length)throw Error('Give each team a different name.');const cl={id:uid(),name:label(name),teams:names.map(name=>({id:uid(),name,balance:0,buildings:Object.fromEntries(BUILDINGS.map(b=>[b.id,0]))})),rounds:[]};c.classes.push(cl);s.activeCampaignId=c.id;s.activeClassId=cl.id;return cl;}
function createTeam(s,cid,clid,name){const cl=classroom(campaign(s,cid),clid);name=label(name,40);if(cl.teams.length>=30)throw Error('This class has reached its 30-team limit. Join an existing team.');if(cl.teams.some(t=>t.name.toLowerCase()===name.toLowerCase()))throw Error('That team already exists. Join it or choose another name.');const t={id:uid(),name,balance:0,buildings:Object.fromEntries(BUILDINGS.map(b=>[b.id,0]))};cl.teams.push(t);return t;}
function accuracy(results){const total=results.reduce((n,r)=>n+r.total,0);return total?results.reduce((n,r)=>n+r.correct,0)/total:null;}
function record(s,cid,clid,round){
 const cl=classroom(campaign(s,cid),clid);if(cl.rounds.some(r=>r.id===round.id))throw Error('This session has already been awarded.');if(cl.rounds.length>=200)throw Error('This class has reached 200 saved sessions. Start a new campaign for the next term.');
 const id=label(round.id,80),key=activity(round.activity),seen=new Set();
 if(!Array.isArray(round.results)||!round.results.length)throw Error('No scored team results to award.');
 const results=round.results.map(r=>{team(cl,r.teamId);if(seen.has(r.teamId))throw Error('Duplicate team result.');seen.add(r.teamId);if(!Number.isInteger(r.total)||r.total<0||r.total>3600||!Number.isInteger(r.correct)||r.correct<0||r.correct>r.total||!Number.isInteger(r.answered)||r.answered<r.correct||r.answered>r.total)throw Error('Invalid team result.');return {...r};}).filter(r=>r.total>0);
 if(!results.some(r=>r.answered>0))throw Error('At least one scored answer is needed. Slides, polls, previews, and unanswered sessions do not earn supplies.');
 for(const r of results){const previous=cl.rounds.filter(x=>x.activity===key).flatMap(x=>x.results).filter(x=>x.teamId===r.teamId&&x.total>0),best=previous.length?Math.max(...previous.map(x=>x.correct/x.total)):null;
 const improvement=best===null?0:Math.max(0,r.correct/r.total-best);r.earned=r.answered?10+Math.round(30*r.correct/r.total)+Math.round(10*improvement):0;team(cl,r.teamId).balance+=r.earned;
 }
 const saved={id,activity:key,at:new Date().toISOString(),results};cl.rounds.push(saved);return saved;
}
function upgrade(s,cid,clid,tid,bid){const t=team(classroom(campaign(s,cid),clid),tid);if(!BUILDINGS.some(b=>b.id===bid))throw Error('Choose a building.');const level=t.buildings[bid];if(level>=3)throw Error('This building is fully upgraded.');const cost=30*(level+1);if(t.balance<cost)throw Error('This upgrade needs '+cost+' supplies.');t.balance-=cost;t.buildings[bid]++;return cost;}
function league(c){
 const sets=c.classes.map(cl=>new Set(cl.rounds.map(r=>r.activity))),shared=sets.length>=2?[...sets[0]].filter(k=>sets.every(set=>set.has(k))):[];
 const rows=c.classes.map(cl=>{const scores=shared.map(k=>{const attempts=cl.rounds.filter(r=>r.activity===k).map(r=>accuracy(r.results)).filter(n=>n!==null);return {best:Math.max(...attempts),first:attempts[0]};});return {id:cl.id,name:cl.name,activities:shared.length,accuracy:scores.length?scores.reduce((n,s)=>n+s.best,0)/scores.length:null,improvement:scores.length?scores.reduce((n,s)=>n+s.best-s.first,0)/scores.length:null};}).sort((a,b)=>(b.accuracy??-1)-(a.accuracy??-1));
 return {shared,rows};
}
function landmark(c){const correct=c.classes.flatMap(cl=>cl.rounds).flatMap(r=>r.results).reduce((n,r)=>n+r.correct,0);const goals=[100,250,500],level=goals.filter(n=>correct>=n).length;return {correct,level,target:goals[level]||500,name:['Campfire','Wayside shelter','Timber hall','Great Gathering Hall'][level]};}
function publicClass(c,cl){return {campaign:c.name,className:cl.name,landmark:landmark(c),teams:cl.teams.map(t=>({id:t.id,name:t.name,balance:t.balance,buildings:{...t.buildings}}))};}
function validate(raw){
 if(!raw||raw.version!==VERSION||!Array.isArray(raw.campaigns)||raw.campaigns.length>10)throw Error('Unsupported campaign backup.');
 const id=v=>{if(typeof v!=='string'||!/^[-\w]{1,80}$/.test(v))throw Error('Invalid campaign identifier.');return v;};
 const integer=(v,max)=>{if(!Number.isSafeInteger(v)||v<0||v>max)throw Error('Invalid progress value.');return v;};
 const unique=a=>{if(new Set(a.map(v=>v.id)).size!==a.length)throw Error('Duplicate identifiers in backup.');};
 const campaigns=raw.campaigns.map(c=>{
 if(!Array.isArray(c.classes)||c.classes.length>10)throw Error('Invalid class list.');
 const classes=c.classes.map(cl=>{
 if(!Array.isArray(cl.teams)||cl.teams.length<1||cl.teams.length>30||!Array.isArray(cl.rounds)||cl.rounds.length>200)throw Error('Invalid teams or session history.');
 const teams=cl.teams.map(t=>({id:id(t.id),name:label(t.name,40),balance:integer(t.balance,100000),buildings:Object.fromEntries(BUILDINGS.map(b=>[b.id,integer(t.buildings?.[b.id],3)]))}));unique(teams);
 const rounds=cl.rounds.map(r=>{if(!Array.isArray(r.results)||!r.results.length||r.results.length>teams.length||typeof r.at!=='string'||!Number.isFinite(Date.parse(r.at)))throw Error('Invalid session.');
 const seen=new Set(),results=r.results.map(x=>{if(!teams.some(t=>t.id===x.teamId)||seen.has(x.teamId))throw Error('Invalid session team.');seen.add(x.teamId);const total=integer(x.total,3600),correct=integer(x.correct,total),answered=integer(x.answered,total);if(!total||answered<correct)throw Error('Invalid answer totals.');return {teamId:x.teamId,total,correct,answered,earned:integer(x.earned,50)};});
 return {id:id(r.id),activity:activity(r.activity),at:r.at,results};});unique(rounds);
 return {id:id(cl.id),name:label(cl.name),teams,rounds};});unique(classes);
 return {id:id(c.id),name:label(c.name),classes};});unique(campaigns);
 const active=campaigns.find(c=>c.id===raw.activeCampaignId)||campaigns[0];return {version:VERSION,campaigns,activeCampaignId:active?.id||'',activeClassId:active?.classes.find(cl=>cl.id===raw.activeClassId)?.id||active?.classes[0]?.id||''};
}
class Repository{
 constructor(storage){this.storage=storage;this.raw=null;this.state=empty();this.warning='';this.corrupt=false;try{this.raw=storage.getItem(KEY);if(this.raw)this.state=validate(JSON.parse(this.raw));}catch(e){if(this.raw){this.corrupt=true;this.warning='Saved data could not be read. Export the recovery file before clearing browser storage.';}else this.warning='Browser storage is unavailable. Changes stay in this tab; download a backup before closing it.';}}
 change(fn){if(this.corrupt)throw Error(this.warning);let current;try{current=this.storage.getItem(KEY);}catch{}if(current!==undefined&&current!==this.raw)throw Error('Campaign data changed in another tab. Reload this page before making changes.');const next=clone(this.state),result=fn(next);const valid=validate(next),raw=JSON.stringify(valid);if(new TextEncoder().encode(JSON.stringify({format:'hearthlands-backup',...valid},null,2)).length>4*1024*1024)throw Error('Campaign storage is full. Download your campaigns before starting a new collection on another browser.');this.state=valid;try{this.storage.setItem(KEY,raw);this.raw=raw;this.warning='';}catch{this.warning='Progress is only in this tab because browser storage could not save it. Download a backup now.';}return result;}
 backup(){return this.corrupt?this.raw:JSON.stringify({format:'hearthlands-backup',...this.state},null,2);}
 importCopies(text){if(typeof text!=='string'||new TextEncoder().encode(text).length>4*1024*1024)throw Error('Choose a campaign backup smaller than 4 MB.');const raw=JSON.parse(text);if(raw.format!=='hearthlands-backup')throw Error('Choose a Hearthlands backup file.');const incoming=validate(raw);return this.change(s=>{if(s.campaigns.length+incoming.campaigns.length>10)throw Error('Import would exceed the 10-campaign limit.');incoming.campaigns.forEach(c=>{c.id=uid();c.name=label(c.name.slice(0,62)+' (copy)');s.campaigns.push(c);s.activeCampaignId=c.id;s.activeClassId=c.classes[0]?.id||'';});});}
}
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function mapSVG(t){
 const id='island-'+uid().replace(/[^a-zA-Z0-9-]/g,''),plots=[[120,130],[285,115],[450,135],[135,255],[295,240],[465,255]];
 const trees=[35,65,525,555].map((x,i)=>'<g class="hl-tree" style="animation-delay:-'+i+'s"><path d="M'+x+' 78l-20 48h40Z" fill="#496d51"/><path d="M'+x+' 105v34" stroke="#776244" stroke-width="5"/></g>').join('');
 const buildings=BUILDINGS.map((b,i)=>{
  const [x,y]=plots[i],level=t.buildings[b.id]||0;
  let art;
  if(!level)art='<ellipse cy="-4" rx="36" ry="16" fill="#b2ba8b" stroke="#738861" stroke-dasharray="3 5"/><path d="M-6-4H6M0-10V2" stroke="#607955" stroke-width="2"/>';
  else if(b.id==='garden')art='<ellipse cy="-3" rx="42" ry="21" fill="#896342"/>'+Array.from({length:level+3},(_,k)=>'<g class="hl-sprout" style="animation-delay:-'+k+'s"><path d="M'+(-27+k*12)+' 0v-24m0 10q-12-10-9-14m9 6q12-10 10-14" stroke="#557a42" stroke-width="4" fill="none"/><circle cx="'+(-27+k*12)+'" cy="-24" r="3" fill="#d4b465"/></g>').join('');
  else if(b.id==='bridge')art='<path d="M-43 6Q0-'+(30+level*6)+' 43 6" fill="none" stroke="#80694b" stroke-width="14"/><path d="M-43-7Q0-'+(43+level*6)+' 43-7M-26-15v17M0-25v17M26-15v17" fill="none" stroke="#bb9465" stroke-width="4"/>';
  else if(b.id==='watchtower')art='<path d="M-22 5L-18-'+(46+level*9)+'H18L22 5Z" fill="#bcb9a0" stroke="#65715b" stroke-width="2"/><path d="M-26-'+(46+level*9)+'L0-'+(70+level*9)+'L26-'+(46+level*9)+'Z" fill="#a26f49"/><path d="M-6-10v-12a6 6 0 0 1 12 0v12Z" fill="#e9c470"/><path d="M0-'+(70+level*9)+'v-17" stroke="#80694b" stroke-width="2"/><path class="hl-banner" d="M1-'+(87+level*9)+'h23l-5 7 5 7H1Z" fill="#597c8b"/>';
  else {
   const roof=b.id==='library'?'#97643e':'#668252',height=32+level*8;
   art='<ellipse cy="3" rx="45" ry="13" fill="#4f6c4326"/><path d="M-37 3v-'+height+'Q0-'+(height+29)+' 37-'+height+'V3Z" fill="#d8cc9f" stroke="#776c4e" stroke-width="2"/><path d="M-44-'+height+'Q0-'+(height+37)+' 44-'+height+'" fill="none" stroke="'+roof+'" stroke-width="12" stroke-linecap="round"/><circle cy="-10" r="12" fill="#59745b" stroke="#7e6242" stroke-width="3"/><circle cx="5" cy="-10" r="1.8" fill="#dcba6c"/>'+[-25,25].map(x=>'<circle class="hl-window" cx="'+x+'" cy="-20" r="6" fill="#e9c570" stroke="#80694b" stroke-width="2"/>').join('')+'<path d="M22-'+(height+3)+'v-20h8v22" fill="#92734f"/>'+[0,1,2].map(k=>'<circle class="hl-smoke" style="animation-delay:-'+k*1.2+'s" cx="26" cy="-'+(height+24)+'" r="4" fill="#f9efda"/>').join('');
   if(level>1)art+='<path d="M-47 7h94M-44 12h88" stroke="#a48a5c" stroke-width="3"/>';
   if(level>2)art+='<g fill="#a27950"><rect x="-44" y="-8" width="12" height="10" rx="2"/><rect x="32" y="-8" width="12" height="10" rx="2"/></g><path d="M-39-9v-13m0 5q-8-8-7-10M38-9v-13m0 5q8-8 7-10" stroke="#587c47" stroke-width="3"/>';
   if(b.id==='infirmary')art+='<path d="M0-'+(height+10)+'v12m-6-6h12" stroke="#466548" stroke-width="3"/>';
  }
  return '<g transform="translate('+x+' '+y+')">'+art+'<text y="29" text-anchor="middle" fill="#344b3b" font-family="Georgia,serif" font-size="13">'+b.name+(level?' · '+level:' plot')+'</text></g>';
 }).join('');
 return '<svg class="hl-map hl-living-map" viewBox="0 0 600 370" role="img" aria-label="'+escape(t.name)+' woodland settlement"><defs><linearGradient id="'+id+'-sky" x2="0" y2="1"><stop stop-color="#dce8df"/><stop offset="1" stop-color="#f3e3bd"/></linearGradient><linearGradient id="'+id+'-earth" x2="0" y2="1"><stop stop-color="#a39870"/><stop offset="1" stop-color="#6c765b"/></linearGradient></defs><rect width="600" height="370" rx="24" fill="url(#'+id+'-sky)"/><circle cx="480" cy="47" r="25" fill="#e6c988" opacity=".6"/><path d="M0 99L70 25 125 79 189 21 260 90 330 32 401 86 455 30 532 96 600 45V175H0Z" fill="#748c7b" opacity=".25"/><g class="hl-cloud"><path d="M35 46q10-16 24-6 9-20 29-6 20-5 30 12Z" fill="#fffaeb" opacity=".7"/></g><path d="M23 239Q300 147 578 239L530 314 431 333 295 357 157 331 65 307Z" fill="url(#'+id+'-earth)"/><path d="M20 230Q4 145 120 112 300 62 490 115 605 148 580 239 495 320 298 321 104 314 20 230Z" fill="#a8b783" stroke="#839669" stroke-width="3"/><path d="M33 157Q152 77 285 123T565 156" fill="none" stroke="#c5cda0" stroke-width="28" opacity=".55"/><path d="M48 202Q193 150 290 195T545 191" fill="none" stroke="#cab58a" stroke-width="18" stroke-linecap="round"/><path d="M552 142Q385 192 483 247T405 323" fill="none" stroke="#7baba3" stroke-width="24"/><path class="hl-stream" d="M552 142Q385 192 483 247T405 323" fill="none" stroke="#dbe8cc" stroke-width="2" stroke-dasharray="9 23"/>'+trees+buildings+'<g transform="translate(230 216)"><ellipse cy="9" rx="13" ry="5" fill="#8a7855"/><path d="M-8 7l15-4M-6 3l14 5" stroke="#806348" stroke-width="4"/><path class="hl-fire" d="M0 7Q-12 0 0-17q-3 10 5 9 11 12-5 15Z" fill="#d89945"/><path class="hl-fire" d="M0 6Q-5 0 2-7q7 9-2 13Z" fill="#f1d079"/></g><g class="hl-wanderer"><circle cx="205" cy="183" r="3" fill="#9f7757"/><path d="M200 196l5-11 5 11Z" fill="#8a6248"/><path d="M201 180l4-7 5 7Z" fill="#5f7254"/></g><path class="hl-bird" d="M340 57q5-6 10 0 5-6 10 0" fill="none" stroke="#6a806c" stroke-width="1.5"/>'+[[83,202],[355,207],[370,279],[197,283],[509,180]].map(([x,y],i)=>'<circle class="hl-firefly" style="animation-delay:-'+i*1.1+'s" cx="'+x+'" cy="'+y+'" r="2" fill="#fff1a7"/>').join('')+'</svg>';
}

return {KEY,VERSION,BUILDINGS,uid,empty,clone,campaign,classroom,team,createCampaign,createClass,createTeam,record,upgrade,league,landmark,publicClass,validate,Repository,mapSVG,escape};
});
