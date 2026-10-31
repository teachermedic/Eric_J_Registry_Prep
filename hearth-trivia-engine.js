/* Independent, browser-local practice progress. No exam or campaign writes. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.HearthTrivia=api;})(typeof window==='object'?window:globalThis,function(){
'use strict';
const KEY='field_notes_trivia_v1',CATEGORIES=['Foundations','Medical','Trauma','Operations','Pediatrics','OB/GYN'],ROUND=6;
const hash=s=>{let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}return (h>>>0).toString(36);};
function bank(rows,modules){const map=new Map();for(const q of rows||[]){if(!q||!Array.isArray(q.options)||q.options.length<2||q.options.length>6||!q.options.every(x=>typeof x==='string')||new Set(q.options).size!==q.options.length||!Array.isArray(q.answer)||!q.answer.length||!q.answer.every(a=>q.options.includes(a))||typeof q.q!=='string'||!q.q.trim()||typeof q.rationale!=='string'||!q.rationale.trim())continue;const category=modules.forQuestion(q);if(!CATEGORIES.includes(category))continue;const correct=[...new Set(q.answer.map(a=>q.options.indexOf(a)))];const id='trivia-'+hash(JSON.stringify([category,q.q,q.options,correct]));map.set(id,{id,category,text:q.q,options:[...q.options],correct,rationale:q.rationale,reference:typeof q.reference==='string'?q.reference:''});}return [...map.values()];}
function grade(q,answer){return Array.isArray(answer)&&answer.length===q.correct.length&&new Set(answer).size===answer.length&&answer.every(n=>Number.isInteger(n)&&q.correct.includes(n));}
const fresh=()=>({version:1,mastered:[],missed:[],seen:[],attempts:0,correct:0,round:1,roundAnswers:0,roundCorrect:0,active:null});
function restore(raw,questions){try{const s=typeof raw==='string'?JSON.parse(raw):JSON.parse(JSON.stringify(raw));if(!s||s.version!==1)throw Error();const ids=new Set(questions.map(q=>q.id));for(const k of ['mastered','missed','seen']){if(!Array.isArray(s[k])||s[k].length>10000||new Set(s[k]).size!==s[k].length||!s[k].every(id=>typeof id==='string'))throw Error();s[k]=s[k].filter(id=>ids.has(id));}if(s.active&&!ids.has(s.active.id))s.active=null;for(const k of ['attempts','correct','round','roundAnswers','roundCorrect'])if(!Number.isSafeInteger(s[k])||s[k]<0)throw Error();if(s.round<1||s.correct>s.attempts||s.roundAnswers>ROUND||s.roundCorrect>s.roundAnswers)throw Error();if(s.active){const q=questions.find(q=>q.id===s.active.id);if(!q||s.active.answer!==null&&(!Array.isArray(s.active.answer)||!s.active.answer.length||new Set(s.active.answer).size!==s.active.answer.length||!s.active.answer.every(n=>Number.isInteger(n)&&n>=0&&n<q.options.length)))throw Error();}return JSON.parse(JSON.stringify(s));}catch{return fresh();}}
function create(questions,raw,random=Math.random){let s=restore(raw,questions);const byId=new Map(questions.map(q=>[q.id,q]));
 const status=()=>CATEGORIES.map(name=>{const pool=questions.filter(q=>q.category===name),target=Math.min(3,pool.length),count=pool.filter(q=>s.mastered.includes(q.id)).length;return {name,total:pool.length,target,count,earned:target>0&&count>=target};});
 const complete=()=>{const available=status().filter(c=>c.total);return available.length>0&&available.every(c=>c.earned);};
 const available=()=>status().filter(c=>c.total&&!c.earned);
 const pick=a=>a[Math.min(a.length-1,Math.max(0,Math.floor(random()*a.length)))];
 return {
  state:()=>JSON.parse(JSON.stringify(s)),status,complete,available,
  current:()=>s.active?byId.get(s.active.id):null,
  spin(){if(s.active||s.roundAnswers>=ROUND||complete())return null;const categories=available();if(!categories.length)return null;const category=pick(categories).name;const remaining=questions.filter(q=>q.category===category&&!s.mastered.includes(q.id));let pool=remaining.filter(q=>s.missed.includes(q.id));if(!pool.length)pool=remaining.filter(q=>!s.seen.includes(q.id));if(!pool.length)pool=remaining;const q=pick(pool);s.active={id:q.id,answer:null};if(!s.seen.includes(q.id))s.seen.push(q.id);return q;},
  answer(answer){if(!s.active||s.active.answer!==null)return null;const q=byId.get(s.active.id);if(!Array.isArray(answer)||!answer.length||new Set(answer).size!==answer.length||!answer.every(n=>Number.isInteger(n)&&n>=0&&n<q.options.length))return null;const ok=grade(q,answer);s.active.answer=[...answer];s.attempts++;s.roundAnswers++;if(ok){s.correct++;s.roundCorrect++;if(!s.mastered.includes(q.id))s.mastered.push(q.id);s.missed=s.missed.filter(id=>id!==q.id);}else if(!s.missed.includes(q.id))s.missed.push(q.id);return ok;},
  next(){if(!s.active||s.active.answer===null)return false;s.active=null;return true;},
  nextRound(){if(s.active||s.roundAnswers<ROUND||complete())return false;s.round++;s.roundAnswers=0;s.roundCorrect=0;s.seen=[];return true;},
  reset(){s=fresh();},
  missed:()=>s.missed.map(id=>byId.get(id)).filter(Boolean)
 };
}
return {KEY,CATEGORIES,ROUND,bank,grade,fresh,restore,create};
});
