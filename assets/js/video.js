// NoorQuran video generator interactions.
/* STATE */
let exportFmt = 'mp4'; // 'mp4' or 'webm'
let ffmpegReady = false;
let ffmpegInstance = null; // ffmpeg.wasm 0.11.x

const cfg={w:1080,h:1920,theme:'dark',content:'ar+tr',rec:'ar.alafasy',fallback:8};
let vData=[],trFr=[],trPh=[];
let queue=[]; // [{id,ar,tr,ph,ref,globalN,surahN,ayahN}]
let selIds=new Set();

/* THEMES */
const TH={
  dark: {bg:'#060604',c1:'#0D0B07',c2:'#1A1710',gold:'#C8A96E',tx:'#EAE0C8',tx2:'#A89B7A'},
  light:{bg:'#E8DEC8',c1:'#F5EDD8',c2:'#EDE4C8',gold:'#8B6F3A',tx:'#1C1A14',tx2:'#5A4E35'},
  green:{bg:'#050F0A',c1:'#0D1F16',c2:'#1B3526',gold:'#40916C',tx:'#D4EDE1',tx2:'#8FC4A8'},
  blue: {bg:'#020810',c1:'#050E1A',c2:'#0C1E30',gold:'#5BA3D9',tx:'#C8DFF0',tx2:'#7BA8C8'},
};

