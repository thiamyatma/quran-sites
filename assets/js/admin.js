// Extracted from admin.html script block 1
/* ════════════════════════════════════════════════════
   CONFIG — CHANGEZ CES HASHES (ne jamais mettre le
   mot de passe en clair ici)

   Pour générer vos hashes :
   1. Ouvrez la console du navigateur (F12)
   2. Tapez : sha256('votre@email.com')
              sha256('votre_mot_de_passe')
   3. Copiez les résultats ci-dessous
════════════════════════════════════════════════════ */
const ADMIN_EMAIL_HASH = 'ab0d35161ac42a8691828852e2c7c9498cbc3ae213a7173c27050bc5e2d3cb37';
const ADMIN_PWD_HASH   = 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270';
// Email par défaut : admin@quran.com
// Mot de passe par défaut : admin1234
// → CHANGEZ-LES IMMÉDIATEMENT après le premier déploiement

/* ── SHA-256 natif via WebCrypto API ── */
async function sha256(str) {
  const buf  = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

/* ── BRUTE FORCE PROTECTION ── */
const MAX_ATTEMPTS  = 5;     // tentatives avant verrouillage
const LOCK_DURATION = 15*60; // 15 minutes en secondes

function getLoginState() {
  try { return JSON.parse(localStorage.getItem('admin_lockout')||'{}'); } catch(e) { return {}; }
}
function saveLoginState(s) {
  localStorage.setItem('admin_lockout', JSON.stringify(s));
}
function isLocked() {
  const s = getLoginState();
  if (!s.lockUntil) return false;
  if (Date.now() < s.lockUntil) return true;
  // Verrou expiré → réinitialiser
  saveLoginState({});
  return false;
}
function recordFailedAttempt() {
  const s   = getLoginState();
  const att = (s.attempts || 0) + 1;
  if (att >= MAX_ATTEMPTS) {
    saveLoginState({ attempts: att, lockUntil: Date.now() + LOCK_DURATION*1000, lastFail: Date.now() });
  } else {
    saveLoginState({ attempts: att, lastFail: Date.now() });
  }
  return att;
}
function resetAttempts() {
  saveLoginState({});
}
function remainingLockTime() {
  const s = getLoginState();
  if (!s.lockUntil) return 0;
  return Math.max(0, Math.ceil((s.lockUntil - Date.now()) / 1000));
}

/* ── UPDATE LOCK UI ── */
let lockTimer = null;
function updateLockUI() {
  const btn = document.querySelector('.login-btn');
  const err = document.getElementById('login-err');
  const secs = remainingLockTime();
  if (secs > 0) {
    const m = Math.floor(secs/60), s2 = secs%60;
    err.textContent = `Compte verrouillé — réessayez dans ${m}:${String(s2).padStart(2,'0')}`;
    err.classList.add('show');
    btn.disabled = true;
    btn.textContent = `Verrouillé (${m}:${String(s2).padStart(2,'0')})`;
    lockTimer = setTimeout(updateLockUI, 1000);
  } else {
    btn.disabled = false;
    btn.textContent = 'Se connecter →';
    if (lockTimer) { clearTimeout(lockTimer); lockTimer=null; }
  }
}

/* ── LOGIN ── */
async function checkLogin() {
  const btn   = document.querySelector('.login-btn');
  const err   = document.getElementById('login-err');
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pwd   = document.getElementById('login-pwd').value;

  // Check lock
  if (isLocked()) { updateLockUI(); return; }

  // Disable button during async hash
  btn.disabled = true;
  btn.textContent = 'Vérification...';

  try {
    const [emailHash, pwdHash] = await Promise.all([sha256(email), sha256(pwd)]);
    const ok = emailHash === ADMIN_EMAIL_HASH && pwdHash === ADMIN_PWD_HASH;

    if (ok) {
      resetAttempts();
      // Store session token (timestamp + random)
      const token = Date.now() + '.' + Math.random().toString(36).slice(2);
      sessionStorage.setItem('admin_token', token);
      sessionStorage.setItem('admin_auth',  '1');
      err.classList.remove('show');
      document.getElementById('login-screen').classList.add('hide');
      document.getElementById('app').classList.add('show');
      loadStats();
      loadDonConfig();
    } else {
      const attempts = recordFailedAttempt();
      document.getElementById('login-pwd').value = '';
      document.getElementById('login-pwd').focus();

      if (isLocked()) {
        updateLockUI();
      } else {
        const remaining = MAX_ATTEMPTS - attempts;
        err.textContent = remaining > 0
          ? `Email ou mot de passe incorrect. ${remaining} tentative${remaining>1?'s':''} restante${remaining>1?'s':''}.`
          : 'Compte verrouillé.';
        err.classList.add('show');
        btn.disabled = false;
        btn.textContent = 'Se connecter →';
      }
    }
  } catch(e) {
    err.textContent = 'Erreur de vérification. Rechargez la page.';
    err.classList.add('show');
    btn.disabled = false;
    btn.textContent = 'Se connecter →';
  }
}

function logout() {
  sessionStorage.removeItem('admin_auth');
  sessionStorage.removeItem('admin_token');
  location.reload();
}

/* ── INIT ── */
async function generateHashes() {
  const email = document.getElementById('gen-email').value.trim().toLowerCase();
  const pwd   = document.getElementById('gen-pwd').value;
  if (!email || !pwd) { alert('Remplissez email et mot de passe.'); return; }
  const [eh, ph] = await Promise.all([sha256(email), sha256(pwd)]);
  const result = document.getElementById('hash-result');
  result.style.display = 'block';
  result.innerHTML =
    'ADMIN_EMAIL_HASH = <span style="color:#C8A96E">\''+eh+'\'</span>;<br>' +
    'ADMIN_PWD_HASH   = <span style="color:#C8A96E">\''+ph+'\'</span>;';
}

window.addEventListener('load', () => {
  // Auto-login si session active
  if (sessionStorage.getItem('admin_auth') === '1') {
    document.getElementById('login-screen').classList.add('hide');
    document.getElementById('app').classList.add('show');
    loadStats();
    loadDonConfig();
    return;
  }
  // Check if locked on page load
  if (isLocked()) {
    updateLockUI();
  }
  document.getElementById('login-email').focus();
  // Allow Enter key
  document.getElementById('login-pwd').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkLogin();
  });
  document.getElementById('login-email').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('login-pwd').focus();
  });
});

