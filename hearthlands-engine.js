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
 const plots=[[110,100],[260,90],[420,110],[145,225],[310,235],[460,225]];
 return '<svg class="hl-map" viewBox="0 0 600 330" role="img" aria-label="'+escape(t.name)+' settlement"><rect width="600" height="330" rx="24" fill="#e8e6cf"/><path d="M0 270 Q95 230 170 280 T360 285 T600 245 V330 H0Z" fill="#97b0a2"/><path d="M30 180 Q180 130 300 190 T565 155" fill="none" stroke="#c6aa7d" stroke-width="22" stroke-linecap="round"/>'+[35,75,520,560].map((x,i)=>'<path d="M'+x+' '+(90+i%2*55)+' l-23 45 h46Z" fill="#6b8867"/><path d="M'+x+' '+(120+i%2*55)+'v30" stroke="#755947" stroke-width="5"/>').join('')+BUILDINGS.map((b,i)=>{
 const [x,y]=plots[i],level=t.buildings[b.id]||0;
 const art=!level?'<ellipse cy="-6" rx="36" ry="18" fill="#ded9bf" stroke="#9b967b" stroke-dasharray="4 5"/><text y="0" text-anchor="middle" fill="#79755f" font-size="20">+</text>':b.id==='garden'?'<rect x="-35" y="-30" width="70" height="35" rx="6" fill="#ad7958"/>'+Array.from({length:level+2},(_,k)=>'<path d="M'+(-25+k*14)+' 0v-25m0 14q-12-12-9-15m9 7q12-12 10-14" stroke="#42674b" stroke-width="4" fill="none"/>').join(''):b.id==='bridge'?'<path d="M-40 0Q0-'+(35+level*8)+' 40 0M-40-15Q0-'+(50+level*8)+' 40-15" fill="none" stroke="#986447" stroke-width="8"/><path d="M-25-10v-15M0-20v-15M25-10v-15" stroke="#986447" stroke-width="5"/>':b.id==='watchtower'?'<path d="M-20 6L-13-'+(45+level*12)+'M20 6L13-'+(45+level*12)+'M-16-10H16M-15-28H15" stroke="#775d45" stroke-width="5" fill="none"/><rect x="-25" y="-'+(65+level*12)+'" width="50" height="26" fill="#c4a47b" stroke="#775d45"/><path d="M-32-'+(65+level*12)+'L0-'+(85+level*12)+'L32-'+(65+level*12)+'Z" fill="#996346"/><rect x="-8" y="-'+(59+level*12)+'" width="16" height="14" fill="#e9c56c"/>':'<rect x="-30" y="-'+(30+level*10)+'" width="60" height="'+(35+level*10)+'" rx="3" fill="'+(b.id==='infirmary'?'#e5dcc1':'#c4a47b')+'" stroke="#775d45" stroke-width="2"/><path d="M-38-'+(30+level*10)+'L0-'+(57+level*10)+'L38-'+(30+level*10)+'Z" fill="#996346" stroke="#775d45" stroke-width="2"/><rect x="-7" y="-15" width="14" height="20" fill="#637458"/>'+Array.from({length:level},(_,k)=>'<rect x="'+(-21+k*16)+'" y="-'+(22+level*8)+'" width="10" height="10" fill="#e9c56c"/>').join('')+(b.id==='infirmary'?'<path d="M0-54v16m-8-8h16" stroke="#637458" stroke-width="5"/>':'');
 return '<g transform="translate('+x+' '+y+')">'+art+'<text y="31" text-anchor="middle" fill="#344b3b" font-family="Georgia,serif" font-size="13">'+b.name+(level?' · '+level:' plot')+'</text></g>';
 }).join('')+'</svg>';
}
return {KEY,VERSION,BUILDINGS,uid,empty,clone,campaign,classroom,team,createCampaign,createClass,createTeam,record,upgrade,league,landmark,publicClass,validate,Repository,mapSVG,escape};
});
