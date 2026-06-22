// NoorQuran Mushaf page mode.
(function () {
  const PAGE_MIN = 1;
  const PAGE_MAX = 604;
  const LAST_PAGE_KEY = 'lastMushafPage';
  const CACHE_PREFIX = 'aq_mushaf_page_';
  const API_BASE = 'https://api.alquran.cloud/v1/page/';

  let currentPage = clampPage(Number(localStorage.getItem(LAST_PAGE_KEY)) || 1);
  let currentMode = 'classic';
  let loadRequestId = 0;

  const el = {};

  function $(id) {
    return document.getElementById(id);
  }

  function cacheKey(page) {
    return CACHE_PREFIX + page;
  }

  function clampPage(value) {
    const page = Math.round(Number(value) || PAGE_MIN);
    return Math.max(PAGE_MIN, Math.min(PAGE_MAX, page));
  }

  function readCache(page) {
    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey(page)) || 'null');
      if (cached && cached.number === page && Array.isArray(cached.ayahs)) return cached;
    } catch (e) {}
    return null;
  }

  function writeCache(page, data) {
    try {
      sessionStorage.setItem(cacheKey(page), JSON.stringify(data));
    } catch (e) {}
  }

  async function fetchPage(page) {
    const cached = readCache(page);
    if (cached) return cached;

    const response = await fetch(`${API_BASE}${page}/quran-uthmani`);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const payload = await response.json();
    if (payload.status !== 'OK' || !payload.data || !Array.isArray(payload.data.ayahs)) {
      throw new Error('Réponse API Mushaf invalide');
    }
    writeCache(page, payload.data);
    return payload.data;
  }

  function surahLabel(surah) {
    if (!surah) return '';
    const local = window.NoorQuranSurahs?.[surah.number - 1];
    return local ? `${surah.name} — ${surah.number}. ${local.fr}` : `${surah.name} — ${surah.englishName}`;
  }

  function groupBySurah(ayahs) {
    const groups = [];
    for (const ayah of ayahs) {
      const last = groups[groups.length - 1];
      if (!last || last.surah.number !== ayah.surah.number) {
        groups.push({ surah: ayah.surah, ayahs: [ayah] });
      } else {
        last.ayahs.push(ayah);
      }
    }
    return groups;
  }

  function cleanText(text) {
    return String(text || '').replace(/^\uFEFF/, '').trim();
  }

  function renderPage(data) {
    const groups = groupBySurah(data.ayahs);
    el.page.innerHTML = groups.map(group => `
      <section class="mushaf-surah">
        <h3 class="mushaf-surah-title">${surahLabel(group.surah)}</h3>
        <div class="mushaf-ayahs">
          ${group.ayahs.map(ayah => `
            <span class="mushaf-ayah" data-mushaf-ayah="${ayah.surah.number}:${ayah.numberInSurah}" title="${ayah.surah.number}:${ayah.numberInSurah}">
              ${cleanText(ayah.text)}
              <span class="mushaf-ayah-number">${ayah.numberInSurah}</span>
            </span>
          `).join(' ')}
        </div>
      </section>
    `).join('');

    const first = data.ayahs[0];
    const last = data.ayahs[data.ayahs.length - 1];
    const surahNames = [...new Map(data.ayahs.map(a => [a.surah.number, surahLabel(a.surah)])).values()];
    const juz = [...new Set(data.ayahs.map(a => a.juz))].join(' / ');

    el.title.textContent = `Page ${data.number} / ${PAGE_MAX}`;
    el.meta.textContent = `${surahNames.join(' · ')} · Juz ${juz} · ${first.surah.number}:${first.numberInSurah} à ${last.surah.number}:${last.numberInSurah}`;
    el.count.textContent = `${data.number} / ${PAGE_MAX}`;
    el.input.value = data.number;
    updateNavButtons();
  }

  function setLoading(page) {
    el.page.innerHTML = `<div class="mushaf-loading">Chargement de la page ${page}...</div>`;
    el.title.textContent = `Page ${page} / ${PAGE_MAX}`;
    el.meta.textContent = 'Récupération depuis AlQuran Cloud...';
    el.count.textContent = `${page} / ${PAGE_MAX}`;
    el.input.value = page;
    updateNavButtons();
  }

  function setError(page, message) {
    el.page.innerHTML = `
      <div class="mushaf-error">
        Impossible de charger la page ${page}.<br>
        <button class="mushaf-btn" data-mushaf-action="reload">Réessayer</button>
      </div>
    `;
    el.meta.textContent = message || 'API indisponible. Réessayez dans un instant.';
  }

  async function loadMushafPage(page, options = {}) {
    const nextPage = clampPage(page);
    const requestId = ++loadRequestId;
    currentPage = nextPage;
    localStorage.setItem(LAST_PAGE_KEY, String(currentPage));
    updateResumeButton();
    setLoading(currentPage);
    try {
      const data = await fetchPage(currentPage);
      if (requestId !== loadRequestId) return;
      renderPage(data);
      if (options.scroll !== false) {
        el.view.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      if (requestId !== loadRequestId) return;
      setError(currentPage, error.message);
    }
  }

  function updateNavButtons() {
    document.querySelectorAll('[data-mushaf-action="prev"]').forEach(button => {
      button.disabled = currentPage <= PAGE_MIN;
    });
    document.querySelectorAll('[data-mushaf-action="next"]').forEach(button => {
      button.disabled = currentPage >= PAGE_MAX;
    });
  }

  function updateResumeButton() {
    const saved = clampPage(Number(localStorage.getItem(LAST_PAGE_KEY)) || currentPage);
    if (!el.resume) return;
    el.resume.hidden = false;
    el.resume.textContent = `Reprendre page ${saved}`;
  }

  function setMode(mode) {
    currentMode = mode === 'mushaf' ? 'mushaf' : 'classic';
    document.body.classList.toggle('mushaf-mode', currentMode === 'mushaf');
    document.querySelectorAll('[data-reading-mode]').forEach(button => {
      const active = button.dataset.readingMode === currentMode;
      button.classList.toggle('on', active);
      button.setAttribute('aria-selected', String(active));
    });
    el.view.setAttribute('aria-hidden', String(currentMode !== 'mushaf'));

    if (currentMode === 'mushaf') {
      syncToReader({ scroll: true });
    }
  }

  function syncToReader(options = {}) {
    if (currentMode !== 'mushaf') return;
    const state = window.NoorReaderState?.();
    const readerPage = state?.page;
    if (!readerPage) return;
    loadMushafPage(readerPage, { scroll: options.scroll !== false });
  }

  function go(delta) {
    loadMushafPage(currentPage + delta);
  }

  function jumpToInput() {
    loadMushafPage(el.input.value);
  }

  async function openAyah(target) {
    const [surah, ayah] = target.split(':').map(Number);
    if (!surah || !ayah) return;
    document.querySelectorAll('.mushaf-ayah.playing').forEach(node => node.classList.remove('playing'));
    const node = document.querySelector(`[data-mushaf-ayah="${surah}:${ayah}"]`);
    if (node) node.classList.add('playing');
    if (typeof window.goAyah === 'function') await window.goAyah(surah, ayah);
    if (typeof window.playV === 'function') window.playV(ayah);
  }

  function handleClick(event) {
    const modeButton = event.target.closest('[data-reading-mode]');
    if (modeButton) {
      setMode(modeButton.dataset.readingMode);
      return;
    }

    const actionButton = event.target.closest('[data-mushaf-action]');
    if (actionButton) {
      const action = actionButton.dataset.mushafAction;
      if (action === 'prev') go(-1);
      if (action === 'next') go(1);
      if (action === 'resume') loadMushafPage(localStorage.getItem(LAST_PAGE_KEY) || currentPage);
      if (action === 'reload') loadMushafPage(currentPage);
      return;
    }

    const ayah = event.target.closest('[data-mushaf-ayah]');
    if (ayah) openAyah(ayah.dataset.mushafAyah);
  }

  function handleKeydown(event) {
    if (currentMode !== 'mushaf') return;
    const tag = event.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target.isContentEditable) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
  }

  function init() {
    el.view = $('mushaf-view');
    el.page = $('mushaf-page');
    el.title = $('mushaf-title');
    el.meta = $('mushaf-meta');
    el.count = $('mushaf-page-count');
    el.input = $('mushaf-page-input');
    el.resume = $('mushaf-resume');
    if (!el.view || !el.page || !el.input) return;

    updateResumeButton();
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);
    el.input.addEventListener('change', jumpToInput);
    el.input.addEventListener('keydown', event => {
      if (event.key === 'Enter') jumpToInput();
    });
  }

  window.NoorMushaf = {
    setMode,
    loadPage: loadMushafPage,
    syncToReader,
    get currentPage() {
      return currentPage;
    },
    get currentMode() {
      return currentMode;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
