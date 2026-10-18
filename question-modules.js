/* One shared question taxonomy. Keep source metadata intact so saved question keys remain stable. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.QuestionModules=api;})(typeof window==='object'?window:globalThis,function(){
'use strict';
const NAMES=Object.freeze(['Foundations','Medical','Trauma','Operations','Pediatrics','OB/GYN']);
const legacy=Object.freeze(['Foundation','Pathophysiology','Terminology','Physician','OBPeds','OB/ GYN']);
const operations=new Set(['ems systems','safety','legal','communications','lifting','wellness','operations']);
const trauma=new Set(['moi','bleeding','chest','abdominal','ortho','head/spine','environmental','soft-tissue','physics','face/neck','shock','neuro','trauma']);
const norm=s=>String(s||'').trim().toLowerCase();
function forQuestion(q){
 const section=norm(q.section),category=norm(q.category);
 // These explicit categories are also the values used for all new workshop questions.
 if(section==='operations')return 'Operations';
 if(section==='pediatrics')return 'Pediatrics';
 if(section==='ob/gyn'||section==='ob/ gyn')return 'OB/GYN';
 if(category==='pediatrics'||category==='neonatal')return 'Pediatrics';
 if(category==='obstetrics'||category==='gynecology'||category==='ob/gyn')return 'OB/GYN';
 if(section==='obpeds'||category==='obpeds'){
  // Old combined collections need the stem to distinguish maternal care from child care.
  return /pregnan|eclamp|hellp|placent|uter|postpartum|childbirth|labor\b|labour\b|delivery|vagin|ovari|menstr|gestation/i.test(q.q||'')?'OB/GYN':'Pediatrics';
 }
 if(operations.has(category)||operations.has(section))return 'Operations';
 if(section==='trauma'||(!section&&trauma.has(category)))return 'Trauma';
 if(section==='foundations'||section==='foundation'||section==='pathophysiology'||section==='terminology'||category==='terminology'||(!section&&category==='patho'))return 'Foundations';
 // The former Physician collection includes maternal questions among its medical questions.
 if((section==='physician'||category==='physician')&&/hellp|eclamp|pregnan|postpartum|obstetric/i.test(q.q||''))return 'OB/GYN';
 return 'Medical';
}
function selection(value){if(value==='All'||value==='OBPeds')return 'All';return NAMES.includes(value)?value:forQuestion({section:value});}
function groupStats(rows){const groups=new Map();for(const row of rows){const name=NAMES.includes(row.name)?row.name:forQuestion({category:row.name}),group=groups.get(name)||{name,total:0,correct:0};group.total+=row.total;group.correct+=row.correct;groups.set(name,group);}return [...groups.values()];}
return {NAMES,legacy,forQuestion,selection,groupStats};
});
