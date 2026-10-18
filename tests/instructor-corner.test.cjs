const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const G=require('../instructor-corner-engine.js');
// Deterministic transport double: exercises the real host and student UI in separate tabs.
// It does not replace an on-network WebRTC smoke test in an actual classroom.
function fakePeer(){
 class E{constructor(){this.handlers={};}on(e,f){(this.handlers[e]??=[]).push(f);return this;}emit(e,v){(this.handlers[e]||[]).forEach(f=>f(v));}}
 window.__connections={};window.__peers={};
 class C extends E{constructor(id,owner){super();this.connectionId=id;this.owner=owner;this.open=true;window.__connections[id]=this;}send(d){window.bridge({op:'send',id:this.connectionId,data:d});}close(){if(!this.open)return;this.open=false;this.emit('close');window.bridge({op:'close',id:this.connectionId});}}
 window.MockC=C;
 window.Peer=class extends E{
 constructor(id){super();this.id=id||'student-'+Math.random();window.__peers[this.id]=this;window.bridge({op:'register',id:this.id}).then(()=>this.emit('open',this.id));}
 connect(target){const id=this.id+'-'+Math.random(),c=new C(id,this.id);window.bridge({op:'connect',id,target,owner:this.id}).then(()=>c.emit('open'));return c;}
 destroy(){Object.values(window.__connections).filter(c=>c.owner===this.id).forEach(c=>c.close());window.bridge({op:'unregister',id:this.id});}
 };
}
(async()=>{
 const root=path.join(__dirname,'..'),server=http.createServer((req,res)=>{try{const file=path.join(root,new URL(req.url,'http://local').pathname);res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));}catch{res.statusCode=404;res.end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-gpu','--no-zygote']});
 try{
 const ctx=await browser.newContext({serviceWorkers:'block',acceptDownloads:true});await ctx.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.fulfill({contentType:'application/javascript',body:''}));
 const peers=new Map(),connections=new Map(),errors=[];
 await ctx.exposeBinding('bridge',async({page},m)=>{
 if(m.op==='register'){peers.set(m.id,page);return;}
 if(m.op==='unregister'){peers.delete(m.id);return;}
 if(m.op==='connect'){const target=peers.get(m.target);if(!target)throw Error('Missing peer');connections.set(m.id,[page,target]);await target.evaluate(m=>{const c=new window.MockC(m.id,m.target);window.__peers[m.target].emit('connection',c);},m);return;}
 const pair=connections.get(m.id);if(!pair)return;const dest=pair.find(p=>p!==page);if(!dest||dest.isClosed())return;
 if(m.op==='send')await dest.evaluate(m=>window.__connections[m.id]?.emit('data',m.data),m);
 if(m.op==='close')await dest.evaluate(m=>{const c=window.__connections[m.id];if(c){c.open=false;c.emit('close');}},m);
 });
 await ctx.addInitScript(fakePeer);
 const h=await ctx.newPage();h.on('pageerror',e=>errors.push(e.message));await h.goto(base+'instructor-corner.html');await h.locator('#ic-host-open').click();await h.locator('#host-blank').click();
 await h.locator('[data-field=text]').fill('The heart at work');await h.locator('[data-field=rationale]').fill('Teaching notes\nFollow the blood flow.');
 // Upload a raster image and require descriptive text.
 const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aG3sAAAAASUVORK5CYII=','base64');
 await h.locator('[data-image]').setInputFiles({name:'heart.png',mimeType:'image/png',buffer:png});await h.waitForFunction(()=>document.querySelector('.ic-image-preview img'));
 await h.locator('#editor-preview').click();assert.match(await h.locator('#editor-error').innerText(),/describe the image/);await h.locator('[data-field=imageAlt]').fill('A sample teaching diagram');
 const image=await h.locator('.ic-image-preview img').getAttribute('src');assert.match(image,/^data:image\/jpeg/);
 const mk=(type,extra)=>({...G.newItem(type),text:type+' question',...extra});
 const items=[mk('slide',{text:'The heart at work',rationale:'Teaching notes\nFollow the blood flow.',image,imageAlt:'A sample teaching diagram'}),mk('single',{answers:['A','B','C'],correct:[1],rationale:'B is correct.'}),mk('multiple',{answers:['A','B','C'],correct:[0,2]}),mk('typed',{accepted:['Myocardial infarction','MI']}),mk('order',{answers:['First','Second','Third']}),mk('poll',{answers:['Confident','Need practice']}),mk('slide',{text:'Discussion and wrap-up',rationale:'What will you take into practice?'})];
 await h.locator('#editor-back').click();await h.locator('#deck-import').setInputFiles({name:'lesson.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({format:'hearth-gathering-hall',version:2,items}))});await h.waitForFunction(()=>document.querySelectorAll('.ic-edit-card').length===7);
 // Export includes embedded images and survives a clean import.
 const downloading=h.waitForEvent('download');await h.locator('#deck-export').click();const saved=await downloading;const exported=G.parseDeck(fs.readFileSync(await saved.path(),'utf8'));assert.equal(exported.length,7);assert.equal(exported[0].image,image);
 // Preview works without a signaling service or any students.
 await h.locator('#editor-preview').click();assert.equal(await h.locator('#hq-text').innerText(),'The heart at work');assert.equal(await h.locator('#hq-image img').getAttribute('alt'),'A sample teaching diagram');await h.locator('#hq-reveal').click();await h.locator('#hq-reveal').click();assert.match(await h.locator('#hr-progress').innerText(),/0 \/ 0 correct/i);
 await h.locator('#ic-leave').click();await h.locator('#ic-host-open').click();await h.locator('#editor-back').click();await h.locator('#host-time').selectOption('0');await h.locator('#host-points').check();
 // Return to the existing editor without replacing its presentation.
 const savedClass=await h.evaluate(()=>{const H=window.Hearthlands,r=new H.Repository(localStorage);let ids;r.change(s=>{const c=H.createCampaign(s,'EMT League');const a=H.createClass(s,c.id,'MW EMT',['Foxes','Owls']);const b=H.createClass(s,c.id,'TT EMT',['Deer','Dragons']);ids={cid:c.id,aid:a.id,bid:b.id};});window.dispatchEvent(new Event('focus'));return ids;});
 await h.locator('#live-campaign').selectOption(savedClass.cid);await h.locator('#live-class').selectOption(savedClass.aid);await h.locator('#live-activity').fill('EMS-1');
 await h.locator('#builder-resume').click();await h.locator('#editor-launch').click();await h.locator('#host-pin').waitFor({state:'visible'});const pin=await h.locator('#host-pin').innerText();
 async function join(name,char='fox'){const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'instructor-corner.html?join='+pin);await p.locator('#join-name').fill(name);await p.locator('input[value="'+char+'"]').check();await p.locator('#join-btn').click();await p.waitForFunction(()=>document.querySelector('#ic-player').classList.contains('active')&&!player.pending);return p;}
 const p=await join('<b>Medic</b>','wizard');assert.match(await p.locator('#player-name').innerText(),/🧙 <b>Medic<\/b>/);assert.equal(await h.locator('#host-players b').count(),0);
 assert.equal(await h.locator('.hl-live-team select').count(),1);await p.locator('#live-world').waitFor({state:'visible'});
 await p.locator('#world-team-name').fill('River medics');await p.locator('#world-create-team').click();await p.waitForFunction(()=>document.querySelector('#world-team-status').textContent.includes('You joined River medics'));
 await p.locator('#world-team').selectOption({label:'Foxes'});await p.locator('#world-join-team').click();await p.waitForFunction(()=>document.querySelector('#world-team-status').textContent==='You joined Foxes.');
 await p.locator('#world-team').selectOption({label:'River medics'});await p.locator('#world-join-team').click();await p.waitForFunction(()=>document.querySelector('#world-team-status').textContent==='You joined River medics.');
 assert.equal(await h.locator('.hl-live-team select option').count(),3);await p.locator('#world-create-team').click();await p.waitForFunction(()=>document.querySelector('#world-team-status').textContent.includes('already exists'));

 await h.locator('#host-begin').click();await p.locator('#pq-image img').waitFor();assert.equal(await p.locator('#world-team-controls').isVisible(),false);await p.evaluate(()=>window.HearthlandsTeamSend({t:'team-create',name:'Too late'}));await p.waitForFunction(()=>document.querySelector('#world-team-status').textContent.includes('locked'));assert.equal(await p.locator('#pq-options button').count(),0);assert.match(await p.locator('#pq-slide').innerText(),/Follow the blood flow/);
 // Late join receives the current teaching slide; duplicate nickname is disambiguated.
 const late=await join('<b>Medic</b>','goblin');await late.waitForFunction(()=>document.querySelector('#pq-text').textContent==='The heart at work');
 await h.locator('#hq-reveal').click();await p.waitForFunction(()=>document.querySelector('#pq-text').textContent==='single question');await p.locator('#pq-options button').nth(1).click();await p.locator('#player-locked').waitFor({state:'visible'});
 // Host rejects forged and duplicate answers and does not reset a player on a repeated join.
 await p.evaluate(()=>{player.conn.send({t:'a',i:1,c:99});player.conn.send({t:'a',i:1,c:0});player.conn.send({t:'join',v:2,name:'Reset'});});
 await h.locator('#hq-reveal').click();await p.locator('#player-result').waitFor({state:'visible'});assert.equal(await p.locator('#pr-verdict').innerText(),'Correct ✓');assert.match(await p.locator('#pr-detail').innerText(),/1000/);assert.equal(await p.locator('#pr-answer').innerText(),'Answer: B');
 await h.locator('#hr-next').click();await p.waitForFunction(()=>document.querySelector('#pq-text').textContent==='multiple question');await p.locator('#pq-options button').nth(0).click();await p.locator('#pq-options button').nth(2).click();await p.getByRole('button',{name:'Submit selected answers'}).click();await p.locator('#player-locked').waitFor({state:'visible'});await h.locator('#hq-reveal').click();await p.waitForFunction(()=>document.querySelector('#pr-detail').textContent.includes('2000'));
 await h.locator('#hr-next').click();await p.locator('#pq-options input').fill('  mi  ');await p.getByRole('button',{name:'Submit answer',exact:true}).click();await p.locator('#player-locked').waitFor({state:'visible'});await h.locator('#hq-reveal').click();await p.waitForFunction(()=>document.querySelector('#pr-detail').textContent.includes('3000'));
 await h.locator('#hr-next').click();await p.getByRole('button',{name:'Submit order'}).waitFor();
 // Arrange the shuffled list with accessible up controls.
 for(let pos=0;pos<3;pos++){const target=['First','Second','Third'][pos];while(true){const rows=await p.locator('.ic-order-row>span').allTextContents(),idx=rows.findIndex(s=>s.endsWith(target));if(idx<=pos)break;await p.locator('.ic-order-row').nth(idx).getByRole('button',{name:'Move '+target+' up',exact:true}).click();}}
 await p.getByRole('button',{name:'Submit order'}).click();await p.locator('#player-locked').waitFor({state:'visible'});await h.locator('#hq-reveal').click();await p.waitForFunction(()=>document.querySelector('#pr-detail').textContent.includes('4000'));
 await h.locator('#hr-next').click();await p.getByRole('button',{name:'A. Confident',exact:true}).click();await p.locator('#player-locked').waitFor({state:'visible'});await h.locator('#hq-reveal').click();await p.waitForFunction(()=>document.querySelector('#pr-verdict').textContent==='Response recorded');assert.match(await p.locator('#pr-detail').innerText(),/4000/);assert.equal(await h.locator('#hr-options .correct').count(),0);
 await h.locator('#hr-next').click();await h.locator('#hq-reveal').click();await p.locator('#player-end').waitFor({state:'visible'});assert.match(await p.locator('#pe-score').innerText(),/4 correct answers · 4000 points/);assert.match(await h.locator('#host-summary').innerText(),/4 scored questions/);
 await h.evaluate(bid=>{const r=new window.Hearthlands.Repository(localStorage);r.change(s=>s.activeClassId=bid);},savedClass.bid);
 await h.getByRole('button',{name:'Award campaign supplies',exact:true}).click();await p.waitForFunction(()=>document.querySelector('#world-supplies').textContent.includes('40 supplies'));
 const progress=await h.evaluate(({cid,aid,bid})=>{const H=window.Hearthlands,r=new H.Repository(localStorage),c=H.campaign(r.state,cid);return {a:H.classroom(c,aid).teams.find(t=>t.name==='River medics').balance,b:H.classroom(c,bid).teams[0].balance,rounds:H.classroom(c,aid).rounds.length};},savedClass);assert.deepEqual(progress,{a:40,b:0,rounds:1});assert.equal(await h.getByRole('button',{name:'Award campaign supplies',exact:true}).isDisabled(),true);
 const resultDownload=h.waitForEvent('download');await h.locator('#download-results').click();const result=await resultDownload;assert.match(fs.readFileSync(await result.path(),'utf8'),/Wizard","4","4000/);
 await h.setViewportSize({width:1440,height:1000});await h.screenshot({path:'/tmp/gathering-hall-results.png',fullPage:true});
 await h.locator('#ic-leave').click();await h.locator('#ic-host-open').click();await h.screenshot({path:'/tmp/gathering-hall-editor.png',fullPage:true});
 for(const page of [h,p])for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:850});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Overflow '+width);}
 await h.setViewportSize({width:390,height:844});await h.screenshot({path:'/tmp/gathering-hall-mobile.png',fullPage:true});

 // Expired answers are rejected by the host even before the timer's next tick.
 const deadlineCheck=await h.evaluate(()=>{
  const q={...G.newItem('single'),text:'Deadline check',answers:['A','B'],correct:[0]};
  const check=new Host([q],20,true,true),sent=[],conn={connectionId:'deadline-test',open:true,send:d=>sent.push(d)};
  check.players.set(conn.connectionId,{conn,name:'Timer learner',character:'fox',score:0,correct:0,choice:null,ms:0,active:true});
  check.question(0);check.deadline=Date.now()-1;check.message(conn,{t:'a',i:0,c:0});
  return {phase:check.phase,choice:check.players.get(conn.connectionId).choice,score:check.players.get(conn.connectionId).score,stats:check.stats[0]};
 });
 assert.equal(deadlineCheck.phase,'reveal');assert.equal(deadlineCheck.choice,null);assert.equal(deadlineCheck.score,0);assert.equal(deadlineCheck.stats.responses,0);
 assert.deepEqual(errors,[]);console.log('PASS: image upload/description validation; save/import with embedded images; local preview; nickname/character join and escaping; late joins; live single/select-all/typed/order/poll/slides; duplicate/invalid answer rejection; scoring excludes slides/polls; CSV; student team creation/duplicate rejection/start locks; independent class awards despite selection changes; student world broadcasts; 320–1440 layouts. Transport is simulated; real school-network WebRTC remains a deployment smoke check.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
