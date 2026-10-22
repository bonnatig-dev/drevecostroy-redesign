const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const b=$('.burger'),m=$('.menu');
if(b){b.onclick=()=>{const o=m.classList.toggle('open');b.classList.toggle('x',o);b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};$$('a',m).forEach(a=>a.onclick=()=>{m.classList.remove('open');b.classList.remove('x');b.setAttribute('aria-expanded','false');document.body.style.overflow=''})}
// hero slider
const sl=$$('.slide'),dt=$$('.dots button');let si=0,timer;
function go(n){si=(n+sl.length)%sl.length;sl.forEach((s,k)=>{s.classList.toggle('on',k==si);s.setAttribute('aria-hidden',k!=si)});dt.forEach((d,k)=>{d.classList.toggle('on',k==si);d.setAttribute('aria-current',k==si)})}
function auto(){clearInterval(timer);timer=setInterval(()=>go(si+1),6000)}
if(sl.length){go(0);auto();dt.forEach((d,k)=>d.onclick=()=>{go(k);auto()});$('.prev').onclick=()=>{go(si-1);auto()};$('.next').onclick=()=>{go(si+1);auto()}}
// tabs
$$('.tabs button').forEach(t=>t.onclick=()=>{$$('.tabs button').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-selected','false')});$$('.tp').forEach(x=>x.classList.remove('on'));t.classList.add('on');t.setAttribute('aria-selected','true');$('#'+t.dataset.t).classList.add('on')});
// validation
const telOk=v=>/^\+?375[\s(-]*(25|29|33|44|17)[\s)-]*\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(v.trim());
const mailOk=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
function check(f){let ok=true;$$('[data-v]',f).forEach(i=>{const e=i.dataset.v=='agree'?i.closest('.chk').nextElementSibling:i.nextElementSibling;let s='';const v=i.dataset.v;
if(v=='name'&&i.value.trim().length<2)s='Укажите имя';if(v=='tel'&&!telOk(i.value))s='Телефон в формате +375 29 123-45-67';if(v=='mail'&&!mailOk(i.value))s='Укажите корректный e-mail';if(v=='text'&&i.value.trim().length<3)s='Напишите вопрос';if(v=='agree'&&!i.checked)s='Нужно согласие с условиями';
e.textContent=s;i.setAttribute('aria-invalid',!!s);if(s)ok=false});return ok}
$$('form.f').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const hp=$('[name=website]',f);if(hp&&hp.value)return;if(!check(f))return;f.hidden=true;const ok=f.nextElementSibling;ok.style.display='block';ok.focus()}));
// quiz
const qs=$$('.q');let qi=0;const nx=$('#qnext'),pv=$('#qprev'),pr=$('#qprog'),qe=$('#qerr'),ds=$('#qdisc');
function qshow(){qs.forEach((q,k)=>q.classList.toggle('on',k==qi));pr.textContent='Вопрос '+Math.min(qi+1,10)+' из 10';pv.style.visibility=qi?'visible':'hidden';nx.style.display=qi==qs.length-1?'none':'';ds.textContent=(qi*10)+' руб'}
if(qs.length){qshow();nx.onclick=()=>{if(!$('input:checked',qs[qi])){qe.textContent='Выберите вариант ответа';return}qe.textContent='';qi++;qshow()};pv.onclick=()=>{qi--;qshow()}}
// gallery lightbox
const lb=$('.lb');if(lb){$$('.gal a').forEach(a=>a.onclick=e=>{e.preventDefault();$('img',lb).src=a.href;$('img',lb).alt=$('img',a).alt;lb.classList.add('on');$('button',lb).focus()});$('button',lb).onclick=()=>lb.classList.remove('on');lb.onclick=e=>{if(e.target==lb)lb.classList.remove('on')};document.addEventListener('keydown',e=>{if(e.key=='Escape')lb.classList.remove('on')})}
// project thumbs
$$('.th button').forEach(t=>t.onclick=()=>{const mn=$('.pj .main'),i=$('img',t);mn.src=i.src;mn.alt=i.alt;$$('.th button').forEach(x=>x.classList.remove('on'));t.classList.add('on')});
// reveal on scroll
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{threshold:.12}):null;
$$('.rv-in').forEach(el=>io?io.observe(el):el.classList.add('vis'));
