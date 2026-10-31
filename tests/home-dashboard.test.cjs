// Run from the repository root with Playwright installed.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
(async()=>{
 const server=http.createServer((req,res)=>{try{const url=new URL(req.url,'http://localhost');const p=path.join(__dirname,'..',url.pathname==='/'?'index.html':url.pathname);res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':p.endsWith('.json')?'application/json':p.endsWith('.svg')?'image/svg+xml':p.endsWith('.webp')?'image/webp':'text/html');res.end(fs.readFileSync(p));}catch{res.statusCode=404;res.end();}});
 await new Promise(r=>server.listen(8791,'127.0.0.1',r));const base='http://127.0.0.1:8791/';
 let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox']});const context=await browser.newContext({serviceWorkers:'block'});await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.fulfill({body:'{}'}));
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base,{waitUntil:'load'});
  assert.equal(await page.locator('#today').isVisible(),true);assert.equal(await page.locator('.dashboard-nav a').count(),4);assert.equal(await page.locator('#today-start').isVisible(),true);
  assert.deepEqual(await page.locator('#today .study-goal-group h3').allTextContents(),['Build your foundations','Understand the science','Apply clinical reasoning','Organize your studying']);
  assert.equal(await page.locator('#today a[href="connection-trails.html"]').count(),1);assert.equal(await page.locator('#today .gathering-feature').count(),0);assert.equal(await page.locator('#today .hearth-scene').count(),0);
  const ids=await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));assert.equal(ids.length,new Set(ids).size);
  await page.locator('#today-start').click();assert.equal(await page.locator('#topic-select').isVisible(),true);await page.getByRole('button',{name:'Review Mode',exact:true}).click();const question=await page.locator('#question-text').innerText();await page.getByRole('button',{name:'Save & Exit',exact:true}).click();await page.reload({waitUntil:'load'});await page.locator('#resume-card').waitFor({state:'visible'});assert.equal(await page.locator('#today-start').isVisible(),true);await page.getByRole('button',{name:'Resume Session',exact:true}).click();assert.equal(await page.locator('#question-text').innerText(),question);await page.getByRole('button',{name:'Save & Exit',exact:true}).click();
  await page.locator('#today-review summary').click();await page.getByRole('link',{name:'Missed questions 0 questions to revisit',exact:true}).click();await page.locator('#study-dialog').waitFor({state:'visible'});await page.getByRole('button',{name:'Close study tools',exact:true}).click();
  for(const hash of ['classroom','my-progress','resources','today']){await page.locator('.dashboard-nav a[href="#'+hash+'"]').click();assert.equal(await page.locator('#'+hash).isVisible(),true);}
  await page.goto(base+'#study',{waitUntil:'load'});assert.equal(await page.locator('#today').isVisible(),true);
  for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'overflow at '+width);assert.equal(await page.locator('#today-start').isVisible(),true);}
  assert.deepEqual(errors,[]);console.log('PASS: study-first navigation, grouped tools, original quiz controls/save/resume, missed review, legacy study hash, unique IDs and responsive widths.');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
