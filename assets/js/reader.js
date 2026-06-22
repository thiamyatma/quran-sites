// NoorQuran reader page interactions.
/* ── STATE ── */
let curS=1,curV=1,totV=0,isPlaying=false,autoplay=true,showPhon=false,isLight=false;
let curRec='ar.alafasy',repMode='off',repCount=2,repCur=0,rangeStart=1,rangeEnd=1,curLang='fr';
let vData=[],trFr=[],trEn=[],trPh=[];
let vodData=null,vodGN=0,shareV=null,shareTheme='dark';
let playCtx='',repTimer=null;
let arSize=30,audioSpeed=1,audioQuality=128,searchIndex=[],searchLoading=null,libraryView='favs';
const PREF_KEY='aq_prefs';
const SURAH_CACHE_PREFIX='aq_surah_';
const LOCAL_SURAH_CACHE_PREFIX='aq_offline_surah_';
const OFFLINE_SURAH_LIST_KEY='aq_offline_surahs';
const SEARCH_CACHE_KEY='aq_search_index';
const FAV_KEY='aq_favs';
const BOOKMARK_KEY='aq_bookmarks';
const RECENT_KEY='aq_recent_reads';
const LAST_KEY='aq_last_read';
const KHATM_KEY='aq_khatm';
const aud=document.getElementById('aud');
function nqIcon(name,label=''){
  return window.NQIcon?window.NQIcon.svg(name,label):'';
}
function nqIconLabel(name,label){
  return nqIcon(name)+' '+label;
}
function setNqIconLabel(el,name,label){
  if(el)el.innerHTML=nqIconLabel(name,label);
}
function resetVersePlayButtons(){
  document.querySelectorAll('[id^="vb"]').forEach(b=>{
    b.classList.remove('on');
    setNqIconLabel(b,'headphones','Écouter');
  });
}
function updateCurrentVersePlayButton(){
  const btn=document.getElementById('vb'+curV);
  if(!btn||playCtx!=='verse'||!aud.src)return;
  btn.classList.add('on');
  setNqIconLabel(btn,isPlaying?'pause':'play',isPlaying?'En cours':'Reprendre');
}

/* ── DATA ── */
const SS=[
  {n:1,ar:'الفاتحة',en:'Al-Fatiha',fr:"L'Ouverture",v:7,t:'Mecquoise'},
  {n:2,ar:'البقرة',en:'Al-Baqarah',fr:'La Vache',v:286,t:'Médinoise'},
  {n:3,ar:'آل عمران',en:'Al-Imran',fr:"La Famille d'Imran",v:200,t:'Médinoise'},
  {n:4,ar:'النساء',en:'An-Nisa',fr:'Les Femmes',v:176,t:'Médinoise'},
  {n:5,ar:'المائدة',en:"Al-Ma'idah",fr:'La Table Servie',v:120,t:'Médinoise'},
  {n:6,ar:'الأنعام',en:"Al-An'am",fr:'Les Bestiaux',v:165,t:'Mecquoise'},
  {n:7,ar:'الأعراف',en:"Al-A'raf",fr:'Les Murailles',v:206,t:'Mecquoise'},
  {n:8,ar:'الأنفال',en:'Al-Anfal',fr:'Le Butin',v:75,t:'Médinoise'},
  {n:9,ar:'التوبة',en:'At-Tawbah',fr:'Le Repentir',v:129,t:'Médinoise'},
  {n:10,ar:'يونس',en:'Yunus',fr:'Jonas',v:109,t:'Mecquoise'},
  {n:11,ar:'هود',en:'Hud',fr:'Houd',v:123,t:'Mecquoise'},
  {n:12,ar:'يوسف',en:'Yusuf',fr:'Joseph',v:111,t:'Mecquoise'},
  {n:13,ar:'الرعد',en:"Ar-Ra'd",fr:'Le Tonnerre',v:43,t:'Médinoise'},
  {n:14,ar:'إبراهيم',en:'Ibrahim',fr:'Abraham',v:52,t:'Mecquoise'},
  {n:15,ar:'الحجر',en:'Al-Hijr',fr:'Al-Hijr',v:99,t:'Mecquoise'},
  {n:16,ar:'النحل',en:'An-Nahl',fr:'Les Abeilles',v:128,t:'Mecquoise'},
  {n:17,ar:'الإسراء',en:'Al-Isra',fr:'Le Voyage Nocturne',v:111,t:'Mecquoise'},
  {n:18,ar:'الكهف',en:'Al-Kahf',fr:'La Caverne',v:110,t:'Mecquoise'},
  {n:19,ar:'مريم',en:'Maryam',fr:'Marie',v:98,t:'Mecquoise'},
  {n:20,ar:'طه',en:'Ta-Ha',fr:'Ta-Ha',v:135,t:'Mecquoise'},
  {n:21,ar:'الأنبياء',en:'Al-Anbiya',fr:'Les Prophètes',v:112,t:'Mecquoise'},
  {n:22,ar:'الحج',en:'Al-Hajj',fr:'Le Pèlerinage',v:78,t:'Médinoise'},
  {n:23,ar:'المؤمنون',en:"Al-Mu'minun",fr:'Les Croyants',v:118,t:'Mecquoise'},
  {n:24,ar:'النور',en:'An-Nur',fr:'La Lumière',v:64,t:'Médinoise'},
  {n:25,ar:'الفرقان',en:'Al-Furqan',fr:'Le Discernement',v:77,t:'Mecquoise'},
  {n:26,ar:'الشعراء',en:"Ash-Shu'ara",fr:'Les Poètes',v:227,t:'Mecquoise'},
  {n:27,ar:'النمل',en:'An-Naml',fr:'Les Fourmis',v:93,t:'Mecquoise'},
  {n:28,ar:'القصص',en:'Al-Qasas',fr:'Le Récit',v:88,t:'Mecquoise'},
  {n:29,ar:'العنكبوت',en:'Al-Ankabut',fr:"L'Araignée",v:69,t:'Mecquoise'},
  {n:30,ar:'الروم',en:'Ar-Rum',fr:'Les Romains',v:60,t:'Mecquoise'},
  {n:31,ar:'لقمان',en:'Luqman',fr:'Luqman',v:34,t:'Mecquoise'},
  {n:32,ar:'السجدة',en:'As-Sajdah',fr:'La Prosternation',v:30,t:'Mecquoise'},
  {n:33,ar:'الأحزاب',en:'Al-Ahzab',fr:'Les Coalisés',v:73,t:'Médinoise'},
  {n:34,ar:'سبأ',en:'Saba',fr:'Saba',v:54,t:'Mecquoise'},
  {n:35,ar:'فاطر',en:'Fatir',fr:'Le Créateur',v:45,t:'Mecquoise'},
  {n:36,ar:'يس',en:'Ya-Sin',fr:'Ya-Sin',v:83,t:'Mecquoise'},
  {n:37,ar:'الصافات',en:'As-Saffat',fr:'Ceux qui se rangent',v:182,t:'Mecquoise'},
  {n:38,ar:'ص',en:'Sad',fr:'Sad',v:88,t:'Mecquoise'},
  {n:39,ar:'الزمر',en:'Az-Zumar',fr:'Les Groupes',v:75,t:'Mecquoise'},
  {n:40,ar:'غافر',en:'Ghafir',fr:'Le Pardonneur',v:85,t:'Mecquoise'},
  {n:41,ar:'فصلت',en:'Fussilat',fr:'Exposés en détail',v:54,t:'Mecquoise'},
  {n:42,ar:'الشورى',en:'Ash-Shura',fr:'La Consultation',v:53,t:'Mecquoise'},
  {n:43,ar:'الزخرف',en:'Az-Zukhruf',fr:"L'Ornement",v:89,t:'Mecquoise'},
  {n:44,ar:'الدخان',en:'Ad-Dukhan',fr:'La Fumée',v:59,t:'Mecquoise'},
  {n:45,ar:'الجاثية',en:'Al-Jathiyah',fr:"L'Agenouillée",v:37,t:'Mecquoise'},
  {n:46,ar:'الأحقاف',en:'Al-Ahqaf',fr:'Les Dunes',v:35,t:'Mecquoise'},
  {n:47,ar:'محمد',en:'Muhammad',fr:'Muhammad',v:38,t:'Médinoise'},
  {n:48,ar:'الفتح',en:'Al-Fath',fr:'La Victoire',v:29,t:'Médinoise'},
  {n:49,ar:'الحجرات',en:'Al-Hujurat',fr:'Les Appartements',v:18,t:'Médinoise'},
  {n:50,ar:'ق',en:'Qaf',fr:'Qaf',v:45,t:'Mecquoise'},
  {n:51,ar:'الذاريات',en:'Adh-Dhariyat',fr:'Les Vents qui éparpillent',v:60,t:'Mecquoise'},
  {n:52,ar:'الطور',en:'At-Tur',fr:'Le Mont',v:49,t:'Mecquoise'},
  {n:53,ar:'النجم',en:'An-Najm',fr:"L'Étoile",v:62,t:'Mecquoise'},
  {n:54,ar:'القمر',en:'Al-Qamar',fr:'La Lune',v:55,t:'Mecquoise'},
  {n:55,ar:'الرحمن',en:'Ar-Rahman',fr:'Le Tout Miséricordieux',v:78,t:'Médinoise'},
  {n:56,ar:'الواقعة',en:"Al-Waqi'ah",fr:"L'Événement",v:96,t:'Mecquoise'},
  {n:57,ar:'الحديد',en:'Al-Hadid',fr:'Le Fer',v:29,t:'Médinoise'},
  {n:58,ar:'المجادلة',en:'Al-Mujadila',fr:'La Discussion',v:22,t:'Médinoise'},
  {n:59,ar:'الحشر',en:'Al-Hashr',fr:"L'Exode",v:24,t:'Médinoise'},
  {n:60,ar:'الممتحنة',en:'Al-Mumtahanah',fr:'La Femme éprouvée',v:13,t:'Médinoise'},
  {n:61,ar:'الصف',en:'As-Saf',fr:'Le Rang',v:14,t:'Médinoise'},
  {n:62,ar:'الجمعة',en:"Al-Jumu'ah",fr:'Le Vendredi',v:11,t:'Médinoise'},
  {n:63,ar:'المنافقون',en:'Al-Munafiqun',fr:'Les Hypocrites',v:11,t:'Médinoise'},
  {n:64,ar:'التغابن',en:'At-Taghabun',fr:'La Déception mutuelle',v:18,t:'Médinoise'},
  {n:65,ar:'الطلاق',en:'At-Talaq',fr:'Le Divorce',v:12,t:'Médinoise'},
  {n:66,ar:'التحريم',en:'At-Tahrim',fr:"L'Interdiction",v:12,t:'Médinoise'},
  {n:67,ar:'الملك',en:'Al-Mulk',fr:'La Royauté',v:30,t:'Mecquoise'},
  {n:68,ar:'القلم',en:'Al-Qalam',fr:'La Plume',v:52,t:'Mecquoise'},
  {n:69,ar:'الحاقة',en:'Al-Haqqah',fr:"L'Inévitable",v:52,t:'Mecquoise'},
  {n:70,ar:'المعارج',en:"Al-Ma'arij",fr:"Les Degrés d'élévation",v:44,t:'Mecquoise'},
  {n:71,ar:'نوح',en:'Nuh',fr:'Noé',v:28,t:'Mecquoise'},
  {n:72,ar:'الجن',en:'Al-Jinn',fr:'Les Djinns',v:28,t:'Mecquoise'},
  {n:73,ar:'المزمل',en:'Al-Muzzammil',fr:"L'Enveloppé",v:20,t:'Mecquoise'},
  {n:74,ar:'المدثر',en:'Al-Muddaththir',fr:'Celui qui se couvre',v:56,t:'Mecquoise'},
  {n:75,ar:'القيامة',en:'Al-Qiyamah',fr:'La Résurrection',v:40,t:'Mecquoise'},
  {n:76,ar:'الإنسان',en:'Al-Insan',fr:"L'Homme",v:31,t:'Médinoise'},
  {n:77,ar:'المرسلات',en:'Al-Mursalat',fr:'Les Envoyés',v:50,t:'Mecquoise'},
  {n:78,ar:'النبأ',en:'An-Naba',fr:"L'Annonce",v:40,t:'Mecquoise'},
  {n:79,ar:'النازعات',en:"An-Nazi'at",fr:'Ceux qui arrachent',v:46,t:'Mecquoise'},
  {n:80,ar:'عبس',en:"'Abasa",fr:"Il s'est renfrogné",v:42,t:'Mecquoise'},
  {n:81,ar:'التكوير',en:'At-Takwir',fr:"L'Enroulement",v:29,t:'Mecquoise'},
  {n:82,ar:'الانفطار',en:'Al-Infitar',fr:'La Déchirure',v:19,t:'Mecquoise'},
  {n:83,ar:'المطففين',en:'Al-Mutaffifin',fr:'Les Fraudeurs',v:36,t:'Mecquoise'},
  {n:84,ar:'الانشقاق',en:'Al-Inshiqaq',fr:'La Déchirure du ciel',v:25,t:'Mecquoise'},
  {n:85,ar:'البروج',en:'Al-Buruj',fr:'Les Constellations',v:22,t:'Mecquoise'},
  {n:86,ar:'الطارق',en:'At-Tariq',fr:"L'Astre nocturne",v:17,t:'Mecquoise'},
  {n:87,ar:'الأعلى',en:"Al-A'la",fr:'Le Très-Haut',v:19,t:'Mecquoise'},
  {n:88,ar:'الغاشية',en:'Al-Ghashiyah',fr:"L'Enveloppante",v:26,t:'Mecquoise'},
  {n:89,ar:'الفجر',en:'Al-Fajr',fr:"L'Aurore",v:30,t:'Mecquoise'},
  {n:90,ar:'البلد',en:'Al-Balad',fr:'La Cité',v:20,t:'Mecquoise'},
  {n:91,ar:'الشمس',en:'Ash-Shams',fr:'Le Soleil',v:15,t:'Mecquoise'},
  {n:92,ar:'الليل',en:'Al-Layl',fr:'La Nuit',v:21,t:'Mecquoise'},
  {n:93,ar:'الضحى',en:'Ad-Duha',fr:'La Matinée',v:11,t:'Mecquoise'},
  {n:94,ar:'الشرح',en:'Ash-Sharh',fr:"L'Expansion",v:8,t:'Mecquoise'},
  {n:95,ar:'التين',en:'At-Tin',fr:'Le Figuier',v:8,t:'Mecquoise'},
  {n:96,ar:'العلق',en:"Al-'Alaq",fr:'Le Caillot',v:19,t:'Mecquoise'},
  {n:97,ar:'القدر',en:'Al-Qadr',fr:'La Nuit du Destin',v:5,t:'Mecquoise'},
  {n:98,ar:'البينة',en:'Al-Bayyinah',fr:'La Preuve',v:8,t:'Médinoise'},
  {n:99,ar:'الزلزلة',en:'Az-Zalzalah',fr:'Le Séisme',v:8,t:'Médinoise'},
  {n:100,ar:'العاديات',en:"Al-'Adiyat",fr:'Les Coursiers',v:11,t:'Mecquoise'},
  {n:101,ar:'القارعة',en:"Al-Qari'ah",fr:'Le Fracas',v:11,t:'Mecquoise'},
  {n:102,ar:'التكاثر',en:'At-Takathur',fr:'La Rivalité',v:8,t:'Mecquoise'},
  {n:103,ar:'العصر',en:"Al-'Asr",fr:'Le Temps',v:3,t:'Mecquoise'},
  {n:104,ar:'الهمزة',en:'Al-Humazah',fr:'Le Calomniateur',v:9,t:'Mecquoise'},
  {n:105,ar:'الفيل',en:'Al-Fil',fr:"L'Éléphant",v:5,t:'Mecquoise'},
  {n:106,ar:'قريش',en:'Quraysh',fr:'Les Quraysh',v:4,t:'Mecquoise'},
  {n:107,ar:'الماعون',en:"Al-Ma'un",fr:"L'Ustensile",v:7,t:'Mecquoise'},
  {n:108,ar:'الكوثر',en:'Al-Kawthar',fr:"L'Abondance",v:3,t:'Mecquoise'},
  {n:109,ar:'الكافرون',en:'Al-Kafirun',fr:'Les Mécréants',v:6,t:'Mecquoise'},
  {n:110,ar:'النصر',en:'An-Nasr',fr:'Le Secours',v:3,t:'Médinoise'},
  {n:111,ar:'المسد',en:'Al-Masad',fr:'Les Fibres',v:5,t:'Mecquoise'},
  {n:112,ar:'الإخلاص',en:'Al-Ikhlas',fr:'La Dévotion Pure',v:4,t:'Mecquoise'},
  {n:113,ar:'الفلق',en:'Al-Falaq',fr:"L'Aube",v:5,t:'Mecquoise'},
  {n:114,ar:'الناس',en:'An-Nas',fr:'Les Hommes',v:6,t:'Mecquoise'},
];

