// Shared navigation: an inline phone menu, with a visible-link fallback without JS.
const siteHeader=document.querySelector('.header');
const menuButton=document.querySelector('.mobile-menu');
const siteNavigation=document.querySelector('#site-navigation');
const phoneLayout=matchMedia('(max-width: 700px)');
function setMenu(open){siteHeader.dataset.menuOpen=String(open);menuButton.setAttribute('aria-expanded',String(open));menuButton.querySelector('span').textContent=open?'Menü schließen':'Menü';}
if(siteHeader&&menuButton&&siteNavigation){siteHeader.dataset.menuReady='true';setMenu(false);menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));siteNavigation.addEventListener('click',event=>{if(phoneLayout.matches&&event.target.closest('a'))setMenu(false);});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&phoneLayout.matches&&menuButton.getAttribute('aria-expanded')==='true'){setMenu(false);menuButton.focus();}});phoneLayout.addEventListener('change',()=>setMenu(false));}
// Keep one clear contact entry visible, without doubling it over the mobile hero.
const quickContact=document.querySelector('.quick-contact');
const introContact=document.querySelector('.intro-contact');
if(quickContact&&introContact){quickContact.dataset.visible='false';new IntersectionObserver(entries=>{quickContact.dataset.visible=String(!entries[0].isIntersecting);},{threshold:0}).observe(introContact);}
// Font and masonry layout settle after native fragment navigation. Restore its target once.
const initialFragment=location.hash;
let userInteracted=false;
for(const type of ['pointerdown','touchstart','wheel','keydown'])addEventListener(type,()=>{userInteracted=true;},{once:true,passive:true});
if(initialFragment)(document.fonts?.ready||Promise.resolve()).then(()=>requestAnimationFrame(()=>{if(userInteracted||location.hash!==initialFragment||document.querySelector('dialog[open]'))return;let id;try{id=decodeURIComponent(initialFragment.slice(1));}catch{return;}document.getElementById(id)?.scrollIntoView({behavior:'instant',block:'start'});}));

const phoneDensity=document.querySelector('#gallery-density');
if(phoneDensity){const configureDensity=()=>{phoneDensity.max=phoneLayout.matches?'3':'4';if(Number(phoneDensity.value)>Number(phoneDensity.max))phoneDensity.value=phoneDensity.max;phoneDensity.dispatchEvent(new Event('input',{bubbles:true}));};configureDensity();phoneLayout.addEventListener('change',configureDensity);}
