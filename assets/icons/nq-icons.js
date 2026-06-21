(function(){
  const base={fill:'none',stroke:'currentColor','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round'};
  const attrs=Object.entries(base).map(([k,v])=>`${k}="${v}"`).join(' ');
  const paths={
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    close:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    login:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>',
    language:'<path d="M4 5h9"/><path d="M9 3v2"/><path d="M6 9c1 3 5 5 8 5"/><path d="M12 5c-.5 5-4 8-8 9"/><path d="m14 21 4-9 4 9"/><path d="M15.5 18h5"/>',
    settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.4-.2-.1a1.7 1.7 0 0 0-2 .2 1.7 1.7 0 0 0-.7 1.5V22h-4v-.2a1.7 1.7 0 0 0-.7-1.5 1.7 1.7 0 0 0-2-.2l-.2.1-2-3.4.1-.1A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3 14H3v-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-3.4.2.1a1.7 1.7 0 0 0 2-.2A1.7 1.7 0 0 0 9.2 2V2h4v.2a1.7 1.7 0 0 0 .7 1.5 1.7 1.7 0 0 0 2 .2l.2-.1 2 3.4-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21v4h-.2a1.7 1.7 0 0 0-1.4 1Z"/>',
    moon:'<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 6.3 1.4-1.4"/>',
    monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H21"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H21v20H6.5A2.5 2.5 0 0 1 4 19.5Z"/>',
    'open-book':'<path d="M12 6.5A6 6 0 0 0 5 5v14a6 6 0 0 1 7 1.5"/><path d="M12 6.5A6 6 0 0 1 19 5v14a6 6 0 0 0-7 1.5"/>',
    page:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
    document:'<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/>',
    headphones:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h4v6H6a2 2 0 0 1-2-2Z"/><path d="M20 14h-4v6h2a2 2 0 0 0 2-2Z"/>',
    play:'<path d="m8 5 11 7-11 7Z"/>',
    pause:'<path d="M8 5v14"/><path d="M16 5v14"/>',
    previous:'<path d="M19 20 9 12l10-8v16Z"/><path d="M5 19V5"/>',
    next:'<path d="m5 4 10 8-10 8V4Z"/><path d="M19 5v14"/>',
    volume:'<path d="M11 5 6 9H3v6h3l5 4Z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19 6a9 9 0 0 1 0 12"/>',
    mute:'<path d="M11 5 6 9H3v6h3l5 4Z"/><path d="m17 9 4 4"/><path d="m21 9-4 4"/>',
    repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    speedometer:'<path d="M21 12a9 9 0 1 0-18 0"/><path d="m12 12 4-4"/><path d="M12 12h.01"/>',
    microphone:'<path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z"/><path d="M19 11a7 7 0 0 1-14 0"/><path d="M12 18v3"/><path d="M8 21h8"/>',
    playlist:'<path d="M4 6h10"/><path d="M4 12h10"/><path d="M4 18h7"/><path d="m17 16 4 2-4 2Z"/>',
    'audio-wave':'<path d="M4 12h2"/><path d="M8 9v6"/><path d="M12 5v14"/><path d="M16 8v8"/><path d="M20 11v2"/>',
    bookmark:'<path d="M6 3h12a1 1 0 0 1 1 1v18l-7-4-7 4V4a1 1 0 0 1 1-1Z"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
    copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><rect x="4" y="4" width="11" height="11" rx="2"/>',
    share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/>',
    download:'<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    image:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="2"/><path d="m21 15-5-5L5 19"/>',
    video:'<path d="M4 6h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="m17 10 5-3v10l-5-3Z"/>',
    note:'<path d="M4 4h16v16H4Z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/>',
    edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    translate:'<path d="M4 5h9"/><path d="M9 3v2"/><path d="M6 9c1 3 5 5 8 5"/><path d="M12 5c-.5 5-4 8-8 9"/><path d="M15 19h6"/><path d="m18 16 3 6"/><path d="m18 16-3 6"/>',
    palette:'<path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h2a7 7 0 0 0-2-10Z"/><circle cx="7.5" cy="10" r=".5"/><circle cx="10" cy="7" r=".5"/><circle cx="14" cy="7" r=".5"/>',
    sparkle:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8Z"/>',
    calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    timeline:'<path d="M4 6h6"/><path d="M14 6h6"/><circle cx="12" cy="6" r="2"/><path d="M4 18h6"/><path d="M14 18h6"/><circle cx="12" cy="18" r="2"/><path d="M12 8v8"/>',
    location:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    code:'<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/>',
    envelope:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
  };
  const aliases={language:'globe','openbook':'open-book',ayah:'document',juz:'grid',surah:'open-book',mushaf:'book',tafsir:'book',reciter:'microphone',favorite:'heart',favorites:'heart',bookmark:'bookmark',bookmarks:'bookmark'};
  function svg(name,label=''){
    const key=aliases[name]||name;
    const body=paths[key]||paths.info;
    const aria=label?`role="img" aria-label="${String(label).replace(/"/g,'&quot;')}"`:'aria-hidden="true" focusable="false"';
    return `<svg class="icon nq-icon" viewBox="0 0 24 24" ${aria} ${attrs}>${body}</svg>`;
  }
  function enhance(root=document){
    root.querySelectorAll('[data-icon]').forEach(el=>{
      const label=el.getAttribute('data-icon-label')||'';
      el.innerHTML=svg(el.getAttribute('data-icon'),label);
      el.classList.add('nq-icon-wrap');
    });
  }
  window.NQIcon={svg,enhance,icons:Object.keys(paths)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>enhance());else enhance();
})();
