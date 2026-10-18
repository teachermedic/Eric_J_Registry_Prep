'use strict';
const G=window.GatheringHall,PEER_PREFIX='ej-fieldnotes-live-', $=s=>document.querySelector(s);
const bank=(window.STUDY_CLINICAL_CARDS||[]).filter(q=>Array.isArray(q.options)&&q.options.length>=2&&q.options.length<=6&&Array.isArray(q.answer)&&q.answer.length&&q.answer.every(a=>q.options.includes(a)));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let host=null,player={peer:null,conn:null,name:'',index:-1,character:'fox',pending:false,submitted:false},draftQuestions=[],audioContext=null,imageJobs=0;
function notice(s){$('#ic-notice').textContent=s;}
function view(id){$('#builder-resume').hidden=!draftQuestions.length;document.querySelectorAll('.ic-view').forEach(v=>v.classList.remove('active'));$('#ic-'+id).classList.add('active');$('#ic-leave').hidden=!['host','player'].includes(id);}
function sub(prefix,id){document.querySelectorAll('#ic-'+prefix+' > [id]').forEach(x=>x.hidden=true);$('#'+id).hidden=false;}
function tone(kind){if(!$('#ic-sound').checked)return;try{audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();audioContext.resume().catch(()=>{});const now=audioContext.currentTime,notes=kind==='correct'?[523,659,784]:kind==='join'?[392,523]:kind==='wrong'?[220,196]:[440];notes.forEach((hz,i)=>{const o=audioContext.createOscillator(),g=audioContext.createGain(),t=now+i*.1;o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.055,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+.15);o.connect(g);g.connect(audioContext.destination);o.start(t);o.stop(t+.16)});}catch(_){notice('Sound is unavailable in this browser. You can continue without it.');}}
$('#ic-sound').onchange=()=>tone('join');
$('#ic-fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else notice('Full screen is unavailable here. Use your browser’s presentation or full-screen controls.');}catch(_){notice('Your browser could not enter full screen.');}};
function cleanup(){const oldHost=host;host=null;if(oldHost)oldHost.destroy();const oldPeer=player.peer;player.peer=null;player.conn=null;player.pending=false;player.submitted=false;$('#join-btn').disabled=false;if(oldPeer)oldPeer.destroy();}
document.querySelectorAll('[data-go="home"]').forEach(b=>b.onclick=()=>{cleanup();view('home')});
$('#ic-leave').onclick=()=>{cleanup();view('home');notice('Room closed on this device. Your presentation is still in the editor.');};
window.addEventListener('beforeunload',e=>{if(host||draftQuestions.length){e.preventDefault();e.returnValue='';}});
$('#ic-host-open').onclick=()=>{if(draftQuestions.length){renderEditor();view('editor')}else view('builder')};
$('#character-choices').innerHTML=G.CHARACTERS.map((c,i)=>'<label><input type="radio" name="character" value="'+c.id+'" '+(i===0?'checked':'')+'><span>'+c.icon+' '+c.name+'</span></label>').join('');
const character=id=>G.CHARACTERS.find(c=>c.id===id)||G.CHARACTERS[0];
Object.entries(G.TYPES).forEach(([v,t])=>$('#editor-type').add(new Option(t,v)));
[...new Set(bank.map(q=>q.section).filter(Boolean))].sort().forEach(x=>$('#host-section').add(new Option(x,x)));
function filteredBank(){const s=$('#host-section').value,c=$('#host-category').value;return bank.filter(q=>(s==='All'||q.section===s)&&(c==='All'||q.category===c))}
function refreshStatus(){$('#bank-status').textContent=filteredBank().length+' multiple-choice and select-all questions available.';}
function refreshCats(){const sec=$('#host-section').value;$('#host-category').innerHTML='<option value="All">All categories</option>';[...new Set(bank.filter(q=>sec==='All'||q.section===sec).map(q=>q.category).filter(Boolean))].sort().forEach(x=>$('#host-category').add(new Option(x,x)));refreshStatus();}
$('#host-section').onchange=refreshCats;$('#host-category').onchange=refreshStatus;refreshCats();
function shuffled(a){a=[...a];for(let i=a.length-1;i;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a;}
function download(content,type,filename){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function showImage(selector,q){const el=$(selector);el.replaceChildren();if(q.image&&G.imageAllowed(q.image)){const img=new Image();img.src=q.image;img.alt=q.imageAlt||'';img.className='ic-teaching-image';el.append(img);}}
function editorError(e){$('#editor-error').textContent=e.message||String(e);}
function renderEditor(){
 const list=$('#editor-list');
 list.innerHTML=draftQuestions.map((q,i)=>{
 const choices=['single','multiple','poll','order'].includes(q.type),gradable=['single','multiple'].includes(q.type);
 return '<article class="ic-edit-card" data-i="'+i+'"><div class="ic-edit-head"><strong>Item '+(i+1)+' · '+G.TYPES[q.type]+'</strong><div><button type="button" class="study-button" data-move="-1" '+(!i?'disabled':'')+' aria-label="Move item '+(i+1)+' up">↑</button> <button type="button" class="study-button" data-move="1" '+(i===draftQuestions.length-1?'disabled':'')+' aria-label="Move item '+(i+1)+' down">↓</button> <button type="button" class="ic-remove" data-remove>Remove</button></div></div>'+
 '<label>'+(q.type==='slide'?'Slide title':'Question')+'<textarea data-field="text" maxlength="4000">'+esc(q.text)+'</textarea></label>'+
 (q.type==='multiple'?'<p class="study-help">Check every correct answer. Students must select all correct answers for credit.</p>':'')+
 (q.type==='order'?'<p class="study-help">Enter steps in the correct order. Students will receive a shuffled list.</p>':'')+
 (choices?'<div class="ic-answer-edit">'+q.answers.map((a,k)=>'<label class="ic-answer-row">'+(gradable?'<input type="'+(q.type==='single'?'radio':'checkbox')+'" name="correct-'+i+'" data-correct="'+k+'" '+(q.correct.includes(k)?'checked':'')+' aria-label="Correct answer '+(k+1)+'">':'<span></span>')+'<span>'+(k+1)+'</span><input data-answer="'+k+'" maxlength="500" aria-label="Choice '+(k+1)+'" value="'+esc(a)+'"></label>').join('')+'</div><button class="study-button" data-choice="add" '+(q.answers.length>=6?'disabled':'')+'>+ Choice / step</button> <button class="study-button" data-choice="remove" '+(q.answers.length<=2?'disabled':'')+'>Remove last choice / step</button>':'')+
 (q.type==='typed'?'<label>Accepted answers — one per line<textarea data-accepted maxlength="6000" placeholder="For example:&#10;myocardial infarction&#10;MI">'+esc(q.accepted.join('\n'))+'</textarea></label><p class="study-help">Grading ignores capitalization and extra spaces. Include acceptable abbreviations and spelling variants. Other wording is marked incorrect.</p>':'')+
 '<label>'+(q.type==='slide'?'Slide content':'Explanation / teaching notes')+'<textarea data-field="rationale" maxlength="8000">'+esc(q.rationale)+'</textarea></label>'+
 '<label>Add image<input type="file" data-image accept="image/jpeg,image/png,image/webp"></label><div class="ic-image-preview">'+(q.image?'<img class="ic-teaching-image" src="'+q.image+'" alt="'+esc(q.imageAlt)+'"><button class="study-button" data-clear-image>Remove image</button>':'')+'</div><label>Image description<input data-field="imageAlt" maxlength="400" value="'+esc(q.imageAlt)+'" placeholder="Describe the finding without revealing a quiz answer"></label></article>';
 }).join('');
 list.querySelectorAll('.ic-edit-card').forEach(card=>{
 const i=+card.dataset.i,q=draftQuestions[i];
 card.querySelector('[data-remove]').onclick=()=>{draftQuestions.splice(i,1);renderEditor()};
 card.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>{const j=i+Number(b.dataset.move);[draftQuestions[i],draftQuestions[j]]=[draftQuestions[j],draftQuestions[i]];renderEditor()});
 card.querySelectorAll('[data-field]').forEach(x=>x.oninput=()=>q[x.dataset.field]=x.value);
 card.querySelectorAll('[data-answer]').forEach(x=>x.oninput=()=>q.answers[+x.dataset.answer]=x.value);
 card.querySelectorAll('[data-correct]').forEach(x=>x.onchange=()=>{const n=+x.dataset.correct;q.correct=q.type==='single'?[n]:x.checked?[...q.correct.filter(k=>k!==n),n]:q.correct.filter(k=>k!==n)});
 if(card.querySelector('[data-accepted]'))card.querySelector('[data-accepted]').oninput=e=>q.accepted=e.target.value.split('\n').map(s=>s.trim()).filter(Boolean);
 card.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{if(b.dataset.choice==='add')q.answers.push('');else{q.answers.pop();q.correct=q.correct.filter(k=>k<q.answers.length)}renderEditor()});
 card.querySelector('[data-image]').onchange=async e=>{const f=e.target.files[0];if(!f)return;imageJobs++;$('#editor-error').textContent='Preparing image…';try{q.image=await prepareImage(f);$('#editor-error').textContent='Image ready. Add its description.';}catch(err){editorError(err)}finally{imageJobs--;renderEditor()}};
 const clear=card.querySelector('[data-clear-image]');if(clear)clear.onclick=()=>{q.image='';renderEditor()};
 });
}
async function prepareImage(file){
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024)throw Error('Choose a JPG, PNG, or WebP image smaller than 8 MB.');
 const url=URL.createObjectURL(file);
 try{const img=new Image();img.src=url;await img.decode();if(img.width*img.height>40000000)throw Error('Use an image smaller than 40 megapixels.');let size=1280;while(size>=640){const scale=Math.min(1,size/Math.max(img.width,img.height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);for(const quality of [.85,.7,.55]){const data=canvas.toDataURL('image/jpeg',quality);if(data.length<=450000)return data;}size-=320;}throw Error('This image is too detailed for live sharing. Try a smaller image.');}finally{URL.revokeObjectURL(url);}
}
$('#host-start').onclick=()=>{draftQuestions=shuffled(filteredBank()).slice(0,+$('#host-count').value).map(G.fromBank);renderEditor();view('editor')};
$('#host-blank').onclick=()=>{draftQuestions=[G.newItem('slide')];renderEditor();view('editor')};
$('#editor-back').onclick=()=>view('builder');
$('#builder-resume').onclick=()=>{renderEditor();view('editor')};
$('#editor-add').onclick=()=>{if(draftQuestions.length>=60){editorError('A session can contain up to 60 items.');return;}draftQuestions.push(G.newItem($('#editor-type').value));renderEditor();document.querySelector('.ic-edit-card:last-child textarea')?.focus()};
function checkedDeck(){if(imageJobs)throw Error('Wait for image preparation to finish.');return G.validate(draftQuestions);}
$('#deck-export').onclick=()=>{try{const items=checkedDeck();download(JSON.stringify({format:'hearth-gathering-hall',version:G.VERSION,items}),'application/json','hearth-presentation.json');$('#editor-error').textContent='Presentation downloaded. Keep this file to reopen and teach again.';}catch(e){editorError(e)}};
$('#deck-import').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>G.MAX_BYTES)throw Error('Choose a presentation smaller than 10 MB.');draftQuestions=G.parseDeck(await f.text());$('#import-error').textContent='';renderEditor();view('editor');}catch(err){$('#import-error').textContent=err.message}finally{e.target.value=''}};
function launch(preview){try{const qs=checkedDeck();if(!preview&&typeof Peer!=='function')throw Error('Live-room connection software could not load. Check internet access or use Preview on this device.');cleanup();host=new Host(qs,+$('#host-time').value,$('#host-points').checked,preview);view('host');if(preview)host.question(0);else host.open();}catch(e){editorError(e);view('editor')}}
$('#editor-launch').onclick=()=>launch(false);$('#editor-preview').onclick=()=>launch(true);
class Host{
 constructor(qs,time,points,preview=false){this.qs=qs;this.time=time;this.points=points;this.preview=preview;this.players=new Map();this.i=-1;this.phase='lobby';this.timer=null;this.participants=new Set();this.stats=qs.map(()=>({correct:0,total:0,responses:0}));this.destroyed=false;}
 open(){sub('host','host-status');$('#host-status').textContent='Opening room…';this.pin=String(Math.floor(100000+Math.random()*900000));this.peer=new Peer(PEER_PREFIX+this.pin);this.peer.on('open',()=>{if(!this.destroyed)this.lobby()});this.peer.on('connection',c=>this.connect(c));this.peer.on('error',e=>{if(this.destroyed)return;notice('Connection problem: '+e.type+'. Check your network; return to the editor to open a new room.');if(this.phase==='lobby'){sub('host','host-status');$('#host-status').textContent='The live room could not open. Your presentation is still available in the editor.';}});this.peer.on('disconnected',()=>{if(!this.destroyed)notice('Signaling disconnected. Existing connections may continue, but new students may not be able to join.');});}
 connect(c){c.on('data',d=>this.message(c,d));c.on('close',()=>{const p=this.players.get(c.connectionId);if(p){p.active=false;this.renderPlayers();}});c.on('error',()=>{const p=this.players.get(c.connectionId);if(p)p.active=false;this.renderPlayers();});}
 active(){return [...this.players.values()].filter(p=>p.active&&p.conn.open);}
 message(c,d){
 if(this.destroyed||!d||typeof d!=='object')return;
 if(d.t==='join'){
 if(this.players.has(c.connectionId))return;
 if(d.v!==G.VERSION){c.send({t:'error',message:'Your page uses a different version. Reload this page, then rejoin.'});return;}
 if(this.phase==='end'){c.send({t:'error',message:'This session has finished.'});return;}
 if(this.players.size>=60){c.send({t:'error',message:'This room has reached its 60-join limit. Rejoining uses a new place.'});return;}
 let name=String(d.name||'Learner').trim().slice(0,20)||'Learner',base=name,n=2;const names=new Set([...this.players.values()].map(p=>p.name.toLowerCase()));while(names.has(name.toLowerCase()))name=base.slice(0,16)+' '+n++;
 const p={conn:c,name,character:character(d.character).id,score:0,correct:0,choice:null,ms:0,active:true};this.players.set(c.connectionId,p);c.send({t:'welcome',v:G.VERSION,name,character:p.character});this.renderPlayers();tone('join');
 if(this.phase==='question'){this.participants.add(c.connectionId);this.sendQuestion(p);}else if(this.phase==='reveal')c.send({t:'waiting',message:'You joined between questions. The next item will appear here.'});
 }else if(d.t==='a'&&this.phase==='question'&&d.i===this.i){
 const p=this.players.get(c.connectionId),q=this.qs[this.i];if(!p||p.choice!==null||!this.participants.has(c.connectionId))return;
 if(this.time&&Date.now()>=this.deadline){this.reveal();return;}
 if(!G.validResponse(q,d.c))return;
 p.choice=Array.isArray(d.c)?[...d.c]:d.c;p.ms=Date.now()-this.started;c.send({t:'ack',i:this.i});$('#hq-answered').textContent=[...this.players.values()].filter(x=>x.choice!==null).length;
 }
 }
 broadcast(d){this.active().forEach(p=>p.conn.send(d));}
 lobby(){sub('host','host-lobby');$('#host-pin').textContent=this.pin;$('#host-qr').replaceChildren();if(typeof qrcode==='function'){const qr=qrcode(0,'M');qr.addData(location.href.split('?')[0].split('#')[0]+'?join='+this.pin);qr.make();$('#host-qr').innerHTML=qr.createSvgTag({cellSize:3,margin:2});}this.renderPlayers();$('#host-begin').disabled=false;$('#host-begin').onclick=()=>this.question(0);}
 renderPlayers(){$('#host-players').innerHTML=this.active().map(p=>'<span>'+character(p.character).icon+' '+esc(p.name)+' <button type="button" class="ic-remove" data-kick="'+esc(p.conn.connectionId)+'" aria-label="Remove '+esc(p.name)+'">×</button></span>').join('');$('#host-count-num').textContent=this.active().length;$('#host-players').querySelectorAll('[data-kick]').forEach(b=>b.onclick=()=>{const p=this.players.get(b.dataset.kick);if(p){p.conn.send({t:'error',message:'The instructor removed you from this room.'});p.active=false;p.conn.close();this.renderPlayers();}});}
 sendQuestion(p){const q=this.qs[this.i];p.order=q.type==='order'?shuffled(q.answers.map((_,i)=>i)):null;const publicQ=G.publicItem(q);if(p.order)publicQ.answers=p.order.map(i=>q.answers[i]);p.conn.send({t:'q',i:this.i,n:this.qs.length,q:publicQ,time:q.type==='slide'?0:this.time,remaining:q.type==='slide'||!this.time?0:Math.max(0,Math.ceil((this.deadline-Date.now())/1000))});}
 question(i){
 clearInterval(this.timer);this.i=i;this.phase='question';this.participants=new Set(this.active().map(p=>p.conn.connectionId));for(const p of this.players.values()){p.choice=null;p.ms=0;p.order=null;}
 const q=this.qs[i];this.started=Date.now();this.deadline=this.started+this.time*1000;this.active().forEach(p=>this.sendQuestion(p));sub('host','host-question');$('#hq-progress').textContent=(this.preview?'Preview · ':'')+'Item '+(i+1)+' of '+this.qs.length+' · '+G.TYPES[q.type];$('#hq-text').textContent=q.text;showImage('#hq-image',q);$('#hq-slide').textContent=q.type==='slide'?q.rationale:'';$('#hq-answered').textContent='0';$('#hq-answered').parentElement.hidden=q.type==='slide';$('#hq-options').innerHTML=['single','multiple','poll'].includes(q.type)?q.answers.map((a,k)=>'<div class="ic-option">'+String.fromCharCode(65+k)+'. '+esc(a)+'</div>').join(''):q.type==='typed'?'<p>Students type their answer on their device.</p>':q.type==='order'?'<p>Students arrange the steps on their device.</p>':'';
 $('#hq-reveal').textContent=q.type==='slide'?(i===this.qs.length-1?'Finish Session':'Next Item'):'Reveal Responses';$('#hq-reveal').onclick=()=>q.type==='slide'?this.advance():this.reveal();
 if(this.time&&q.type!=='slide'&&!this.preview){let previous=-1;const tick=()=>{const left=Math.max(0,Math.ceil((this.deadline-Date.now())/1000));$('#hq-timer').textContent=left+' sec';if(left!==previous&&left<=5&&left>0)tone('tick');previous=left;if(!left)this.reveal();};tick();this.timer=setInterval(tick,200);}else $('#hq-timer').textContent='Instructor paced';
 }
 advance(){clearInterval(this.timer);if(this.i===this.qs.length-1)this.end();else this.question(this.i+1);}
 reveal(){
 if(this.phase!=='question'||this.qs[this.i].type==='slide')return;this.phase='reveal';clearInterval(this.timer);const q=this.qs[this.i],ps=[...this.participants].map(id=>this.players.get(id)).filter(Boolean);let correct=0,responses=0;
 const counts=q.answers.map(()=>0),typed=new Map();
 ps.forEach(p=>{
 let value=p.choice;if(q.type==='order'&&Array.isArray(value))value=value.map(n=>p.order[n]);
 const ok=q.type==='poll'?null:G.grade(q,value);if(p.choice!==null){responses++;if(q.type==='multiple')p.choice.forEach(n=>counts[n]++);else if(['single','poll'].includes(q.type))counts[p.choice]++;else if(q.type==='typed'){const text=String(p.choice);typed.set(text,(typed.get(text)||0)+1);}}
 if(ok){correct++;p.correct++;p.score+=this.points?(this.time?Math.max(500,1000-Math.floor(p.ms/(this.time*1000)*500)):1000):1;}
 if(p.active&&p.conn.open)p.conn.send({t:'reveal',ok,answered:p.choice!==null,answer:G.answerText(q),rationale:q.rationale,score:p.score,points:this.points,poll:q.type==='poll'});
 });
 this.stats[this.i]={correct,total:ps.length,responses};sub('host','host-reveal');$('#hr-progress').textContent='Item '+(this.i+1)+' · '+(q.type==='poll'?'Poll results':correct+' / '+ps.length+' correct')+' · '+responses+' responses';$('#hr-text').textContent=q.text;showImage('#hr-image',q);
 $('#hr-options').innerHTML=['single','multiple','poll'].includes(q.type)?q.answers.map((a,k)=>'<div class="ic-option '+(q.type==='poll'?'':q.correct.includes(k)?'correct':'wrong')+'">'+String.fromCharCode(65+k)+'. '+esc(a)+' <span class="count">'+counts[k]+'</span></div>').join(''):q.type==='order'?'<ol>'+q.answers.map(a=>'<li>'+esc(a)+'</li>').join(''):'<div><strong>Accepted answers:</strong> '+esc(G.answerText(q))+'<h3>Class responses</h3>'+[...typed.entries()].map(([a,n])=>'<p>'+esc(a)+' <strong>× '+n+'</strong></p>').join('')+'</div>';
 $('#hr-rationale').textContent=q.rationale||'Discuss these responses with your class.';$('#hr-next').textContent=this.i===this.qs.length-1?'Finish Session':'Next Item';$('#hr-next').onclick=()=>this.advance();tone('join');
 }
 end(){
 clearInterval(this.timer);this.phase='end';const ps=[...this.players.values()],questions=this.qs.filter(q=>!['slide','poll'].includes(q.type)).length;this.active().forEach(p=>p.conn.send({t:'end',score:p.score,correct:p.correct,questions,points:this.points}));sub('host','host-end');
 const total=this.stats.reduce((a,s,i)=>a+(!['slide','poll'].includes(this.qs[i].type)?s.total:0),0),correct=this.stats.reduce((a,s)=>a+s.correct,0);
 $('#host-summary').innerHTML='<p><strong>'+ps.length+'</strong> learners · <strong>'+questions+'</strong> scored questions · '+(total?'<strong>'+Math.round(correct/total*100)+'%</strong> class accuracy':'No scored responses')+'</p>'+this.stats.map((s,i)=>'<p>Item '+(i+1)+' · '+G.TYPES[this.qs[i].type]+': '+(this.qs[i].type==='slide'?'Teaching slide':this.qs[i].type==='poll'?s.responses+' responses':(s.total?Math.round(s.correct/s.total*100):0)+'% correct')+'</p>').join('');
 $('#host-leaderboard').innerHTML=this.points?'<h3>Class leaderboard</h3><ol>'+[...ps].sort((a,b)=>b.score-a.score).map(p=>'<li>'+character(p.character).icon+' '+esc(p.name)+' — '+p.score+' points</li>').join('')+'</ol>':'';
 $('#download-results').onclick=()=>this.csv();
 }
 csv(){const rows=[['Nickname','Character','Correct answers',this.points?'Points':'Score','Connected at end'],...[...this.players.values()].map(p=>[p.name,character(p.character).name,p.correct,p.score,p.active?'Yes':'No'])];download(rows.map(r=>r.map(G.csvCell).join(',')).join('\r\n'),'text/csv;charset=utf-8','hearth-live-results.csv');}
 destroy(){this.destroyed=true;clearInterval(this.timer);this.broadcast({t:'closed'});if(this.peer)this.peer.destroy();}
}
function join(){
 if(player.pending)return;const pin=$('#join-pin').value.replace(/\D/g,''),name=$('#join-name').value.trim();$('#join-error').textContent='';if(pin.length!==6||!name){$('#join-error').textContent='Enter a six-digit code and your nickname.';return;}
 if(typeof Peer!=='function'){$('#join-error').textContent='Connection software could not load. Check your internet connection and reload.';return;}
 cleanup();player.name=name;player.character=$('input[name="character"]:checked').value;player.pending=true;$('#join-btn').disabled=true;tone('join');
 const peer=new Peer();player.peer=peer;let timeout=setTimeout(()=>fail('Could not reach the room. Check the code and your network.'),15000);
 function fail(message){if(player.peer!==peer)return;clearTimeout(timeout);cleanup();$('#join-btn').disabled=false;$('#join-error').textContent=message;view('home');}
 peer.on('open',()=>{if(player.peer!==peer)return;const c=peer.connect(PEER_PREFIX+pin,{reliable:true});player.conn=c;c.on('open',()=>c.send({t:'join',v:G.VERSION,name,character:player.character}));c.on('data',d=>{if(player.peer!==peer)return;if(d?.t==='welcome'&&d.v!==G.VERSION){fail('The instructor is using an older page. Ask them to reload and open a new room.');return;}if(d?.t==='welcome'){clearTimeout(timeout);player.pending=false;$('#join-btn').disabled=false;}if(d?.t==='error'){fail(d.message);return;}playerMsg(d);});c.on('close',()=>{if(player.peer!==peer)return;clearTimeout(timeout);player.pending=false;$('#join-btn').disabled=false;view('player');sub('player','player-dropped');});c.on('error',()=>fail('The connection was interrupted. Rejoin using the room code.'));});
 peer.on('error',e=>fail(e.type==='peer-unavailable'?'Session not found. Check the code.':'Could not connect. Check your internet connection.'));
}
$('#join-btn').onclick=join;$('#join-name').onkeydown=e=>{if(e.key==='Enter')join()};
function submit(value){if(player.submitted||!player.conn?.open)return;player.conn.send({t:'a',i:player.index,c:value});player.submitted=true;$('#pq-options').querySelectorAll('button,input').forEach(e=>e.disabled=true);notice('Sending answer…');}
function renderPlayerQuestion(q){
 const el=$('#pq-options');el.replaceChildren();let selected=new Set(),order=q.answers.map((_,i)=>i);
 function button(text,action){const b=document.createElement('button');b.className='ic-option player';b.type='button';b.textContent=text;b.onclick=action;return b;}
 if(['single','poll'].includes(q.type))q.answers.forEach((a,k)=>el.append(button(String.fromCharCode(65+k)+'. '+a,()=>submit(k))));
 else if(q.type==='multiple'){
 const help=document.createElement('p');help.textContent='Select all that apply, then submit.';el.append(help);
 q.answers.forEach((a,k)=>{const b=button(a,()=>{if(selected.has(k))selected.delete(k);else selected.add(k);b.setAttribute('aria-pressed',String(selected.has(k)));send.disabled=!selected.size});b.setAttribute('aria-pressed','false');el.append(b)});
 const send=button('Submit selected answers',()=>submit([...selected]));send.disabled=true;el.append(send);
 }else if(q.type==='typed'){
 const label=document.createElement('label');label.textContent='Your answer';const input=document.createElement('input');input.maxLength=300;input.autocomplete='off';input.setAttribute('aria-label','Your answer');label.append(input);el.append(label);const send=button('Submit answer',()=>{if(input.value.trim())submit(input.value.trim())});send.disabled=true;input.oninput=()=>send.disabled=!input.value.trim();input.onkeydown=e=>{if(e.key==='Enter'&&input.value.trim())send.click()};el.append(send);
 }else if(q.type==='order'){
 function draw(){el.replaceChildren();const help=document.createElement('p');help.textContent='Move steps into order, then submit.';el.append(help);order.forEach((n,i)=>{const row=document.createElement('div');row.className='ic-order-row';const text=document.createElement('span');text.textContent=(i+1)+'. '+q.answers[n];row.append(text);[-1,1].forEach(delta=>{const b=button(delta<0?'↑':'↓',()=>{const j=i+delta;[order[i],order[j]]=[order[j],order[i]];draw();});b.setAttribute('aria-label','Move '+q.answers[n]+(delta<0?' up':' down'));b.disabled=i+delta<0||i+delta>=order.length;row.append(b)});el.append(row)});el.append(button('Submit order',()=>submit([...order])));}
 draw();
 }
}
function playerMsg(d){
 if(!d||typeof d!=='object')return;view('player');
 if(d.t==='welcome'){player.name=d.name;$('#player-name').textContent=character(d.character).icon+' '+d.name;$('#player-wait p').textContent='Waiting for the instructor…';sub('player','player-wait');}
 else if(d.t==='waiting'){sub('player','player-wait');$('#player-wait p').textContent=d.message;}
 else if(d.t==='q'){
 player.index=d.i;player.submitted=false;notice('');sub('player','player-question');$('#pq-progress').textContent='Item '+(d.i+1)+' of '+d.n+' · '+G.TYPES[d.q.type];$('#pq-text').textContent=d.q.text;showImage('#pq-image',d.q);$('#pq-slide').textContent=d.q.type==='slide'?d.q.rationale:'';$('#pq-timer').textContent=d.q.type==='slide'?'Teaching slide · follow along':d.time?'Answer within the instructor’s timer ('+d.remaining+' sec remaining when received).':'Instructor paced';renderPlayerQuestion(d.q);
 }else if(d.t==='ack'&&d.i===player.index){notice('');sub('player','player-locked');}
 else if(d.t==='reveal'){
 notice('');sub('player','player-result');$('#pr-verdict').textContent=d.poll?'Response recorded':!d.answered?'No answer submitted':d.ok?'Correct ✓':'Review this one';$('#pr-detail').textContent=d.points?'Current score: '+d.score:'';$('#pr-answer').textContent=d.answer?'Answer: '+d.answer:'';$('#pr-rationale').textContent=d.rationale||'Review this item with your instructor.';tone(d.poll?'join':d.ok?'correct':'wrong');
 }else if(d.t==='end'){sub('player','player-end');$('#pe-score').textContent='Thanks, '+player.name+'. '+d.correct+' correct answers'+(d.points?' · '+d.score+' points':'')+'.';}
 else if(d.t==='closed'){sub('player','player-dropped');}
}
const params=new URLSearchParams(location.search);if(params.get('join')){$('#join-pin').value=params.get('join').replace(/\D/g,'').slice(0,6);$('#join-name').focus();}
