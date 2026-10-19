/* Optional campaign bridge for Gathering Hall. */
(function(){
'use strict';
const H=window.Hearthlands,$=s=>document.querySelector(s),e=H.escape;
function repository(){let storage;try{storage=window.localStorage;}catch{storage={getItem(){throw Error('Unavailable');},setItem(){throw Error('Unavailable');}};}return new H.Repository(storage);}
let repo=repository();
const box=document.createElement('section');box.className='hl-session-picker';box.innerHTML='<h3>Save team progress · optional</h3><p class="study-help">Choose a class to earn supplies for its teams. Leave this off for an ordinary quiz.</p><label>Class<select id="live-class-choice"><option value="">No team progress for this quiz</option></select></label><div hidden><select id="live-campaign" aria-label="Saved collection"></select><select id="live-class" aria-label="Saved class"></select></div><p class="study-help" id="live-team-next"></p><details id="live-more"><summary>More options · session name & teams</summary><label>Session name (optional)<input id="live-activity" maxlength="80" placeholder="For example: Cardiology review"></label><label class="ic-check"><input type="checkbox" id="live-open-teams" checked> Students can create or join teams before the quiz starts</label><p class="study-help">A session name is added automatically. To compare classes or track improvement on a repeat quiz, enter the same name and use equivalent questions each time.</p></details><a href="hearthlands.html" target="_blank" rel="noopener">Set up a team, step by step ↗</a><p id="live-campaign-warning" role="status"></p>';
$('#ic-builder .ic-card').append(box);
const panel=document.createElement('section');panel.className='hl-public';panel.id='live-world';panel.hidden=true;panel.innerHTML='<details open><summary id="world-heading">The Hearthlands</summary><p id="world-detail"></p><label>Team settlement<select id="world-team"></select></label><div id="world-map"></div><p id="world-supplies"></p><div id="world-team-controls" hidden><button class="study-button" id="world-join-team">Join selected team</button><label>Team Name<input id="world-team-name" maxlength="40" placeholder="For example: The Night Owls"></label><button class="study-button" id="world-create-team">Create team & join</button><p class="study-help">Anyone in this room can create a team, up to 30 per class. Teams and assignments lock when the instructor starts.</p></div><p id="world-team-status" role="status"></p></details>';$('#ic-player').after(panel);
let currentWorld=null;
let requested=new URLSearchParams(location.search),requestUsed=false;
function refresh(){
 const previous=$('#live-class-choice').value;repo=repository();
 const choices=repo.state.campaigns.flatMap(c=>c.classes.map(cl=>({value:c.id+'/'+cl.id,name:cl.name+' · '+c.name})));
 $('#live-class-choice').innerHTML='<option value="">No team progress for this quiz</option>'+choices.map(x=>'<option value="'+e(x.value)+'">'+e(x.name)+'</option>').join('');
 const requestedValue=requested.get('campaignId')+'/'+requested.get('classId');
 const chosen=!requestUsed&&choices.some(x=>x.value===requestedValue)?requestedValue:previous;requestUsed=true;
 $('#live-class-choice').value=choices.some(x=>x.value===chosen)?chosen:'';
 $('#live-campaign').innerHTML='<option value="">No collection</option>'+repo.state.campaigns.map(c=>'<option value="'+e(c.id)+'">'+e(c.name)+'</option>').join('');
 chooseClass();$('#live-campaign-warning').textContent=repo.warning;
}
function classes(){
 const c=repo.state.campaigns.find(c=>c.id===$('#live-campaign').value),prior=$('#live-class').value;
 $('#live-class').innerHTML=(c?.classes||[]).map(cl=>'<option value="'+e(cl.id)+'">'+e(cl.name)+'</option>').join('');
 if(c?.classes.some(cl=>cl.id===prior))$('#live-class').value=prior;
 $('#live-class').disabled=!c;$('#live-activity').disabled=!c;
 $('#live-class-choice').value=c?c.id+'/'+$('#live-class').value:'';
 $('#live-team-next').textContent=c?'Students choose their team in the lobby. After the quiz, select Save team progress.':'Create a team first if your class is not listed.';
}
function chooseClass(){const [cid,clid]=$('#live-class-choice').value.split('/');$('#live-campaign').value=cid||'';classes();if(clid){$('#live-class').value=clid;$('#live-class-choice').value=cid+'/'+clid;}}
$('#live-class-choice').onchange=chooseClass;$('#live-campaign').onchange=classes;$('#live-class').onchange=()=>{$('#live-class-choice').value=$('#live-campaign').value+'/'+$('#live-class').value;};
window.addEventListener('focus',refresh);window.addEventListener('storage',ev=>{if(ev.key===H.KEY)refresh();});
function capture(preview){if(preview||!$('#live-campaign').value)return null;repo=repository();if(repo.corrupt)throw Error(repo.warning);const c=H.campaign(repo.state,$('#live-campaign').value),cl=H.classroom(c,$('#live-class').value),activity=$('#live-activity').value.trim()||('Quiz '+new Date().toLocaleDateString()+' · '+H.uid().slice(-8));return {campaignId:c.id,classId:cl.id,activity,roundId:H.uid(),allowTeams:$('#live-open-teams').checked,repository:repo,teams:H.clone(cl.teams),results:cl.teams.map(t=>({teamId:t.id,total:0,correct:0,answered:0})),world:H.publicClass(c,cl)};}
function assign(host){if(!host.campaign)return '';return [...host.campaign.teams].sort((a,b)=>[...host.players.values()].filter(p=>p.teamId===a.id&&p.active).length-[...host.players.values()].filter(p=>p.teamId===b.id&&p.active).length)[0].id;}
function controls(host){if(!host.campaign)return;$('#host-players').querySelectorAll('[data-kick]').forEach(b=>{const p=host.players.get(b.dataset.kick),label=document.createElement('label');label.className='hl-live-team';label.textContent='Team for '+p.name;const select=document.createElement('select');select.setAttribute('aria-label','Team for '+p.name);select.innerHTML=host.campaign.teams.map(t=>'<option value="'+e(t.id)+'">'+e(t.name)+'</option>').join('');select.value=p.teamId;select.disabled=host.phase!=='lobby';select.onchange=()=>{p.teamId=select.value;joined(host,p);};label.append(select);b.parentElement.append(label);});}
function joined(host,p){if(host.campaign)p.conn.send({t:'world',world:host.campaign.world,teamId:p.teamId,canChange:host.phase==='lobby'&&host.campaign.allowTeams});}
function teamRequest(host,p,d){
 if(!host.campaign||!p||!p.active||!p.conn.open)return;
 if(host.phase!=='lobby'||!host.campaign.allowTeams){p.conn.send({t:'team-status',message:'Teams are locked for this session. Ask your instructor about next session.'});return;}
 try{const c=host.campaign;
 if(d.t==='team-create'){
 const r=c.repository.warning?c.repository:repository();c.repository=r;const t=r.change(s=>H.createTeam(s,c.campaignId,c.classId,d.name));p.teamId=t.id;
 const campaign=H.campaign(r.state,c.campaignId),cl=H.classroom(campaign,c.classId);c.teams=H.clone(cl.teams);c.results=c.teams.map(t=>c.results.find(x=>x.teamId===t.id)||{teamId:t.id,total:0,correct:0,answered:0});c.world=H.publicClass(campaign,cl);
 }else{if(!c.teams.some(t=>t.id===d.teamId))throw Error('Choose an existing team.');p.teamId=d.teamId;}
 host.renderPlayers();host.active().forEach(x=>joined(host,x));p.conn.send({t:'team-status',message:'You joined '+c.teams.find(t=>t.id===p.teamId).name+'.'+(c.repository.warning?' Ask your instructor to download a campaign backup; browser saving is unavailable.':'')});
 }catch(err){p.conn.send({t:'team-status',message:err.message});}
}
function tally(host,p,ok,answered){if(!host.campaign)return;const r=host.campaign.results.find(r=>r.teamId===p.teamId);if(r){r.total++;if(ok)r.correct++;if(answered)r.answered++;}}
function awards(host){
 $('#live-awards')?.remove();if(!host.campaign)return;const c=host.campaign,el=document.createElement('div');el.id='live-awards';el.className='hl-award';el.innerHTML='<h3>Finish: save your team’s progress</h3><p>'+e(c.world.className)+' · session '+e(c.activity)+'</p><p class="award-detail"></p><button class="study-button">Save team progress</button><p class="award-status" role="status"></p><a href="hearthlands.html" target="_blank" rel="noopener">Next: open your team and build ↗</a>';
 el.querySelector('.award-detail').textContent=c.results.filter(r=>r.total).map(r=>c.teams.find(t=>t.id===r.teamId).name+': '+r.correct+'/'+r.total+' correct').join('\n');
 el.querySelector('button').disabled=!c.results.some(r=>r.answered>0);if(!c.results.some(r=>r.answered>0))el.querySelector('.award-status').textContent='No scored answers; slides and polls do not earn supplies.';
 let awardedRepo=c.repository;const backup=document.createElement('button');backup.className='study-button';backup.textContent='Download campaign backup';backup.hidden=false;backup.onclick=()=>{if(!awardedRepo)return;const url=URL.createObjectURL(new Blob([awardedRepo.backup()],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='hearthlands-campaigns.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};el.append(backup);
 el.querySelector('button').onclick=()=>{try{repo=c.repository.warning?c.repository:repository();c.repository=repo;const saved=repo.change(s=>H.record(s,c.campaignId,c.classId,{id:c.roundId,activity:c.activity,results:c.results}));awardedRepo=repo;backup.hidden=false;const campaign=H.campaign(repo.state,c.campaignId),cl=H.classroom(campaign,c.classId);c.world=H.publicClass(campaign,cl);host.broadcast({t:'world',world:c.world});receive(c.world);el.querySelector('button').disabled=true;el.querySelector('.award-status').textContent=saved.results.map(r=>H.team(cl,r.teamId).name+' +'+r.earned+' supplies').join(' · ')+(repo.warning?' · '+repo.warning:' · Saved to this class.');}catch(err){el.querySelector('.award-status').textContent=err.message;}};
 $('#host-summary').after(el);
}
function receive(world,teamId,canChange=false){
 if(!world||!Array.isArray(world.teams)||!world.teams.length||world.teams.length>30)return;
 const str=s=>String(s||'').slice(0,100);currentWorld={campaign:str(world.campaign),className:str(world.className),teams:world.teams.map(t=>({id:str(t.id),name:str(t.name),balance:Math.max(0,Math.min(100000,Number(t.balance)||0)),buildings:Object.fromEntries(H.BUILDINGS.map(b=>[b.id,Math.max(0,Math.min(3,Math.trunc(Number(t.buildings?.[b.id])||0)))]))}))};
 const previous=$('#world-team').value;$('#world-heading').textContent=currentWorld.campaign+' · '+currentWorld.className;$('#world-detail').textContent='Choose your team before the quiz starts. Answer together to earn supplies; your instructor saves progress after the quiz.';$('#world-team').innerHTML=currentWorld.teams.map(t=>'<option value="'+e(t.id)+'">'+e(t.name)+'</option>').join('');$('#world-team').value=currentWorld.teams.some(t=>t.id===teamId)?teamId:currentWorld.teams.some(t=>t.id===previous)?previous:currentWorld.teams[0].id;panel.hidden=false;$('#world-team-controls').hidden=!canChange;renderMap();
}
function renderMap(){const t=currentWorld?.teams.find(t=>t.id===$('#world-team').value);if(!t)return;$('#world-map').innerHTML=H.mapSVG(t);$('#world-supplies').textContent=t.name+' · '+t.balance+' supplies available';}
$('#world-team').onchange=renderMap;
$('#world-join-team').onclick=()=>{if(window.HearthlandsTeamSend)window.HearthlandsTeamSend({t:'team-join',teamId:$('#world-team').value});};
$('#world-create-team').onclick=()=>{const name=$('#world-team-name').value.trim();if(!name){$('#world-team-status').textContent='Enter a team name.';return;}if(window.HearthlandsTeamSend)window.HearthlandsTeamSend({t:'team-create',name});};
refresh();
window.HearthlandsLive={capture,assign,controls,joined,teamRequest,tally,awards,receive,clear:()=>{panel.hidden=true;currentWorld=null;$('#world-team-status').textContent='';}};
})();
