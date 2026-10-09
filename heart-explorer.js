/* Adapted from the supplied Heart Deep Zoom notebook; original drawing primitives retained.
   Five conceptual depths with independent sketch magnification; no external dependencies. */
(() => {
'use strict';
const $=id=>document.getElementById(id);
let dark=false;try{dark=localStorage.getItem('ems_theme')==='dark'}catch{}
document.body.classList.toggle('dark-mode',dark);
const theme=$('theme-toggle');if(theme){theme.hidden=false;theme.onclick=()=>{dark=!dark;document.body.classList.toggle('dark-mode',dark);try{localStorage.setItem('ems_theme',dark?'dark':'light')}catch{}if(c&&ctx)render();};}
const c=$('heart-canvas');if(!c){if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});return;}
const ctx=c.getContext('2d');if(!ctx)return;
const stages=[{"id": "thorax", "title": "The heart in the thorax", "structures": [{"id": "heart", "title": "Heart", "copy": "The muscular pump within the pericardial sac.", "x": 22, "y": 20, "r": 65}, {"id": "lungs", "title": "Lungs", "copy": "The lungs exchange gases; the heart moves blood through their circulation.", "x": -160, "y": 0, "r": 80}, {"id": "sternum", "title": "Sternum", "copy": "The breastbone lies anterior to the heart. The translucent ribs and sternum show the overlying chest wall.", "x": 0, "y": -165, "r": 30}]}, {"id": "heart", "title": "Inside the heart", "structures": [{"id": "right", "title": "Right heart", "copy": "Body \u2192 right atrium \u2192 right ventricle \u2192 lungs. The blue color represents relatively deoxygenated blood, not blue tissue.", "x": -95, "y": -40, "r": 85}, {"id": "left", "title": "Left heart", "copy": "Lungs \u2192 left atrium \u2192 left ventricle \u2192 body. The red color represents relatively oxygenated blood.", "x": 85, "y": -40, "r": 85}, {"id": "wall", "title": "Myocardium", "copy": "The muscular middle layer of the heart wall. The left ventricular wall is drawn thicker than the right.", "x": 160, "y": 80, "r": 48}]}, {"id": "tissue", "title": "Cardiac muscle tissue", "structures": [{"id": "disc", "title": "Intercalated disc", "copy": "A junction between cells, combining mechanical attachment with electrical coupling.", "x": -120, "y": 0, "r": 40}, {"id": "stripes", "title": "Striations", "copy": "Repeating sarcomeres produce the striped appearance. Actin and myosin interact within these units.", "x": 170, "y": 0, "r": 50}, {"id": "nuclei", "title": "Central nuclei", "copy": "Many cardiomyocytes have one central nucleus; some have two. These sketches show one per cell.", "x": 0, "y": 0, "r": 30}]}, {"id": "cell", "title": "A single cardiomyocyte", "structures": [{"id": "mitochondria", "title": "Mitochondria", "copy": "Support ATP production. ATP is needed for cross-bridge cycling and ion transport, including calcium reuptake.", "x": -172, "y": -65, "r": 45}, {"id": "nucleus", "title": "Nucleus", "copy": "Holds DNA used to produce RNA and regulate protein expression. Select \u201cGo deeper\u201d to inspect it.", "x": 0, "y": 0, "r": 62}, {"id": "sr", "title": "Sarcoplasmic reticulum", "copy": "A specialized membrane network that stores and releases calcium. It is drawn in green around the myofibrils.", "x": 140, "y": 70, "r": 45}]}, {"id": "nucleus", "title": "Inside the nucleus", "structures": [{"id": "nucleolus", "title": "Nucleolus", "copy": "Produces ribosomal RNA and supports assembly of ribosomal subunits.", "x": 20, "y": 15, "r": 65}, {"id": "chromatin", "title": "Chromatin", "copy": "DNA associated with proteins. The threads are an illustrative symbol, not a literal DNA map.", "x": -120, "y": -75, "r": 65}, {"id": "pores", "title": "Nuclear pores", "copy": "Regulated passageways across the double-membrane nuclear envelope.", "x": 258, "y": 0, "r": 24}]}];
let W=0,H=0,ink='#234c3c',scale=1,magnify=1,panX=0,panY=0,index=0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function ellipse(x,y,rx,ry,fill,stroke='',lw=2){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.lineWidth=lw;ctx.strokeStyle=stroke;ctx.stroke()}}
function line(points,color,width=2){ctx.beginPath();ctx.moveTo(...points[0]);for(let i=1;i<points.length;i++)ctx.lineTo(...points[i]);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
function label(txt,x,y,size=17,color=ink){ctx.fillStyle=color;ctx.font=`600 ${size}px Georgia`;ctx.textAlign='center';ctx.fillText(txt,x,y)}
function heart(x,y,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(-.15);ctx.beginPath();ctx.moveTo(0,118);ctx.bezierCurveTo(-40,84,-115,9,-72,-48);ctx.bezierCurveTo(-40,-90,-3,-59,0,-38);ctx.bezierCurveTo(38,-95,99,-77,91,-17);ctx.bezierCurveTo(88,32,29,96,0,118);ctx.fillStyle='#d64e66';ctx.fill();ctx.lineWidth=6;ctx.strokeStyle='#ffac9d';ctx.stroke();line([[-25,-55],[-27,-114],[-5,-138]],'#80b7d5',22);line([[30,-53],[45,-126],[72,-146]],'#f5a16c',23);line([[5,-39],[32,-110],[58,-122]],'#c83c55',17);line([[-45,10],[-19,27],[-5,80]],'#ffb7a1',5);line([[47,-4],[21,30],[13,79]],'#ffb7a1',4);ctx.restore()}
function nucleus(){ellipse(0,0,270,235,'#514a9c','#c6b6ff',9);ellipse(0,0,252,216,'#635cb0','#a09cf1',2);for(let i=0;i<29;i++){let a=i*2.399,r=65+((i*37)%140),x=Math.cos(a)*r,y=Math.sin(a)*r*.8;ctx.beginPath();ctx.moveTo(x-25,y-5);ctx.bezierCurveTo(x+30,y-28,x-35,y+35,x+27,y+12);ctx.strokeStyle=i%2?'#a9a1ed':'#e5a7d4';ctx.lineWidth=4;ctx.stroke()}ellipse(20,15,64,58,'#b978b9','#f2c0e8',5);for(let i=0;i<20;i++){let a=i*Math.PI/10;ellipse(Math.cos(a)*265,Math.sin(a)*232,6,6,'#f4c88f')}label('NUCLEOLUS',24,105,17,ink);label('CHROMATIN (DNA + PROTEINS)',0,310,17,ink)}

function thorax(){
 ellipse(-155,-8,120,195,'#6b96a57a','#567f8f',3);ellipse(158,-8,112,195,'#6b96a57a','#567f8f',3);
 heart(28,15,.9);
 for(let side of [-1,1])for(let i=0;i<5;i++){const y=-150+i*55;ctx.beginPath();ctx.moveTo(side*22,y-10);ctx.bezierCurveTo(side*150,y-55,side*280,y+10,side*190,y+48);ctx.strokeStyle='#a1886590';ctx.lineWidth=8;ctx.stroke()}
 line([[0,-208],[0,103]],'#b3987490',13);
 ctx.beginPath();ctx.moveTo(-272,204);ctx.quadraticCurveTo(0,150,272,204);ctx.strokeStyle=ink;ctx.lineWidth=3;ctx.stroke();
 label('RIGHT LUNG',-165,249,17);label('LEFT LUNG',166,249,17);label('DIAPHRAGM',0,280,16);label('Patient right',-192,-249,15);label('Patient left',188,-249,15);
}
function chamber(){
 // Frontal conceptual cutaway; patient right is on the viewer’s left.
 ctx.beginPath();ctx.moveTo(-163,-94);ctx.bezierCurveTo(-199,-20,-150,155,38,233);ctx.bezierCurveTo(185,150,198,-54,125,-120);ctx.quadraticCurveTo(0,-168,-163,-94);ctx.fillStyle='#b67967';ctx.fill();ctx.strokeStyle=ink;ctx.lineWidth=3;ctx.stroke();
 ellipse(-91,-75,56,53,'#60899e','#e5d1b1',3);ellipse(77,-76,47,45,'#b95b58','#e5d1b1',3);
 ctx.beginPath();ctx.moveTo(-133,2);ctx.quadraticCurveTo(-113,118,4,174);ctx.quadraticCurveTo(-14,82,-32,2);ctx.closePath();ctx.fillStyle='#60899e';ctx.fill();
 ctx.beginPath();ctx.moveTo(21,2);ctx.quadraticCurveTo(39,134,48,179);ctx.quadraticCurveTo(131,130,129,2);ctx.closePath();ctx.fillStyle='#b95b58';ctx.fill();
 line([[-121,-4],[-93,7],[-66,-4]],'#f9e8c8',5);line([[48,-4],[80,8],[108,-4]],'#f9e8c8',5);
 line([[-91,-127],[-91,-212]],'#60899e',19);line([[-56,35],[-35,-124],[-20,-221]],'#60899e',14);line([[82,-123],[82,-211]],'#b95b58',15);line([[84,87],[17,-162],[24,-235],[70,-242]],'#b95b58',12);
 label('RA',-91,-65,26,'#fff9ec');label('LA',77,-65,26,'#fff9ec');label('RV',-71,67,26,'#fff9ec');label('LV',79,88,26,'#fff9ec');
 label('From body',-160,-242,16);label('To lungs',-23,-275,16);label('From lungs',168,-214,16);label('To body',140,-268,16);
 line([[-91,-183],[-91,-149]],'#fff9ec',3);line([[-98,-156],[-91,-149],[-84,-156]],'#fff9ec',3);
 line([[82,-179],[82,-146]],'#fff9ec',3);line([[75,-153],[82,-146],[89,-153]],'#fff9ec',3);
 label('RA / LA = atria · RV / LV = ventricles',0,276,17);
}
function tissue(){
 for(let row=-1;row<=1;row++){ctx.save();ctx.translate(0,row*125);ctx.beginPath();ctx.moveTo(-315,-36);ctx.lineTo(110,-36);ctx.lineTo(220,-85);ctx.lineTo(260,-45);ctx.lineTo(155,0);ctx.lineTo(300,40);ctx.lineTo(270,80);ctx.lineTo(110,35);ctx.lineTo(-315,35);ctx.closePath();ctx.fillStyle='#b8757388';ctx.fill();ctx.strokeStyle='#925954';ctx.lineWidth=3;ctx.stroke();
 for(let x=-290;x<108;x+=17)line([[x,-31],[x,30]],'#925954',2);
 for(let x of [-120,105]){line([[x,-37],[x+4,-12],[x,6],[x+4,37]],'#6a5838',5)}
 ellipse(-221,0,19,12,'#8f83a2','#d7c2dd',2);ellipse(0,0,19,12,'#8f83a2','#d7c2dd',2);ellipse(201,46,17,10,'#8f83a2','#d7c2dd',2);ctx.restore();}
 label('Branching cells · striations · cell junctions',0,275,18);
}
function cell(){
 ellipse(0,0,292,117,'#b9767366','#925954',4);
 for(let y of [-77,-40,42,80])for(let x=-235;x<248;x+=21)line([[x,y-9],[x,y+9]],'#a3615b',3);
 for(let y of [-90,91]){line([[-220,y],[-155,y-10],[-80,y],[0,y-10],[80,y],[160,y-10],[222,y]],'#548477',3)}
 for(let x of [-173,-78,84,178]){ellipse(x,-64,24,13,'#c58b4d','#725333',2);line([[x-14,-67],[x-7,-60],[x,-68],[x+7,-60],[x+14,-67]],'#725333',2);}
 ellipse(0,0,65,45,'#8f83a2','#dac3da',4);ellipse(8,-5,17,14,'#b7a1ba');
 label('NUCLEUS',0,174,18);label('MITOCHONDRIA',-155,-156,17);label('CALCIUM STORAGE NETWORK',124,219,16);
}

const drawings=[thorax,chamber,tissue,cell,nucleus];
function resize(){const box=c.parentElement.getBoundingClientRect();W=box.width;H=box.height;const dpr=Math.min(devicePixelRatio||1,2);c.width=W*dpr;c.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);render();}
function render(){ink=dark?'#dce9dc':'#234c3c';scale=Math.min(W/720,H/660)*magnify;ctx.clearRect(0,0,W,H);ctx.save();ctx.translate(W/2+panX,H/2+panY);ctx.scale(scale,scale);drawings[index]();ctx.restore();$('zoom-value').textContent=Math.round(magnify*100)+'%';$('zoom-in').disabled=magnify>=2.5;$('zoom-out').disabled=magnify<=.8;}
function changeZoom(f){magnify=clamp(magnify*f,.8,2.5);render()}
function reset(){magnify=1;panX=panY=0;render()}
let currentLevel='emt';const requested=new URLSearchParams(location.search).get('level');if(['emt','aemt','paramedic'].includes(requested))currentLevel=requested;
$('learning-level').value=currentLevel;
function learning(){document.querySelectorAll('[data-learning-level]').forEach(n=>{n.hidden=n.dataset.learningLevel!==currentLevel});for(const id of ['energy-trail','calcium-trail'])$(id).href=$(id).getAttribute('href').split('#')[0]+'#step=1&level='+currentLevel;}
$('learning-level').onchange=()=>{currentLevel=$('learning-level').value;learning();const u=new URL(location.href);u.searchParams.set('level',currentLevel);history.replaceState(null,'',u);};
function inspect(s){$('structure-title').textContent=s.title;$('structure-copy').textContent=s.copy;document.querySelectorAll('[data-structure]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.structure===s.id)));}
function selectStage(i){index=clamp(i,0,4);document.querySelectorAll('[data-stage]').forEach(n=>n.hidden=n.dataset.stage!==stages[index].id);document.querySelectorAll('[data-stage-link]').forEach(a=>{if(a.dataset.stageLink===stages[index].id)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')});$('stage-count').textContent='STAGE '+(index+1)+' / 5';$('previous-stage').disabled=index===0;$('next-stage').disabled=index===4;$('next-stage').textContent=index===4?'Final stage':'Go deeper →';const buttons=$('structure-buttons');buttons.replaceChildren();stages[index].structures.forEach(s=>{const b=document.createElement('button');b.type='button';b.textContent=s.title;b.dataset.structure=s.id;b.onclick=()=>inspect(s);buttons.append(b)});inspect(stages[index].structures[0]);reset();learning();c.setAttribute('aria-label',stages[index].title+' concept sketch. Inspect structures using the buttons below.');}
function navigate(i){i=clamp(i,0,4);const id=stages[i].id;if(location.hash!=='#'+id)history.pushState(null,'','#'+id);selectStage(i);}
function fromHash(){const i=stages.findIndex(s=>s.id===location.hash.slice(1));selectStage(i<0?index:i);}
document.querySelectorAll('[data-stage-link]').forEach(a=>a.onclick=e=>{e.preventDefault();navigate(stages.findIndex(s=>s.id===a.dataset.stageLink))});
$('previous-stage').onclick=()=>navigate(index-1);$('next-stage').onclick=()=>navigate(index+1);$('zoom-in').onclick=()=>changeZoom(1.2);$('zoom-out').onclick=()=>changeZoom(1/1.2);$('reset-view').onclick=reset;
// Normal page scrolling is preserved. Wheel zoom requires Ctrl; touch magnification uses a two-finger pinch.
c.addEventListener('wheel',e=>{if(!e.ctrlKey)return;e.preventDefault();changeZoom(Math.exp(-e.deltaY*.002))},{passive:false});
const pointers=new Map();let lastDist=0,down=null,moved=false;
c.addEventListener('pointerdown',e=>{c.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});down={x:e.clientX,y:e.clientY};moved=false;if(pointers.size>1){const a=[...pointers.values()];lastDist=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);moved=true}});
c.addEventListener('pointermove',e=>{const old=pointers.get(e.pointerId);if(!old)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>6)moved=true;if(pointers.size>=2){const a=[...pointers.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(lastDist>0)changeZoom(d/lastDist);lastDist=d;moved=true}else{panX=clamp(panX+e.clientX-old.x,-W*.35,W*.35);panY=clamp(panY+e.clientY-old.y,-H*.35,H*.35);render()}});
function end(e){if(!pointers.has(e.pointerId))return;const tap=e.type==='pointerup'&&!moved&&pointers.size===1;pointers.delete(e.pointerId);lastDist=0;down=null;if(tap){const box=c.getBoundingClientRect();const x=(e.clientX-box.left-W/2-panX)/scale,y=(e.clientY-box.top-H/2-panY)/scale;const matches=stages[index].structures.filter(s=>Math.hypot(s.x-x,s.y-y)<s.r);if(matches.length)inspect(matches[0]);}if(pointers.size)moved=true;}
c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end);c.addEventListener('lostpointercapture',end);
$('explorer-controls').hidden=false;$('illustration').hidden=false;document.body.classList.add('explorer-ready');addEventListener('hashchange',fromHash);new ResizeObserver(resize).observe(c.parentElement);fromHash();resize();
// Reuse the existing PWA cache; this explorer writes no learning or exam progress.
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
