/* Feed content is displayed as text; never inject publisher HTML into the page. */
(function(root){
 'use strict';
 const BLOG='https://ericjm.substack.com/';
 function https(value,post=false){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&(!post||u.hostname==='ericjm.substack.com')?u.href:'';}catch{return '';}}
 function normalize(p,plain='',contentImage=''){
  if(!p||typeof p!=='object')return null;
  const link=https(p.link,true);if(!link)return null;
  const date=new Date(p.pubDate);return {link,title:String(p.title||'Read the Field Notes').slice(0,300),excerpt:plain.replace(/\s+/g,' ').trim().slice(0,220),image:[p.enclosure?.link,p.thumbnail,contentImage].map(x=>https(x)).find(Boolean)||'',date:Number.isNaN(date.valueOf())?'':date.toISOString()};
 }
 if(typeof module==='object'&&module.exports){module.exports={https,normalize};return;}
 const section=document.getElementById('blog-feature');if(!section)return;
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
 function anchor(text,url,cls){const a=el('a',text,cls);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;}
 function render(posts){
  section.replaceChildren();const post=posts[0];
  const picture=anchor('',post?.link||BLOG,'blog-feature-art');
  const image=el('img');image.src=post?.image||'hearth-scene.svg';image.alt='';image.width=960;image.height=640;image.decoding='async';image.onerror=()=>{image.onerror=null;image.src='hearth-scene.svg';};picture.append(image);picture.setAttribute('aria-label',post?'Read '+post.title:'Visit Eric J’s Field Notes');
  const copy=el('div',null,'blog-feature-copy');copy.append(el('span','FROM ERIC J’S FIELD NOTES','eyebrow'));
  const heading=el('h2');heading.id='blog-feature-heading';heading.append(anchor(post?.title||'Beyond the classroom. Into the Field Notes.',post?.link||BLOG));copy.append(heading);
  if(post?.date){const time=el('time',new Date(post.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}));time.dateTime=post.date;copy.append(time);}
  copy.append(el('p',post?.excerpt||'Essays on medicine, teaching, responsibility, and the connections that make us better learners.'));
  const links=el('div',null,'blog-feature-links');links.append(anchor(post?'Read the essay ↗':'Read the Field Notes ↗',post?.link||BLOG,'blog-primary-link'),anchor('Browse all posts',BLOG+'archive'));copy.append(links);section.append(picture,copy);
  const list=document.getElementById('substack-posts');if(list){list.replaceChildren();for(const p of posts.slice(0,5)){const li=el('li');li.append(anchor(p.title,p.link));list.append(li);}if(!posts.length){const li=el('li');li.append(anchor('Read the latest posts on Substack ↗',BLOG));list.append(li);}}
 }
 render([]);
 async function load(){
  const control=new AbortController(),timer=setTimeout(()=>control.abort(),8000);
  try{
   const response=await fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(BLOG+'feed'),{signal:control.signal});if(!response.ok)throw Error('Feed unavailable');const data=await response.json();if(!Array.isArray(data.items))throw Error('Invalid feed');
   const posts=data.items.map(p=>{const doc=new DOMParser().parseFromString(String(p.description||p.content||''),'text/html');doc.querySelectorAll('script,style').forEach(n=>n.remove());return normalize(p,doc.body.textContent||'',doc.querySelector('img')?.getAttribute('src'));}).filter(Boolean);
   if(posts.length)render(posts);
  }catch{/* Direct Substack links remain available when offline or the feed is unavailable. */}finally{clearTimeout(timer);}
 }
 load();
})(typeof window==='object'?window:globalThis);