const RECS=[
  {id:'ar.alafasy',name:'Mishary Alafasy',ar:'مشاري العفاسي',style:'Mujawwad · Koweït'},
  {id:'ar.abdurrahmaansudais',name:'Abdurrahmaan As-Sudais',ar:'عبد الرحمن السديس',style:'Tarteel · Arabie Saoudite'},
  {id:'ar.husary',name:'Mahmoud Khalil Al-Husary',ar:'محمود خليل الحصري',style:'Murattal · Égypte'},
  {id:'ar.minshawi',name:'Mohamed Siddiq Minshawi',ar:'محمد صديق المنشاوي',style:'Mujawwad · Égypte'},
  {id:'ar.abdullahbasfar',name:'Abdullah Basfar',ar:'عبد الله بصفر',style:'Murattal · Arabie Saoudite'},
  {id:'ar.shaatree',name:'Abu Bakr Ash-Shaatree',ar:'أبو بكر الشاطري',style:'Tarteel · Arabie Saoudite'},
  {id:'ar.mahermuaiqly',name:'Maher Al-Muaiqly',ar:'ماهر المعيقلي',style:'Murattal · Arabie Saoudite'},
  {id:'ar.ahmedajamy',name:'Ahmed Al-Ajamy',ar:'أحمد العجمي',style:'Murattal · Arabie Saoudite'},
  {id:'ar.hanirifai',name:'Hani Ar-Rifai',ar:'هاني الرفاعي',style:'Murattal · Arabie Saoudite'},
  {id:'ar.muhammadayyoub',name:'Muhammad Ayyoub',ar:'محمد أيوب',style:'Tarteel · Arabie Saoudite'},
  {id:'ar.muhammadjibreel',name:'Muhammad Jibreel',ar:'محمد جبريل',style:'Mujawwad · Égypte'},
  {id:'ar.ibrahimakhbar',name:'Ibrahim Al-Akhdar',ar:'إبراهيم الأخضر',style:'Tarteel · Arabie Saoudite'},
];

/* ── INIT ── */
function readInitialRoute(){
  const p=new URLSearchParams(location.search);
  const route={
    s:Math.max(1,Math.min(114,+p.get('s')||0)),
    a:Math.max(1,+p.get('a')||0),
    q:(p.get('q')||'').trim(),
    tab:(location.hash||'').replace('#','')
  };
  if(!route.s)delete route.s;
  if(!route.a)delete route.a;
  return route;
}
function applyInitialRoute(route){
  if(!route)return;
  if(route.q){
    openTools('search');showTool('search');
    const input=document.getElementById('qsearch');
    if(input){input.value=route.q;searchQuran(route.q);}
  }else if(['search','favs','khatm','settings'].includes(route.tab)){
    openTools(route.tab);showTool(route.tab);
  }
  if(route.a)setTimeout(()=>focusVerse(route.a),260);
}
window.addEventListener('load',()=>{
  // Track visit
  localStorage.setItem('aq_visitors', (+localStorage.getItem('aq_visitors')||0)+1);
  const today = new Date().toDateString();
  if(localStorage.getItem('aq_last_day')!==today){
    localStorage.setItem('aq_today',1);
    localStorage.setItem('aq_last_day',today);
  } else {
    localStorage.setItem('aq_today', (+localStorage.getItem('aq_today')||0)+1);
  }
  const prefs=loadPrefs();
  applyPrefs(prefs);
  const initialRoute=readInitialRoute();
  if(initialRoute.s)curS=initialRoute.s;
  buildSel();renderSList();renderRec();renderDonWidget();updateResumeBtn();renderKhatm();
  loadSurah(curS).then(()=>applyInitialRoute(initialRoute));loadVod();
});

function buildSel(){
  document.getElementById('ssel').innerHTML=SS.map(s=>`<option value="${s.n}">${s.n}. ${s.ar} — ${s.fr}</option>`).join('');
}