/* ── NAVIGATION ── */
function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('on'));
  document.querySelectorAll('.mob-nav-item').forEach(n => n.classList.remove('on'));
  document.getElementById('page-'+id).classList.add('on');
  if (btn) btn.classList.add('on');
  if (id === 'stats') loadStats();
  if (id === 'don') loadDonConfig();
}

/* ── STATS ── */
function loadStats() {
  // Read from localStorage (written by index.html)
  const visitors = +localStorage.getItem('aq_visitors') || 0;
  const today    = +localStorage.getItem('aq_today')    || 0;
  const verses   = +localStorage.getItem('aq_verses')   || 0;
  const shares   = +localStorage.getItem('aq_shares')   || 0;
  const videos   = +localStorage.getItem('aq_videos')   || 0;
  const dons     = +localStorage.getItem('aq_dons')     || 0;

  document.getElementById('st-visitors').textContent = fmtN(visitors);
  document.getElementById('st-today').textContent    = fmtN(today);
  document.getElementById('st-verses').textContent   = fmtN(verses);
  document.getElementById('st-shares').textContent   = fmtN(shares);
  document.getElementById('st-videos').textContent   = fmtN(videos);
  document.getElementById('st-dons').textContent     = fmtN(dons);

  // Demo trend
  document.getElementById('st-vis-trend').textContent = visitors > 0 ? '↑ actif' : 'En attente de visites';

  // Weekly bar chart (simulated from localStorage or demo)
  const days = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  const rawWeek = localStorage.getItem('aq_week');
  let week = rawWeek ? JSON.parse(rawWeek) : days.map(()=>Math.floor(Math.random()*40)+5);
  const maxW = Math.max(...week, 1);
  document.getElementById('bar-chart').innerHTML = week.map((v,i) => `
    <div class="bar-col">
      <div class="bar" style="height:${Math.round(v/maxW*100)}%" title="${v} visiteurs"></div>
      <div class="bar-lbl">${days[i]}</div>
    </div>`).join('');

  // Top surahs
  const rawSurahs = localStorage.getItem('aq_top_surahs');
  const topSurahs = rawSurahs ? JSON.parse(rawSurahs) : [
    {name:'Al-Fatiha',v:0},{name:'Al-Baqarah',v:0},{name:'Ya-Sin',v:0},{name:'Al-Mulk',v:0},{name:'Al-Kahf',v:0}
  ];
  const maxS = Math.max(...topSurahs.map(s=>s.v), 1);
  document.getElementById('top-surahs').innerHTML = topSurahs.slice(0,5).map((s,i) => `
    <div class="top-item">
      <div class="top-rank">${i+1}</div>
      <div class="top-name">${s.name}</div>
      <div class="top-bar-bg"><div class="top-bar-fill" style="width:${Math.round(s.v/maxS*100)}%"></div></div>
      <div class="top-val">${fmtN(s.v)}</div>
    </div>`).join('');

  // Sources
  const sources = [
    {name:'Direct',v:Math.floor(visitors*.45)||0},
    {name:'WhatsApp',v:Math.floor(visitors*.28)||0},
    {name:'Google',v:Math.floor(visitors*.15)||0},
    {name:'Instagram',v:Math.floor(visitors*.12)||0},
  ];
  const maxSrc = Math.max(...sources.map(s=>s.v),1);
  document.getElementById('top-sources').innerHTML = sources.map((s,i) => `
    <div class="top-item">
      <div class="top-rank">${i+1}</div>
      <div class="top-name">${s.name}</div>
      <div class="top-bar-bg"><div class="top-bar-fill" style="width:${Math.round(s.v/maxSrc*100)}%"></div></div>
      <div class="top-val">${fmtN(s.v)}</div>
    </div>`).join('');
}

