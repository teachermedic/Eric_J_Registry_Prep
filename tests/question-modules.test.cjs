const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const M=require('../question-modules.js'),A=require('../question-author-engine.js'),root=path.join(__dirname,'..');
assert.deepEqual(M.NAMES,['Foundations','Medical','Trauma','Operations','Pediatrics','OB/GYN']);
const script=fs.readFileSync(path.join(root,'script.js'),'utf8');
const review=vm.runInNewContext(script.slice(0,script.indexOf('// --- QUIZ ENGINE LOGIC ---'))+';quizData;');
const clinical=vm.runInNewContext(fs.readFileSync(path.join(root,'study-resource-data.js'),'utf8')+';window.STUDY_CLINICAL_CARDS;',{window:{}});
for(const [name,bank] of [['Review/Exam',review],['live bank',clinical]]){
 const before=JSON.stringify(bank),groups=Object.fromEntries(M.NAMES.map(n=>[n,bank.filter(q=>M.forQuestion(q)===n)]));
 assert.equal(Object.values(groups).reduce((n,qs)=>n+qs.length,0),bank.length);
 assert.equal(new Set(Object.values(groups).flat()).size,bank.length);
 assert.equal(JSON.stringify(bank),before,'Stable source metadata must not change');
 for(const qs of Object.values(groups))assert.ok(qs.length>0);
 for(const q of bank.filter(q=>q.category==='Obstetrics'||q.category==='Gynecology'))assert.equal(M.forQuestion(q),'OB/GYN');
 for(const q of bank.filter(q=>q.category==='Neonatal'||q.category==='Pediatrics'))assert.equal(M.forQuestion(q),'Pediatrics');
 console.log(name,bank.length,JSON.stringify(Object.fromEntries(Object.entries(groups).map(([name,qs])=>[name,qs.length]))));
}
const base={q:'Legacy question',type:'single',options:['A','B'],correct:[0],rationale:'Explanation'};
for(const [section,category,expected] of [['Foundations','Legal','Operations'],['Pathophysiology','Patho','Foundations'],['Terminology','Terminology','Foundations'],['Physician','Physician','Medical'],['OBPeds','Neonatal','Pediatrics'],['OBPeds','Obstetrics','OB/GYN']]){
 const q={...base,id:'old-'+section,section,category};const clean=A.parseJSON(JSON.stringify({format:'hearth-questions',version:1,questions:[q]})).questions[0];assert.equal(clean.section,expected);assert.equal(clean.id,q.id);assert.equal(A.toBank([q])[0].category,expected);
}
for(const section of M.NAMES){const clean=A.validate({...base,section});assert.equal(clean.section,section);assert.equal(A.parseJSON(JSON.stringify(A.pack([clean]))).questions[0].id,clean.id);}
assert.equal(M.forQuestion({section:'Medical',category:'Physician',q:'What is HELLP Syndrome?'}),'OB/GYN');
assert.equal(M.forQuestion({section:'Medical',category:'OBPeds',q:'What is the definition of Eclampsia?'}),'OB/GYN');
assert.throws(()=>A.validate({...base,section:'Cardiology'}));
assert.equal(M.selection('OBPeds'),'All');assert.equal(M.selection('Physician'),'Medical');
assert.deepEqual(M.groupStats([{name:'Legal',total:2,correct:1},{name:'Safety',total:1,correct:1}]),[{name:'Operations',total:3,correct:2}]);
console.log('PASS: every existing question belongs to exactly one of six modules; maternal/pediatric split, legacy imports and IDs, new exports, and stable source identities.');
