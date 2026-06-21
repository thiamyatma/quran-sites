// NoorQuran shared localStorage helpers.
(function(){
  function readJson(key,fallback={}){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}
    catch(e){return fallback;}
  }
  function writeJson(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  }
  window.AQStorage={readJson,writeJson,prefs(){return readJson('aq_prefs',{});}};
})();