/* ── DON CONFIG ── */
let donEnabled = true;

function loadDonConfig() {
  const cfg = JSON.parse(localStorage.getItem('aq_don_cfg') || '{}');
  if (cfg.msg)    document.getElementById('don-msg').value    = cfg.msg;
  if (cfg.wave)   document.getElementById('don-wave').value   = cfg.wave;
  if (cfg.orange) document.getElementById('don-orange').value = cfg.orange;
  if (cfg.paypal) document.getElementById('don-paypal').value = cfg.paypal;
  if (cfg.amounts)document.getElementById('don-amounts').value= cfg.amounts;
  donEnabled = cfg.enabled !== false;
  document.getElementById('tog-don').classList.toggle('on', donEnabled);
  updateDonPreview();
  updateDonCode();
}

function toggleDon() {
  donEnabled = !donEnabled;
  document.getElementById('tog-don').classList.toggle('on', donEnabled);
  updateDonPreview();
}

function saveDon() {
  const cfg = {
    enabled: donEnabled,
    msg:     document.getElementById('don-msg').value,
    wave:    document.getElementById('don-wave').value,
    orange:  document.getElementById('don-orange').value,
    paypal:  document.getElementById('don-paypal').value,
    amounts: document.getElementById('don-amounts').value,
  };
  localStorage.setItem('aq_don_cfg', JSON.stringify(cfg));
  updateDonPreview();
  updateDonCode();
  const c = document.getElementById('don-confirm');
  c.classList.add('show');
  setTimeout(() => c.classList.remove('show'), 2500);
}

