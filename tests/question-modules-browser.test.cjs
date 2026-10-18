const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const M=require('../question-modules.js'),Access=require('./instructor-access-fixture.cjs');
(async()=>{
 const root=path.join(__dirname,'..');const server=http.createServer((req,res)=>{try{const file=path.join(root,new URL(req.url,'http://local').pathname==='/'?'index.html':new URL(req.url,'http://local').pathname);res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.svg')?'image/svg+xml':'text/html');res.end(fs.readFileSync(file));}catch{res.statusCode=404;res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-gpu','--no-zygote']});
  const ctx=await browser.newContext({serviceWorkers:'block'});await ctx.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.fulfill({body:'{}'}));await Access.configure(ctx);
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());await p.goto(base);
  assert.deepEqual(await p.locator('#topic-select option').evaluateAll(els=>els.map(el=>el.value)),['All',...M.NAMES]);
  for(const module of M.NAMES){
   await p.evaluate(module=>{document.querySelector('#topic-select').value=module;startQuiz('review');},module);
   assert.equal(await p.evaluate(module=>sessionQuestions.length>0&&sessionQuestions.every(q=>QuestionModules.forQuestion(q)===module),module),true);
   assert.match(await p.locator('#progress').innerText(),new RegExp(module.replace('/','\\/')));
  }
  const keys=await p.evaluate(()=>{
   const qs=['EMS Systems','Obstetrics','Pediatrics'].map(category=>quizData.find(q=>q.category===category&&q.type==='single'));
   const keys=qs.map(studyQuestionKey),now=new Date().toISOString();
   studyWork={version:1,missed:[keys[0]],bookmarks:[keys[1]],history:[],session:{id:'legacy-session',startedAt:now,updatedAt:now,source:'Module',keys,index:1,score:1,mode:'review',topic:'OBPeds',timeLeft:0,stats:{'EMS Systems':{total:1,correct:0},Obstetrics:{total:1,correct:1},Pediatrics:{total:1,correct:0}},missed:[keys[0]],phase:'feedback',correct:true,input:{options:qs[1].answer}}};
   localStorage.setItem(STUDY_STORAGE_KEY,JSON.stringify(studyWork));return keys;
  });
  // Navigation must not autosave the unrelated active test session over the legacy fixture.
  await p.evaluate(()=>{studyActive=false;});await p.reload();await p.locator('#resume-card button').first().click();
  assert.deepEqual(await p.evaluate(()=>sessionQuestions.map(studyQuestionKey)),keys);
  assert.equal(await p.evaluate(()=>categoryStats['OB/GYN'].correct),1);assert.equal(await p.evaluate(()=>categoryStats.Operations.correct),0);
  assert.equal(await p.locator('#topic-select').inputValue(),'All');assert.match(await p.locator('#progress').innerText(),/OB\/GYN/);
  await p.locator('#action-btn').click();const answer=await p.evaluate(()=>sessionQuestions[currentIdx].answer[0]);await p.locator('input[name="option"]').evaluateAll((els,answer)=>els.find(el=>el.value===answer).click(),answer);
  await p.locator('#action-btn').click();await p.locator('#action-btn').click();assert.equal(await p.evaluate(()=>studyWork.history.at(-1).correct),2);
  assert.deepEqual(await p.evaluate(()=>studyWork.bookmarks),[keys[1]]);assert.deepEqual(await p.evaluate(()=>studyWork.missed),[keys[0]]);
  assert.deepEqual(await p.evaluate(()=>studyWork.history.at(-1).categories.map(c=>c.name)),['Operations','OB/GYN','Pediatrics']);
  await p.goto(base+'instructor-corner.html');await p.locator('#ic-host-open').click();assert.equal(await p.locator('#host-category').count(),0);
  assert.deepEqual(await p.locator('#host-section option').evaluateAll(els=>els.map(el=>el.value)),['All',...M.NAMES]);
  for(const module of M.NAMES){await p.locator('#host-section').selectOption(module);assert.ok(parseInt(await p.locator('#bank-status').innerText())>0);}
  await p.evaluate(()=>localStorage.setItem('field_notes_author_v1',JSON.stringify({format:'hearth-questions',version:1,questions:[{id:'legacy-legal',q:'Legacy legal question',section:'Foundations',category:'Legal',type:'single',options:['A','B'],correct:[0],rationale:'Reason'}]})));
  await p.goto(base+'question-workshop.html');await Access.unlock(p);assert.deepEqual(await p.locator('#qa-section option').evaluateAll(els=>els.map(el=>el.value)),M.NAMES);
  assert.match(await p.locator('#qa-list').innerText(),/Operations/);await p.locator('[data-edit]').click();assert.equal(await p.locator('#qa-section').inputValue(),'Operations');await p.getByRole('button',{name:'Save Question',exact:true}).click();
  assert.deepEqual(await p.evaluate(()=>{const q=JSON.parse(localStorage.getItem('field_notes_author_v1')).questions[0];return {id:q.id,section:q.section};}),{id:'legacy-legal',section:'Operations'});
  assert.deepEqual(errors,[]);console.log('PASS: exactly six choices across Review/Exam, live and Workshop; every module selectable; legacy session grading/resume, bookmarks and missed keys survive; old Workshop draft migrates without changing its ID.');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
