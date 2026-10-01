// Browser regression coverage: ratings, cross-page resume, migration, scheduling, and isolation.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
(async()=>{
 const server=http.createServer((req,res)=>{try{const p=path.join(__dirname,'..',new URL(req.url,'http://localhost').pathname==='/'?'index.html':new URL(req.url,'http://localhost').pathname);res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(p));}catch{res.statusCode=404;res.end();}});
 await new Promise(r=>server.listen(8766,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-gpu','--disable-software-rasterizer','--no-zygote']});
 try{
 const context=await browser.newContext({serviceWorkers:'block'});
 await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({contentType:'application/json',body:'{"items":[]}'}));
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base='http://127.0.0.1:8766/';await page.goto(base);
 const ids=await page.evaluate(()=>({clinical:FIELD_NOTE_CARDS.filter(c=>c.kind==='clinical').map(c=>c.id),terms:FIELD_NOTE_CARDS.filter(c=>c.kind==='terms').map(c=>c.id)}));
 assert(ids.clinical.length>100&&ids.terms.length>20);
 // Newly added medical content exposes its reference without flipping/advancing the card.
 const referenced=await page.evaluate(()=>FIELD_NOTE_CARDS.find(c=>c.front.startsWith('A patient with possible early pregnancy')));
 await page.goto(base+'flashcards.html?card='+encodeURIComponent(referenced.id));
 await page.getByRole('button',{name:'Reveal / Hide Answer'}).click();
 assert.match(await page.locator('#card-answer-text').innerText(),/ectopic pregnancy/);
 assert.equal(await page.locator('#card-sources a').getAttribute('href'),'https://www.acog.org/womens-health/faqs/ectopic-pregnancy');
 const pop=page.waitForEvent('popup');await page.locator('#card-sources a').click();await (await pop).close();
 assert.equal(await page.locator('.card-rating-panel').isVisible(),true);
 await page.getByRole('button',{name:'Good',exact:true}).click();
 await page.goto(base);await page.evaluate(()=>localStorage.removeItem(CardStudy.storageKey));await page.reload();
 await page.evaluate(()=>{const c=FIELD_NOTE_CARDS.find(c=>c.kind==='clinical'),t=FIELD_NOTE_CARDS.find(c=>c.kind==='terms');localStorage.removeItem(CardStudy.storageKey);localStorage.setItem('clinical-flashcards-progress-v4',JSON.stringify({known:{[c.legacy]:true},review:{}}));localStorage.setItem('terminology-decks-progress-v1',JSON.stringify({known:{},review:{[t.legacy]:true}}));localStorage.setItem('field_notes_study_v1',JSON.stringify({version:1,missed:['keep'],bookmarks:['keep'],history:[],session:null}));});
 await page.reload();let s=await page.evaluate(()=>CardStudy.getState());assert.equal(s.records[ids.clinical[0]].rating,'good');assert.equal(s.records[ids.terms[0]].rating,'again');assert.equal(s.history.length,0);
 // Ratings need a reveal; bookmarks and exact shuffled order/flip survive navigating away.
 await page.goto(base+'flashcards.html');assert.match(await page.locator('.card-study-summary').innerText(),/1\/\d+ reviewed/);
 await page.locator('#deckGrid button').first().click();assert.equal(await page.locator('.card-rating-panel').isVisible(),false);
 await page.getByRole('button',{name:'Bookmark Card',exact:true}).click();
 await page.getByRole('button',{name:'Reveal / Hide Answer'}).click();assert.equal(await page.locator('.card-rating-panel').isVisible(),true);
 await page.getByRole('button',{name:'Good',exact:true}).click();s=await page.evaluate(()=>CardStudy.getState());assert.equal(s.history.length,1);assert.equal(s.records[ids.clinical[0]].bookmark,true);assert(s.records[ids.clinical[0]].due>Date.now());
 await page.getByRole('button',{name:'🔀 Shuffle',exact:true}).click();await page.getByRole('button',{name:'Reveal / Hide Answer'}).click();
 const session=await page.evaluate(()=>CardStudy.getState().sessions.clinical);
 await page.getByRole('button',{name:'Save & Exit',exact:true}).click();await page.goto(base);
 assert.equal(await page.locator('#card-study-dashboard').getByRole('link',{name:'Continue Last Deck'}).count(),1);
 await page.locator('#card-study-dashboard').getByRole('link',{name:'Continue Last Deck'}).click();await page.waitForFunction(()=>window.CardStudy);assert.deepEqual(await page.evaluate(()=>CardStudy.getState().sessions.clinical),session);assert.equal(await page.locator('.card-rating-panel').isVisible(),true);
 await page.getByRole('button',{name:'Hard',exact:true}).click();s=await page.evaluate(()=>CardStudy.getState());assert.equal(s.history.length,2);
 // Terms have their own session and history; self-ratings do not touch quiz results.
 await page.goto(base+'terminology-decks.html');await page.getByRole('button',{name:'Reveal / Hide Answer'}).click();await page.getByRole('button',{name:'Again',exact:true}).click();s=await page.evaluate(()=>CardStudy.getState());assert.equal(s.history.length,3);assert.equal(s.records[ids.terms[0]].rating,'again');assert(s.records[ids.terms[0]].due>Date.now()+590000);assert(s.sessions.clinical&&s.sessions.terms);
 await page.getByRole('button',{name:'Bookmark Card',exact:true}).click();await page.getByRole('button',{name:'Reveal / Hide Answer'}).click();const termSession=await page.evaluate(()=>CardStudy.getState().sessions.terms);await page.reload();assert.deepEqual(await page.evaluate(()=>CardStudy.getState().sessions.terms),termSession);assert.equal(await page.locator('.card-rating-panel').isVisible(),true);
 const quiz=await page.evaluate(()=>JSON.parse(localStorage.getItem('field_notes_study_v1')));assert.deepEqual(quiz.missed,['keep']);assert.deepEqual(quiz.bookmarks,['keep']);assert.equal(quiz.history.length,0);
 // Complete a one-card bookmark session; due filtering includes a card once its date arrives.
 await page.evaluate(()=>{const s=CardStudy.getState();delete s.sessions.terms;delete s.sessions.clinical;localStorage.setItem(CardStudy.storageKey,JSON.stringify(s));});
 await page.goto(base+'flashcards.html?mode=bookmarks');assert.match(await page.locator('#card-question-text').innerText(),/Accidental Death/);await page.getByRole('button',{name:'Reveal / Hide Answer'}).click();await page.getByRole('button',{name:'Easy',exact:true}).click();assert.equal(await page.locator('#completionScreen').isVisible(),true);assert.equal((await page.evaluate(()=>CardStudy.getState())).sessions.clinical,undefined);
 await page.goto(base+'flashcards.html?mode=due');assert.equal(await page.locator('#completionScreen').isVisible(),true);
 await page.evaluate(()=>{const s=CardStudy.getState(),id=FIELD_NOTE_CARDS.find(c=>c.kind==='clinical').id;s.records[id].due=Date.now()-1;localStorage.setItem(CardStudy.storageKey,JSON.stringify(s));});await page.reload();assert.match(await page.locator('#card-question-text').innerText(),/Accidental Death/);
 // Cancel session replacement retains the resume data.
 const before=await page.evaluate(()=>CardStudy.getState().sessions.clinical);page.once('dialog',d=>d.dismiss());await page.getByLabel('Study mode',{exact:true}).selectOption('all');await page.getByRole('button',{name:'Start Selected Mode',exact:true}).click();assert.deepEqual(await page.evaluate(()=>CardStudy.getState().sessions.clinical),before);
 // Reset leaves bookmarks, isolates the other page, and doesn't remigrate removed ratings.
 await page.evaluate(()=>{const s=CardStudy.getState();delete s.sessions.clinical;localStorage.setItem(CardStudy.storageKey,JSON.stringify(s));});await page.goto(base+'flashcards.html');await page.locator('#deckGrid button').first().click();page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Reset Deck Ratings',exact:true}).click();s=await page.evaluate(()=>CardStudy.getState());assert.equal(s.records[ids.clinical[0]].rating,undefined);assert.equal(s.records[ids.clinical[0]].bookmark,true);assert.equal(s.records[ids.terms[0]].rating,'again');await page.reload();assert.equal((await page.evaluate(()=>CardStudy.getState())).records[ids.clinical[0]].rating,undefined);
 // Mobile dashboard and both study pages fit without horizontal scrolling.
 for(const url of ['', 'flashcards.html','terminology-decks.html']){await page.goto(base+url);for(const width of [1440,390,320]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,url+' '+width);}}
 assert.deepEqual(errors,[]);
 // Corrupt/malformed state and disabled storage still allow study.
 const bad=await browser.newContext({serviceWorkers:'block'});await bad.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({body:'{}'}));
 const bp=await bad.newPage();await bp.goto(base);await bp.evaluate(()=>localStorage.setItem(CardStudy.storageKey,'{bad'));await bp.reload();assert.equal(await bp.locator('#card-study-dashboard section').count(),2);
 await bp.evaluate(()=>localStorage.setItem(CardStudy.storageKey,JSON.stringify({version:1,records:{},sessions:{terms:{keys:['missing'],index:0,deck:'all',mode:'learn',flipped:false}},history:[{}]})));await bp.goto(base+'terminology-decks.html');assert.notEqual(await bp.locator('#termText').innerText(),'—');
 const blocked=await browser.newContext({serviceWorkers:'block'});await blocked.addInitScript(()=>{Storage.prototype.getItem=function(){throw new DOMException('Blocked','SecurityError')};Storage.prototype.setItem=function(){throw new DOMException('Blocked','SecurityError')};});await blocked.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({body:'{}'}));const p=await blocked.newPage();await p.goto(base+'terminology-decks.html');assert.match(await p.locator('.card-storage-warning').innerText(),/cannot save/);await p.getByRole('button',{name:'Reveal / Hide Answer'}).click();await p.getByRole('button',{name:'Good',exact:true}).click();assert.equal((await p.evaluate(()=>CardStudy.getState())).history.length,1);
 const offline=await browser.newContext({serviceWorkers:'allow'});await offline.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({body:'{}'}));const op=await offline.newPage();await op.goto(base);await op.evaluate(()=>navigator.serviceWorker.ready);await op.waitForFunction(()=>navigator.serviceWorker.controller);await offline.setOffline(true);for(const file of ['flashcards.html','terminology-decks.html']){await op.goto(base+file);await op.waitForFunction(()=>window.CardStudy);assert.equal(await op.locator('.card-study-toolbar').isVisible(),true);}
 console.log('PASS: migration, ratings, scheduling, bookmarks, shuffled/flip resume across pages, completion, reset/cancel, score isolation, mobile layout, corrupt and blocked storage.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
