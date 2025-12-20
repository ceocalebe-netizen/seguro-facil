const slides=document.querySelectorAll('.slides .slide');
const prev=document.querySelector('.slider .prev');
const next=document.querySelector('.slider .next');
let index=0;
function showSlide(i){slides.forEach(s=>s.classList.remove('active'));slides[i].classList.add('active')}
showSlide(index);
prev.addEventListener('click',()=>{index=(index-1+slides.length)%slides.length;showSlide(index)});
next.addEventListener('click',()=>{index=(index+1)%slides.length;showSlide(index)});
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.15});
document.querySelectorAll('.card,.section-title,.hero-title,.hero-sub,.price').forEach(el=>{el.classList.add('fade-up');observer.observe(el)});
const hero=document.querySelector('[data-parallax] .hero-bg');
let ticking=false;
function onScroll(){
  if(ticking) return;
  ticking=true;
  requestAnimationFrame(()=>{
    const y=window.scrollY;
    const t=Math.max(-20,Math.min(20,y*0.04));
    if(hero) hero.style.transform=`translate3d(0, ${t}px, 0)`;
    ticking=false;
  });
}
window.addEventListener('scroll',onScroll,{passive:true});
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);const el=document.getElementById(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}})});
document.querySelectorAll('.video-cover').forEach(vc=>{
  vc.addEventListener('click',()=>{
    const id=vc.getAttribute('data-video-id');
    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title='YouTube video player';
    iframe.frameBorder='0';
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen=true;
    const media=vc.parentElement;
    media.innerHTML='';
    media.appendChild(iframe);
  });
});