/* SURAHS */
const SS=[
  {n:1,ar:'الفاتحة',fr:"L'Ouverture",v:7},{n:2,ar:'البقرة',fr:'La Vache',v:286},
  {n:3,ar:'آل عمران',fr:"La Famille d'Imran",v:200},{n:4,ar:'النساء',fr:'Les Femmes',v:176},
  {n:5,ar:'المائدة',fr:'La Table Servie',v:120},{n:6,ar:'الأنعام',fr:'Les Bestiaux',v:165},
  {n:7,ar:'الأعراف',fr:'Les Murailles',v:206},{n:8,ar:'الأنفال',fr:'Le Butin',v:75},
  {n:9,ar:'التوبة',fr:'Le Repentir',v:129},{n:10,ar:'يونس',fr:'Jonas',v:109},
  {n:11,ar:'هود',fr:'Houd',v:123},{n:12,ar:'يوسف',fr:'Joseph',v:111},
  {n:13,ar:'الرعد',fr:'Le Tonnerre',v:43},{n:14,ar:'إبراهيم',fr:'Abraham',v:52},
  {n:15,ar:'الحجر',fr:'Al-Hijr',v:99},{n:16,ar:'النحل',fr:'Les Abeilles',v:128},
  {n:17,ar:'الإسراء',fr:'Le Voyage Nocturne',v:111},{n:18,ar:'الكهف',fr:'La Caverne',v:110},
  {n:19,ar:'مريم',fr:'Marie',v:98},{n:20,ar:'طه',fr:'Ta-Ha',v:135},
  {n:21,ar:'الأنبياء',fr:'Les Prophètes',v:112},{n:22,ar:'الحج',fr:'Le Pèlerinage',v:78},
  {n:23,ar:'المؤمنون',fr:'Les Croyants',v:118},{n:24,ar:'النور',fr:'La Lumière',v:64},
  {n:25,ar:'الفرقان',fr:'Le Discernement',v:77},{n:26,ar:'الشعراء',fr:'Les Poètes',v:227},
  {n:27,ar:'النمل',fr:'Les Fourmis',v:93},{n:28,ar:'القصص',fr:'Le Récit',v:88},
  {n:29,ar:'العنكبوت',fr:"L'Araignée",v:69},{n:30,ar:'الروم',fr:'Les Romains',v:60},
  {n:31,ar:'لقمان',fr:'Luqman',v:34},{n:32,ar:'السجدة',fr:'La Prosternation',v:30},
  {n:33,ar:'الأحزاب',fr:'Les Coalisés',v:73},{n:34,ar:'سبأ',fr:'Saba',v:54},
  {n:35,ar:'فاطر',fr:'Le Créateur',v:45},{n:36,ar:'يس',fr:'Ya-Sin',v:83},
  {n:37,ar:'الصافات',fr:'Ceux qui se rangent',v:182},{n:38,ar:'ص',fr:'Sad',v:88},
  {n:39,ar:'الزمر',fr:'Les Groupes',v:75},{n:40,ar:'غافر',fr:'Le Pardonneur',v:85},
  {n:41,ar:'فصلت',fr:'Exposés en détail',v:54},{n:42,ar:'الشورى',fr:'La Consultation',v:53},
  {n:43,ar:'الزخرف',fr:"L'Ornement",v:89},{n:44,ar:'الدخان',fr:'La Fumée',v:59},
  {n:45,ar:'الجاثية',fr:"L'Agenouillée",v:37},{n:46,ar:'الأحقاف',fr:'Les Dunes',v:35},
  {n:47,ar:'محمد',fr:'Muhammad',v:38},{n:48,ar:'الفتح',fr:'La Victoire',v:29},
  {n:49,ar:'الحجرات',fr:'Les Appartements',v:18},{n:50,ar:'ق',fr:'Qaf',v:45},
  {n:51,ar:'الذاريات',fr:'Les Vents',v:60},{n:52,ar:'الطور',fr:'Le Mont',v:49},
  {n:53,ar:'النجم',fr:"L'Étoile",v:62},{n:54,ar:'القمر',fr:'La Lune',v:55},
  {n:55,ar:'الرحمن',fr:'Le Tout Miséricordieux',v:78},{n:56,ar:'الواقعة',fr:"L'Événement",v:96},
  {n:57,ar:'الحديد',fr:'Le Fer',v:29},{n:58,ar:'المجادلة',fr:'La Discussion',v:22},
  {n:59,ar:'الحشر',fr:"L'Exode",v:24},{n:60,ar:'الممتحنة',fr:'La Femme éprouvée',v:13},
  {n:61,ar:'الصف',fr:'Le Rang',v:14},{n:62,ar:'الجمعة',fr:'Le Vendredi',v:11},
  {n:63,ar:'المنافقون',fr:'Les Hypocrites',v:11},{n:64,ar:'التغابن',fr:'La Déception',v:18},
  {n:65,ar:'الطلاق',fr:'Le Divorce',v:12},{n:66,ar:'التحريم',fr:"L'Interdiction",v:12},
  {n:67,ar:'الملك',fr:'La Royauté',v:30},{n:68,ar:'القلم',fr:'La Plume',v:52},
  {n:69,ar:'الحاقة',fr:"L'Inévitable",v:52},{n:70,ar:'المعارج',fr:'Les Degrés',v:44},
  {n:71,ar:'نوح',fr:'Noé',v:28},{n:72,ar:'الجن',fr:'Les Djinns',v:28},
  {n:73,ar:'المزمل',fr:"L'Enveloppé",v:20},{n:74,ar:'المدثر',fr:'Celui qui se couvre',v:56},
  {n:75,ar:'القيامة',fr:'La Résurrection',v:40},{n:76,ar:'الإنسان',fr:"L'Homme",v:31},
  {n:77,ar:'المرسلات',fr:'Les Envoyés',v:50},{n:78,ar:'النبأ',fr:"L'Annonce",v:40},
  {n:79,ar:'النازعات',fr:'Ceux qui arrachent',v:46},{n:80,ar:'عبس',fr:"Il s'est renfrogné",v:42},
  {n:81,ar:'التكوير',fr:"L'Enroulement",v:29},{n:82,ar:'الانفطار',fr:'La Déchirure',v:19},
  {n:83,ar:'المطففين',fr:'Les Fraudeurs',v:36},{n:84,ar:'الانشقاق',fr:'La Déchirure du ciel',v:25},
  {n:85,ar:'البروج',fr:'Les Constellations',v:22},{n:86,ar:'الطارق',fr:"L'Astre nocturne",v:17},
  {n:87,ar:'الأعلى',fr:'Le Très-Haut',v:19},{n:88,ar:'الغاشية',fr:"L'Enveloppante",v:26},
  {n:89,ar:'الفجر',fr:"L'Aurore",v:30},{n:90,ar:'البلد',fr:'La Cité',v:20},
  {n:91,ar:'الشمس',fr:'Le Soleil',v:15},{n:92,ar:'الليل',fr:'La Nuit',v:21},
  {n:93,ar:'الضحى',fr:'La Matinée',v:11},{n:94,ar:'الشرح',fr:"L'Expansion",v:8},
  {n:95,ar:'التين',fr:'Le Figuier',v:8},{n:96,ar:'العلق',fr:'Le Caillot',v:19},
  {n:97,ar:'القدر',fr:'La Nuit du Destin',v:5},{n:98,ar:'البينة',fr:'La Preuve',v:8},
  {n:99,ar:'الزلزلة',fr:'Le Séisme',v:8},{n:100,ar:'العاديات',fr:'Les Coursiers',v:11},
  {n:101,ar:'القارعة',fr:'Le Fracas',v:11},{n:102,ar:'التكاثر',fr:'La Rivalité',v:8},
  {n:103,ar:'العصر',fr:'Le Temps',v:3},{n:104,ar:'الهمزة',fr:'Le Calomniateur',v:9},
  {n:105,ar:'الفيل',fr:"L'Éléphant",v:5},{n:106,ar:'قريش',fr:'Les Quraysh',v:4},
  {n:107,ar:'الماعون',fr:"L'Ustensile",v:7},{n:108,ar:'الكوثر',fr:"L'Abondance",v:3},
  {n:109,ar:'الكافرون',fr:'Les Mécréants',v:6},{n:110,ar:'النصر',fr:'Le Secours',v:3},
  {n:111,ar:'المسد',fr:'Les Fibres',v:5},{n:112,ar:'الإخلاص',fr:'La Dévotion Pure',v:4},
  {n:113,ar:'الفلق',fr:"L'Aube",v:5},{n:114,ar:'الناس',fr:'Les Hommes',v:6},
];