function updateDonPreview() {
  const msg     = document.getElementById('don-msg').value || 'Soutenez ce projet';
  const amounts = document.getElementById('don-amounts').value.split(',').map(a=>a.trim()).filter(Boolean);
  const wave    = document.getElementById('don-wave').value;
  const orange  = document.getElementById('don-orange').value;
  const paypal  = document.getElementById('don-paypal').value;
  document.getElementById('preview-msg').textContent = msg;
  const btns = [];
  if (wave)   btns.push(`<a href="${wave}" target="_blank" class="don-btn-p" style="background:#00A3E0;color:#fff;">💙 Wave</a>`);
  if (orange) btns.push(`<a href="${orange}" target="_blank" class="don-btn-p" style="background:#FF6600;color:#fff;">🟠 Orange Money</a>`);
  if (paypal) btns.push(`<a href="${paypal}" target="_blank" class="don-btn-p" style="background:#003087;color:#fff;">🅿 PayPal</a>`);
  if (btns.length === 0) btns.push('<span style="font-size:.75rem;color:var(--tx3)">Configurez les liens ci-dessus</span>');
  document.getElementById('preview-btns').innerHTML = btns.join('');
  updateDonCode();
}

function updateDonCode() {
  const msg     = document.getElementById('don-msg').value || 'Soutenez ce projet islamique gratuit';
  const wave    = document.getElementById('don-wave').value;
  const orange  = document.getElementById('don-orange').value;
  const paypal  = document.getElementById('don-paypal').value;
  const amounts = document.getElementById('don-amounts').value.split(',').map(a=>a.trim()).filter(Boolean);

  const btns = [];
  if (wave)   btns.push(`  <a href="${wave}" target="_blank" class="don-btn wave-btn">💙 Wave</a>`);
  if (orange) btns.push(`  <a href="${orange}" target="_blank" class="don-btn orange-btn">🟠 Orange Money</a>`);
  if (paypal) btns.push(`  <a href="${paypal}" target="_blank" class="don-btn paypal-btn">🅿 PayPal</a>`);

  const code = `<!-- Bouton de don -->
<div id="don-widget" style="max-width:900px;margin:1rem auto;padding:0 1.2rem;">
  <div style="background:var(--bg2);border:1px solid var(--bd2);border-radius:8px;padding:1.2rem 1.5rem;text-align:center;">
    <div style="font-family:'Noto Naskh Arabic',serif;font-size:1.3rem;color:var(--gold);">تصدَّق</div>
    <p style="font-size:.85rem;color:var(--tx2);margin:.5rem 0 .9rem;font-style:italic;">${msg}</p>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
${btns.join('\n')}
    </div>
  </div>
</div>`;
  document.getElementById('don-code').value = code;
}

function copyCode() {
  navigator.clipboard.writeText(document.getElementById('don-code').value).then(() => {
    const c = document.getElementById('code-confirm');
    c.classList.add('show');
    setTimeout(() => c.classList.remove('show'), 2500);
  });
}

/* UTILS */
function fmtN(n) { return n >= 1000 ? (n/1000).toFixed(1)+'k' : String(n); }

// Live preview updates on input
['don-msg','don-wave','don-orange','don-paypal','don-amounts'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', updateDonPreview);
});

async function generateHashes() {
  const email = document.getElementById('gen-email').value.trim().toLowerCase();
  const pwd   = document.getElementById('gen-pwd').value;
  if (!email || !pwd) { alert('Remplissez email et mot de passe.'); return; }
  const [eh, ph] = await Promise.all([sha256(email), sha256(pwd)]);
  const result = document.getElementById('hash-result');
  result.style.display = 'block';
  result.innerHTML =
    'ADMIN_EMAIL_HASH = <span style="color:#C8A96E">\''+eh+'\'</span>;<br>' +
    'ADMIN_PWD_HASH   = <span style="color:#C8A96E">\''+ph+'\'</span>;';
}

window.addEventListener('load', () => {
  if (sessionStorage.getItem('admin_auth') === '1') {
    loadStats(); loadDonConfig();
  }
});
