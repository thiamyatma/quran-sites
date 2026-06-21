// Extracted from assets/site-system.js during migration.
﻿(function(){
  const THEME_KEY='aq_theme', HOME_THEME='aq_home_theme', HOME_LANG='aq_home_lang', LANG_KEY='aq_lang', PREF_KEY='aq_prefs';
  function prefs(){try{return JSON.parse(localStorage.getItem(PREF_KEY)||'{}')}catch(e){return {}}}
  function systemTheme(){return matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}
  function currentTheme(){const p=prefs();return localStorage.getItem(THEME_KEY)||localStorage.getItem(HOME_THEME)||p.theme||'auto'}
  function actualTheme(mode){return mode==='auto'?systemTheme():mode}
  function applyTheme(){const mode=currentTheme();const actual=actualTheme(mode);document.body.dataset.theme=actual;document.documentElement.dataset.theme=actual;document.body.classList.toggle('light',actual==='light');document.querySelectorAll('[data-global-theme-label]').forEach(el=>el.textContent=mode)}
  function currentLang(){const p=prefs();return localStorage.getItem(LANG_KEY)||localStorage.getItem(HOME_LANG)||p.lang||document.documentElement.lang||'fr'}
  function applyLang(){const lang=currentLang();document.documentElement.lang=lang;document.body.dataset.lang=lang}
  window.AQGlobal={applyTheme,applyLang,setTheme(mode){localStorage.setItem(THEME_KEY,mode);localStorage.setItem(HOME_THEME,mode);applyTheme()},setLang(lang){localStorage.setItem(LANG_KEY,lang);localStorage.setItem(HOME_LANG,lang);applyLang()}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{applyTheme();applyLang()});else{applyTheme();applyLang()}
  matchMedia('(prefers-color-scheme: light)').addEventListener?.('change',()=>{if(currentTheme()==='auto')applyTheme()});
})();