/* INIT */
window.addEventListener('load',()=>{
  document.getElementById('ssel').innerHTML=SS.map(s=>`<option value="${s.n}">${s.n}. ${s.ar} — ${s.fr}</option>`).join('');
  loadSurah();
});

/* TABS */
function showTab(n){
  [1,2,3].forEach(i=>{
    document.getElementById('t'+i).classList.toggle('on',i===n);
    document.getElementById('b'+i).style.display=i===n?'block':'none';
  });
  if(n===3){renderQueue();renderTimeline();}
  if(n===2){drawPrev();}
}

/* LOAD SURAH */
async function loadSurah(){
  const n=+document.getElementById('ssel').value;
  vData=[];trFr=[];trPh=[];
  document.getElementById('vst').style.display='flex';
  document.getElementById('vlist').style.display='none';
  document.getElementById('selrow').style.display='none';
  try{
    const[r1,r2,r3]=await Promise.all([
      fetch('https://api.alquran.cloud/v1/surah/'+n),
      fetch('https://api.alquran.cloud/v1/surah/'+n+'/fr.hamidullah'),
      fetch('https://api.alquran.cloud/v1/surah/'+n+'/en.transliteration'),
    ]);
    const[d1,d2,d3]=await Promise.all([r1.json(),r2.json(),r3.json()]);
    vData=d1.data.ayahs;trFr=d2.data.ayahs;trPh=d3.data.ayahs;
    document.getElementById('vst').style.display='none';
    document.getElementById('vlist').style.display='block';
    document.getElementById('selrow').style.display='flex';
    renderVList(n);
  }catch(e){
    document.getElementById('vst').innerHTML='<span style="color:var(--red)">Erreur de chargement</span>';
  }
}

function renderVList(sN){
  document.getElementById('vitems').innerHTML=vData.map((v,i)=>{
    const id=sN+'_'+v.numberInSurah;
    const on=selIds.has(id);
    return `<div class="vli ${on?'on':''}" id="vli${id}" onclick="toggleV(${sN},${v.numberInSurah},${i})">
      <div class="vli-n">${v.numberInSurah}</div>
      <div class="vli-ar">${v.text}</div>
      <div class="vck">${on?'✓':''}</div>
    </div>`;
  }).join('');
}

