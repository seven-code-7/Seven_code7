// شعار نجوم بسيط للخلفية
(function starsBG(){
  const c = document.getElementById('stars');
  const ctx = c.getContext('2d');
  let w, h, stars = [];
  function resize(){ w = c.width = innerWidth; h = c.height = innerHeight; }
  function init(){
    stars = Array.from({length: 160}, ()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.5+0.3,
      s: Math.random()*0.6+0.1
    }));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const st of stars){
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI*2);
      const g = ctx.createRadialGradient(st.x,st.y,0, st.x,st.y,st.r*3);
      g.addColorStop(0,'#e8f4ff');
      g.addColorStop(1,'#00e5ff11');
      ctx.fillStyle = g;
      ctx.fill();
      st.x += st.s*0.15; st.y += st.s*0.05;
      if(st.x > w) st.x = 0;
      if(st.y > h) st.y = 0;
    }
    requestAnimationFrame(draw);
  }
  addEventListener('resize', ()=>{ resize(); init(); });
  resize(); init(); draw();
})();

// بيانات المشاريع — عدّلوا كما تحبون
const projects = [
  {
    id: 'p1',
    title: 'رفيق — تطبيق إسلامي شامل',
    type: 'app',
    timeHours: 12,
    desc: 'قرآن، أحاديث، أذكار مع تعلم تفاعلي. إصدار 0.4 قادم.',
    url: 'https://sevencode777-leys.github.io/-0.4/'
  },
  {
    id: 'p2',
    title: 'آلة حاسبة — seven code7',
    type: 'tool',
    timeHours: 3,
    desc: 'واجهة نظيفة لحسابات سريعة مع أزرار واضحة.',
    url: 'https://sevencode777-leys.github.io/scaling-enigma/'
  },
  {
    id: 'p3',
    title: 'Crate Impare — تحدي القرى',
    type: 'game',
    timeHours: 10,
    desc: 'دافع عن قريتك وطوّر جيشك وواجه البوس في الليلة 100.',
    url: 'https://sevencode777-leys.github.io/miniature-enigma/'
  },
  {
    id: 'p4',
    title: 'رفيق — نسخة 0.3',
    type: 'app',
    timeHours: 6,
    desc: 'تحسينات وثبات. تمهيد للإصدار 0.4.',
    url: 'https://sevencode777-leys.github.io/-0.3/'
  },
  {
    id: 'p5',
    title: 'مشروع — — —',
    type: 'app',
    timeHours: 4,
    desc: 'تجربة واجهة وعناصر عربية جميلة.',
    url: 'https://sevencode777-leys.github.io/-77/'
  },
  {
    id: 'p6',
    title: 'cautious-octo-robot',
    type: 'app',
    timeHours: 5,
    desc: 'استعراض تفاعلي بفخامة وواجهات متنوعة.',
    url: 'https://sevencode777-leys.github.io/cautious-octo-robot/'
  },
  // دمج الروابط الإضافية إن رغبتما:
  { id: 'p7', title: 'نسخة -77 (مكرر)', type: 'app', timeHours: 1, desc: 'رابط إضافي.', url: 'https://sevencode777-leys.github.io/-77/' }
];

// عناصر DOM
const grid = document.getElementById('projectsGrid');
const chips = document.querySelectorAll('.chip');
const search = document.getElementById('search');
const sortSel = document.getElementById('sort');

// بناء بطاقة مشروع
function projectCard(p){
  const wrap = document.createElement('article');
  wrap.className = 'card';
  wrap.dataset.type = p.type;
  wrap.dataset.time = p.timeHours;
  wrap.innerHTML = `
    <div class="card-header">
      <h3 class="card-title">${escapeHTML(p.title)}</h3>
      <div class="badges">
        <span class="badge">${p.type === 'game' ? 'لعبة' : p.type === 'app' ? 'تطبيق' : 'أداة'}</span>
        <span class="badge">وقت: ${p.timeHours} ساعة</span>
      </div>
    </div>
    <div class="card-body">
      <p class="card-desc">${escapeHTML(p.desc)}</p>
      <div class="card-meta">
        <span>by <strong>seven_code7</strong></span>
      </div>
    </div>
    <div class="card-actions">
      <a class="link-btn" href="${p.url}" target="_blank" rel="noopener">فتح المشروع</a>
      <a class="link-btn secondary" href="${p.url}" target="_blank" rel="noopener">زيارة</a>
    </div>
  `;
  return wrap;
}

