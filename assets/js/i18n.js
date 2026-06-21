// NoorQuran shared language helpers.
(function(){
  const HOME_LANG='aq_home_lang';
  const LANG_KEY='aq_lang';
  function prefs(){return window.AQStorage?AQStorage.prefs():{};}
  function currentLang(){
    const p=prefs();
    return localStorage.getItem(LANG_KEY)||localStorage.getItem(HOME_LANG)||p.lang||document.documentElement.lang||'fr';
  }
  function applyLang(){
    const lang=currentLang();
    document.documentElement.lang=lang;
    document.body.dataset.lang=lang;
  }
  function setLang(lang){
    localStorage.setItem(LANG_KEY,lang);
    localStorage.setItem(HOME_LANG,lang);
    applyLang();
  }
  window.AQLang={currentLang,applyLang,setLang};
})();