function toggleV(sN,aN,i){
  const id=sN+'_'+aN;
  const gn=SS.slice(0,sN-1).reduce((a,s)=>a+s.v,0)+aN;
  if(selIds.has(id)){
    selIds.delete(id);
    queue=queue.filter(q=>q.id!==id);
  }else{
    selIds.add(id);
    queue.push({id,ar:vData[i].text,tr:trFr[i]?.text||'',ph:trPh[i]?.text||'',
      ref:SS[sN-1].ar+' '+sN+':'+aN,globalN:gn,surahN:sN,ayahN:aN});
  }
  const el=document.getElementById('vli'+id);
  if(el){el.classList.toggle('on',selIds.has(id));el.querySelector('.vck').textContent=selIds.has(id)?'✓':'';}
  updBadge();drawPrev();
}

function selAll(){
  const n=+document.getElementById('ssel').value;
  vData.forEach((v,i)=>{
    const id=n+'_'+v.numberInSurah;
    if(!selIds.has(id)){
      selIds.add(id);
      const gn=SS.slice(0,n-1).reduce((a,s)=>a+s.v,0)+v.numberInSurah;
      queue.push({id,ar:v.text,tr:trFr[i]?.text||'',ph:trPh[i]?.text||'',
        ref:SS[n-1].ar+' '+n+':'+v.numberInSurah,globalN:gn,surahN:n,ayahN:v.numberInSurah});
    }
  });
  renderVList(n);updBadge();drawPrev();
}
function deselAll(){
  const n=+document.getElementById('ssel').value;
  vData.forEach(v=>{const id=n+'_'+v.numberInSurah;selIds.delete(id);queue=queue.filter(q=>q.id!==id);});
  renderVList(n);updBadge();drawPrev();
}
function updBadge(){
  const c=queue.length;
  document.getElementById('qbadge').textContent=c?'('+c+')':'';
  document.getElementById('qcnt').textContent=c;
}

/* QUEUE */
function renderQueue(){
  const el=document.getElementById('qlist');
  if(!queue.length){el.innerHTML='<div class="qempty">Aucun verset.<br>Allez dans ① pour en sélectionner.</div>';document.getElementById('qtot').textContent='';return;}
  el.innerHTML=queue.map((v,i)=>`
    <div class="qi" draggable="true" data-i="${i}"
      ondragstart="dstart(event,${i})" ondragover="dover(event)" ondrop="ddrop(event,${i})">
      <span class="qi-i">${i+1}</span>
      <span class="qi-ar">${v.ar}</span>
      <span class="qi-ref">${v.ref}</span>
      <button class="qi-rm" onclick="rmQ(${i})">${window.NQIcon?NQIcon.svg('close'):''}</button>
    </div>`).join('');
  document.getElementById('qtot').textContent=queue.length+' verset'+(queue.length>1?'s':'');
}
function rmQ(i){
  selIds.delete(queue[i].id);queue.splice(i,1);
  renderQueue();updBadge();drawPrev();
  const n=+document.getElementById('ssel').value;renderVList(n);
}

/* DRAG */
let di=null;
function dstart(e,i){di=i;e.dataTransfer.effectAllowed='move';}
function dover(e){e.preventDefault();}
function ddrop(e,to){
  e.preventDefault();if(di===null||di===to)return;
  const m=queue.splice(di,1)[0];queue.splice(to,0,m);di=null;
  renderQueue();renderTimeline();
}

/* TIMELINE */
function renderTimeline(){
  const tl=document.getElementById('tlwrap');
  const it=document.getElementById('tlitems');
  if(!queue.length){tl.style.display='none';return;}
  tl.style.display='block';
  it.innerHTML=queue.map((v,i)=>`
    <div class="tli" id="tli${i}">
      <div class="tldot"></div>
      <div class="tlref">${v.ref}</div>
      <div class="tlbar"><div class="tlfill" id="tlf${i}"></div></div>
      <div class="tldur" id="tld${i}">—</div>
    </div>`).join('');
}

