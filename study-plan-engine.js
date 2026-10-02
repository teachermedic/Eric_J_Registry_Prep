/* Original browser-local planner. Also exported for deterministic scheduling tests. */
((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.StudyPlanEngine=api;})(typeof window==='object'?window:globalThis,()=>{
 'use strict';
 const DAY=86400000;
 function dateValue(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return NaN;const n=Date.parse(s+'T12:00:00Z');return Number.isFinite(n)&&new Date(n).toISOString().slice(0,10)===s?n:NaN;}
 const dateString=n=>new Date(n).toISOString().slice(0,10);
 function dates(config){const start=dateValue(config.start),exam=dateValue(config.exam);if(!Number.isFinite(start)||!Number.isFinite(exam)||exam<=start||exam-start>180*DAY)throw new Error('Choose a start date before your exam, within 180 days of it.');const days=[];for(let n=start;n<exam;n+=DAY)if(config.weekdays.includes(new Date(n).getUTCDay()))days.push(dateString(n));return days;}
 function validateConfig(c){if(!c||typeof c.title!=='string'||!c.title.trim()||c.title.length>100)throw new Error('Enter a plan name, up to 100 characters.');if(!Array.isArray(c.topics)||!c.topics.length||c.topics.length>20||c.topics.some(t=>typeof t.name!=='string'||!t.name.trim()||t.name.length>100||![1,2,3].includes(t.priority)))throw new Error('Add 1–20 topics, each up to 100 characters.');if(!Array.isArray(c.weekdays)||!c.weekdays.length||c.weekdays.some(d=>!Number.isInteger(d)||d<0||d>6))throw new Error('Choose at least one available weekday.');if(!Number.isInteger(c.minutes)||c.minutes<10||c.minutes>240||!Number.isInteger(c.block)||c.block<10||c.block>60||c.block>c.minutes)throw new Error('Use 10–240 available minutes and 10–60 minute blocks no longer than your daily time.');const days=dates(c);if(!days.length)throw new Error('No selected weekdays fall before the exam. Choose different days or an earlier start.');return days;}
 function used(tasks,date){const day=tasks.filter(t=>t.date===date);return day.reduce((sum,t)=>sum+t.minutes,0)+Math.max(0,day.length-1)*5;}
 function generate(config,id){const days=validateConfig(config),tasks=[],topics=config.topics.map((t,i)=>({...t,id:'topic-'+i,visits:0,last:-Infinity,due:0})),slots=days.map(()=>Math.floor((config.minutes+5)/(config.block+5)));const finalReviewStart=Math.max(1,days.length-Math.ceil(topics.length/slots[0]));let sequence=0;
 for(let day=0;day<days.length;day++){for(let slot=0;slot<slots[day];slot++){
 const unseen=topics.filter(t=>!t.visits).sort((a,b)=>b.priority-a.priority||Number(a.id.slice(6))-Number(b.id.slice(6))),due=topics.filter(t=>t.visits>0&&t.visits<3&&t.last<day&&t.due<=day).sort((a,b)=>a.due-b.due||b.priority-a.priority||Number(a.id.slice(6))-Number(b.id.slice(6)));
 const remaining=slots.slice(day+1).reduce((a,b)=>a+b,0)+slots[day]-slot;
 const topic=unseen.length&&(unseen.length>=remaining||!due.length||sequence%2===0)?unseen[0]:due[0]||unseen[0];if(!topic)break;
 const phase=topic.visits===0?'prepare':'review';tasks.push({id:id+'-'+sequence,topicId:topic.id,topic:topic.name,date:days[day],minutes:config.block,phase,method:phase==='prepare'?'Build a summary or concept map':topic.visits===1?'Recall from memory, then check':'Practice questions and review mistakes',notes:'',done:false});sequence++;topic.visits++;topic.last=day;topic.due=topic.visits===1?day+1:Math.max(day+1,finalReviewStart);
 }}return {id,config:{...config,topics:config.topics.map(t=>({...t}))},tasks};}
 function validatePlan(plan){try{if(!plan||typeof plan.id!=='string'||plan.id.length>100||!/^[a-zA-Z0-9-]+$/.test(plan.id))return false;const days=validateConfig(plan.config);if(!Array.isArray(plan.tasks)||plan.tasks.length>60)return false;const ids=new Set();for(const t of plan.tasks){if(!t||typeof t.id!=='string'||ids.has(t.id)||!days.includes(t.date)||!Number.isInteger(t.minutes)||t.minutes<10||t.minutes>240||!['prepare','review'].includes(t.phase)||!['Build a summary or concept map','Recall from memory, then check','Practice questions and review mistakes','Explain it in your own words'].includes(t.method)||typeof t.notes!=='string'||t.notes.length>500||typeof t.done!=='boolean')return false;ids.add(t.id);const topic=plan.config.topics[Number(String(t.topicId).replace('topic-',''))];if(!/^topic-\d+$/.test(t.topicId)||!topic||t.topic!==topic.name)return false;}
 for(const date of days)if(used(plan.tasks,date)>plan.config.minutes)return false;
 for(let i=0;i<plan.config.topics.length;i++){const tasks=plan.tasks.filter(t=>t.topicId==='topic-'+i),prep=tasks.filter(t=>t.phase==='prepare');if(tasks.length>3||tasks.length&&prep.length!==1||tasks.some(t=>t.phase==='review'&&t.date<=prep[0].date)||new Set(tasks.map(t=>t.date)).size!==tasks.length)return false;}
 return true;}catch{return false;}}
 function instructions(task){
 const first=Math.max(2,Math.floor(task.minutes*.3)),second=Math.max(3,Math.floor(task.minutes*.4)),last=task.minutes-first-second;
 const guides={
 'Build a summary or concept map':[
 'Read a short section of your notes or textbook on this topic. Identify 3–5 key ideas and one example.',
 'Close the source. Write a short summary in your own words, or draw a map connecting those ideas. Include the example.',
 'Reopen the source. Correct errors, add missing ideas, and write one question you still need answered.'
 ],
 'Recall from memory, then check':[
 'Close your notes. On a blank page, list what you remember about this topic. Include definitions, steps, or a worked example.',
 'Compare your recall with your notes or textbook. Mark omissions and errors; write the corrected explanation.',
 'Close the source again. Explain the missed ideas from memory. Record anything still unclear in this block’s notes.'
 ],
 'Practice questions and review mistakes':[
 'Choose 3–5 questions or problems on this topic. If none are available, turn your note headings into questions.',
 'Answer without notes. Then check against a reliable answer key or your course materials.',
 'For each mistake, explain the correct reasoning and why your answer failed. Retry one missed item without looking.'
 ],
 'Explain it in your own words':[
 'Close your notes. Explain the topic aloud or in writing as if teaching a beginner: what it means, how it works, and an example.',
 'Check your explanation against your notes or textbook. Identify missing steps, incorrect claims, and unfamiliar terms.',
 'Explain it again using simpler words and a clear example. Write down the question you still cannot answer.'
 ]};return guides[task.method].map((text,i)=>({minutes:[first,second,last][i],text}));
 }
 const escapeICS=s=>String(s).replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
 function fold(line){let out='',length=0;for(const char of line){const size=new TextEncoder().encode(char).length;if(length+size>75){out+='\r\n ';length=1;}out+=char;length+=size;}return out;}
 function calendar(plan,now=new Date()){if(!validatePlan(plan))throw new Error('This plan needs correction before export.');const stamp=now.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Eric J Field Notes//Study Planner//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH'];const event=(uid,date,title,description)=>lines.push('BEGIN:VEVENT','UID:'+uid+'@field-notes-study','DTSTAMP:'+stamp,'DTSTART;VALUE=DATE:'+date.replace(/-/g,''),'DTEND;VALUE=DATE:'+dateString(dateValue(date)+DAY).replace(/-/g,''),'SUMMARY:'+escapeICS(title),'DESCRIPTION:'+escapeICS(description),'TRANSP:TRANSPARENT','END:VEVENT');
 for(const date of dates(plan.config)){const tasks=plan.tasks.filter(t=>t.date===date&&!t.done);if(tasks.length)event(plan.id+'-'+date,date,plan.config.title+' — study',tasks.map(t=>`${t.topic}: ${t.minutes} min — ${t.method}\n${instructions(t).map((step,i)=>`${i+1}. ${step.minutes} min: ${step.text}`).join('\n')}${t.notes?'\nNotes: '+t.notes:''}`).join('\n')+'\nReserve 5 minutes between blocks.');}event(plan.id+'-exam',plan.config.exam,'Exam: '+plan.config.title,'Exam date from your study plan. Confirm the actual time and location.');lines.push('END:VCALENDAR');return lines.map(fold).join('\r\n')+'\r\n';}
 return {dateValue,dateString,dates,validateConfig,generate,used,validatePlan,instructions,calendar};
});
