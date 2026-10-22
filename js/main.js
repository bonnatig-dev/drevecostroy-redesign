const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const hd=$('header');const onS=()=>hd&&hd.classList.toggle('scrolled',scrollY>40);addEventListener('scroll',onS,{passive:true});onS();
const b=$('.burger'),m=$('.menu');
function closeMenu(){m.classList.remove('open');b.classList.remove('x');b.setAttribute('aria-expanded','false');document.body.style.overflow=''}
if(b){b.onclick=()=>{const o=m.classList.toggle('open');b.classList.toggle('x',o);b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};$$('a',m).forEach(a=>a.addEventListener('click',closeMenu))}
// slider
const sl=$$('.slide'),dt=$$('.dots button'),cap=$('.cap');let si=0,tm;
function go(n){si=(n+sl.length)%sl.length;sl.forEach((s,k)=>{s.classList.toggle('on',k==si);s.setAttribute('aria-hidden',k!=si)});dt.forEach((d,k)=>{d.classList.toggle('on',k==si);d.setAttribute('aria-current',k==si)});if(cap)cap.textContent=sl[si].dataset.cap||''}
const auto=()=>{clearInterval(tm);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)tm=setInterval(()=>go(si+1),6500)};
if(sl.length){go(0);auto();dt.forEach((d,k)=>d.onclick=()=>{go(k);auto()});$('.prev').onclick=()=>{go(si-1);auto()};$('.next').onclick=()=>{go(si+1);auto()}}
// scheme
function zone(id){$$('.hs,.zlist button').forEach(x=>x.classList.toggle('on',x.dataset.z==id));$$('.zp').forEach(p=>p.classList.toggle('on',p.id=='z-'+id))}
$$('.hs,.zlist button').forEach(h=>{h.addEventListener('click',()=>zone(h.dataset.z));h.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches)zone(h.dataset.z)})});
// validation
const telOk=v=>/^\+?375[\s(-]*(25|29|33|44|17)[\s)-]*\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(v.trim());
const mailOk=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
function check(f){let ok=true;$$('[data-v]',f).forEach(i=>{const e=i.dataset.v=='agree'?i.closest('.chk').nextElementSibling:i.nextElementSibling;let s='';const v=i.dataset.v;
if(v=='name'&&i.value.trim().length<2)s='Укажите имя';if(v=='tel'&&!telOk(i.value))s='Телефон в формате +375 29 123-45-67';if(v=='mail'&&!mailOk(i.value))s='Укажите корректный e-mail';if(v=='text'&&i.value.trim().length<3)s='Напишите пару слов';if(v=='agree'&&!i.checked)s='Нужно согласие с политикой конфиденциальности';
e.textContent=s;i.setAttribute('aria-invalid',!!s);if(s)ok=false});return ok}
$$('form.f').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const hp=$('[name=website]',f);if(hp&&hp.value)return;if(!check(f))return;f.hidden=true;const ok=f.nextElementSibling;ok.style.display='block';ok.focus()}));
// quiz modal
const md=$('#quiz');let last;
function openQ(){if(!md)return;last=document.activeElement;md.classList.add('on');document.body.style.overflow='hidden';$('.mx',md).focus()}
function closeQ(){md.classList.remove('on');document.body.style.overflow='';last&&last.focus()}
$$('[data-quiz]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();if(m&&m.classList.contains('open'))closeMenu();openQ()}));
if(md){$('.mx',md).onclick=closeQ;md.addEventListener('click',e=>{if(e.target==md)closeQ()});
const qs=$$('.q',md);let qi=0;const nx=$('#qnext'),pv=$('#qprev'),pr=$('#qprog'),bar=$('.prog i'),qe=$('#qerr');
const qshow=()=>{qs.forEach((q,k)=>q.classList.toggle('on',k==qi));pr.textContent='Шаг '+(qi+1)+' из '+qs.length;bar.style.width=((qi+1)/qs.length*100)+'%';pv.style.visibility=qi?'visible':'hidden';nx.style.display=qi==qs.length-1?'none':''};
qshow();nx.onclick=()=>{if(!$('input:checked',qs[qi])){qe.textContent='Выберите вариант ответа';return}qe.textContent='';qi++;qshow()};pv.onclick=()=>{qi--;qshow()}}
document.addEventListener('keydown',e=>{if(e.key=='Escape'){md&&md.classList.contains('on')&&closeQ();lb&&lb.classList.remove('on')}});
// lightbox
const lb=$('.lb');if(lb){$$('[data-lb]').forEach(a=>a.onclick=e=>{e.preventDefault();const i=$('img',lb);i.src=a.href;i.alt=$('img',a).alt;lb.classList.add('on');$('button',lb).focus()});$('button',lb).onclick=()=>lb.classList.remove('on');lb.onclick=e=>{if(e.target==lb)lb.classList.remove('on')}}
// model thumbs
$$('.th button').forEach(t=>t.onclick=()=>{const mn=$('.mg .main'),i=$('img',t);mn.src=i.src;mn.alt=i.alt;$$('.th button').forEach(x=>x.classList.remove('on'));t.classList.add('on')});
// reveal
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{threshold:.1}):null;
$$('.rv-in').forEach(el=>io?io.observe(el):el.classList.add('vis'));