/* OPTIONS */
function setO(type,btn){
  btn.closest('.ogrp').querySelectorAll('.o').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  if(type==='ratio'){cfg.w=+btn.dataset.w;cfg.h=+btn.dataset.h;}
  if(type==='theme')  cfg.theme  =btn.dataset.t;
  if(type==='content')cfg.content=btn.dataset.c;
  if(type==='rec')    cfg.rec    =btn.dataset.r;
  if(type==='fmt')    exportFmt  =btn.dataset.f;
  drawPrev();
}

/* DRAW FRAME */
function drawFrame(ctx,W,H,verse,t,audioT){
  const T=TH[cfg.theme];
  ctx.fillStyle=T.bg;ctx.fillRect(0,0,W,H);

  // Animated particles
  for(let i=0;i<55;i++){
    const x=((i*137.5+t*W*.09*(i%3?1:-1))%W+W)%W;
    const y=((i*97.3+t*H*.05*(i%2?1:-1))%H+H)%H;
    const a=.15+.25*Math.sin(t*Math.PI*4+i);
    ctx.beginPath();ctx.arc(x,y,.4+(i%3)*.35,0,Math.PI*2);
    ctx.fillStyle=T.gold+(Math.round(a*255).toString(16).padStart(2,'0'));
    ctx.fill();
  }

  // Card
  const px=W*.06,py=H*.035;
  ctx.fillStyle=T.c1+'EE';rr(ctx,px,py,W-px*2,H-py*2,W*.04);ctx.fill();
  ctx.strokeStyle=T.gold+'44';ctx.lineWidth=Math.max(1,W*.002);
  rr(ctx,px,py,W-px*2,H-py*2,W*.04);ctx.stroke();

  // Top audio bar
  const bw=(W-px*2)*Math.max(0,Math.min(1,audioT));
  ctx.fillStyle=T.gold+'22';rr(ctx,px,py,W-px*2,H*.006,W*.003);ctx.fill();
  if(bw>0){ctx.fillStyle=T.gold;rr(ctx,px,py,bw,H*.006,W*.003);ctx.fill();}

  // Bismillah faint
  ctx.font='500 '+Math.round(W*.044)+'px "Noto Naskh Arabic",serif';
  ctx.fillStyle=T.gold;ctx.textAlign='center';ctx.globalAlpha=.1;
  ctx.fillText('﷽',W/2,H*.11);ctx.globalAlpha=1;

  // Ornaments
  ctx.font=Math.round(W*.019)+'px serif';ctx.fillStyle=T.gold;
  ctx.fillText('✦',W/2-W*.1,H*.185);ctx.fillText('✦',W/2+W*.1,H*.185);

  // Arabic — word by word reveal
  const words=verse.ar.split(' ');
  const shown=Math.max(1,Math.ceil(Math.min(1,t/.62)*words.length));
  const visAr=words.slice(0,shown).join(' ');
  const as=Math.round(W*.052);
  ctx.font='600 '+as+'px "Noto Naskh Arabic",serif';
  ctx.fillStyle=T.tx;ctx.textAlign='center';ctx.direction='rtl';
  if(shown<words.length){ctx.shadowColor=T.gold;ctx.shadowBlur=W*.012;}
  const al=wt(ctx,visAr,W-px*3.2);
  const alh=as*1.6;
  let ay=H*.36-(al.length*alh)/2+as;
  al.forEach(l=>{ctx.fillText(l,W/2,ay);ay+=alh;});
  ctx.shadowBlur=0;ctx.direction='ltr';

  // Divider
  const dy=ay+H*.02;
  ctx.strokeStyle=T.gold+'55';ctx.lineWidth=Math.max(1,W*.001);
  ctx.beginPath();ctx.moveTo(W*.22,dy);ctx.lineTo(W*.78,dy);ctx.stroke();

  // Translation progressive
  if(cfg.content!=='ar'){
    const sub=cfg.content==='ar+ph'?verse.ph:verse.tr;
    const ss=Math.round(W*.028);
    ctx.font='italic '+ss+'px Georgia,serif';
    ctx.fillStyle=T.tx2;ctx.textAlign='center';
    const sl=wt(ctx,sub,W-px*3.2);
    const tp=Math.max(0,Math.min(1,(t-.5)/.38));
    const ns=Math.ceil(tp*sl.length);
    let sy=dy+H*.037;
    sl.slice(0,ns).forEach((l,li)=>{
      ctx.globalAlpha=Math.min(1,(tp*sl.length-li)*2.5);
      ctx.fillText(l,W/2,sy);sy+=ss*1.5;
    });
    ctx.globalAlpha=1;
  }

  // Reference
  const ra=Math.max(0,Math.min(1,(t-.76)/.2));
  if(ra>0){
    ctx.globalAlpha=ra;
    ctx.font='500 '+Math.round(W*.024)+'px "Noto Naskh Arabic",serif';
    ctx.fillStyle=T.gold;ctx.textAlign='center';
    ctx.fillText('— '+verse.ref+' —',W/2,H*.82);
    ctx.font=Math.round(W*.018)+'px Georgia,serif';
    ctx.fillStyle=T.gold+'88';
    ctx.fillText('al-quran1.vercel.app',W/2,H*.87);
    ctx.globalAlpha=1;
  }

  // Bottom progress bar
  const bh=H*.005,bx=px,by=H-py-bh;
  ctx.fillStyle=T.c2;rr(ctx,bx,by,W-px*2,bh,bh/2);ctx.fill();
  if(bw>0){ctx.fillStyle=T.gold;rr(ctx,bx,by,bw,bh,bh/2);ctx.fill();}
}

