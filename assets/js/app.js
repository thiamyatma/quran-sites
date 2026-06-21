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

  function isLocalDev(){
    return ['localhost','127.0.0.1','::1'].includes(location.hostname);
  }

  function clearLocalCaches(){
    if(!isLocalDev())return false;
    window.addEventListener('load',()=>{
      const unregister='serviceWorker' in navigator
        ? navigator.serviceWorker.getRegistrations().then(regs=>Promise.all(regs.map(reg=>reg.unregister()))).catch(()=>{})
        : Promise.resolve();
      const clear=window.caches
        ? caches.keys().then(keys=>Promise.all(keys.map(key=>caches.delete(key)))).catch(()=>{})
        : Promise.resolve();
      Promise.all([unregister,clear]).then(()=>{
        if(navigator.serviceWorker?.controller&&sessionStorage.getItem('nq_local_sw_reset')!=='1'){
          sessionStorage.setItem('nq_local_sw_reset','1');
          location.reload();
        }
      });
    });
    return true;
  }

  if('serviceWorker' in navigator&&!clearLocalCaches()){
    window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
  }
})();
