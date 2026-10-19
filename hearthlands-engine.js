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
function mapSVG(t,{interactive=false}={}){
 // Source-image coordinates stay fixed at every screen size; all saved building IDs are unchanged.
 const plots={lodge:[816,486,195],library:[580,409,205],infirmary:[785,331,190],watchtower:[1021,404,190],garden:[1043,600,215],bridge:[1243,503,210]};
 // Source rectangles on the generated atlas include each object's full silhouette and transparent gutters.
 const crops={lodge:[[0,0,307,285],[0,289,310,287],[0,576,314,311]],library:[[315,27,285,260],[310,293,297,288],[306,568,311,319]],infirmary:[[610,29,282,257],[610,309,281,270],[608,576,286,311]],watchtower:[[900,5,275,273],[898,274,281,303],[899,568,280,319]],garden:[[1176,74,301,213],[1172,335,305,244],[1171,604,305,283]],bridge:[[1484,108,290,178],[1482,344,292,233],[1478,622,296,265]]};
 const level=b=>Math.max(0,Math.min(3,Math.trunc(Number(t.buildings[b.id])||0)));
 function sprite(bid,n,x,y,width){const [cx,cy,cw,ch]=crops[bid][n-1],height=width*ch/cw;return '<svg x="'+(x-width/2)+'" y="'+(y-height)+'" width="'+width+'" height="'+height+'" viewBox="'+[cx,cy,cw,ch].join(' ')+'" overflow="hidden" aria-hidden="true" pointer-events="none"><image href="assets/hearthlands/building-atlas.webp" width="1774" height="887"/></svg>';}
 const buildings=[...BUILDINGS].sort((a,b)=>plots[a.id][1]-plots[b.id][1]).map(b=>{
  const n=level(b),[x,y,w]=plots[b.id],title=b.name+(n?' · '+n:' plot'),access=b.name+', '+(n?'level '+n+' of 3':'empty plot')+(interactive?'. Select to view building options.':'');
  return '<g data-plot="'+b.id+'"><title>'+title+'</title>'+(interactive?'<rect role="button" tabindex="0" aria-label="'+access+'" x="'+(x-w/2)+'" y="'+(y-(n?w*crops[b.id][n-1][3]/crops[b.id][n-1][2]:100))+'" width="'+w+'" height="'+((n?w*crops[b.id][n-1][3]/crops[b.id][n-1][2]:100)+35)+'" fill="transparent" pointer-events="all"/>':'')+(n?sprite(b.id,n,x,y,w):'<path class="hl-plot-outline" d="M'+(x-80)+' '+(y-42)+'l80-39 80 39-80 39Z" fill="#fff8e8" fill-opacity=".06" stroke="#406548" stroke-width="3" stroke-dasharray="7 8"/>')+'</g>';
 }).join('');
 const labels=BUILDINGS.map(b=>{const n=level(b),[x,y]=plots[b.id],text=b.name+(n?' · '+n:''),width=Math.max(130,text.length*10+18);return '<g class="hl-map-label" aria-hidden="true" transform="translate('+x+' '+(y+14)+')"><rect x="'+(-width/2)+'" y="-14" width="'+width+'" height="30" rx="15" fill="#fbf2df" stroke="#9c8156" stroke-width="1.5"/><text text-anchor="middle" y="6" font-size="18" font-family="Georgia,serif" fill="#294e3a">'+text+'</text></g>';}).join('');
 const planted=BUILDINGS.filter(b=>level(b)>0).length;
 const bonus=planted===6?'<g data-bonus="celebration-garden"><title>Celebration garden · unlocked by building all six plots</title>'+sprite('garden',3,763,677,205)+'<text x="763" y="708" text-anchor="middle" font-size="19" font-family="Georgia,serif" fill="#294e3a" stroke="#fff3d6" stroke-width="3" paint-order="stroke">Celebration garden</text></g>':'<g aria-hidden="true"><rect x="690" y="624" width="146" height="28" rx="14" fill="#fbf2df" fill-opacity=".9"/><text x="763" y="643" text-anchor="middle" font-size="16" font-family="Georgia,serif" fill="#52644c">Bonus garden · '+planted+'/6</text></g>';
 return '<svg xmlns="http://www.w3.org/2000/svg" class="hl-map hl-illustrated-map" viewBox="0 0 1536 1024" role="'+(interactive?'group':'img')+'" aria-label="'+escape(t.name)+' island: '+planted+' of 6 buildings constructed"><image href="assets/hearthlands/island-base.webp" width="1536" height="1024" pointer-events="none"/><g class="hl-island-buildings">'+buildings+bonus+labels+'</g></svg>';
}

return {KEY,VERSION,BUILDINGS,uid,empty,clone,campaign,classroom,team,createCampaign,createClass,createTeam,record,upgrade,league,landmark,publicClass,validate,Repository,mapSVG,escape};
});
