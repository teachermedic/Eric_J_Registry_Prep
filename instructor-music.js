/* Optional instructor-only question music. The audio is decoded once, on demand. */
(function(){
'use strict';
const checkbox=document.querySelector('#ic-music'),volume=document.querySelector('#ic-music-volume'),mute=document.querySelector('#ic-music-mute'),status=document.querySelector('#ic-music-status');
class QuizMusic{
 constructor(){this.context=null;this.gain=null;this.source=null;this.buffer=null;this.loading=null;this.enabled=false;this.muted=false;this.question=false;this.level=.25;this.epoch=0;this.lastError='';this.retiring=new Set();}
 async unlock(){
  if(!this.context){const C=window.AudioContext||window.webkitAudioContext;if(!C)throw Error('Quiz music is unavailable in this browser.');this.context=new C();this.gain=this.context.createGain();this.gain.gain.value=0;this.gain.connect(this.context.destination);}
  await this.context.resume();if(this.context.state!=='running')throw Error('Use the music switch again to allow audio in this browser.');
 }
 async load(){if(this.buffer)return this.buffer;if(!this.loading)this.loading=fetch('audio/bards-tale-loop.mp3').then(r=>{if(!r.ok)throw Error('Quiz music could not load. Check your connection and try the music switch again.');return r.arrayBuffer();}).then(b=>this.context.decodeAudioData(b)).then(b=>{this.buffer=b;return b;}).catch(e=>{this.loading=null;throw e;});return this.loading;}
 levelTo(value){this.level=Math.max(0,Math.min(1,value));if(this.gain)this.fade(this.source&&!this.muted?this.level:0,.08);}
 fade(value,seconds){if(!this.gain)return;const now=this.context.currentTime,g=this.gain.gain;g.cancelScheduledValues(now);g.setValueAtTime(g.value,now);g.linearRampToValueAtTime(value,now+seconds);}
 stop(immediate=false){this.epoch++;this.fade(0,immediate?0:.3);if(immediate){for(const node of this.retiring){try{node.stop();}catch{}}this.retiring.clear();}if(!this.source)return;const old=this.source;this.source=null;this.retiring.add(old);old.onended=()=>{this.retiring.delete(old);old.disconnect();};try{old.stop(this.context.currentTime+(immediate?0:.32));}catch{} }
 async sync(fromGesture=false){
  const ticket=++this.epoch;if(!this.enabled||!this.question||document.hidden){this.stop();return;}
  if(this.source){this.fade(this.muted?0:this.level,.12);return;}
  try{if(fromGesture||!this.context)await this.unlock();const buffer=await this.load();if(ticket!==this.epoch||!this.enabled||!this.question||document.hidden)return;
   if(this.context.state!=='running'){status.textContent='Use the music switch to allow audio in this browser.';return;}
   for(const node of this.retiring){try{node.stop();}catch{}}this.retiring.clear();const source=this.context.createBufferSource();source.buffer=buffer;source.loop=true;source.connect(this.gain);this.source=source;this.gain.gain.setValueAtTime(0,this.context.currentTime);source.start();this.fade(this.muted?0:this.level,.3);status.textContent='';
  }catch(err){if(ticket===this.epoch){this.lastError=err.message;status.textContent=err.message;}}
 }
 async enable(value){this.enabled=value;this.lastError='';if(!value){this.stop(true);status.textContent='';return;}try{await this.unlock();await this.sync();}catch(err){status.textContent=err.message;} }
 setQuestion(value){this.question=value;this.sync();}
 reset(){this.question=false;this.stop(true);}
}
const music=new QuizMusic();
checkbox.onchange=()=>music.enable(checkbox.checked);
volume.oninput=()=>{music.levelTo(Number(volume.value)/100);document.querySelector('#ic-music-percent').textContent=volume.value+'%';};
mute.onclick=()=>{music.muted=!music.muted;mute.setAttribute('aria-pressed',String(music.muted));mute.textContent=music.muted?'Unmute music':'Mute music';music.levelTo(music.level);};
document.addEventListener('visibilitychange',()=>{if(document.hidden)music.stop(true);else music.sync();});
window.addEventListener('pagehide',()=>music.reset());
window.InstructorMusic=music;
})();