// عرض الشبكة
function render(){
  const term = (search.value || '').toLowerCase().trim();
  const activeChip = document.querySelector('.chip.active');
  const filter = activeChip?.dataset.filter || 'all';
  const sort = sortSel.value;

  let list = projects.slice();

  if(filter !== 'all'){
    list = list.filter(p => p.type === filter);
  }
  if(term){
    list = list.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.desc.toLowerCase().includes(term)
    );
  }
  if(sort === 'newest'){
    list = list.reverse();
  } else if(sort === 'oldest'){
    // كما هي
  } else if(sort === 'timeAsc'){
    list.sort((a,b)=> a.timeHours - b.timeHours);
  } else if(sort === 'timeDesc'){
    list.sort((a,b)=> b.timeHours - a.timeHours);
  }

  grid.innerHTML = '';
  list.forEach(p => grid.appendChild(projectCard(p)));

  updateVIPStats();
}

chips.forEach(ch => ch.addEventListener('click', ()=>{
  chips.forEach(c=> c.classList.remove('active'));
  ch.classList.add('active');
  render();
}));
search.addEventListener('input', render);
sortSel.addEventListener('change', render);

// VIP
const vipBtn = document.getElementById('vipBtn');
const logoutBtn = document.getElementById('logoutBtn');
const vipDialog = document.getElementById('vipDialog');
const vipForm = document.getElementById('vipForm');
const vipCodeInput = document.getElementById('vipCode');
const vipMsg = document.getElementById('vipMsg');
const vipSection = document.getElementById('vipSection');

const VIP_SECRET = '7777';
const VIP_KEY = 'seven_code7_vip';

function isVIP(){ return localStorage.getItem(VIP_KEY) === '1'; }
function setVIP(on){
  if(on) localStorage.setItem(VIP_KEY,'1');
  else localStorage.removeItem(VIP_KEY);
  applyVIPState();
}

function applyVIPState(){
  const vip = isVIP();
  vipSection.hidden = !vip;
  logoutBtn.hidden = !vip;
  vipBtn.hidden = vip;
}

vipBtn.addEventListener('click', ()=>{
  vipMsg.textContent = '';
  vipCodeInput.value = '';
  vipDialog.showModal();
});
logoutBtn.addEventListener('click', ()=> setVIP(false));

vipForm.addEventListener('submit', (e)=>{
  e.preventDefault();
});
document.getElementById('vipSubmit').addEventListener('click', (e)=>{
  e.preventDefault();
  const code = vipCodeInput.value.trim();
  if(code === VIP_SECRET){
    setVIP(true);
    vipMsg.style.color = 'var(--ok)';
    vipMsg.textContent = 'تم الدخول بنجاح! أهلاً بك يا VIP.';
    setTimeout(()=> vipDialog.close(), 400);
  } else {
    vipMsg.style.color = 'var(--danger)';
    vipMsg.textContent = 'رمز غير صحيح. حاول مرة أخرى.';
  }
});

function updateVIPStats(){
  if(!isVIP()) return;
  const count = projects.length;
  const sum = projects.reduce((a,b)=> a + (b.timeHours||0), 0);
  const games = projects.filter(p=>p.type==='game').length;
  const apps = projects.filter(p=>p.type==='app').length;
  const statCount = document.getElementById('statCount');
  const statTime = document.getElementById('statTime');
  const statGames = document.getElementById('statGames');
  const statApps = document.getElementById('statApps');
  if(statCount){
    statCount.textContent = count;
    statTime.textContent = sum;
    statGames.textContent = games;
    statApps.textContent = apps;
  }
  const vipLinks = document.getElementById('vipLinks');
  vipLinks.innerHTML = '';
  projects.forEach(p=>{
    const a = document.createElement('a');
    a.href = p.url; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = p.title;
    vipLinks.appendChild(a);
  });
}

// Utils
function escapeHTML(s){
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

// بدء
applyVIPState();
render();
