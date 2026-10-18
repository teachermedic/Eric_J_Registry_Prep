/* Gathering Hall deck format and grading; shared by the editor and live host. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GatheringHall=api;})(typeof window==='object'?window:globalThis,function(){
'use strict';
const VERSION=2,MAX_ITEMS=60,MAX_BYTES=10*1024*1024;
const TYPES={single:'Multiple choice',multiple:'Select all that apply',typed:'Typed answer',order:'Put in order',poll:'Class poll',slide:'Teaching slide'};
const CHARACTERS=[{id:'fox',icon:'🦊',name:'Fox'},{id:'owl',icon:'🦉',name:'Owl'},{id:'badger',icon:'🦡',name:'Badger'},{id:'hedgehog',icon:'🦔',name:'Hedgehog'},{id:'deer',icon:'🦌',name:'Deer'},{id:'dragon',icon:'🐉',name:'Dragon'}];
const normalize=s=>String(s).normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase();
function newItem(type='single'){return {type,text:'',answers:type==='slide'||type==='typed'?[]:['','','',''],correct:[0],accepted:[],rationale:'',category:'Custom',image:'',imageAlt:''};}
function fromBank(q){const a=q.options||[],correct=a.map((v,i)=>(q.answer||[]).includes(v)?i:-1).filter(i=>i>=0);return {...newItem(correct.length>1?'multiple':'single'),text:q.q||'',answers:[...a],correct,rationale:q.rationale||'',category:q.category||'Question bank'};}
function imageAllowed(s){return s===''||(/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(s)&&s.length<=450000);}
function validate(items){
 if(!Array.isArray(items)||!items.length||items.length>MAX_ITEMS)throw Error('Use between 1 and 60 questions or slides.');
 const clean=items.map((q,i)=>{
  const fail=m=>{throw Error('Item '+(i+1)+': '+m);};
  if(!q||!Object.hasOwn(TYPES,q.type))fail('choose a supported question type.');
  const str=(v,max)=>typeof v==='string'&&v.length<=max;
  if(!str(q.text,4000)||!q.text.trim())fail('add a question or slide title (up to 4,000 characters).');
  if(!str(q.rationale||'',8000))fail('explanation is too long.');
  if(!str(q.image||'',450000)||!imageAllowed(q.image||''))fail('use an uploaded JPG, PNG, or WebP image.');
  if(!str(q.imageAlt||'',400)||(q.image&&!q.imageAlt.trim()))fail('describe the image for students using screen readers.');
  const choice=['single','multiple','order','poll'].includes(q.type);
  if(choice&&(!Array.isArray(q.answers)||q.answers.length<2||q.answers.length>6||q.answers.some(a=>!str(a,500)||!a.trim())))fail('add 2–6 nonempty answer choices (up to 500 characters each).');
  const answers=choice?q.answers.map(a=>a.trim()):[];
  const correct=Array.isArray(q.correct)?[...new Set(q.correct)]:[];
  if(['single','multiple'].includes(q.type)&&(!correct.length||correct.some(n=>!Number.isInteger(n)||n<0||n>=answers.length)||(q.type==='single'&&correct.length!==1)))fail('select the correct answer(s).');
  if(q.type==='typed'&&(!Array.isArray(q.accepted)||!q.accepted.length||q.accepted.length>20||q.accepted.some(a=>!str(a,300)||!a.trim())))fail('add accepted answers, one per line (up to 20).');
  return {type:q.type,text:q.text.trim(),answers,correct:['single','multiple'].includes(q.type)?correct:[],accepted:q.type==='typed'?q.accepted.map(a=>a.trim()):[],rationale:q.rationale||'',category:String(q.category||'Custom').slice(0,100),image:q.image||'',imageAlt:q.imageAlt||''};
 });
 if(new TextEncoder().encode(JSON.stringify({format:'hearth-gathering-hall',version:VERSION,items:clean})).length>MAX_BYTES)throw Error('This presentation is too large. Keep the deck under 10 MB.');
 return clean;
}
function validResponse(q,value){
 if(q.type==='typed')return typeof value==='string'&&value.trim().length>0&&value.length<=300;
 if(q.type==='multiple')return Array.isArray(value)&&value.length>0&&value.length<=q.answers.length&&new Set(value).size===value.length&&value.every(n=>Number.isInteger(n)&&n>=0&&n<q.answers.length);
 if(q.type==='order')return Array.isArray(value)&&value.length===q.answers.length&&new Set(value).size===value.length&&value.every(n=>Number.isInteger(n)&&n>=0&&n<q.answers.length);
 return ['single','poll'].includes(q.type)&&Number.isInteger(value)&&value>=0&&value<q.answers.length;
}
function grade(q,value){if(!validResponse(q,value))return false;if(q.type==='poll'||q.type==='slide')return null;if(q.type==='typed')return q.accepted.some(a=>normalize(a)===normalize(value));if(q.type==='multiple')return value.length===q.correct.length&&q.correct.every(n=>value.includes(n));if(q.type==='order')return value.every((n,i)=>n===i);return q.correct.includes(value);}
function publicItem(q){return {type:q.type,text:q.text,answers:q.type==='order'?[]:q.answers,image:q.image,imageAlt:q.imageAlt,rationale:q.type==='slide'?q.rationale:''};}
function answerText(q){if(q.type==='typed')return q.accepted.join(' / ');if(q.type==='order')return q.answers.map((a,i)=>(i+1)+'. '+a).join(' → ');if(q.type==='poll'||q.type==='slide')return '';return q.correct.map(n=>q.answers[n]).join('; ');}
function parseDeck(raw){if(typeof raw!=='string'||new TextEncoder().encode(raw).length>MAX_BYTES)throw Error('Choose a Gathering Hall JSON file smaller than 10 MB.');const d=JSON.parse(raw);if(d.version!==VERSION||d.format!=='hearth-gathering-hall')throw Error('This is not a Gathering Hall 2.0 presentation.');return validate(d.items);}
function csvCell(v){let s=String(v??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
return {VERSION,MAX_BYTES,TYPES,CHARACTERS,newItem,fromBank,validate,imageAllowed,validResponse,grade,publicItem,answerText,parseDeck,csvCell};
});
