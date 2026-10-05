const {chromium}=require('playwright'), assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
(async()=>{
 const server=http.createServer((req,res)=>{try{const name=new URL(req.url,'http://localhost').pathname;const p=path.join(__dirname,'..',name==='/'?'index.html':name);res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':p.endsWith('.svg')?'image/svg+xml':'text/html');res.end(fs.readFileSync(p));}catch{res.statusCode=404;res.end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({args:['--no-sandbox'],...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}:{})});
 try{
 const context=await browser.newContext({serviceWorkers:'block'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base=`http://127.0.0.1:${server.address().port}/`;
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.fulfill({body:'{}'}));
 await page.goto(base+'index.html#study');assert.equal(await page.getByRole('link',{name:/Study Quiz/}).count(),1);assert.equal(await page.locator('#resources a[href="study-quiz.html"]').count(),0);
 await page.goto(base+'study-quiz.html');assert.match(await page.locator('#quiz-available').innerText(),/\d+ questions/);
 const layouts=async()=>{for(const width of [320,390,1440]){await page.setViewportSize({width,height:900});for(const dark of [false,true]){await page.evaluate(d=>document.body.classList.toggle('dark-mode',d),dark);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}}await page.evaluate(()=>document.body.classList.remove('dark-mode'));};await layouts();
 const fixture=[{q:'Single',type:'single',options:['A','B'],answer:['A'],category:'Fixture',rationale:'Why A'},{q:'Multiple',type:'multiple',options:['A','B','C'],answer:['A','B'],category:'Fixture'},{q:'Text',type:'text',answer:['Test Answer'],category:'Fixture'},{q:'Other question',type:'single',options:['X','Y'],answer:['X'],category:'Other'}];
 await context.route('**/flashcard_data.js',r=>r.fulfill({contentType:'text/javascript',body:'const quizData = '+JSON.stringify(fixture)}));await page.reload();
 await page.evaluate(()=>{localStorage.setItem('field_notes_study_v1','unchanged');localStorage.setItem('field_notes_cards_v1','unchanged');});
 await page.selectOption('#quiz-category','Fixture');assert.match(await page.locator('#quiz-available').innerText(),/^3 questions/);await page.selectOption('#quiz-size','all');await page.getByRole('button',{name:'Start Quiz',exact:true}).click();await page.locator('#quiz-check').click();assert.match(await page.locator('#quiz-error').innerText(),/before checking/);
 for(let i=0;i<3;i++){
 const title=await page.locator('#quiz-question').innerText();if(title==='Text')await page.getByRole('textbox').fill('  TEST   answer  ');else await page.locator(`input[value="${title==='Single'?'B':'A'}"]`).check();
 await page.locator('#quiz-check').click();assert(await page.locator('#quiz-check').isDisabled());assert(await page.locator('#quiz-feedback').isVisible());await layouts();await page.locator('#quiz-next').click();
 }
 assert.equal(await page.locator('#quiz-score').innerText(),'1 of 3 correct (33%).');await layouts();await page.locator('#quiz-retry').click();assert.match(await page.locator('#quiz-progress').innerText(),/of 2/);
 for(let i=0;i<2;i++){await page.locator('input[value="A"]').check();if(await page.locator('#quiz-question').innerText()==='Multiple')await page.locator('input[value="B"]').check();await page.locator('#quiz-check').click();await page.locator('#quiz-next').click();}
 assert.equal(await page.locator('#quiz-score').innerText(),'2 of 2 correct (100%).');assert(await page.locator('#quiz-retry').isDisabled());await page.locator('#quiz-restart').click();assert.match(await page.locator('#quiz-progress').innerText(),/of 3/);
 for(const width of [320,390,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
 await page.locator('#quiz-theme').click();assert(await page.locator('body').evaluate(el=>el.classList.contains('dark-mode')));
 assert.deepEqual(await page.evaluate(()=>[localStorage.getItem('field_notes_study_v1'),localStorage.getItem('field_notes_cards_v1')]),['unchanged','unchanged']);
 await page.locator('#quiz-new').click();assert(await page.locator('#quiz-setup').isVisible());assert.deepEqual(errors,[]);
 await page.reload();assert(await page.locator('#quiz-setup').isVisible());assert(await page.locator('#quiz-round').isHidden());
 const blocked=await browser.newContext({serviceWorkers:'block'});await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}}));const bp=await blocked.newPage();await bp.goto(base+'study-quiz.html');await bp.locator('#quiz-theme').click();await bp.locator('#quiz-setup button').click();assert(await bp.locator('#quiz-question').isVisible());await blocked.close();
 const offline=await browser.newContext({serviceWorkers:'allow'});const op=await offline.newPage();await op.goto(base+'study-quiz.html');await op.evaluate(()=>navigator.serviceWorker.ready);await op.waitForFunction(()=>navigator.serviceWorker.controller);await offline.setOffline(true);await op.reload();await op.locator('#quiz-setup button').click();assert(await op.locator('#quiz-question').isVisible());await offline.close();
 await page.goto(base+'study-quiz.html');await page.setViewportSize({width:390,height:900});await page.screenshot({path:'/tmp/study-quiz-mobile.png',fullPage:true});await page.locator('#quiz-setup button').click();await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'/tmp/study-quiz-desktop.png',fullPage:true});
 console.log('PASS: Study Hall entry, real bank, validation, single/multiple/text grading, round score, missed-only retry, restart, mobile, theme, isolated progress, reload reset, blocked storage, and offline quiz.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