/* PREVIEW */
function drawPrev(){
  const cv=document.getElementById('pcv');
  const asp=cfg.w/cfg.h;
  const mw=Math.min(340,window.innerWidth-50);
  const mh=Math.min(480,window.innerHeight-180);
  let pw,ph;
  if(asp>=1){pw=mw;ph=Math.round(mw/asp);}else{ph=mh;pw=Math.round(mh*asp);}
  cv.width=pw;cv.height=ph;
  const v=queue.length>0?queue[0]:{ar:'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ',tr:"Au nom d'Allah...",ph:'Bismi Allah...',ref:'Aperçu'};
  drawFrame(cv.getContext('2d'),pw,ph,v,.55,.55);
  document.getElementById('pmeta').textContent=
    queue.length?queue.length+' verset(s) · '+cfg.w+'×'+cfg.h:'Aucun verset sélectionné';
  renderTimeline();
}

/* GENERATE */
async function generate(){
  if(!queue.length){alert('Sélectionnez au moins un verset.');return;}

  const btn=document.getElementById('genbtn');
  const pw=document.getElementById('progwrap');
  const pf=document.getElementById('pfill');
  const pl=document.getElementById('plbl');
  const pp=document.getElementById('pphase');
  const vp=document.getElementById('vprogs');

  btn.disabled=true;pw.classList.add('on');

  const W=Math.min(cfg.w,720);
  const H=Math.min(cfg.h,Math.round(720*cfg.h/cfg.w));
  const FPS=30;

  // Per-verse progress UI
  vp.innerHTML=queue.map((v,i)=>`
    <div class="vpi">
      <span class="vpref">${v.ref}</span>
      <div class="vpbar"><div class="vpfill" id="vpf${i}"></div></div>
      <span class="vpst" id="vpst${i}">⏳</span>
    </div>`).join('');

  // STEP 1: Load all audio
  pp.textContent='Chargement de l\'audio...';
  pf.style.width='5%';

  const ACtx=window.AudioContext||window.webkitAudioContext;
  const actx=new ACtx();
  const bufs=[];
  const durs=[];

  for(let i=0;i<queue.length;i++){
    const v=queue[i];
    const url='https://cdn.islamic.network/quran/audio/128/'+cfg.rec+'/'+v.globalN+'.mp3';
    document.getElementById('vpst'+i).textContent='⬇';
    try{
      const resp=await fetch(url);
      const ab=await resp.arrayBuffer();
      const buf=await actx.decodeAudioData(ab);
      bufs.push(buf);durs.push(buf.duration);
      document.getElementById('vpf'+i).style.width='100%';
      document.getElementById('vpf'+i).classList.add('done');
      document.getElementById('vpst'+i).textContent='✓ '+buf.duration.toFixed(1)+'s';
      const td=document.getElementById('tld'+i);if(td)td.textContent=buf.duration.toFixed(1)+'s';
    }catch(e){
      bufs.push(null);durs.push(cfg.fallback);
      document.getElementById('vpst'+i).textContent='⚠ '+cfg.fallback+'s';
      const td=document.getElementById('tld'+i);if(td)td.textContent=cfg.fallback+'s';
    }
    pf.style.width=Math.round(5+(i+1)/queue.length*22)+'%';
    pl.textContent='Audio '+(i+1)+'/'+queue.length+' chargé';
  }

  const totDur=durs.reduce((a,b)=>a+b,0);
  const totF=Math.round(totDur*FPS);
  pp.textContent='Durée totale : '+totDur.toFixed(1)+'s · '+totF+' images';
  pf.style.width='28%';

  // STEP 2: Setup canvas + audio routing
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d');
  const dest=actx.createMediaStreamDestination();

  // Schedule all audio buffers consecutively
  let t0=actx.currentTime+0.15;
  for(let i=0;i<bufs.length;i++){
    if(bufs[i]){
      const src=actx.createBufferSource();
      src.buffer=bufs[i];
      src.connect(dest);
      src.start(t0);
    }
    t0+=(bufs[i]?bufs[i].duration:durs[i]);
  }

  const mime=MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ?'video/webm;codecs=vp9':'video/webm';
  const stream=new MediaStream([
    ...cv.captureStream(FPS).getVideoTracks(),
    ...dest.stream.getAudioTracks(),
  ]);
  const rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:6000000});
  const chunks=[];
  rec.ondataavailable=e=>{if(e.data.size>0)chunks.push(e.data);};
  rec.onstop=async ()=>{
    const webmBlob=new Blob(chunks,{type:mime});
    if(exportFmt==='webm'){
      const url=URL.createObjectURL(webmBlob);
      const a=document.createElement('a');
      a.href=url;a.download='quran-'+queue.length+'v-'+Date.now()+'.webm';
      a.click();URL.revokeObjectURL(url);
      btn.disabled=false;pw.classList.remove('on');
      pf.style.width='0%';pp.textContent='';
      localStorage.setItem('aq_videos',(+localStorage.getItem('aq_videos')||0)+1);
      alert('✅ Vidéo WebM prête — '+queue.length+' verset(s), '+totDur.toFixed(1)+'s');
    } else {
      // Convert WebM → MP4 via ffmpeg.wasm
      await convertToMp4(webmBlob, btn, pw, pf, pl, pp, queue.length, totDur);
    }
  };

  // STEP 3: Render
  pp.textContent='Rendu en cours...';
  rec.start();
  await new Promise(r=>setTimeout(r,160));

  let done=0,vOff=0;
  for(let vi=0;vi<queue.length;vi++){
    const v=queue[vi];
    const vf=Math.round(durs[vi]*FPS);

    // Highlight timeline
    const tli=document.getElementById('tli'+vi);
    if(tli)tli.classList.add('cur');
    if(vi>0){const p=document.getElementById('tli'+(vi-1));if(p){p.classList.remove('cur');p.classList.add('done');}}

    for(let f=0;f<vf;f++){
      const t=f/(vf-1||1);
      const at=(vOff+f)/(totF-1||1);
      const tf=document.getElementById('tlf'+vi);
      if(tf)tf.style.width=(t*100)+'%';
      drawFrame(ctx,W,H,v,t,at);
      done++;
      const pct=Math.round(28+done/totF*70);
      pf.style.width=pct+'%';
      pl.textContent=pct+'% — verset '+(vi+1)+'/'+queue.length+' · '+(f+1)+'/'+vf;
      await new Promise(r=>setTimeout(r,0));
    }

    const tli2=document.getElementById('tli'+vi);
    if(tli2){tli2.classList.remove('cur');tli2.classList.add('done');}
    const tf2=document.getElementById('tlf'+vi);if(tf2)tf2.style.width='100%';
    vOff+=vf;
  }

  pf.style.width='100%';pp.textContent='Finalisation...';pl.textContent='100%';
  await new Promise(r=>setTimeout(r,250));
  rec.stop();
}

