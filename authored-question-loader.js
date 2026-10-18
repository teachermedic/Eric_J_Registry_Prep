/* Published additions only. Local workshop drafts never enter student question pools. */
(function(){
'use strict';
let questions=[];try{const p=window.HEARTH_AUTHORED_QUESTIONS;if(p&&p.format==='hearth-questions'&&p.version===1)questions=window.QuestionAuthor.pack(p.questions).questions;}catch(e){console.warn('Published question additions could not be loaded:',e.message);}
const same=(a,b)=>a.authorId&&a.authorId===b.authorId||a.section===b.section&&a.q===b.q;
function add(bank,html){const additions=QuestionAuthor.toBank(questions,html);for(const q of additions)if(!bank.some(x=>same(x,q)))bank.push(q);}
if(typeof quizData!=='undefined'&&Array.isArray(quizData))add(quizData,true);
function attachLiveBank(){if(Array.isArray(window.STUDY_CLINICAL_CARDS))add(window.STUDY_CLINICAL_CARDS,false);}
window.AuthoredQuestionBank={attachLiveBank};attachLiveBank();
})();
