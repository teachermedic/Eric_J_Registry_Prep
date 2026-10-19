'use strict';
const H=window.Hearthlands,$=s=>document.querySelector(s),e=H.escape;
let campaignStorage;try{campaignStorage=window.localStorage;}catch{campaignStorage={getItem(){throw Error('Unavailable');},setItem(){throw Error('Unavailable');}};}
const repo=new H.Repository(campaignStorage);
let chosenTeam='',setupStep=1,settingUp=false,forceNewClass=false;
function status(s){$('#hl-status').textContent=s;$('#hl-storage').textContent=repo.warning;}
function selected(){const c=H.campaign(repo.state);return {c,cl:c.classes.find(cl=>cl.id===repo.state.activeClassId)};}
function change(fn,message){try{repo.change(fn);render();status(message||'Saved.');}catch(err){status(err.message);}}
function options(el,items,value,empty){el.innerHTML=items.length?items.map(x=>'<option value="'+e(x.id)+'">'+e(x.name)+'</option>').join(''):'<option value="">'+empty+'</option>';el.value=value||items[0]?.id||'';}
function render(){
 const s=repo.state;options($('#hl-campaign'),s.campaigns,s.activeCampaignId,'Create your first campaign');$('#hl-storage').textContent=repo.warning;
 const c=s.campaigns.find(c=>c.id===s.activeCampaignId);options($('#hl-class'),c?.classes||[],s.activeClassId,'Add a class');$('#hl-world').hidden=settingUp||!c?.classes.length;$('#hl-empty-backup').hidden=!!c?.classes.length;$('#hl-recovery').hidden=!repo.corrupt;if(!c?.classes.length&&!settingUp)beginSetup(false,false); 
 if(!c?.classes.length)return;$('#hl-play').href='instructor-corner.html?campaignId='+encodeURIComponent(c.id)+'&classId='+encodeURIComponent(s.activeClassId);const cl=H.classroom(c,s.activeClassId);if(!cl.teams.some(t=>t.id===chosenTeam))chosenTeam=cl.teams[0].id;options($('#hl-team'),cl.teams,chosenTeam,'');renderTeam();
 const lm=H.landmark(c);$('#hl-landmark-title').textContent=lm.name;$('#hl-landmark-detail').textContent=lm.correct+' correct answers across all classes'+(lm.level<3?' · next landmark at '+lm.target:' · fully restored');$('#hl-landmark-progress').max=lm.target;$('#hl-landmark-progress').value=Math.min(lm.correct,lm.target);$('#hl-landmark-progress').setAttribute('aria-label',lm.correct+' correct answers; goal '+lm.target);
 const league=H.league(c);$('#hl-league').innerHTML=league.shared.length?'<p>'+league.shared.length+' shared activities: '+league.shared.map(e).join(', ')+'</p><div class="hl-scroll"><table><thead><tr><th>Class</th><th>Best accuracy average</th><th>Improvement from first attempts</th></tr></thead><tbody>'+league.rows.map(r=>'<tr><td>'+e(r.name)+'</td><td>'+Math.round(r.accuracy*100)+'%</td><td>+'+Math.round(r.improvement*100)+' percentage points</td></tr>').join('')+'</tbody></table></div>':'<p>Two classes can join this league after completing equivalent quizzes with the same session name.</p>';
 $('#hl-history').innerHTML=cl.rounds.length?'<div class="hl-scroll"><table><thead><tr><th>Date / session</th><th>Accuracy</th><th>Team supplies</th></tr></thead><tbody>'+[...cl.rounds].reverse().map(r=>{const total=r.results.reduce((n,x)=>n+x.total,0),correct=r.results.reduce((n,x)=>n+x.correct,0);return '<tr><td>'+e(new Date(r.at).toLocaleDateString())+'<br>'+e(r.activity)+'</td><td>'+Math.round(correct/total*100)+'%</td><td>'+r.results.map(x=>e(H.team(cl,x.teamId).name)+': +'+x.earned).join('<br>')+'</td></tr>';}).join('')+'</tbody></table></div>':'<p>No quizzes saved yet. Open a quiz using Step 2 above, then select Save team progress when it ends.</p>';
}
function renderTeam(){const {c,cl}=selected(),t=H.team(cl,chosenTeam);$('#hl-map').innerHTML=H.mapSVG(t,{interactive:true});$('#hl-island-progress').textContent=H.BUILDINGS.filter(b=>t.buildings[b.id]>0).length+' / 6 plots built · '+Object.values(t.buildings).reduce((sum,n)=>sum+n,0)+' / 18 upgrades';$('#hl-team-title').textContent=t.name;$('#hl-team-name').value=t.name;$('#hl-supplies').textContent=t.balance+' supplies';const costs=H.BUILDINGS.filter(b=>t.buildings[b.id]<3).map(b=>30*(t.buildings[b.id]+1)),nextCost=Math.min(...costs);$('#hl-next-build').textContent=!costs.length?'Your settlement is fully grown. Keep playing to help your class.':t.balance<nextCost?'Your next build or upgrade starts at '+nextCost+' supplies. Play a quiz to earn '+(nextCost-t.balance)+' more.':'You can build or upgrade now. Choose below, or save your supplies for later.';$('#hl-buildings').innerHTML=H.BUILDINGS.map(b=>{const level=t.buildings[b.id],cost=30*(level+1);return '<article class="hl-building" id="building-'+b.id+'" tabindex="-1"><h3>'+b.icon+' '+b.name+'</h3><p>'+(level?'Level '+level+' of 3':'An empty plot')+'</p><button class="hl-button" data-build="'+b.id+'" '+(level>=3||t.balance<cost?'disabled':'')+'>'+(level>=3?'Fully upgraded':(level?'Upgrade':'Build')+' · '+cost+' supplies')+'</button></article>';}).join('');$('#hl-buildings').querySelectorAll('[data-build]').forEach(b=>b.onclick=()=>change(s=>H.upgrade(s,c.id,cl.id,t.id,b.dataset.build),'Building saved. Your island has grown.'));$('#hl-map').querySelectorAll('[data-plot]').forEach(plot=>{const choose=()=>{const card=$('#building-'+plot.dataset.plot);card.focus({preventScroll:true});card.scrollIntoView({block:'center',behavior:'instant'});};plot.onclick=choose;plot.onkeydown=event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose();}};});}
$('#hl-campaign').onchange=ev=>{chosenTeam='';change(s=>{s.activeCampaignId=ev.target.value;s.activeClassId=H.campaign(s).classes[0]?.id||'';},'Campaign loaded.');};
$('#hl-class').onchange=ev=>{chosenTeam='';change(s=>s.activeClassId=ev.target.value,'Class loaded. Its progress is separate.');};
$('#hl-team').onchange=ev=>{chosenTeam=ev.target.value;renderTeam();};
$('#hl-new-campaign').onsubmit=ev=>{ev.preventDefault();change(s=>H.createCampaign(s,$('#hl-campaign-name').value),'Collection created. Name its first team.');};
$('#hl-rename').onsubmit=ev=>{ev.preventDefault();change(s=>{const {c,cl}=selected(),t=H.team(H.classroom(H.campaign(s,c.id),cl.id),chosenTeam),name=$('#hl-team-name').value.trim();if(!name||name.length>40)throw Error('Use a team name between 1 and 40 characters.');if(cl.teams.some(x=>x.id!==t.id&&x.name.toLowerCase()===name.toLowerCase()))throw Error('Choose a different team name.');t.name=name;},'Team renamed.');};
function downloadBackup(){const url=URL.createObjectURL(new Blob([repo.backup()],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=repo.corrupt?'hearthlands-recovery.json':'hearthlands-campaigns.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Backup downloaded. Keep it somewhere you can find it.');}
$('#hl-backup').onclick=downloadBackup;$('#hl-recovery').onclick=downloadBackup;
async function importBackup(ev){const f=ev.target.files[0];if(!f)return;try{if(f.size>4*1024*1024)throw Error('Choose a backup smaller than 4 MB.');repo.importCopies(await f.text());chosenTeam='';settingUp=false;$('#hl-setup').hidden=true;render();status('Imported as separate campaign copies. Existing campaigns were kept.');}catch(err){status(err.message);}finally{ev.target.value='';}}
$('#hl-import').onchange=importBackup;$('#hl-restore').onchange=importBackup;
function setupClasses(){
 const choices=repo.state.campaigns.flatMap(c=>c.classes.map(cl=>({id:c.id+'/'+cl.id,name:cl.name+' · '+c.name})));
 const preferred=repo.state.activeCampaignId+'/'+repo.state.activeClassId;
 $('#setup-class').innerHTML=choices.map(x=>'<option value="'+e(x.id)+'">'+e(x.name)+'</option>').join('')+'<option value="new">+ Create another class</option>';
 $('#setup-class').value=!forceNewClass&&choices.some(x=>x.id===preferred)?preferred:'new';$('#setup-existing-label').hidden=!choices.length;classChoice();
}
function classChoice(){const newClass=$('#setup-class').value==='new';$('#setup-name-label').hidden=!newClass;$('#setup-class-name').required=newClass;}
function showStep(){
 document.querySelectorAll('[data-step]').forEach(el=>el.hidden=Number(el.dataset.step)!==setupStep);
 document.querySelectorAll('.hl-steps li').forEach((el,i)=>{if(i+1===setupStep)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
 $('#setup-count').textContent='Step '+setupStep+' of 3';$('#setup-back').hidden=setupStep===1;$('#setup-error').textContent='';
 $('#setup-team').required=setupStep===1;$('#setup-class-name').required=setupStep===2&&$('#setup-class').value==='new';
 $('#setup-next').textContent=setupStep===1?'Next: choose class →':setupStep===2?'Next: review team →':'Create team →';
 if(setupStep===3){const name=$('#setup-class').value==='new'?$('#setup-class-name').value.trim():$('#setup-class').selectedOptions[0].textContent;$('#setup-review').textContent='Team: '+$('#setup-team').value.trim()+' · Class: '+name;}
 const focus=setupStep===1?$('#setup-team'):setupStep===2?($('#setup-class').value==='new'?$('#setup-class-name'):$('#setup-class')):$('#setup-next');focus.focus();
}
function beginSetup(newClass=false,focus=true){settingUp=true;forceNewClass=newClass;setupStep=1;$('#setup-team').value='';$('#setup-class-name').value='My class';setupClasses();$('#hl-world').hidden=true;$('#hl-setup').hidden=false;$('#setup-cancel').hidden=!repo.state.campaigns.some(c=>c.classes.length);showStep();if(focus)$('#hl-setup').scrollIntoView({block:'start',behavior:'smooth'});}
$('#hl-start-team').onclick=()=>beginSetup();$('#hl-new-class-button').onclick=()=>beginSetup(true);$('#setup-class').onchange=classChoice;
$('#setup-back').onclick=()=>{setupStep--;showStep();};
$('#setup-cancel').onclick=()=>{if(!repo.state.campaigns.find(c=>c.id===repo.state.activeCampaignId)?.classes.length){const c=repo.state.campaigns.find(c=>c.classes.length);if(c)try{repo.change(s=>{s.activeCampaignId=c.id;s.activeClassId=c.classes[0].id;});}catch(err){status(err.message);return;}}settingUp=false;$('#hl-setup').hidden=true;render();status('Setup canceled. Saved progress was kept.');};
$('#hl-setup-form').onsubmit=ev=>{ev.preventDefault();
 if(setupStep<3){if(setupStep===1&&!$('#setup-team').value.trim()){$('#setup-error').textContent='Enter a team name.';return;}if(setupStep===2&&$('#setup-class').value==='new'&&!$('#setup-class-name').value.trim()){$('#setup-error').textContent='Enter a class name.';return;}setupStep++;showStep();return;}
 try{let teamId='';repo.change(s=>{let c,cl;const choice=$('#setup-class').value,name=$('#setup-team').value.trim();
 if(choice==='new'){c=s.campaigns.find(c=>c.id===s.activeCampaignId)||H.createCampaign(s,'Class teams');const className=$('#setup-class-name').value.trim();if(c.classes.some(cl=>cl.name.toLowerCase()===className.toLowerCase()))throw Error('That class already exists. Go back and choose it from the list.');cl=H.createClass(s,c.id,className,[name]);teamId=cl.teams[0].id;
 }else{const [cid,clid]=choice.split('/');c=H.campaign(s,cid);cl=H.classroom(c,clid);teamId=H.createTeam(s,c.id,cl.id,name).id;s.activeCampaignId=c.id;s.activeClassId=cl.id;}});
 chosenTeam=teamId;settingUp=false;$('#hl-setup').hidden=true;render();status('Team created. Next: open a quiz for this class.');$('#hl-play').focus();
 }catch(err){$('#setup-error').textContent=err.message;status(err.message);}
};
window.addEventListener('storage',ev=>{if(ev.key===H.KEY)status('Campaign data changed in another tab. Reload before making changes.');});
render();
