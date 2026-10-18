/* Browser-side creation lock only. GitHub authentication still controls publishing. */
(function(){
'use strict';
const config=window.INSTRUCTOR_ACCESS_CONFIG||{},valid=config.version===1&&config.configured===true&&typeof config.salt==='string'&&typeof config.verifier==='string'&&config.iterations===210000;
let until=0,pending=null;
const dialog=document.createElement('dialog');dialog.id='instructor-access-dialog';dialog.innerHTML='<form id="access-form"><h2>Unlock Question Workshop</h2><p>Enter your instructor password to open the workshop.</p><label>Instructor password<input id="access-password" type="password" autocomplete="current-password" required></label><p id="access-status" role="status"></p><div class="access-actions"><button type="submit" class="study-button">Unlock workshop</button><button type="button" class="study-button" id="access-cancel">Cancel</button></div></form><p class="access-note">This is a browser-side creation lock, not an authenticated administrator account. Publishing changes still requires GitHub sign-in.</p><a href="instructor-access.html">Workshop password settings →</a>';document.body.append(dialog);
const form=dialog.querySelector('form'),input=dialog.querySelector('input'),status=dialog.querySelector('#access-status');
function unlocked(){return valid&&Date.now()<until;}
function open(callback){if(unlocked()){callback?.();return;}pending=callback||null;status.textContent=valid?'':'A password has not been configured. Use Creation-lock settings to generate and publish the configuration file.';form.querySelector('button[type=submit]').disabled=!valid;input.disabled=!valid;if(!dialog.open)dialog.showModal();if(valid)input.focus();}
function lock(){until=0;pending=null;window.dispatchEvent(new Event('instructor-access-locked'));}
const decode=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
form.onsubmit=async ev=>{ev.preventDefault();const button=form.querySelector('button[type=submit]');button.disabled=true;try{const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(input.value),'PBKDF2',false,['deriveBits']);const actual=new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:decode(config.salt),iterations:config.iterations},key,256)),expected=decode(config.verifier);let mismatch=actual.length^expected.length;for(let i=0;i<actual.length;i++)mismatch|=actual[i]^(expected[i]||0);if(mismatch){status.textContent='Password not recognized.';input.value='';input.focus();return;}until=Date.now()+30*60*1000;input.value='';dialog.close();const run=pending;pending=null;window.dispatchEvent(new Event('instructor-access-unlocked'));run?.();}catch{status.textContent='Unable to verify the password. Use a current browser over HTTPS.';}finally{button.disabled=!valid;}};
function cancel(){pending=null;input.value='';dialog.close();}
dialog.querySelector('#access-cancel').onclick=cancel;dialog.addEventListener('cancel',()=>{pending=null;input.value='';});
setInterval(()=>{if(until&&Date.now()>=until)lock();},10000);
window.InstructorAccess={open,lock,unlocked,configured:valid};
})();
