const assert=require('node:assert/strict'),E=require('../study-badges.js');
let s=E.empty(),now=Date.now();const cards=Array.from({length:12},(_,i)=>({id:'card-'+i,kind:'clinical',deck:'Pathophysiology'}));
assert.equal(E.definitions(s,cards).length,8);assert.deepEqual(E.award(s,cards,now),[]);
for(let i=0;i<10;i++){E.record(s,{type:'session',id:'s'+i,date:now});E.record(s,{type:'session',id:'s'+i,date:now});}
assert.equal(Object.keys(s.sessions).length,10);assert.deepEqual(E.award(s,cards,now),['first-shift','showing-up']);
for(let i=0;i<5;i++)E.record(s,{type:'activity',id:'a',date:now-i*86400000});assert(E.award(s,cards,now).includes('steady-student'));
// Earlier known answers do not count as recovery from a later missed answer.
E.record(s,{type:'card',id:'time-test',know:false,date:now});E.record(s,{type:'card',id:'time-test',know:true,date:now-1});assert.equal(s.recovered['time-test'],undefined);
for(let i=0;i<12;i++){E.record(s,{type:'card',id:cards[i].id,know:false,date:now-100});E.record(s,{type:'card',id:cards[i].id,know:true,date:now});E.record(s,{type:'card',id:cards[i].id,know:true,date:now});}assert.equal(Object.keys(s.recovered).length,12);assert(E.award(s,cards,now).includes('pathophysiology-pass'));assert(Object.hasOwn(s.earned,'comeback-kid'));
for(let i=0;i<5;i++){E.record(s,{type:'finding',id:'case'+i,variant:0,date:now});assert.equal(s.findings['case'+i],undefined);E.record(s,{type:'finding',id:'case'+i,variant:1,date:now});E.record(s,{type:'order',id:'order'+i,date:now});E.record(s,{type:'block',id:'block'+i,date:now});}
assert.equal(E.award(s,cards,now).length,3);assert.equal(Object.keys(s.earned).length,8);
const earned=JSON.stringify(s.earned);E.record(s,{type:'card',id:cards[0].id,know:false,date:now+1});assert.equal(JSON.stringify(s.earned),earned);assert.deepEqual(E.award(s,cards,now+100),[]);assert.deepEqual(E.clean(JSON.parse(JSON.stringify(s))),s);
assert.deepEqual(E.clean({version:1,sessions:[],earned:{bad:'not-a-date'},unknownAt:null}),E.empty());assert.equal(E.definitions(E.empty(),[]).find(b=>b.id==='pathophysiology-pass').goal,null);assert.deepEqual(E.award(E.empty(),[],now),[]);
console.log('PASS: 8 milestone criteria, session/case/block deduplication, recall recovery chronology, permanent awards, deck eligibility, malformed state.');
