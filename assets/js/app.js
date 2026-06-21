// NoorQuran global initializer.
(function(){
  function applyTheme(){window.AQTheme?.applyTheme();}
  function applyLang(){window.AQLang?.applyLang();}
  window.AQGlobal={
    applyTheme,
    applyLang,
    setTheme(mode){window.AQTheme?.setTheme(mode);},
    setLang(lang){window.AQLang?.setLang(lang);}
  };
  function init(){applyTheme();applyLang();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
