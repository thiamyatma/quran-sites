// NoorQuran shared theme helpers.
(function(){
  const THEME_KEY='aq_theme';
  const HOME_THEME='aq_home_theme';
  const PREF_KEY='aq_prefs';
  function prefs(){return window.AQStorage?AQStorage.prefs():{};}
  function systemTheme(){return matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
  function currentTheme(){
    const p=prefs();
    return localStorage.getItem(THEME_KEY)||localStorage.getItem(HOME_THEME)||p.theme||'auto';
  }
  function actualTheme(mode){return mode==='auto'?systemTheme():mode;}
  function applyTheme(){
    const mode=currentTheme();
    const actual=actualTheme(mode);
    document.body.dataset.theme=actual;
    document.documentElement.dataset.theme=actual;
    document.body.classList.toggle('light',actual==='light');
    document.querySelectorAll('[data-global-theme-label]').forEach(el=>el.textContent=mode);
  }
  function setTheme(mode){
    localStorage.setItem(THEME_KEY,mode);
    localStorage.setItem(HOME_THEME,mode);
    applyTheme();
  }
  window.AQTheme={currentTheme,actualTheme,applyTheme,setTheme};
  matchMedia('(prefers-color-scheme: light)').addEventListener?.('change',()=>{if(currentTheme()==='auto')applyTheme();});
})();