function loadPrefs(){
  try{return JSON.parse(localStorage.getItem(PREF_KEY)||'{}');}
  catch(e){return {};}
}
function savePrefs(){
  const storedTheme=localStorage.getItem('aq_theme')||localStorage.getItem('aq_home_theme');
  const prefTheme=['auto','sepia'].includes(storedTheme)?storedTheme:(isLight?'light':'dark');
  const p={lang:curLang,theme:prefTheme,rec:curRec,surah:curS,phon:showPhon,auto:autoplay,rep:repCount,repMode,rangeStart,rangeEnd,arSize,audioSpeed,audioQuality};
  localStorage.setItem(PREF_KEY,JSON.stringify(p));
}
function applyPrefs(p){
  curLang=(localStorage.getItem('aq_lang')||localStorage.getItem('aq_home_lang')||p.lang)==='en'?'en':'fr';
  curRec=RECS.some(r=>r.id===p.rec)?p.rec:'ar.alafasy';
  curS=Math.max(1,Math.min(114,+p.surah||1));
  showPhon=!!p.phon;
  autoplay=p.auto!==false;
  repCount=[2,3,5,10].includes(+p.rep)?+p.rep:2;
  repMode=['off','verse','range'].includes(p.repMode)?p.repMode:'off';
  rangeStart=Math.max(1,+p.rangeStart||1);
  rangeEnd=Math.max(1,+p.rangeEnd||rangeStart);
  arSize=Math.max(22,Math.min(42,+p.arSize||30));
  audioSpeed=[.75,1,1.25,1.5].includes(+p.audioSpeed)?+p.audioSpeed:1;
  audioQuality=[64,128,192].includes(+p.audioQuality)?+p.audioQuality:128;
  const themeMode=localStorage.getItem('aq_theme')||localStorage.getItem('aq_home_theme')||p.theme||'dark';
  const actualTheme=themeMode==='auto'?(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):themeMode;
  isLight=actualTheme==='light';
  document.body.classList.toggle('light',isLight);
  document.body.dataset.theme=actualTheme;
  document.getElementById('thbtn').innerHTML=nqIcon(isLight?'sun':'moon');
  document.getElementById('lbfr').classList.toggle('on',curLang==='fr');
  document.getElementById('lben').classList.toggle('on',curLang==='en');
  document.getElementById('lbph').classList.toggle('on',showPhon);
  document.getElementById('autosw').classList.toggle('on',autoplay);
  const r=RECS.find(x=>x.id===curRec);
  if(r)document.getElementById('frec').textContent=r.name;
  updateRepeatUI();
  setArabicSize(arSize,false);
  setAudioSpeed(audioSpeed,false);
}
function renderDonWidget(){
  let cfg={};
  try{cfg=JSON.parse(localStorage.getItem('aq_don_cfg')||'{}');}catch(e){cfg={};}
  const wrap=document.getElementById('don-widget');
  const btns=[];
  const wave=safeUrl(cfg.wave),orange=safeUrl(cfg.orange),paypal=safeUrl(cfg.paypal);
  if(wave)btns.push(`<a class="donbtn wave" href="${escAttr(wave)}" target="_blank" rel="noopener" data-action="track-don">Wave</a>`);
  if(orange)btns.push(`<a class="donbtn orange" href="${escAttr(orange)}" target="_blank" rel="noopener" data-action="track-don">Orange Money</a>`);
  if(paypal)btns.push(`<a class="donbtn paypal" href="${escAttr(paypal)}" target="_blank" rel="noopener" data-action="track-don">PayPal</a>`);
  wrap.classList.toggle('show',cfg.enabled!==false&&btns.length>0);
  document.getElementById('don-msg-main').textContent=cfg.msg||'Soutenez ce projet islamique gratuit';
  document.getElementById('don-amts-main').innerHTML=(cfg.amounts||'').split(',').map(a=>a.trim()).filter(Boolean).map(a=>`<span class="donamt">${esc(a)}</span>`).join('');
  document.getElementById('don-btns-main').innerHTML=btns.join('');
}
function trackDon(){
  localStorage.setItem('aq_dons',(+localStorage.getItem('aq_dons')||0)+1);
}
function safeUrl(u){
  try{const x=new URL(String(u||''));return /^https?:$/.test(x.protocol)?x.href:'';}
  catch(e){return '';}
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function escAttr(s){return esc(s).replace(/`/g,'&#96;');}
function readJsonStore(store,key,fallback=null){
  try{
    const raw=store.getItem(key);
    return raw?JSON.parse(raw):fallback;
  }catch(e){
    return fallback;
  }
}
function validSurahPack(pack){
  return !!(pack&&pack.ar?.data?.ayahs&&pack.fr?.data?.ayahs&&pack.en?.data?.ayahs&&pack.ph?.data?.ayahs);
}
function getOfflineSurahs(){
  const list=readJsonStore(localStorage,OFFLINE_SURAH_LIST_KEY,[]);
  return Array.isArray(list)?list.filter(n=>n>=1&&n<=114):[];
}
function saveOfflineSurahs(list){
  const clean=[...new Set(list.map(Number).filter(n=>n>=1&&n<=114))].sort((a,b)=>a-b);
  localStorage.setItem(OFFLINE_SURAH_LIST_KEY,JSON.stringify(clean));
  return clean;
}
function getOfflinePack(n=curS){
  const pack=readJsonStore(localStorage,LOCAL_SURAH_CACHE_PREFIX+n,null);
  return validSurahPack(pack)?pack:null;
}
function updateOfflineStatus(){
  const el=document.getElementById('offline-status');
  if(!el)return;
  const list=getOfflineSurahs();
  const m=SS[curS-1];
  const saved=getOfflinePack(curS);
  const total=list.length+' sourate'+(list.length>1?'s':'')+' sauvegardée'+(list.length>1?'s':'');
  el.textContent=saved
    ? `${m.fr} est disponible hors ligne. ${total}.`
    : `${m.fr} n'est pas encore disponible hors ligne. ${total}.`;
}
function currentSurahPack(){
  if(!vData.length||!trFr.length||!trEn.length||!trPh.length)return null;
  return {
    ar:{data:{ayahs:vData}},
    fr:{data:{ayahs:trFr}},
    en:{data:{ayahs:trEn}},
    ph:{data:{ayahs:trPh}},
    surah:curS,
    savedAt:Date.now()
  };
}
function saveCurrentSurahOffline(){
  const pack=currentSurahPack();
  if(!pack){toast('Chargez d’abord la sourate');return;}
  try{
    localStorage.setItem(LOCAL_SURAH_CACHE_PREFIX+curS,JSON.stringify(pack));
    saveOfflineSurahs([...getOfflineSurahs(),curS]);
    updateOfflineStatus();
    toast('Sourate disponible hors ligne');
  }catch(e){
    toast('Stockage local plein');
  }
}
function removeCurrentSurahOffline(){
  localStorage.removeItem(LOCAL_SURAH_CACHE_PREFIX+curS);
  saveOfflineSurahs(getOfflineSurahs().filter(n=>n!==curS));
  updateOfflineStatus();
    toast('Sourate retirée du hors ligne');
}

/* ── PANELS ── */
function renderSList(f=''){
  const kh=getKhatm();
  document.getElementById('slist').innerHTML=SS.filter(s=>
    s.ar.includes(f)||s.en.toLowerCase().includes(f.toLowerCase())||
    s.fr.toLowerCase().includes(f.toLowerCase())||String(s.n).includes(f)
  ).map(s=>`<div class="sli ${s.n===curS?'on':''} ${kh.done[s.n]?'done':''}" data-go-surah="${s.n}">
    <span class="slin">${kh.done[s.n]?'✓':s.n}</span><span class="sliar">${s.ar}</span>
    <span class="slien">${curLang==='fr'?s.fr:s.en}</span>
  </div>`).join('');
}
function filterS(v){renderSList(v);}
function goS(n){closePanel();loadSurah(n);}
function openPanel(){document.getElementById('spanel').classList.add('open');document.getElementById('overlay').classList.add('show');}
function closePanel(){document.getElementById('spanel').classList.remove('open');document.getElementById('overlay').classList.remove('show');}

function openTools(tab='tools'){
  closePanel();closeRec();
  document.getElementById('toolpanel').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  showTool(tab);
}
function closeTools(){
  document.getElementById('toolpanel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}
function showTool(tab){
  ['tools','search','favs','khatm','settings'].forEach(x=>{
    document.getElementById('tool-'+x).classList.toggle('on',x===tab);
    document.getElementById('tooltab-'+x).classList.toggle('on',x===tab);
  });
  if(tab==='search')setTimeout(()=>document.getElementById('qsearch').focus(),80);
  if(tab==='favs')renderLibrary();
  if(tab==='khatm')renderKhatm();
  if(tab==='settings'){setArabicSize(arSize,false);setAudioSpeed(audioSpeed,false);updateOfflineStatus();}
}
async function searchQuran(q){
  q=q.trim();
  const st=document.getElementById('search-status'),out=document.getElementById('search-results');
  if(q.length<2){st.textContent='';out.innerHTML='';return;}
  st.textContent='Préparation de la recherche...';
  try{
    await ensureSearchIndex();
    const nq=norm(q);
    const ref=q.match(/^(\d{1,3})\s*[:.\-]\s*(\d{1,3})$/);
    let res=[];
    if(ref){
      const s=+ref[1],a=+ref[2];
      res=searchIndex.filter(x=>x.s===s&&x.a===a);
    }else{
      res=searchIndex.filter(x=>x.key.includes(nq)).slice(0,50);
    }
    st.textContent=res.length?res.length+' résultat'+(res.length>1?'s':''):'Aucun résultat';
    out.innerHTML=res.map(renderToolItem).join('')||'<div class="emptymsg">Essayez un autre mot ou une référence comme 2:255.</div>';
  }catch(e){
    st.textContent='Recherche indisponible pour le moment.';
    out.innerHTML='<div class="emptymsg">Vérifiez la connexion puis réessayez.</div>';
  }
}
async function ensureSearchIndex(){
  if(searchIndex.length)return;
  if(searchLoading)return searchLoading;
  searchLoading=(async()=>{
    const cached=sessionStorage.getItem(SEARCH_CACHE_KEY);
    if(cached){try{searchIndex=JSON.parse(cached);return;}catch(e){}}
    const [arR,frR,enR]=await Promise.all([
      fetch('https://api.alquran.cloud/v1/quran/quran-uthmani'),
      fetch('https://api.alquran.cloud/v1/quran/fr.hamidullah'),
      fetch('https://api.alquran.cloud/v1/quran/en.asad'),
    ]);
    const [arD,frD,enD]=await Promise.all([arR.json(),frR.json(),enR.json()]);
    const flat=(d)=>d.data.surahs.flatMap(s=>s.ayahs.map(a=>({s:s.number,a:a.numberInSurah,text:a.text})));
    const ar=flat(arD),fr=flat(frD),en=flat(enD);
    searchIndex=ar.map((x,i)=>{
      const m=SS[x.s-1],trFr=fr[i]?.text||'',trEn=en[i]?.text||'';
      return {s:x.s,a:x.a,gn:gN(x.s,x.a),ar:x.text,fr:trFr,en:trEn,ref:x.s+':'+x.a+' — '+m.fr,key:norm([x.s,x.a,m.ar,m.fr,m.en,x.text,trFr,trEn].join(' '))};
    });
    try{sessionStorage.setItem(SEARCH_CACHE_KEY,JSON.stringify(searchIndex));}catch(e){}
  })();
  return searchLoading;
}
function renderToolItem(v){
  const tr=curLang==='fr'?(v.fr||v.en):(v.en||v.fr);
  return `<div class="toolitem" data-go-ayah="${v.s}:${v.a}">
    <div class="toolref">${esc(v.ref)}</div>
    <div class="toolar">${esc(v.ar)}</div>
    <div class="tooltr">${esc(tr)}</div>
  </div>`;
}
async function goAyah(s,a){
  closeTools();closePanel();
  if(curS!==s)await loadSurah(s);
  setTimeout(()=>focusVerse(a),120);
}
function focusVerse(a){
  const el=document.getElementById('vc'+a);
  if(!el)return;
  document.querySelectorAll('.vc.focus').forEach(x=>x.classList.remove('focus'));
  el.classList.add('focus');
  el.scrollIntoView({behavior:'smooth',block:'center'});
  setTimeout(()=>el.classList.remove('focus'),2400);
}
function norm(s){
  return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[^\p{L}\p{N}:]+/gu,' ').trim();
}
function playerSurahLabel(s=curS,a=null){
  const m=SS[s-1];
  const name=curLang==='fr'?m.fr:m.en;
  return a?`${s}:${a} — ${m.ar} — ${name}`:`${s}. ${m.ar} — ${name}`;
}

/* ── LOAD SURAH ── */
async function loadSurah(n){
  curS=n;curV=1;stopAud();vData=[];trFr=[];trEn=[];trPh=[];
  savePrefs();
  const m=SS[n-1];
  document.getElementById('snum').textContent='Sourate '+n;
  document.getElementById('snar').textContent=m.ar;
  document.getElementById('snen').textContent=m.en+' — '+m.fr;
  document.getElementById('snmeta').textContent=m.t+' · '+m.v+' versets';
  document.getElementById('bism').style.display=n===9?'none':'';
  document.getElementById('pinfo').textContent=playerSurahLabel(n);
  const mt=document.getElementById('mobile-title-ar'),ms=document.getElementById('mobile-title-sub');
  if(mt)mt.textContent=m.ar;
  if(ms)ms.textContent=n+'. '+(curLang==='fr'?m.fr:m.en);
  updateDesktopSurahInfo();
  document.getElementById('ssel').value=n;
  totV=m.v;
  setRangeBounds(false);
  document.getElementById('loading').style.display='block';
  document.getElementById('errmsg').style.display='none';
  document.getElementById('vlist').innerHTML='';
  renderSList();renderKhatm();window.scrollTo({top:0,behavior:'smooth'});
  try{
    const ck=SURAH_CACHE_PREFIX+n;
    const cached=readJsonStore(sessionStorage,ck,null);
    const offlinePack=getOfflinePack(n);
    let d1,d2,d3,d4,fromOffline=false;
    if(validSurahPack(cached)){
      ({ar:d1,fr:d2,en:d3,ph:d4}=cached);
    }else if(!navigator.onLine&&offlinePack){
      ({ar:d1,fr:d2,en:d3,ph:d4}=offlinePack);
      fromOffline=true;
    }else{
      try{
        const [r1,r2,r3,r4]=await Promise.all([
          fetch('https://api.alquran.cloud/v1/surah/'+n),
          fetch('https://api.alquran.cloud/v1/surah/'+n+'/fr.hamidullah'),
          fetch('https://api.alquran.cloud/v1/surah/'+n+'/en.asad'),
          fetch('https://api.alquran.cloud/v1/surah/'+n+'/en.transliteration'),
        ]);
        [d1,d2,d3,d4]=await Promise.all([r1.json(),r2.json(),r3.json(),r4.json()]);
        try{sessionStorage.setItem(ck,JSON.stringify({ar:d1,fr:d2,en:d3,ph:d4}));}catch(e){}
      }catch(netErr){
        if(!offlinePack)throw netErr;
        ({ar:d1,fr:d2,en:d3,ph:d4}=offlinePack);
        fromOffline=true;
      }
    }
    vData=d1.data.ayahs;trFr=d2.data.ayahs;trEn=d3.data.ayahs;trPh=d4.data.ayahs;
    totV=vData.length;
    setRangeBounds(false);
    document.getElementById('loading').style.display='none';
    renderV();renderDesktopAyahs();updateOfflineStatus();
    if(fromOffline)toast('Sourate chargée hors ligne');
  }catch(e){
    document.getElementById('loading').style.display='none';
    document.getElementById('errmsg').style.display='block';
    updateOfflineStatus();
  }
}

function renderV(){
  document.getElementById('vlist').innerHTML=vData.map((v,i)=>{
    const tr=curLang==='fr'?(trFr[i]?.text||''):(trEn[i]?.text||'');
    const ph=trPh[i]?.text||'';
    return `<div class="vc" id="vc${v.numberInSurah}" data-play-verse="${v.numberInSurah}">
      <div class="vn">${v.numberInSurah}</div>
      <div class="var">${v.text}</div>
      <div class="vph ${showPhon?'show':''}" id="vp${v.numberInSurah}">${ph}</div>
      <div class="vtr" id="vt${v.numberInSurah}">${tr}</div>
      <div class="vacts">
        <button class="vbtn" id="vb${v.numberInSurah}" data-verse-action="play" data-verse="${v.numberInSurah}">${nqIconLabel('headphones','Écouter')}</button>
        <button class="vbtn" data-verse-action="repeat" data-verse="${v.numberInSurah}">${nqIconLabel('repeat','Répéter')}</button>
        <button class="vbtn ${isFav(curS,v.numberInSurah)?'on':''}" id="fav${curS}_${v.numberInSurah}" data-verse-action="fav" data-index="${i}">${nqIconLabel('heart','Favori')}</button>
        <button class="vbtn ${isBookmark(curS,v.numberInSurah)?'on':''}" id="bm${curS}_${v.numberInSurah}" data-verse-action="bookmark" data-index="${i}">${nqIconLabel('bookmark',isBookmark(curS,v.numberInSurah)?'Marqué':'Marque-page')}</button>
        <button class="vbtn" data-verse-action="copy" data-index="${i}">${nqIconLabel('copy','Copier')}</button>
        <button class="vbtn" data-verse-action="share" data-verse="${v.numberInSurah}">${nqIconLabel('image','Image')}</button>
        <button class="vbtn" data-verse-action="video" data-verse="${v.numberInSurah}">${nqIconLabel('video','Vidéo')}</button>
      </div>
    </div>`;
  }).join('');
}

function updateDesktopSurahInfo(){
  const m=SS[curS-1];
  const ar=document.getElementById('desk-surah-ar'),name=document.getElementById('desk-surah-name');
  if(ar)ar.textContent=m.ar;
  if(name)name.textContent=curS+'. '+(curLang==='fr'?m.fr:m.en);
}
function renderDesktopAyahs(){
  const box=document.getElementById('desk-ayahs');
  if(!box)return;
  box.innerHTML=Array.from({length:totV||SS[curS-1].v},(_,i)=>{
    const n=i+1;
    return `<button class="desk-ayah ${n===curV?'on':''}" data-focus-play-verse="${n}">${n}</button>`;
  }).join('');
  updateDesktopAyahActive();
}
function updateDesktopAyahActive(){
  document.querySelectorAll('.desk-ayah').forEach((b,i)=>b.classList.toggle('on',i+1===curV));
}

function favId(s,a){return s+':'+a;}
function getFavs(){try{return JSON.parse(localStorage.getItem(FAV_KEY)||'[]');}catch(e){return [];}}
function saveFavs(f){localStorage.setItem(FAV_KEY,JSON.stringify(f));}
function getBookmarks(){try{return JSON.parse(localStorage.getItem(BOOKMARK_KEY)||'[]');}catch(e){return [];}}
function saveBookmarks(f){localStorage.setItem(BOOKMARK_KEY,JSON.stringify(f));}
function getRecentReads(){try{return JSON.parse(localStorage.getItem(RECENT_KEY)||'[]');}catch(e){return [];}}
function saveRecentReads(f){localStorage.setItem(RECENT_KEY,JSON.stringify(f));}
function isFav(s,a){return getFavs().some(x=>x.id===favId(s,a));}
function isBookmark(s,a){return getBookmarks().some(x=>x.id===favId(s,a));}
function verseSnapshot(i){
  const v=vData[i];if(!v)return null;
  const m=SS[curS-1],a=v.numberInSurah;
  return {id:favId(curS,a),s:curS,a,gn:gN(curS,a),ref:curS+':'+a+' — '+m.fr,ar:v.text,fr:trFr[i]?.text||'',en:trEn[i]?.text||'',t:Date.now()};
}
function toggleFav(i){
  const item=verseSnapshot(i);if(!item)return;
  const id=item.id;
  let favs=getFavs();
  const idx=favs.findIndex(x=>x.id===id);
  if(idx>=0){
    favs.splice(idx,1);
    toast('Favori retiré');
  }else{
    favs.unshift(item);
    toast('Verset ajouté aux favoris');
  }
  saveFavs(favs.slice(0,250));
  const btn=document.getElementById('fav'+curS+'_'+item.a);
  if(btn){const on=idx<0;btn.classList.toggle('on',on);setNqIconLabel(btn,'heart','Favori');}
  renderLibrary();
}
function toggleBookmark(i){
  const item=verseSnapshot(i);if(!item)return;
  const id=item.id;
  let marks=getBookmarks();
  const idx=marks.findIndex(x=>x.id===id);
  if(idx>=0){
    marks.splice(idx,1);
    toast('Marque-page retiré');
  }else{
    marks.unshift(item);
    toast('Marque-page ajouté');
  }
  saveBookmarks(marks.slice(0,250));
  const btn=document.getElementById('bm'+curS+'_'+item.a);
  if(btn){const on=idx<0;btn.classList.toggle('on',on);setNqIconLabel(btn,'bookmark',on?'Marqué':'Marque-page');}
  renderLibrary();
}
function setLibraryView(v){
  libraryView=['favs','bookmarks','recent'].includes(v)?v:'favs';
  renderLibrary();
}
function renderLibrary(){
  const out=document.getElementById('fav-results');if(!out)return;
  document.querySelectorAll('[id^="libtab-"]').forEach(b=>b.classList.remove('on'));
  const tab=document.getElementById('libtab-'+libraryView);if(tab)tab.classList.add('on');
  const status=document.getElementById('library-status');
  const data=libraryView==='bookmarks'?getBookmarks():(libraryView==='recent'?getRecentReads():getFavs());
  const label=libraryView==='bookmarks'?'marque-page':(libraryView==='recent'?'verset récent':'favori');
  if(status)status.textContent=data.length?data.length+' '+label+(data.length>1?'s':''):'';
  out.innerHTML=data.length?data.map(v=>`
    <div class="toolitem" data-go-ayah="${v.s}:${v.a}">
      <div class="toolref">${esc(v.ref)}</div>
      <div class="toolar">${esc(v.ar)}</div>
      <div class="tooltr">${esc(curLang==='fr'?(v.fr||v.en):(v.en||v.fr))}</div>
      ${libraryView==='recent'?'':`<button class="vbtn library-remove-btn" data-remove-library="${escAttr(v.id)}">Retirer</button>`}
    </div>`).join(''):`<div class="emptymsg">Aucun ${label} pour le moment.</div>`;
}
function removeLibraryItem(id){
  if(libraryView==='bookmarks')saveBookmarks(getBookmarks().filter(x=>x.id!==id));
  else saveFavs(getFavs().filter(x=>x.id!==id));
  renderLibrary();renderV();
}
function addRecentRead(item){
  const recent=getRecentReads().filter(x=>x.id!==item.id);
  recent.unshift({...item,t:Date.now()});
  saveRecentReads(recent.slice(0,20));
  if(libraryView==='recent')renderLibrary();
}
function saveLastRead(s=curS,a=curV){
  const m=SS[s-1];
  localStorage.setItem(LAST_KEY,JSON.stringify({s,a,ref:s+':'+a+' — '+m.fr,t:Date.now()}));
  updateResumeBtn();
}
function getLastRead(){try{return JSON.parse(localStorage.getItem(LAST_KEY)||'null');}catch(e){return null;}}
function updateResumeBtn(){
  const b=document.getElementById('resumeBtn');if(!b)return;
  const last=getLastRead();
  b.classList.toggle('show',!!last);
  if(last)b.textContent='Reprendre '+last.s+':'+last.a;
}
async function resumeLast(){
  const last=getLastRead();if(!last)return;
  await goAyah(last.s,last.a);
}

function getKhatm(){
  let k={done:{},goal:1,startedAt:Date.now(),updatedAt:Date.now()};
  try{k={...k,...JSON.parse(localStorage.getItem(KHATM_KEY)||'{}')};}catch(e){}
  k.done=k.done&&typeof k.done==='object'?k.done:{};
  k.goal=Math.max(1,Math.min(20,+k.goal||1));
  return k;
}
function saveKhatm(k){
  k.updatedAt=Date.now();
  localStorage.setItem(KHATM_KEY,JSON.stringify(k));
}
function khatmDoneCount(k=getKhatm()){
  return SS.reduce((n,s)=>n+(k.done[s.n]?1:0),0);
}
function renderKhatm(){
  const k=getKhatm(),done=khatmDoneCount(k),pct=Math.round(done/114*100),left=114-done;
  const surahs=document.getElementById('khatm-surahs'),percent=document.getElementById('khatm-percent'),fill=document.getElementById('khatm-fill'),status=document.getElementById('khatm-status'),goal=document.getElementById('khatm-goal'),list=document.getElementById('khatm-list');
  if(surahs)surahs.textContent=done+'/114';
  if(percent)percent.textContent=pct+'%';
  if(fill)fill.style.width=pct+'%';
  if(goal)goal.value=k.goal;
  if(status)status.textContent=left?left+' sourate'+(left>1?'s':'')+' restante'+(left>1?'s':'')+' · objectif '+k.goal+'/jour · environ '+Math.ceil(left/k.goal)+' jour'+(Math.ceil(left/k.goal)>1?'s':''):'Khatm terminé. Qu’Allah accepte votre lecture.';
  if(list)list.innerHTML=SS.map(s=>`
    <div class="kitem ${k.done[s.n]?'done':''} ${s.n===curS?'cur':''}" data-toggle-surah-read="${s.n}">
      <span class="kcheck">✓</span>
      <div class="kname">
        <div class="kname-ar">${s.ar}</div>
        <div class="kname-fr">${s.n}. ${s.fr}</div>
      </div>
      <div class="kmeta">${s.v} versets</div>
    </div>`).join('');
}
function setKhatmGoal(v){
  const k=getKhatm();
  k.goal=Math.max(1,Math.min(20,+v||1));
  saveKhatm(k);renderKhatm();
}
function toggleSurahRead(n){
  const k=getKhatm();
  k.done[n]=!k.done[n];
  if(!k.done[n])delete k.done[n];
  saveKhatm(k);
  renderKhatm();renderSList();
  toast(k.done[n]?'Sourate marquée comme lue':'Sourate retirée du Khatm');
}
function toggleCurrentSurahRead(){
  toggleSurahRead(curS);
}

function setLang(l){
  curLang=l;
  localStorage.setItem('aq_lang',l);
  localStorage.setItem('aq_home_lang',l);
  savePrefs();
  if(window.AQGlobal)window.AQGlobal.setLang(l);
  document.getElementById('lbfr').classList.toggle('on',l==='fr');
  document.getElementById('lben').classList.toggle('on',l==='en');
  vData.forEach((v,i)=>{
    const el=document.getElementById('vt'+v.numberInSurah);
    if(el)el.textContent=l==='fr'?(trFr[i]?.text||''):(trEn[i]?.text||'');
  });
  renderSList();
  const m=SS[curS-1],ms=document.getElementById('mobile-title-sub');
  if(ms)ms.textContent=curS+'. '+(curLang==='fr'?m.fr:m.en);
  updateDesktopSurahInfo();
}
function togglePhon(){
  showPhon=!showPhon;
  savePrefs();
  document.getElementById('lbph').classList.toggle('on',showPhon);
  document.querySelectorAll('.vph').forEach(e=>e.classList.toggle('show',showPhon));
}
function toggleTheme(){
  isLight=!isLight;
  const mode=isLight?'light':'dark';
  document.body.classList.toggle('light',isLight);
  document.body.dataset.theme=mode;
  document.getElementById('thbtn').innerHTML=nqIcon(isLight?'sun':'moon');
  localStorage.setItem('aq_theme',mode);
  localStorage.setItem('aq_home_theme',mode);
  savePrefs();
  if(window.AQGlobal)window.AQGlobal.setTheme(mode);
}

/* ── AUDIO ── */
function gN(s,a){return SS.slice(0,s-1).reduce((x,r)=>x+r.v,0)+a;}
function audioSource(globalAyah,reciter=curRec){
  return 'https://cdn.islamic.network/quran/audio/'+audioQuality+'/'+reciter+'/'+globalAyah+'.mp3';
}
function safePlayAudio(onFail){
  aud.playbackRate=audioSpeed;
  return aud.play().then(()=>{
    isPlaying=true;
    updPB();
  }).catch(err=>{
    isPlaying=false;
    updPB();
    if(onFail)onFail(err);
  });
}
function playV(n,keepRepeat=false){
  const cycle=repCur;
  stopAud(keepRepeat);curV=Math.max(1,Math.min(totV||n,n));
  if(keepRepeat)repCur=cycle;
  playCtx='verse';
  if(!keepRepeat)repCur=repMode==='off'?0:1;
  updateRepeatUI();
  saveLastRead(curS,n);
  const snap=verseSnapshot(n-1);if(snap)addRecentRead(snap);
  localStorage.setItem('aq_verses', (+localStorage.getItem('aq_verses')||0)+1);
  // Track top surah
  try {
    const key='aq_top_surahs';
    const tops=JSON.parse(localStorage.getItem(key)||'[]');
    const m=SS[curS-1];const idx=tops.findIndex(s=>s.name===m.fr);
    if(idx>=0)tops[idx].v++;else tops.push({name:m.fr,v:1});
    tops.sort((a,b)=>b.v-a.v);
    localStorage.setItem(key,JSON.stringify(tops.slice(0,10)));
  } catch(e){}
  const m=SS[curS-1];
  document.getElementById('pinfo').textContent=playerSurahLabel(curS,n);
  document.querySelectorAll('.vc').forEach(c=>c.classList.remove('playing'));
  resetVersePlayButtons();
  const card=document.getElementById('vc'+n),btn=document.getElementById('vb'+n);
  if(card){card.classList.add('playing');card.scrollIntoView({behavior:'smooth',block:'center'});}
  if(btn){btn.classList.add('on');setNqIconLabel(btn,'pause','En cours');}
  updateDesktopAyahActive();
  const gn=gN(curS,n);
  aud.onerror=null;
  aud.src=audioSource(gn);
  aud.onerror=()=>{
    if(curRec!=='ar.alafasy'){
      aud.onerror=()=>{isPlaying=false;updPB();toast('Audio indisponible pour ce verset');};
      aud.src=audioSource(gn,'ar.alafasy');
      safePlayAudio(()=>toast('Audio indisponible pour ce verset'));
      toast('Alafasy utilisé par défaut');
      return;
    }
    isPlaying=false;
    updPB();
    toast('Audio indisponible pour ce verset');
  };
  safePlayAudio(()=>toast('Impossible de lancer l’audio')).then(updateCurrentVersePlayButton);
}
function toggleVersePlay(n){
  n=Math.max(1,Math.min(totV||n,n));
  if(playCtx==='verse'&&curV===n&&aud.src){
    togglePlay();
    return;
  }
  playV(n);
}
function stopAud(keepRepeat=false){
  clearRepeatTimer();
  aud.onerror=null;
  aud.pause();aud.src='';isPlaying=false;updPB();
  playCtx='';
  if(!keepRepeat)repCur=0;
  updateRepeatUI();
  document.querySelectorAll('.vc').forEach(c=>c.classList.remove('playing'));
  resetVersePlayButtons();
  document.getElementById('progfill').style.width='0%';
  document.getElementById('tcur').textContent='0:00';
  document.getElementById('ttot').textContent='0:00';
}
function togglePlay(){
  if(!aud.src){playV(curV);return;}
  if(isPlaying){
    aud.pause();
    isPlaying=false;
    updPB();
    updateCurrentVersePlayButton();
    return;
  }
  safePlayAudio(()=>toast('Impossible de lancer l’audio')).then(updateCurrentVersePlayButton);
}
function updPB(){
  document.getElementById('playbtn').innerHTML=nqIcon(isPlaying?'pause':'play');
  const mb=document.getElementById('mbplaybtn');
  if(mb){mb.innerHTML=nqIcon(isPlaying?'pause':'play');mb.classList.toggle('on',isPlaying);}
  const bar=document.getElementById('pbar');
  if(bar)bar.classList.toggle('playing',isPlaying);
}
function prevV(){if(curV>1)playV(curV-1);else if(curS>1)loadSurah(curS-1).then(()=>setTimeout(()=>playV(totV),800));}
function nextV(){if(curV<totV)playV(curV+1);else if(curS<114)loadSurah(curS+1).then(()=>setTimeout(()=>playV(1),1200));}

aud.addEventListener('ended',()=>{
  isPlaying=false;updPB();
  if(playCtx!=='verse')return;
  handleVerseEnded();
});
aud.addEventListener('timeupdate',()=>{
  if(!aud.duration)return;
  document.getElementById('progfill').style.width=(aud.currentTime/aud.duration*100)+'%';
  document.getElementById('tcur').textContent=fmt(aud.currentTime);
  document.getElementById('ttot').textContent=fmt(aud.duration);
});
function seekA(e){if(!aud.duration)return;const r=e.currentTarget.getBoundingClientRect();aud.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*aud.duration;}

function replayV(){
  if(playCtx!=='verse'||!aud.src)return;
  try{aud.currentTime=0;}catch(e){}
  const btn=document.getElementById('vb'+curV);
  if(btn){btn.classList.add('on');setNqIconLabel(btn,'pause','En cours');}
  document.getElementById('progfill').style.width='0%';
  document.getElementById('tcur').textContent='0:00';
  safePlayAudio(()=>toast('Impossible de relancer l’audio')).then(updateCurrentVersePlayButton);
}
function repeatVerse(n){
  setRepeatMode('verse');
  playV(n);
}
function clearRepeatTimer(){if(repTimer){clearTimeout(repTimer);repTimer=null;}}
function clearActiveVerseUI(){
  document.querySelectorAll('.vc').forEach(c=>c.classList.remove('playing'));
  resetVersePlayButtons();
  updateDesktopAyahActive();
}
function handleVerseEnded(){
  if(repMode==='verse'){
    if(repCur>0&&repCur<repCount){
      repCur++;
      updateRepeatUI();
      repTimer=setTimeout(()=>{repTimer=null;replayV();},450);
      return;
    }
    repCur=repCount;updateRepeatUI();
    if(autoplay)nextV();else clearActiveVerseUI();
    return;
  }
  if(repMode==='range'){
    setRangeBounds(false);
    if(curV<rangeEnd){
      repTimer=setTimeout(()=>{repTimer=null;playV(curV+1,true);},450);
      return;
    }
    if(repCur>0&&repCur<repCount){
      repCur++;
      updateRepeatUI();
      repTimer=setTimeout(()=>{repTimer=null;playV(rangeStart,true);},650);
      return;
    }
    repCur=repCount;updateRepeatUI();
    clearActiveVerseUI();
    return;
  }
  if(autoplay)nextV();else clearActiveVerseUI();
}
function setRepeatMode(mode){
  repMode=['off','verse','range'].includes(mode)?mode:'off';
  if(repMode==='range'){
    if(rangeStart===1&&rangeEnd===1&&curV>1){rangeStart=curV;rangeEnd=curV;}
    setRangeBounds(false);
  }
  repCur=repMode==='off'?0:(playCtx==='verse'&&aud.src?Math.max(1,repCur||1):0);
  updateRepeatUI();
  savePrefs();
}
function setRep(n){
  clearRepeatTimer();
  repCount=[2,3,5,10].includes(+n)?+n:2;
  if(repMode==='off')repMode='verse';
  repCur=playCtx==='verse'&&aud.src?Math.max(1,repCur||1):0;
  updateRepeatUI();
  savePrefs();
}
function setRangeBounds(save=true){
  const s=document.getElementById('rangeStart'),e=document.getElementById('rangeEnd');
  const max=Math.max(1,totV||SS[curS-1]?.v||1);
  let a=Math.max(1,Math.min(max,+(s?.value)||rangeStart||curV||1));
  let b=Math.max(1,Math.min(max,+(e?.value)||rangeEnd||a));
  if(a>b)[a,b]=[b,a];
  rangeStart=a;rangeEnd=b;
  if(s){s.max=max;s.value=a;}
  if(e){e.max=max;e.value=b;}
  if(save)savePrefs();
  updateRepeatUI();
}
function updateRepeatUI(){
  const off=document.getElementById('rep-off'),verse=document.getElementById('rep-verse'),range=document.getElementById('rep-range'),box=document.getElementById('rangebox');
  if(off)off.classList.toggle('on',repMode==='off');
  if(verse)verse.classList.toggle('on',repMode==='verse');
  if(range)range.classList.toggle('on',repMode==='range');
  if(box)box.classList.toggle('show',repMode==='range');
  document.querySelectorAll('.rb[data-repeat-count]').forEach(b=>b.classList.toggle('on',+b.dataset.repeatCount===repCount&&repMode!=='off'));
  const c=document.getElementById('repcount');
  if(c){
    if(repMode==='off')c.textContent='';
    else if(repMode==='range')c.textContent=rangeStart+'-'+rangeEnd+' · '+(repCur||1)+'/'+repCount;
    else c.textContent=(repCur>0?repCur+'/':'×')+repCount;
  }
}
function toggleAuto(){autoplay=!autoplay;document.getElementById('autosw').classList.toggle('on',autoplay);savePrefs();}
function setArabicSize(v,save=true){
  arSize=Math.max(22,Math.min(42,+v||30));
  document.documentElement.style.setProperty('--ar-size',arSize+'px');
  const r=document.getElementById('ar-size'),lbl=document.getElementById('ar-size-val');
  if(r)r.value=arSize;
  if(lbl)lbl.textContent=arSize+'px';
  if(save)savePrefs();
}
function setAudioSpeed(v,save=true){
  audioSpeed=[.75,1,1.25,1.5].includes(+v)?+v:1;
  aud.playbackRate=audioSpeed;
  document.querySelectorAll('.speedbtn').forEach(b=>b.classList.toggle('on',+b.dataset.speed===audioSpeed));
  if(save)savePrefs();
}

/* ── RECITER ── */
function renderRec(){
  document.getElementById('rpgrid').innerHTML=RECS.map(r=>`
    <div class="ritem ${r.id===curRec?'on':''}" data-id="${r.id}" data-name="${r.name}" data-reciter>
      <div class="rav">${r.ar.split(' ').slice(0,2).map(w=>w[0]).join('')}</div>
      <div><div class="rname">${r.name}</div><div class="rstyle">${r.style}</div></div>
      <div class="rchk">✓</div>
    </div>`).join('');
  document.querySelectorAll('[data-quality]').forEach(b=>b.classList.toggle('on',+b.dataset.quality===audioQuality));
}
function selRec(id,name){const was=isPlaying,v=curV;curRec=id;savePrefs();stopAud();renderRec();document.getElementById('frec').textContent=name;closeRec();if(was)setTimeout(()=>playV(v),150);}
function setAudioQuality(q){
  audioQuality=[64,128,192].includes(+q)?+q:128;
  savePrefs();
  renderRec();
  toast('Qualité audio '+audioQuality+' kbps');
  if(isPlaying){
    const v=curV;
    stopAud();
    setTimeout(()=>playV(v),150);
  }
}
function openRec(){renderRec();document.getElementById('rpanel').classList.add('open');document.getElementById('overlay').classList.add('show');}
function closeRec(){document.getElementById('rpanel').classList.remove('open');document.getElementById('overlay').classList.remove('show');}

/* ── VERSET DU JOUR ── */
async function loadVod(){
  const d=new Date();const seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  const gn=(seed%6236)+1;vodGN=gn;
  let sN=1,aN=gn,cum=0;
  for(let i=0;i<SS.length;i++){if(cum+SS[i].v>=gn){sN=i+1;aN=gn-cum;break;}cum+=SS[i].v;}
  try{
    const [r1,r2,r3]=await Promise.all([
      fetch('https://api.alquran.cloud/v1/ayah/'+gn),
      fetch('https://api.alquran.cloud/v1/ayah/'+gn+'/fr.hamidullah'),
      fetch('https://api.alquran.cloud/v1/ayah/'+gn+'/en.transliteration'),
    ]);
    const [d1,d2,d3]=await Promise.all([r1.json(),r2.json(),r3.json()]);
    vodData={ar:d1.data.text,fr:d2.data.text,ph:d3.data.text,sN,aN};
    document.getElementById('vodar').textContent=vodData.ar;
    document.getElementById('vodtr').textContent=vodData.fr;
    document.getElementById('vodph').textContent=vodData.ph;
    document.getElementById('vodref').textContent=SS[sN-1].ar+' · '+sN+':'+aN;
  }catch(e){
    document.getElementById('vodar').textContent='بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ';
    document.getElementById('vodtr').textContent="Au nom d'Allah, le Tout Miséricordieux.";
  }
}
function playVod(){
  const btn=document.getElementById('vodplaybtn');
  if(aud.src.includes('/'+vodGN+'.mp3')&&isPlaying){aud.pause();isPlaying=false;updPB();setNqIconLabel(btn,'headphones','Écouter');return;}
  stopAud();
  aud.onerror=()=>{isPlaying=false;updPB();setNqIconLabel(btn,'headphones','Écouter');toast('Audio indisponible pour ce verset');};
  aud.src=audioSource(vodGN);
  safePlayAudio(()=>toast('Impossible de lancer l’audio')).then(()=>{if(isPlaying)setNqIconLabel(btn,'pause','En cours');});
  aud.addEventListener('ended',function h(){setNqIconLabel(btn,'headphones','Écouter');aud.removeEventListener('ended',h);},{once:true});
}
function toggleVodPh(){document.getElementById('vodph').classList.toggle('show');}

/* ── SHARE IMAGE ── */
const SH_THEMES={
  dark:{bg:'#0D0B07',bg2:'#1A1710',gold:'#C8A96E',tx:'#EAE0C8',tx2:'#A89B7A',bd:'rgba(200,169,110,.4)'},
  light:{bg:'#F5EDD8',bg2:'#EDE4C8',gold:'#8B6F3A',tx:'#1C1A14',tx2:'#5A4E35',bd:'rgba(139,111,58,.4)'},
  green:{bg:'#0D1F16',bg2:'#1B3526',gold:'#40916C',tx:'#D4EDE1',tx2:'#8FC4A8',bd:'rgba(64,145,108,.5)'},
};
function openShare(src){
  localStorage.setItem('aq_shares', (+localStorage.getItem('aq_shares')||0)+1);
  if(src==='vod'){if(!vodData)return;shareV={ar:vodData.ar,tr:vodData.fr,ref:SS[vodData.sN-1].ar+' — '+vodData.sN+':'+vodData.aN};}
  else{const i=curV-1;if(!vData.length)return;const tr=curLang==='fr'?(trFr[i]?.text||''):(trEn[i]?.text||'');shareV={ar:vData[i].text,tr,ref:SS[curS-1].ar+' — '+curS+':'+curV};}
  document.getElementById('sharewrap').classList.add('open');drawShare();
}
function closeShare(){document.getElementById('sharewrap').classList.remove('open');}
function setShareTheme(t,btn){shareTheme=t;document.querySelectorAll('.thbtn').forEach(b=>b.classList.remove('on'));btn.classList.add('on');drawShare();}
function drawShare(){
  const cv=document.getElementById('shcanvas'),ctx=cv.getContext('2d');
  const W=1080,H=1080,T=SH_THEMES[shareTheme];cv.width=W;cv.height=H;if(!shareV)return;
  ctx.fillStyle=T.bg;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=T.bg2;rr(ctx,60,60,W-120,H-120,24);ctx.fill();
  ctx.strokeStyle=T.bd;ctx.lineWidth=2;rr(ctx,60,60,W-120,H-120,24);ctx.stroke();
  ctx.fillStyle=T.gold;rr(ctx,60,60,W-120,5,3);ctx.fill();
  ctx.font='500 50px "Noto Naskh Arabic",serif';ctx.fillStyle=T.gold;ctx.textAlign='center';ctx.fillText('﷽',W/2,182);
  ctx.strokeStyle=T.bd;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(200,215);ctx.lineTo(W-200,215);ctx.stroke();
  ctx.font='600 54px "Noto Naskh Arabic",serif';ctx.fillStyle=T.tx;ctx.textAlign='center';
  const al=wt(ctx,shareV.ar,W-180);let y=350-(al.length-1)*28;
  al.forEach(l=>{ctx.fillText(l,W/2,y);y+=84;});
  ctx.strokeStyle=T.bd;ctx.beginPath();ctx.moveTo(200,y+12);ctx.lineTo(W-200,y+12);ctx.stroke();
  ctx.font='italic 33px Georgia,serif';ctx.fillStyle=T.tx2;ctx.textAlign='center';
  const tl=wt(ctx,shareV.tr,W-200);let y2=y+70;tl.forEach(l=>{ctx.fillText(l,W/2,y2);y2+=48;});
  ctx.font='500 28px "Noto Naskh Arabic",serif';ctx.fillStyle=T.gold;ctx.textAlign='center';
  ctx.fillText('— '+shareV.ref+' —',W/2,H-152);
  ctx.font='24px Georgia,serif';ctx.fillStyle=T.bd;ctx.fillText('al-quran1.vercel.app',W/2,H-105);
}
function dlShare(){drawShare();const a=document.createElement('a');a.download='verset-quran.png';a.href=document.getElementById('shcanvas').toDataURL('image/png');a.click();}

function currentVersePayload(){
  const i=Math.max(0,Math.min((curV||1)-1,(vData.length||1)-1));
  const meta=SS[curS-1]||SS[0];
  const ar=vData[i]?.text||'';
  const tr=curLang==='fr'?(trFr[i]?.text||''):(trEn[i]?.text||'');
  const ref=curS+':'+(i+1);
  const url=location.origin+location.pathname+'?s='+curS+'&a='+(i+1);
  return {i,meta,ar,tr,ref,url};
}
function openTafsir(){
  openTools('search');
  showTool('search');
  toast('Tafsir bientôt disponible. Recherche ouverte pour ce verset.');
}
function openNotes(){
  openTools('settings');
  showTool('settings');
  toast('Notes locales bientôt disponibles.');
}
async function shareCurrentVerse(){
  const v=currentVersePayload();
  const text=[v.ar,v.tr,'— '+v.meta.ar+' '+v.ref,v.url].filter(Boolean).join('\n\n');
  try{
    if(navigator.share)await navigator.share({title:'NoorQuran '+v.ref,text,url:v.url});
    else{await navigator.clipboard.writeText(text);toast('Lien et verset copiés ✓');}
  }catch(e){toast('Partage annulé');}
}
function downloadCurrentVerseImage(){
  openShare('verse');
  toast('Prévisualisation image ouverte');
}

/* ── VIDEO GENERATOR ── */
const VT={
  dark: {bg:'#0D0B07',bg2:'#1A1710',gold:'#C8A96E',tx:'#EAE0C8',tx2:'#A89B7A',bd:'rgba(200,169,110,.3)'},
  light:{bg:'#F5EDD8',bg2:'#EDE4C8',gold:'#8B6F3A',tx:'#1C1A14',tx2:'#5A4E35',bd:'rgba(139,111,58,.3)'},
  green:{bg:'#0D1F16',bg2:'#1B3526',gold:'#40916C',tx:'#D4EDE1',tx2:'#8FC4A8',bd:'rgba(64,145,108,.4)'},
  blue: {bg:'#050E1A',bg2:'#0C1E30',gold:'#5BA3D9',tx:'#C8DFF0',tx2:'#7BA8C8',bd:'rgba(91,163,217,.3)'},
};
let vidCfg={w:1080,h:1920,theme:'dark',anim:'fade',dur:10,content:'ar+tr'};
let vidV=null;

function openVid(src){
  if(src==='vod'){
    if(!vodData)return;
    vidV={ar:vodData.ar,tr:vodData.fr,ph:vodData.ph,ref:SS[vodData.sN-1].ar+' — '+vodData.sN+':'+vodData.aN};
  }else{
    const i=curV-1;if(!vData.length)return;
    const tr=curLang==='fr'?(trFr[i]?.text||''):(trEn[i]?.text||'');
    const ph=trPh[i]?.text||'';
    vidV={ar:vData[i].text,tr,ph,ref:SS[curS-1].ar+' — '+curS+':'+curV};
  }
  document.getElementById('vidwrap').classList.add('open');
  prevVid();
}
function closeVid(){document.getElementById('vidwrap').classList.remove('open');}

function setVO(type,btn){
  const grp=btn.closest('.vopts');
  grp.querySelectorAll('.vopt').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  if(type==='ratio'){vidCfg.w=+btn.dataset.w;vidCfg.h=+btn.dataset.h;}
  if(type==='theme')vidCfg.theme=btn.dataset.t;
  if(type==='anim')vidCfg.anim=btn.dataset.a;
  if(type==='content')vidCfg.content=btn.dataset.c;
  prevVid();
}

function drawFrame(ctx,W,H,t,cfg,v){
  const T=VT[cfg.theme];
  ctx.fillStyle=T.bg;ctx.fillRect(0,0,W,H);
  // geometric circles
  ctx.strokeStyle=T.bd;ctx.lineWidth=Math.max(1,W*.001);
  for(let r=W*.35;r<=W*.95;r+=W*.12){ctx.beginPath();ctx.arc(W/2,H/2,r,0,Math.PI*2);ctx.stroke();}
  // card
  const p=W*.07;ctx.fillStyle=T.bg2;rr(ctx,p,p,W-p*2,H-p*2,W*.03);ctx.fill();
  ctx.strokeStyle=T.bd;ctx.lineWidth=2;rr(ctx,p,p,W-p*2,H-p*2,W*.03);ctx.stroke();
  ctx.fillStyle=T.gold;rr(ctx,p,p,W-p*2,H*.007,W*.003);ctx.fill();
  // bismillah faint
  ctx.font='500 '+Math.round(W*.055)+'px "Noto Naskh Arabic",serif';
  ctx.fillStyle=T.gold;ctx.textAlign='center';ctx.globalAlpha=.2;
  ctx.fillText('﷽',W/2,H*.12);ctx.globalAlpha=1;
  // ornaments
  ctx.font=Math.round(W*.025)+'px serif';ctx.fillStyle=T.gold;
  ctx.fillText('✦',W/2-W*.12,H*.22);ctx.fillText('✦',W/2+W*.12,H*.22);
  // animation
  let alpha=1,ox=0,sc=1;
  if(cfg.anim==='fade'){alpha=t<.15?t/.15:t>.85?(1-t)/.15:1;}
  else if(cfg.anim==='slide'){ox=t<.2?(1-t/.2)*W*.06:0;alpha=t<.15?t/.15:1;}
  else if(cfg.anim==='zoom'){sc=t<.2?.85+(t/.2)*.15:t>.8?1-((t-.8)/.2)*.1:1;alpha=t<.15?t/.15:t>.85?(1-t)/.15:1;}
  ctx.save();ctx.globalAlpha=Math.max(0,Math.min(1,alpha));
  if(sc!==1){ctx.translate(W/2,H/2);ctx.scale(sc,sc);ctx.translate(-W/2,-H/2);}
  ctx.translate(ox,0);
  // arabic
  const as=Math.round(W*.056);ctx.font='600 '+as+'px "Noto Naskh Arabic",serif';
  ctx.fillStyle=T.tx;ctx.textAlign='center';ctx.direction='rtl';
  let ar=v.ar;
  if(cfg.anim==='typewriter'){const ch=[...v.ar];ar=ch.slice(0,Math.min(Math.floor(t*ch.length*1.3),ch.length)).join('');}
  const al=wt(ctx,ar,W-p*3.5);const alh=as*1.7;
  let ay=H*.38-al.length*alh*.5+as;
  al.forEach(l=>{ctx.fillText(l,W/2,ay);ay+=alh;});
  ctx.direction='ltr';
  const dy=ay+H*.025;
  ctx.strokeStyle=T.bd;ctx.lineWidth=Math.max(1,W*.001);
  ctx.beginPath();ctx.moveTo(W*.2,dy);ctx.lineTo(W*.8,dy);ctx.stroke();
  if(cfg.content!=='ar'){
    const sub=cfg.content==='ar+ph'?v.ph:v.tr;
    const ss=Math.round(W*.032);ctx.font='italic '+ss+'px Georgia,serif';
    ctx.fillStyle=T.tx2;ctx.textAlign='center';ctx.direction='ltr';
    const sl=wt(ctx,sub,W-p*3.5);let sy=dy+H*.04;
    sl.forEach(l=>{ctx.fillText(l,W/2,sy);sy+=ss*1.55;});
  }
  ctx.font='500 '+Math.round(W*.027)+'px "Noto Naskh Arabic",serif';
  ctx.fillStyle=T.gold;ctx.textAlign='center';ctx.fillText('— '+v.ref+' —',W/2,H*.82);
  ctx.font=Math.round(W*.021)+'px Georgia,serif';ctx.fillStyle=T.bd;
  ctx.fillText('al-quran1.vercel.app',W/2,H*.88);
  ctx.restore();
}

function prevVid(){
  if(!vidV)return;
  const cv=document.getElementById('vprev');
  const asp=vidCfg.w/vidCfg.h;
  const mw=260,mh=360;
  let pw,ph;
  if(asp>=1){pw=mw;ph=Math.round(mw/asp);}else{ph=mh;pw=Math.round(mh*asp);}
  cv.width=pw;cv.height=ph;cv.style.width=pw+'px';cv.style.height=ph+'px';
  drawFrame(cv.getContext('2d'),pw,ph,.5,vidCfg,vidV);
}

async function genVid(){
  if(!vidV)return;
  const W=Math.min(vidCfg.w,720),H=Math.min(vidCfg.h,1280);
  const FPS=30,total=vidCfg.dur*FPS;
  const btn=document.getElementById('vgenbtn');
  const prog=document.getElementById('vprog');
  const fill=document.getElementById('vprogfill');
  const lbl=document.getElementById('vproglbl');
  btn.disabled=true;prog.classList.add('show');
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d');
  const mime=MediaRecorder.isTypeSupported('video/webm;codecs=vp9')?'video/webm;codecs=vp9':'video/webm';
  const stream=cv.captureStream(FPS);
  const rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:4000000});
  const chunks=[];
  rec.ondataavailable=e=>{if(e.data.size>0)chunks.push(e.data);};
  rec.onstop=()=>{
    const blob=new Blob(chunks,{type:mime});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='verset-quran-'+Date.now()+'.webm';
    a.click();URL.revokeObjectURL(url);
    btn.disabled=false;prog.classList.remove('show');fill.style.width='0%';
    toast('Vidéo téléchargée ✓');
  };
  rec.start();
  for(let f=0;f<total;f++){
    drawFrame(ctx,W,H,f/(total-1),vidCfg,vidV);
    fill.style.width=Math.round(f/total*100)+'%';
    lbl.textContent='Rendu '+Math.round(f/total*100)+'% — '+f+'/'+total+' images';
    await new Promise(r=>setTimeout(r,1000/FPS));
  }
  rec.stop();
}

function initReaderStaticBindings(){
  document.addEventListener('click', event => {
    const dismiss = event.target.closest('[data-dismiss]');
    if (dismiss && event.target === dismiss) {
      if (dismiss.dataset.dismiss === 'share') closeShare();
      if (dismiss.dataset.dismiss === 'video') closeVid();
      return;
    }

    const toolButton = event.target.closest('[data-tool]');
    if (toolButton) {
      showTool(toolButton.dataset.tool);
      return;
    }

    const openToolButton = event.target.closest('[data-open-tool]');
    if (openToolButton) {
      openTools(openToolButton.dataset.openTool);
      return;
    }

    const langButton = event.target.closest('[data-reader-lang]');
    if (langButton) {
      setLang(langButton.dataset.readerLang);
      return;
    }

    const libraryButton = event.target.closest('[data-library-view]');
    if (libraryButton) {
      setLibraryView(libraryButton.dataset.libraryView);
      return;
    }

    const speedButton = event.target.closest('[data-speed]');
    if (speedButton) {
      setAudioSpeed(Number(speedButton.dataset.speed));
      return;
    }

    const shareThemeButton = event.target.closest('[data-share-theme]');
    if (shareThemeButton) {
      setShareTheme(shareThemeButton.dataset.shareTheme, shareThemeButton);
      return;
    }

    const openShareButton = event.target.closest('[data-open-share]');
    if (openShareButton) {
      openShare(openShareButton.dataset.openShare);
      return;
    }

    const openVideoButton = event.target.closest('[data-open-video]');
    if (openVideoButton) {
      openVid(openVideoButton.dataset.openVideo);
      return;
    }

    const videoOptionButton = event.target.closest('[data-vo-type]');
    if (videoOptionButton) {
      setVO(videoOptionButton.dataset.voType, videoOptionButton);
      return;
    }

    const repeatModeButton = event.target.closest('[data-repeat-mode]');
    if (repeatModeButton) {
      setRepeatMode(repeatModeButton.dataset.repeatMode);
      return;
    }

    const repeatCountButton = event.target.closest('[data-repeat-count]');
    if (repeatCountButton) {
      setRep(Number(repeatCountButton.dataset.repeatCount));
      return;
    }

    const verseActionButton = event.target.closest('[data-verse-action]');
    if (verseActionButton) {
      event.stopPropagation();
      const verse = Number(verseActionButton.dataset.verse);
      const index = Number(verseActionButton.dataset.index);
      const verseActions = {
        play: () => toggleVersePlay(verse),
        repeat: () => repeatVerse(verse),
        fav: () => toggleFav(index),
        bookmark: () => toggleBookmark(index),
        copy: () => copyV(index),
        share: () => { curV = verse; openShare('verse'); },
        video: () => { curV = verse; openVid('verse'); }
      };
      verseActions[verseActionButton.dataset.verseAction]?.();
      return;
    }

    const removeLibraryButton = event.target.closest('[data-remove-library]');
    if (removeLibraryButton) {
      event.stopPropagation();
      removeLibraryItem(removeLibraryButton.dataset.removeLibrary);
      return;
    }

    const reciterButton = event.target.closest('[data-reciter]');
    if (reciterButton) {
      selRec(reciterButton.dataset.id, reciterButton.dataset.name);
      return;
    }

    const qualityButton = event.target.closest('[data-quality]');
    if (qualityButton) {
      setAudioQuality(qualityButton.dataset.quality);
      return;
    }

    const surahButton = event.target.closest('[data-go-surah]');
    if (surahButton) {
      goS(Number(surahButton.dataset.goSurah));
      return;
    }

    const ayahButton = event.target.closest('[data-go-ayah]');
    if (ayahButton) {
      const [s, a] = ayahButton.dataset.goAyah.split(':').map(Number);
      goAyah(s, a);
      return;
    }

    const focusPlayButton = event.target.closest('[data-focus-play-verse]');
    if (focusPlayButton) {
      const verse = Number(focusPlayButton.dataset.focusPlayVerse);
      focusVerse(verse);
      toggleVersePlay(verse);
      return;
    }

    const toggleSurahReadButton = event.target.closest('[data-toggle-surah-read]');
    if (toggleSurahReadButton) {
      toggleSurahRead(Number(toggleSurahReadButton.dataset.toggleSurahRead));
      return;
    }

    const playVerseCard = event.target.closest('[data-play-verse]');
    if (playVerseCard) {
      toggleVersePlay(Number(playVerseCard.dataset.playVerse));
      return;
    }

    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;

    if (actionButton.dataset.action === 'seek-audio') {
      seekA(event);
      return;
    }

    const actions = {
      'open-panel': openPanel,
      'open-rec': openRec,
      'close-panel': closePanel,
      'close-rec': closeRec,
      'close-tools': closeTools,
      'close-all-panels': () => { closePanel(); closeRec(); closeTools(); },
      'close-share': closeShare,
      'close-video': closeVid,
      'download-share': dlShare,
      'toggle-phon': togglePhon,
      'toggle-theme': toggleTheme,
      'toggle-play': togglePlay,
      'previous-verse': prevV,
      'next-verse': nextV,
      'toggle-auto': toggleAuto,
      'focus-current-verse': () => focusVerse(curV),
      'open-tafsir': openTafsir,
      'open-notes': openNotes,
      'share-current-verse': shareCurrentVerse,
      'download-current-verse-image': downloadCurrentVerseImage,
      'play-vod': playVod,
      'toggle-vod-phon': toggleVodPh,
      'reload-current-surah': () => loadSurah(curS),
      'preview-video': prevVid,
      'generate-video': genVid,
      'resume-last': resumeLast,
      'track-don': trackDon,
      'toggle-current-surah-read': toggleCurrentSurahRead,
      'save-current-surah-offline': saveCurrentSurahOffline,
      'remove-current-surah-offline': removeCurrentSurahOffline
    };
    actions[actionButton.dataset.action]?.();
  });

  document.addEventListener('input', event => {
    const input = event.target.closest('[data-input]');
    if (!input) return;
    const handlers = {
      'filter-surahs': () => filterS(input.value),
      'search-quran': () => searchQuran(input.value),
      'khatm-goal': () => setKhatmGoal(input.value),
      'arabic-size': () => setArabicSize(Number(input.value)),
      'video-duration': () => {
        vidCfg.dur = Number(input.value);
        document.getElementById('vdur-val').textContent = input.value + 's';
        prevVid();
      }
    };
    handlers[input.dataset.input]?.();
  });

  document.addEventListener('change', event => {
    const input = event.target.closest('[data-change]');
    if (!input) return;
    const handlers = {
      'load-surah': () => loadSurah(Number(input.value)),
      'range-bounds': () => setRangeBounds()
    };
    handlers[input.dataset.change]?.();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReaderStaticBindings);
} else {
  initReaderStaticBindings();
}

/* ── COPY ── */
function copyV(i){
  const ar=vData[i]?.text||'';
  const tr=curLang==='fr'?(trFr[i]?.text||''):(trEn[i]?.text||'');
  navigator.clipboard.writeText(ar+'\n\n'+tr+'\n\n— '+SS[curS-1].ar+' '+curS+':'+(i+1)).then(()=>toast('Verset copié ✓')).catch(()=>{});
}

/* ── UTILS ── */
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();}
function wt(ctx,txt,mw){if(!txt)return[''];const words=txt.split(' ');const lines=[];let line='';for(const w of words){const t=line?line+' '+w:w;if(ctx.measureText(t).width>mw&&line){lines.push(line);line=w;}else line=t;}if(line)lines.push(line);return lines.slice(0,6);}
function fmt(s){if(!s||isNaN(s))return'0:00';return Math.floor(s/60)+':'+Math.floor(s%60).toString().padStart(2,'0');}
function toAr(n){return n.toString().replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}