/* ── MP4 CONVERSION VIA FFMPEG.WASM 0.11 ── */
async function convertToMp4(webmBlob, btn, pw, pf, pl, pp, nVerses, totDur) {
  pp.textContent = 'Conversion en MP4...';
  pf.style.width = '98%';

  try {
    if (typeof FFmpeg === 'undefined' || !FFmpeg.createFFmpeg) {
      throw new Error('ffmpeg.wasm non charge - verifiez votre connexion internet');
    }
    // Note: ffmpeg 0.11.x works without crossOriginIsolated

    if (!ffmpegInstance) {
      ffmpegInstance = FFmpeg.createFFmpeg({
        log: false,
        progress: ({ ratio }) => {
          if (ratio > 0) pl.textContent = 'Conversion ' + Math.round(ratio * 100) + '%...';
        },
        corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js', // v0.11 compatible
      });
    }

    if (!ffmpegReady) {
      pp.textContent = 'Chargement ffmpeg (~15s première fois)...';
      pl.textContent = 'Patientez...';
      await ffmpegInstance.load();
      ffmpegReady = true;
    }

    pp.textContent = 'Écriture du fichier source...';
    const { fetchFile } = FFmpeg;
    ffmpegInstance.FS('writeFile', 'in.webm', await fetchFile(webmBlob));

    pp.textContent = 'Conversion WebM → MP4...';
    pl.textContent = 'En cours (1-2 min)...';

    await ffmpegInstance.run(
      '-i', 'in.webm',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-crf', '23',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      '-y', 'out.mp4'
    );

    const data = ffmpegInstance.FS('readFile', 'out.mp4');
    const mp4Blob = new Blob([data.buffer], { type: 'video/mp4' });
    const url = URL.createObjectURL(mp4Blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quran-' + nVerses + 'v-' + Date.now() + '.mp4';
    a.click();
    URL.revokeObjectURL(url);

    try { ffmpegInstance.FS('unlink', 'in.webm'); } catch(e) {}
    try { ffmpegInstance.FS('unlink', 'out.mp4'); } catch(e) {}

    btn.disabled = false;
    pw.classList.remove('on');
    pf.style.width = '0%';
    pp.textContent = '';
    localStorage.setItem('aq_videos', (+localStorage.getItem('aq_videos')||0)+1);
    alert('Video MP4 prete ! ' + nVerses + ' verset(s), ' + totDur.toFixed(1) + 's');

  } catch(err) {
    console.error('FFmpeg error:', err);
    pp.textContent = 'MP4 echoue — WebM telecharge...';
    pl.textContent = String(err.message || err).slice(0, 60);
    const url = URL.createObjectURL(webmBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quran-' + nVerses + 'v-' + Date.now() + '.webm';
    a.click();
    URL.revokeObjectURL(url);
    btn.disabled = false;
    pw.classList.remove('on');
    pf.style.width = '0%';
    alert('MP4 indisponible. Fichier WebM telecharge. Ouvrez avec VLC ou Chrome.\nErreur: ' + (err.message || err));
  }
}

/* UTILS */
function rr(ctx,x,y,w,h,r){
  if(w<=0||h<=0)return;r=Math.min(r,Math.abs(w)/2,Math.abs(h)/2);
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();
}
function wt(ctx,txt,mw){
  if(!txt)return[''];const w=txt.split(' ');const l=[];let c='';
  for(const wd of w){const t=c?c+' '+wd:wd;if(ctx.measureText(t).width>mw&&c){l.push(c);c=wd;}else c=t;}
  if(c)l.push(c);return l.slice(0,7);
}
