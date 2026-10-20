const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const G=require('../instructor-corner-engine.js'),source=fs.readFileSync(require.resolve('../instructor-corner.js'),'utf8');
const els=new Map();function $(s){if(!els.has(s))els.set(s,{value:'single',textContent:'',disabled:false,querySelector:()=>({focus(){}})});return els.get(s)}
const ctx=vm.createContext({G,$,TextEncoder,console,document:{querySelector:()=>({focus(){}})},renders:0,busy:false,failName:'',images:0});
vm.runInContext(`let draftQuestions=[],imageJobs=0;function renderEditor(){renders++}function editorError(e){$('#editor-error').textContent=e.message||String(e)}function setImageBusy(value){busy=value}async function prepareImage(f){images++;if(f.name===failName)throw Error('Invalid image');return 'data:image/jpeg;base64,AAAA'};`+source.slice(source.indexOf('function moveItem('),source.indexOf('function setImageBusy('))+source.slice(source.indexOf("$('#bulk-slides').onchange="),source.indexOf('function checkedDeck()')),ctx);
const run=s=>vm.runInContext(s,ctx);const state=()=>JSON.parse(run('JSON.stringify(draftQuestions)'));
async function upload(names){await $('p');return $('#bulk-slides').onchange({target:{files:names.map(name=>({name})),value:'picked'}})}
(async()=>{
 await upload(['01 Airway.png','02 Breathing.jpg','03 Circulation.webp']);assert.deepEqual(state().map(q=>q.text),['01 Airway','02 Breathing','03 Circulation']);assert.equal(ctx.busy,false);assert.ok(state().every(q=>q.type==='slide'&&q.imageAlt===q.text));
 run('insertItem(1)');assert.equal(state()[1].type,'single');run("draftQuestions[1].text='Question';draftQuestions[1].answers=['A','B'];draftQuestions[1].correct=[0]");run('moveItem(1,3)');assert.equal(state()[3].text,'Question');run('moveItem(3,0)');assert.equal(state()[0].text,'Question');
 const before=state();run('moveItem(-1,2);moveItem(2,99)');assert.deepEqual(state(),before);
 const deck=G.validate(state());assert.deepEqual(G.parseDeck(JSON.stringify({format:'hearth-gathering-hall',version:2,items:deck})),deck);
 ctx.failName='broken.png';await upload(['good.png','broken.png']);assert.deepEqual(state(),before);assert.match($('#editor-error').textContent,/No slides were added/);assert.equal(ctx.busy,false);assert.equal(run('imageJobs'),0);
 run('draftQuestions=Array.from({length:59},()=>G.newItem("slide"))');await upload(['a.png','b.png']);assert.equal(state().length,59);assert.match($('#editor-error').textContent,/60 items/);
 run('draftQuestions=[{...G.newItem("slide"),text:"x",rationale:"x".repeat(G.MAX_BYTES)}]');await upload(['a.png']);assert.equal(state().length,1);assert.match($('#editor-error').textContent,/10 MB/);assert.equal(ctx.busy,false);
 run('draftQuestions=[];imageJobs=1');await upload(['a.png']);run('insertItem(0);moveItem(0,0)');assert.equal(state().length,0);
 console.log('PASS: bulk ordering, interleaved questions, bidirectional moves, invalid indices, deck roundtrip, atomic decode/size failures, item limits, busy guards.');
})().catch(e=>{console.error(e);process.exitCode=1});
