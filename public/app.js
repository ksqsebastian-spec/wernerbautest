// Contact routes prepare a message locally; the visitor sends it in their own email app.
const contactDialog=document.querySelector('#contact-dialog');const inquiryForm=document.querySelector('#inquiry-form');const callbackForm=document.querySelector('#callback-form');let contactMode='inquiry';
function openContact(mode){if(!contactDialog)return;contactMode=mode;const copy={inquiry:['Ihr Vorhaben.','Erzählen Sie uns kurz, worum es geht.'],callback:['Wann passt es Ihnen?','Wir bereiten Ihren Rückrufwunsch vor.'],whatsapp:['Ein direkter Weg.','WhatsApp ist noch nicht eingerichtet.']};document.querySelector('#contact-title').textContent=copy[mode][0];document.querySelector('#contact-intro').textContent=copy[mode][1];inquiryForm.hidden=mode!=='inquiry';callbackForm.hidden=mode!=='callback';document.querySelector('#whatsapp-placeholder').hidden=mode!=='whatsapp';document.querySelector('#contact-ready').hidden=true;document.querySelector('#contact-note').hidden=mode==='whatsapp';document.querySelectorAll("[data-contact-tab]").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.contactTab===mode)));document.querySelector("#contact-status").textContent="";if(!contactDialog.open)contactDialog.showModal();}
document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>openContact(b.dataset.contact)));contactDialog?.querySelector('.dialog-close').addEventListener('click',()=>contactDialog.close());contactDialog?.addEventListener('click',e=>{if(e.target===contactDialog){const r=contactDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)contactDialog.close()}});
callbackForm?.querySelector('select').addEventListener('change',e=>{const custom=e.target.value==='Wunschzeit';document.querySelector('#preferred-time').hidden=!custom;callbackForm.elements.preferred.required=custom;});
function prepareContact(form,mode){const data=new FormData(form);const get=k=>String(data.get(k)||'').trim();let body,subject;if(mode==='callback'){subject='Rückrufwunsch — Werner Bau';body=`Guten Tag,\n\nich bitte um einen Rückruf.\n\nName: ${get('name')}\nTelefon: ${get('phone')}\nZeitwunsch: ${get('timing')==='Wunschzeit'?get('preferred'):get('timing')}\n\nBitte stimmen Sie den Termin mit mir ab.\n\nFreundliche Grüße\n${get('name')}`;}else{subject='Sanierungsvorhaben — Werner Bau';body=`Guten Tag,\n\n${get('building')?'Gebäude / Standort: '+get('building')+'\n':''}Name: ${get('name')}\nE-Mail: ${get('email')}\n\nMein Vorhaben:\n${get('message')}\n\nFreundliche Grüße\n${get('name')}`;}form.hidden=true;document.querySelector('#contact-ready').hidden=false;document.querySelector('#contact-title').textContent='Bereit zum Versenden.';document.querySelector('#contact-intro').textContent='Ihre Anfrage ist vorbereitet, noch nicht versendet.';document.querySelector('.ready-summary').textContent=body;const link=document.querySelector('#prepared-email');link.href='mailto:info@werner-bau.eu?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);link.focus({preventScroll:true});contactDialog.scrollTop=0;}
inquiryForm?.addEventListener('submit',e=>{e.preventDefault();prepareContact(inquiryForm,'inquiry')});callbackForm?.addEventListener('submit',e=>{e.preventDefault();prepareContact(callbackForm,'callback')});document.querySelector('#edit-request')?.addEventListener('click',()=>openContact(contactMode));
// Optional browser features never transmit a request or create a booking.
async function copyText(text,status,success){try{await navigator.clipboard.writeText(text);status.textContent=success;}catch{status.textContent='Kopieren ist hier nicht verfügbar. Bitte markieren Sie den Text.';}}
document.querySelector('#copy-request')?.addEventListener('click',()=>copyText(document.querySelector('.ready-summary').textContent,document.querySelector('#contact-status'),'Anfrage kopiert.'));

// Image collections use local thumbnails and load full-resolution media only on demand.
const galleryPhotos=[...document.querySelectorAll('.gallery-photo')];
if(galleryPhotos.length){
 const galleryFilters=[...document.querySelectorAll('[data-gallery-filter]')];
 const morePhotos=document.querySelector('#gallery-more');
 const photoDialog=document.querySelector('#gallery-dialog');
 const search=document.querySelector('#gallery-search');
 const galleryStatus=document.querySelector('#gallery-status');
 const viewerStatus=document.querySelector('#viewer-status');
 const viewerShell=document.querySelector('.viewer-shell');
 const imageFrame=document.querySelector('#viewer-frame');
 const comparison=document.querySelector('#viewer-comparison');
 const compareRange=document.querySelector('#compare-range');
 const compareButton=document.querySelector('#viewer-compare');
 const imageButton=document.querySelector('#viewer-image');
 const zoomButton=document.querySelector('#viewer-zoom');
 const saveButton=document.querySelector('#viewer-save');
 const fullscreenButton=document.querySelector('#viewer-fullscreen');
 let galleryCategory='all',galleryLimit=12,galleryIndex=0,viewerPhotos=[];
 let saved=new Set();
 try{const entries=JSON.parse(localStorage.getItem('werner-saved-images')||'[]');if(Array.isArray(entries))saved=new Set(entries.filter(id=>galleryPhotos.some(p=>p.dataset.photoId===id)));}catch{}
 const normalize=value=>value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss');
 function selectedPhotos(){const query=normalize(search.value.trim());return galleryPhotos.filter(p=>{
  const d=p.dataset;
  const category=galleryCategory==='all'||(galleryCategory==='saved'?saved.has(d.photoId):galleryCategory==='compare'?d.photoId===d.after:d.galleryCategory===galleryCategory);
  return category&&(!query||normalize(d.search+' '+(d.after?'vorher nachher vergleich':'')).includes(query));
 });}
 function renderGallery(){const selected=selectedPhotos();galleryPhotos.forEach(p=>p.hidden=true);selected.slice(0,galleryLimit).forEach(p=>p.hidden=false);galleryStatus.textContent=Math.min(galleryLimit,selected.length)+' von '+selected.length+' Aufnahmen';morePhotos.hidden=galleryLimit>=selected.length;document.querySelector('#gallery-empty').hidden=selected.length>0;document.querySelector('#saved-count').textContent=saved.size;}
 galleryFilters.forEach(b=>b.addEventListener('click',()=>{galleryCategory=b.dataset.galleryFilter;galleryLimit=12;galleryFilters.forEach(f=>f.setAttribute('aria-pressed',String(f===b)));renderGallery();}));
 search.addEventListener('input',()=>{galleryLimit=12;renderGallery();});
 document.querySelector('#gallery-reset').addEventListener('click',()=>{search.value='';galleryCategory='all';galleryLimit=12;galleryFilters.forEach(f=>f.setAttribute('aria-pressed',String(f.dataset.galleryFilter==='all')));renderGallery();search.focus();});
 morePhotos.addEventListener('click',()=>{const next=selectedPhotos()[galleryLimit];galleryLimit+=12;renderGallery();next?.focus({preventScroll:true});});
 document.querySelectorAll('[data-gallery-layout]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.reference-gallery').dataset.layout=button.dataset.galleryLayout;document.querySelectorAll('[data-gallery-layout]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
 document.addEventListener('keydown',e=>{const editing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)||document.activeElement?.isContentEditable;if(e.key==='/'&&!editing&&!document.querySelector('dialog[open]')&&!e.ctrlKey&&!e.metaKey){e.preventDefault();search.focus();}});
 function activePhoto(){return viewerPhotos[galleryIndex];}
 function fullSource(id){return '/assets/reference-large/'+id+'.webp';}
 function setMode(compare){comparison.hidden=!compare;imageFrame.hidden=compare;compareButton.setAttribute('aria-pressed',String(compare));imageButton.setAttribute('aria-pressed',String(!compare));zoomButton.hidden=compare;imageFrame.classList.remove('is-zoomed');zoomButton.setAttribute('aria-pressed','false');zoomButton.textContent='Vergrößern';}
 function photoLink(photo){const url=new URL(location.href);url.searchParams.set('bild',photo.dataset.photoId);url.hash='referenzen';return url.href;}
 function showPhoto(index){if(!viewerPhotos.length)return;galleryIndex=(index+viewerPhotos.length)%viewerPhotos.length;const photo=activePhoto(),d=photo.dataset,img=photo.querySelector('img');const large=document.querySelector('#gallery-large');large.src=fullSource(d.photoId);large.alt=img.alt;document.querySelector('#gallery-title').textContent=d.pairTitle||img.alt;document.querySelector('#viewer-category').textContent=img.alt.split(' · ')[0];document.querySelector('#gallery-original').href=d.original;document.querySelector('#gallery-download').href=fullSource(d.photoId);document.querySelector('#gallery-download').download='Werner-Bau-'+d.photoId+'.webp';document.querySelector('#gallery-position').textContent=(galleryIndex+1)+' / '+viewerPhotos.length;saveButton.setAttribute('aria-pressed',String(saved.has(d.photoId)));saveButton.textContent=saved.has(d.photoId)?'Gemerkt ✓':'Merken';viewerStatus.textContent='';compareButton.hidden=!d.after;compareRange.value='50';comparison.style.setProperty('--split','50%');if(d.after){document.querySelector('#compare-before').src=fullSource(d.before);document.querySelector('#compare-after').src=fullSource(d.after);}setMode(galleryCategory==='compare'&&!!d.after);if(!photoDialog.open)photoDialog.showModal();const current=new URL(location.href);if(current.searchParams.has('bild')){current.searchParams.set('bild',d.photoId);history.replaceState(null,'',current);}}
 galleryPhotos.forEach(p=>p.addEventListener('click',()=>{viewerPhotos=selectedPhotos().slice();showPhoto(viewerPhotos.indexOf(p));}));
 document.querySelector('#gallery-previous').addEventListener('click',()=>showPhoto(galleryIndex-1));
 document.querySelector('#gallery-next').addEventListener('click',()=>showPhoto(galleryIndex+1));
 compareButton.addEventListener('click',()=>setMode(true));imageButton.addEventListener('click',()=>setMode(false));
 compareRange.addEventListener('input',()=>comparison.style.setProperty('--split',compareRange.value+'%'));
 zoomButton.addEventListener('click',()=>{const zoom=imageFrame.classList.toggle('is-zoomed');zoomButton.setAttribute('aria-pressed',String(zoom));zoomButton.textContent=zoom?'Einpassen':'Vergrößern';});
 fullscreenButton.hidden=!document.fullscreenEnabled;
 fullscreenButton.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await viewerShell.requestFullscreen();}catch{viewerStatus.textContent='Vollbild ist in diesem Browser nicht verfügbar.';}});
 document.addEventListener('fullscreenchange',()=>{fullscreenButton.textContent=document.fullscreenElement?'Vollbild verlassen':'Vollbild';});
 function closeViewer(){if(document.fullscreenElement===viewerShell)document.exitFullscreen().catch(()=>{});photoDialog.close();}
 photoDialog.querySelector('.dialog-close').addEventListener('click',closeViewer);
 photoDialog.addEventListener('close',()=>{const url=new URL(location.href);if(url.searchParams.has('bild')){url.searchParams.delete('bild');history.replaceState(null,'',url);}renderGallery();});
 photoDialog.addEventListener('keydown',e=>{if(e.target===compareRange)return;if(e.key==='ArrowRight'){e.preventDefault();showPhoto(galleryIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(galleryIndex-1);}});
 photoDialog.addEventListener('click',e=>{if(e.target===photoDialog){const r=photoDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeViewer();}});
 let touchStart;
 imageFrame.addEventListener('touchstart',e=>{if(e.touches.length===1&&!imageFrame.classList.contains('is-zoomed'))touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};else touchStart=null;},{passive:true});
 imageFrame.addEventListener('touchend',e=>{if(!touchStart||!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)showPhoto(galleryIndex+(dx<0?1:-1));},{passive:true});
 saveButton.addEventListener('click',()=>{const id=activePhoto().dataset.photoId;if(saved.has(id))saved.delete(id);else saved.add(id);let persistent=true;try{localStorage.setItem('werner-saved-images',JSON.stringify([...saved]));}catch{persistent=false;}saveButton.setAttribute('aria-pressed',String(saved.has(id)));saveButton.textContent=saved.has(id)?'Gemerkt ✓':'Merken';viewerStatus.textContent=persistent?(saved.has(id)?'In Ihrer Merkliste gespeichert.':'Aus Ihrer Merkliste entfernt.'):'Merkliste für diese Sitzung aktualisiert.';document.querySelector('#saved-count').textContent=saved.size;});
 document.querySelector('#viewer-share').addEventListener('click',()=>copyText(photoLink(activePhoto()),viewerStatus,'Bildlink kopiert.'));
 document.querySelector('#viewer-contact').addEventListener('click',()=>{const photo=activePhoto();closeViewer();openContact('inquiry');if(!inquiryForm.elements.message.value)inquiryForm.elements.message.value='Ich möchte ein ähnliches Vorhaben besprechen.\n\nBildreferenz: '+photoLink(photo)+'\n\nMein Anliegen: ';inquiryForm.elements.message.focus();});
 renderGallery();const initialId=new URL(location.href).searchParams.get('bild');const initialPhoto=galleryPhotos.find(p=>p.dataset.photoId===initialId);if(initialPhoto){viewerPhotos=galleryPhotos.slice();showPhoto(viewerPhotos.indexOf(initialPhoto));}
}

// Portraits keep the compact company overview and open the uncropped source on demand.
const portraitDialog=document.querySelector('#portrait-dialog');
document.querySelectorAll('.portrait-open').forEach(button=>button.addEventListener('click',()=>{
 const person=button.closest('article'),image=button.querySelector('img'),email=person.querySelector('a');
 const large=document.querySelector('#portrait-large');large.src=image.src;large.alt=image.alt;
 document.querySelector('#portrait-name').textContent=person.querySelector('h3').textContent;
 document.querySelector('#portrait-role').textContent=person.querySelector('p').textContent;
 const link=document.querySelector('#portrait-email');link.href=email.href;link.textContent=email.textContent;
 portraitDialog.showModal();
}));
portraitDialog?.querySelector('.dialog-close').addEventListener('click',()=>portraitDialog.close());
portraitDialog?.addEventListener('click',event=>{if(event.target===portraitDialog){const rect=portraitDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)portraitDialog.close();}});
