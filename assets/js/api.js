// NoorQuran API helpers.
(function(){
  const BASE='https://api.alquran.cloud/v1';
  const CACHE_PREFIX='nq_api_cache:';
  const DEFAULT_TTL=1000*60*60*12;

  function cacheKey(path){return CACHE_PREFIX+path}
  function readCache(path,ttl=DEFAULT_TTL){
    try{
      const raw=sessionStorage.getItem(cacheKey(path));
      if(!raw)return null;
      const item=JSON.parse(raw);
      if(!item || Date.now()-item.time>ttl)return null;
      return item.data;
    }catch(e){return null}
  }
  function writeCache(path,data){
    try{sessionStorage.setItem(cacheKey(path),JSON.stringify({time:Date.now(),data}))}catch(e){}
  }
  async function request(path,{ttl=DEFAULT_TTL,cache=true}={}){
    const normalized=path.startsWith('/')?path:'/'+path;
    if(cache){
      const cached=readCache(normalized,ttl);
      if(cached)return cached;
    }
    const res=await fetch(BASE+normalized);
    if(!res.ok)throw new Error('NoorQuran API error '+res.status);
    const json=await res.json();
    if(json.code && json.code>=400)throw new Error(json.status||'NoorQuran API error');
    if(cache)writeCache(normalized,json.data);
    return json.data;
  }
  function surahs(){return request('/surah')}
  function surah(number,edition='quran-uthmani'){return request('/surah/'+number+'/'+edition)}
  function ayah(reference,edition='quran-uthmani'){return request('/ayah/'+encodeURIComponent(reference)+'/'+edition)}
  function juz(number,edition='quran-uthmani'){return request('/juz/'+number+'/'+edition)}
  function search(keyword,surah='all',edition='fr.hamidullah'){return request('/search/'+encodeURIComponent(keyword)+'/'+surah+'/'+edition,{cache:false})}
  function audioUrl(globalAyah,{edition='ar.alafasy',bitrate=128}={}){return 'https://cdn.islamic.network/quran/audio/'+bitrate+'/'+edition+'/'+globalAyah+'.mp3'}
  function ayahImage(surah,ayah,{high=false}={}){return 'https://cdn.islamic.network/quran/images/'+(high?'high-resolution/':'')+surah+'_'+ayah+'.png'}

  window.NoorQuranAPI={request,surahs,surah,ayah,juz,search,audioUrl,ayahImage};
})();
