const assert=require('node:assert/strict'),T=require('../hearth-trivia-engine.js'),M=require('../question-modules.js'),fs=require('node:fs'),vm=require('node:vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync(require.resolve('../study-resource-data.js'),'utf8'),c);const live=T.bank(c.window.STUDY_CLINICAL_CARDS,M);assert.ok(live.length>50);for(const category of T.CATEGORIES)assert.ok(live.filter(q=>q.category===category).length>=3);
const rows=T.CATEGORIES.flatMap(section=>Array.from({length:4},(_,i)=>({section,q:section+' '+i,options:['A','B','C'],answer:i===0?['A','C']:['A'],rationale:'Explanation'}))),bank=T.bank(rows,M);
const q=bank.find(q=>q.correct.length===2);assert.equal(T.grade(q,[0,2]),true);for(const a of [[0],[0,0],[0,1,2],null,[],['0',2]])assert.equal(T.grade(q,a),false);
assert.equal(T.bank([{...rows[0],answer:['absent']}],M).length,0);assert.equal(T.bank([{...rows[0],rationale:''}],M).length,0);
let g=T.create(bank,null,()=>0),current=g.spin();assert.equal(g.spin(),null);assert.equal(g.answer([]),null);assert.equal(g.next(),false);assert.equal(g.answer([1]),false);assert.equal(g.answer([0,2]),null);assert.equal(g.state().attempts,1);assert.equal(g.missed().length,1);
g=T.create(bank,JSON.stringify(g.state()),()=>0);assert.equal(g.current().id,current.id);assert.deepEqual(g.state().active.answer,[1]);assert.equal(g.next(),true);
while(!g.complete()){if(g.state().roundAnswers===6){assert.equal(g.spin(),null);assert.equal(g.nextRound(),true);}const q=g.spin();assert.ok(q);assert.equal(g.answer(q.correct),true);g.next();}
assert.equal(g.status().filter(x=>x.earned).length,6);assert.equal(g.missed().length,0);assert.equal(g.state().mastered.length,18);assert.equal(g.spin(),null);assert.equal(g.nextRound(),false);
const final=JSON.stringify(g.state());assert.equal(T.create(bank,final).complete(),true);g.reset();assert.equal(g.complete(),false);assert.equal(g.state().attempts,0);
for(const bad of ['{',JSON.stringify({...T.fresh(),mastered:['unknown']}),JSON.stringify({...T.fresh(),roundAnswers:8}),JSON.stringify({...T.fresh(),active:{id:q.id,answer:[999]}})])assert.equal(T.restore(bad,bank).attempts,0);
const small=T.create([bank[0]],null,()=>0);let one=small.spin();small.answer(one.correct);small.next();assert.equal(small.complete(),true);assert.equal(small.status()[0].target,1);
assert.equal(T.create([],null).complete(),false);assert.equal(T.create([],null).spin(),null);
const old={...T.fresh(),attempts:2,correct:1,mastered:[bank[0].id],seen:[bank[0].id]};const oldCopy=JSON.stringify(old);assert.equal(T.restore(old,bank.slice(1)).attempts,2);assert.equal(T.restore(old,bank.slice(1)).mastered.length,0);assert.equal(JSON.stringify(old),oldCopy);
console.log('PASS: all six live categories, exact select-all grading, invalid inputs, duplicate guards, reload during feedback, 6-question rounds, unique mastery/seals, missed correction, full completion, corrupt saves and sparse banks.');
