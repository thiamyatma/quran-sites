// Extracted from index.html script block 0
const SS=[
  {n:1,ar:'الفاتحة',en:'Al-Fatiha',fr:"L'Ouverture",v:7,t:'Mecquoise'},
  {n:2,ar:'البقرة',en:'Al-Baqarah',fr:'La Vache',v:286,t:'Médinoise'},
  {n:3,ar:'آل عمران',en:'Al-Imran',fr:"La Famille d'Imran",v:200,t:'Médinoise'},
  {n:4,ar:'النساء',en:'An-Nisa',fr:'Les Femmes',v:176,t:'Médinoise'},
  {n:5,ar:'المائدة',en:"Al-Ma'idah",fr:'La Table Servie',v:120,t:'Médinoise'},
  {n:6,ar:'الأنعام',en:"Al-An'am",fr:'Les Bestiaux',v:165,t:'Mecquoise'},
  {n:7,ar:'الأعراف',en:"Al-A'raf",fr:'Les Murailles',v:206,t:'Mecquoise'},
  {n:8,ar:'الأنفال',en:'Al-Anfal',fr:'Le Butin',v:75,t:'Médinoise'},
  {n:9,ar:'التوبة',en:'At-Tawbah',fr:'Le Repentir',v:129,t:'Médinoise'},
  {n:10,ar:'يونس',en:'Yunus',fr:'Jonas',v:109,t:'Mecquoise'},
  {n:11,ar:'هود',en:'Hud',fr:'Houd',v:123,t:'Mecquoise'},
  {n:12,ar:'يوسف',en:'Yusuf',fr:'Joseph',v:111,t:'Mecquoise'},
  {n:13,ar:'الرعد',en:"Ar-Ra'd",fr:'Le Tonnerre',v:43,t:'Médinoise'},
  {n:14,ar:'إبراهيم',en:'Ibrahim',fr:'Abraham',v:52,t:'Mecquoise'},
  {n:15,ar:'الحجر',en:'Al-Hijr',fr:'Al-Hijr',v:99,t:'Mecquoise'},
  {n:16,ar:'النحل',en:'An-Nahl',fr:'Les Abeilles',v:128,t:'Mecquoise'},
  {n:17,ar:'الإسراء',en:'Al-Isra',fr:'Le Voyage Nocturne',v:111,t:'Mecquoise'},
  {n:18,ar:'الكهف',en:'Al-Kahf',fr:'La Caverne',v:110,t:'Mecquoise'},
  {n:19,ar:'مريم',en:'Maryam',fr:'Marie',v:98,t:'Mecquoise'},
  {n:20,ar:'طه',en:'Ta-Ha',fr:'Ta-Ha',v:135,t:'Mecquoise'},
  {n:21,ar:'الأنبياء',en:'Al-Anbiya',fr:'Les Prophètes',v:112,t:'Mecquoise'},
  {n:22,ar:'الحج',en:'Al-Hajj',fr:'Le Pèlerinage',v:78,t:'Médinoise'},
  {n:23,ar:'المؤمنون',en:"Al-Mu'minun",fr:'Les Croyants',v:118,t:'Mecquoise'},
  {n:24,ar:'النور',en:'An-Nur',fr:'La Lumière',v:64,t:'Médinoise'},
  {n:25,ar:'الفرقان',en:'Al-Furqan',fr:'Le Discernement',v:77,t:'Mecquoise'},
  {n:26,ar:'الشعراء',en:"Ash-Shu'ara",fr:'Les Poètes',v:227,t:'Mecquoise'},
  {n:27,ar:'النمل',en:'An-Naml',fr:'Les Fourmis',v:93,t:'Mecquoise'},
  {n:28,ar:'القصص',en:'Al-Qasas',fr:'Le Récit',v:88,t:'Mecquoise'},
  {n:29,ar:'العنكبوت',en:'Al-Ankabut',fr:"L'Araignée",v:69,t:'Mecquoise'},
  {n:30,ar:'الروم',en:'Ar-Rum',fr:'Les Romains',v:60,t:'Mecquoise'},
  {n:31,ar:'لقمان',en:'Luqman',fr:'Luqman',v:34,t:'Mecquoise'},
  {n:32,ar:'السجدة',en:'As-Sajdah',fr:'La Prosternation',v:30,t:'Mecquoise'},
  {n:33,ar:'الأحزاب',en:'Al-Ahzab',fr:'Les Coalisés',v:73,t:'Médinoise'},
  {n:34,ar:'سبأ',en:'Saba',fr:'Saba',v:54,t:'Mecquoise'},
  {n:35,ar:'فاطر',en:'Fatir',fr:'Le Créateur',v:45,t:'Mecquoise'},
  {n:36,ar:'يس',en:'Ya-Sin',fr:'Ya-Sin',v:83,t:'Mecquoise'},
  {n:37,ar:'الصافات',en:'As-Saffat',fr:'Ceux qui se rangent',v:182,t:'Mecquoise'},
  {n:38,ar:'ص',en:'Sad',fr:'Sad',v:88,t:'Mecquoise'},
  {n:39,ar:'الزمر',en:'Az-Zumar',fr:'Les Groupes',v:75,t:'Mecquoise'},
  {n:40,ar:'غافر',en:'Ghafir',fr:'Le Pardonneur',v:85,t:'Mecquoise'},
  {n:41,ar:'فصلت',en:'Fussilat',fr:'Exposés en détail',v:54,t:'Mecquoise'},
  {n:42,ar:'الشورى',en:'Ash-Shura',fr:'La Consultation',v:53,t:'Mecquoise'},
  {n:43,ar:'الزخرف',en:'Az-Zukhruf',fr:"L'Ornement",v:89,t:'Mecquoise'},
  {n:44,ar:'الدخان',en:'Ad-Dukhan',fr:'La Fumée',v:59,t:'Mecquoise'},
  {n:45,ar:'الجاثية',en:'Al-Jathiyah',fr:"L'Agenouillée",v:37,t:'Mecquoise'},
  {n:46,ar:'الأحقاف',en:'Al-Ahqaf',fr:'Les Dunes',v:35,t:'Mecquoise'},
  {n:47,ar:'محمد',en:'Muhammad',fr:'Muhammad',v:38,t:'Médinoise'},
  {n:48,ar:'الفتح',en:'Al-Fath',fr:'La Victoire',v:29,t:'Médinoise'},
  {n:49,ar:'الحجرات',en:'Al-Hujurat',fr:'Les Appartements',v:18,t:'Médinoise'},
  {n:50,ar:'ق',en:'Qaf',fr:'Qaf',v:45,t:'Mecquoise'},
  {n:51,ar:'الذاريات',en:'Adh-Dhariyat',fr:'Les Vents qui éparpillent',v:60,t:'Mecquoise'},
  {n:52,ar:'الطور',en:'At-Tur',fr:'Le Mont',v:49,t:'Mecquoise'},
  {n:53,ar:'النجم',en:'An-Najm',fr:"L'Étoile",v:62,t:'Mecquoise'},
  {n:54,ar:'القمر',en:'Al-Qamar',fr:'La Lune',v:55,t:'Mecquoise'},
  {n:55,ar:'الرحمن',en:'Ar-Rahman',fr:'Le Tout Miséricordieux',v:78,t:'Médinoise'},
  {n:56,ar:'الواقعة',en:"Al-Waqi'ah",fr:"L'Événement",v:96,t:'Mecquoise'},
  {n:57,ar:'الحديد',en:'Al-Hadid',fr:'Le Fer',v:29,t:'Médinoise'},
  {n:58,ar:'المجادلة',en:'Al-Mujadila',fr:'La Discussion',v:22,t:'Médinoise'},
  {n:59,ar:'الحشر',en:'Al-Hashr',fr:"L'Exode",v:24,t:'Médinoise'},
  {n:60,ar:'الممتحنة',en:'Al-Mumtahanah',fr:'La Femme éprouvée',v:13,t:'Médinoise'},
  {n:61,ar:'الصف',en:'As-Saf',fr:'Le Rang',v:14,t:'Médinoise'},
  {n:62,ar:'الجمعة',en:"Al-Jumu'ah",fr:'Le Vendredi',v:11,t:'Médinoise'},
  {n:63,ar:'المنافقون',en:'Al-Munafiqun',fr:'Les Hypocrites',v:11,t:'Médinoise'},
  {n:64,ar:'التغابن',en:'At-Taghabun',fr:'La Déception mutuelle',v:18,t:'Médinoise'},
  {n:65,ar:'الطلاق',en:'At-Talaq',fr:'Le Divorce',v:12,t:'Médinoise'},
  {n:66,ar:'التحريم',en:'At-Tahrim',fr:"L'Interdiction",v:12,t:'Médinoise'},
  {n:67,ar:'الملك',en:'Al-Mulk',fr:'La Royauté',v:30,t:'Mecquoise'},
  {n:68,ar:'القلم',en:'Al-Qalam',fr:'La Plume',v:52,t:'Mecquoise'},
  {n:69,ar:'الحاقة',en:'Al-Haqqah',fr:"L'Inévitable",v:52,t:'Mecquoise'},
  {n:70,ar:'المعارج',en:"Al-Ma'arij",fr:"Les Degrés d'élévation",v:44,t:'Mecquoise'},
  {n:71,ar:'نوح',en:'Nuh',fr:'Noé',v:28,t:'Mecquoise'},
  {n:72,ar:'الجن',en:'Al-Jinn',fr:'Les Djinns',v:28,t:'Mecquoise'},
  {n:73,ar:'المزمل',en:'Al-Muzzammil',fr:"L'Enveloppé",v:20,t:'Mecquoise'},
  {n:74,ar:'المدثر',en:'Al-Muddaththir',fr:'Celui qui se couvre',v:56,t:'Mecquoise'},
  {n:75,ar:'القيامة',en:'Al-Qiyamah',fr:'La Résurrection',v:40,t:'Mecquoise'},
  {n:76,ar:'الإنسان',en:'Al-Insan',fr:"L'Homme",v:31,t:'Médinoise'},
  {n:77,ar:'المرسلات',en:'Al-Mursalat',fr:'Les Envoyés',v:50,t:'Mecquoise'},
  {n:78,ar:'النبأ',en:'An-Naba',fr:"L'Annonce",v:40,t:'Mecquoise'},
  {n:79,ar:'النازعات',en:"An-Nazi'at",fr:'Ceux qui arrachent',v:46,t:'Mecquoise'},
  {n:80,ar:'عبس',en:"'Abasa",fr:"Il s'est renfrogné",v:42,t:'Mecquoise'},
  {n:81,ar:'التكوير',en:'At-Takwir',fr:"L'Enroulement",v:29,t:'Mecquoise'},
  {n:82,ar:'الانفطار',en:'Al-Infitar',fr:'La Déchirure',v:19,t:'Mecquoise'},
  {n:83,ar:'المطففين',en:'Al-Mutaffifin',fr:'Les Fraudeurs',v:36,t:'Mecquoise'},
  {n:84,ar:'الانشقاق',en:'Al-Inshiqaq',fr:'La Déchirure du ciel',v:25,t:'Mecquoise'},
  {n:85,ar:'البروج',en:'Al-Buruj',fr:'Les Constellations',v:22,t:'Mecquoise'},
  {n:86,ar:'الطارق',en:'At-Tariq',fr:"L'Astre nocturne",v:17,t:'Mecquoise'},
  {n:87,ar:'الأعلى',en:"Al-A'la",fr:'Le Très-Haut',v:19,t:'Mecquoise'},
  {n:88,ar:'الغاشية',en:'Al-Ghashiyah',fr:"L'Enveloppante",v:26,t:'Mecquoise'},
  {n:89,ar:'الفجر',en:'Al-Fajr',fr:"L'Aurore",v:30,t:'Mecquoise'},
  {n:90,ar:'البلد',en:'Al-Balad',fr:'La Cité',v:20,t:'Mecquoise'},
  {n:91,ar:'الشمس',en:'Ash-Shams',fr:'Le Soleil',v:15,t:'Mecquoise'},
  {n:92,ar:'الليل',en:'Al-Layl',fr:'La Nuit',v:21,t:'Mecquoise'},
  {n:93,ar:'الضحى',en:'Ad-Duha',fr:'La Matinée',v:11,t:'Mecquoise'},
  {n:94,ar:'الشرح',en:'Ash-Sharh',fr:"L'Expansion",v:8,t:'Mecquoise'},
  {n:95,ar:'التين',en:'At-Tin',fr:'Le Figuier',v:8,t:'Mecquoise'},
  {n:96,ar:'العلق',en:"Al-'Alaq",fr:'Le Caillot',v:19,t:'Mecquoise'},
  {n:97,ar:'القدر',en:'Al-Qadr',fr:'La Nuit du Destin',v:5,t:'Mecquoise'},
  {n:98,ar:'البينة',en:'Al-Bayyinah',fr:'La Preuve',v:8,t:'Médinoise'},
  {n:99,ar:'الزلزلة',en:'Az-Zalzalah',fr:'Le Séisme',v:8,t:'Médinoise'},
  {n:100,ar:'العاديات',en:"Al-'Adiyat",fr:'Les Coursiers',v:11,t:'Mecquoise'},
  {n:101,ar:'القارعة',en:"Al-Qari'ah",fr:'Le Fracas',v:11,t:'Mecquoise'},
  {n:102,ar:'التكاثر',en:'At-Takathur',fr:'La Rivalité',v:8,t:'Mecquoise'},
  {n:103,ar:'العصر',en:"Al-'Asr",fr:'Le Temps',v:3,t:'Mecquoise'},
  {n:104,ar:'الهمزة',en:'Al-Humazah',fr:'Le Calomniateur',v:9,t:'Mecquoise'},
  {n:105,ar:'الفيل',en:'Al-Fil',fr:"L'Éléphant",v:5,t:'Mecquoise'},
  {n:106,ar:'قريش',en:'Quraysh',fr:'Les Quraysh',v:4,t:'Mecquoise'},
  {n:107,ar:'الماعون',en:"Al-Ma'un",fr:"L'Ustensile",v:7,t:'Mecquoise'},
  {n:108,ar:'الكوثر',en:'Al-Kawthar',fr:"L'Abondance",v:3,t:'Mecquoise'},
  {n:109,ar:'الكافرون',en:'Al-Kafirun',fr:'Les Mécréants',v:6,t:'Mecquoise'},
  {n:110,ar:'النصر',en:'An-Nasr',fr:'Le Secours',v:3,t:'Médinoise'},
  {n:111,ar:'المسد',en:'Al-Masad',fr:'Les Fibres',v:5,t:'Mecquoise'},
  {n:112,ar:'الإخلاص',en:'Al-Ikhlas',fr:'La Dévotion Pure',v:4,t:'Mecquoise'},
  {n:113,ar:'الفلق',en:'Al-Falaq',fr:"L'Aube",v:5,t:'Mecquoise'},
  {n:114,ar:'الناس',en:'An-Nas',fr:'Les Hommes',v:6,t:'Mecquoise'},
];
let descending=false,browseMode='surah',lang=localStorage.getItem('aq_lang')||localStorage.getItem('aq_home_lang')||'fr',themeMode=localStorage.getItem('aq_theme')||localStorage.getItem('aq_home_theme')||'auto',searchIndex=-1;
const TR={fr:{skip:'Aller au contenu',tagline:'Lire, écouter, méditer',login:'Se connecter',readQuran:'Lire le Coran',browseQuran:'Naviguer dans le Coran',resumeReading:'Reprendre la lecture',dailyVerse:'Verset du jour',settings:'Paramètres',theme:'Thème',heroKicker:'Une porte d’entrée calme pour reprendre, rechercher et explorer le Saint Coran.',searchPlaceholder:'Rechercher dans le Coran...',popular:'Populaire',surah:'Sourate',dailyReminder:'Un rappel pour se recentrer',footerAbout:'Une plateforme sobre pour lire, écouter, rechercher et méditer le Coran avec une expérience moderne et accessible.',emailPlaceholder:'Saisissez votre adresse e-mail',subscribe:"S'abonner",nav:'Naviguer',home:'Accueil',reading:'Lecture',search:'Recherche',projects:'Projets',reciters:'Récitateurs',videoGen:'Générateur vidéo',khatmProgress:'Progression Khatm',popularLinks:'Liens populaires',continueReading:'Continuer la lecture',myQuran:'Mon Coran',weeklyVerse:'Verset de la semaine',juz:'Juz',revelation:'Ordre de révélation',sortBy:'Trier par',noResults:'Aucun résultat. Essayez un nom de sourate ou un numéro.',emptySearch:'Tapez un nom, un numéro ou un mot-clé.',searchKeyword:'Recherche texte dans le lecteur',voiceSoon:'Recherche vocale bientôt disponible.',juzSoon:'Navigation par Juz bientôt disponible.',revelationSoon:'Ordre de révélation bientôt disponible.',accountSoon:'Connexion bientôt disponible.',defaultResume:'Aucune reprise trouvée. Ouverture de Al-Fatiha.',audioOptions:'Options audio: ouvrez le lecteur complet pour plus de réglages.',audioClosed:'Lecteur audio masqué.',audioPlaying:'Aperçu audio lancé.',audioPaused:'Aperçu audio en pause.'},en:{skip:'Skip to content',tagline:'Read, listen, reflect',login:'Sign in',readQuran:'Read Quran',browseQuran:'Browse Quran',resumeReading:'Resume reading',dailyVerse:'Verse of the day',settings:'Settings',theme:'Theme',heroKicker:'A calm entry point to resume, search, and explore the Holy Quran.',searchPlaceholder:'Search in the Quran...',popular:'Popular',surah:'Surah',dailyReminder:'A reminder to refocus',footerAbout:'A calm platform to read, listen, search, and reflect on the Quran.',emailPlaceholder:'Enter your email address',subscribe:'Subscribe',nav:'Navigate',home:'Home',reading:'Reading',search:'Search',projects:'Projects',reciters:'Reciters',videoGen:'Video generator',khatmProgress:'Khatm progress',popularLinks:'Popular links',continueReading:'Continue reading',myQuran:'My Quran',weeklyVerse:'Verse of the week',juz:'Juz',revelation:'Revelation order',sortBy:'Sort by',noResults:'No results. Try a surah name or number.',emptySearch:'Type a name, number, or keyword.',searchKeyword:'Text search in reader',voiceSoon:'Voice search coming soon.',juzSoon:'Juz navigation coming soon.',revelationSoon:'Revelation order coming soon.',accountSoon:'Sign in coming soon.',defaultResume:'No resume found. Opening Al-Fatiha.',audioOptions:'Audio options: open the full reader for more settings.',audioClosed:'Audio player hidden.',audioPlaying:'Audio preview started.',audioPaused:'Audio preview paused.'},ar:{skip:'اذهب إلى المحتوى',tagline:'اقرأ، استمع، تدبر',login:'تسجيل الدخول',readQuran:'قراءة القرآن',browseQuran:'تصفح القرآن',resumeReading:'متابعة القراءة',dailyVerse:'آية اليوم',settings:'الإعدادات',theme:'النمط',heroKicker:'مدخل هادئ للمتابعة والبحث وتصفح القرآن الكريم.',searchPlaceholder:'ابحث في القرآن...',popular:'الأشهر',surah:'سورة',dailyReminder:'تذكير للسكينة',footerAbout:'منصة هادئة للقراءة والاستماع والبحث والتدبر.',emailPlaceholder:'أدخل بريدك الإلكتروني',subscribe:'اشتراك',nav:'تنقل',home:'الرئيسية',reading:'القراءة',search:'بحث',projects:'مشاريع',reciters:'القراء',videoGen:'مولد الفيديو',khatmProgress:'تقدم الختمة',popularLinks:'روابط شائعة',continueReading:'متابعة القراءة',myQuran:'قرآني',weeklyVerse:'آية الأسبوع',juz:'جزء',revelation:'ترتيب النزول',sortBy:'ترتيب حسب',noResults:'لا توجد نتائج. جرّب اسم سورة أو رقمها.',emptySearch:'اكتب اسماً أو رقماً أو كلمة.',searchKeyword:'بحث نصي في القارئ',voiceSoon:'البحث الصوتي قريباً.',juzSoon:'تصفح الأجزاء قريباً.',revelationSoon:'ترتيب النزول قريباً.',accountSoon:'تسجيل الدخول قريباً.',defaultResume:'لا توجد متابعة محفوظة. فتح الفاتحة.',audioOptions:'افتح القارئ الكامل للمزيد من إعدادات الصوت.',audioClosed:'تم إخفاء مشغل الصوت.',audioPlaying:'بدأت معاينة الصوت.',audioPaused:'تم إيقاف المعاينة مؤقتاً.'}};
const JUZ_DATA=[
{n:1,page:1,s:1,a:1,word:'Alhamdu'},{n:2,page:22,s:2,a:142,word:'Sayakulu'},{n:3,page:42,s:2,a:253,word:'Tilka ar-rusulu'},{n:4,page:62,s:3,a:93,word:"Kullu atta'ami"},{n:5,page:82,s:4,a:24,word:'Wal muhsanatu'},{n:6,page:102,s:4,a:148,word:'Laa yuhibbu'},{n:7,page:121,s:5,a:82,word:'Latjidanna'},{n:8,page:142,s:6,a:111,word:'Walaw anna'},{n:9,page:162,s:7,a:88,word:"Qalal mala'u"},{n:10,page:182,s:8,a:41,word:"Wa'lamu"},{n:11,page:201,s:9,a:93,word:'Innama assabeelu'},{n:12,page:222,s:11,a:6,word:'Wama min'},{n:13,page:242,s:12,a:53,word:'Wama ubarrio'},{n:14,page:262,s:15,a:1,word:'Alif Lam Ra'},{n:15,page:282,s:17,a:1,word:'Subhana allathee'},{n:16,page:302,s:18,a:75,word:'Qala alam'},{n:17,page:322,s:21,a:1,word:'Iqtaraba lilnnasi'},{n:18,page:342,s:23,a:1,word:'Qad aflaha'},{n:19,page:362,s:25,a:21,word:'Waqala allatheena'},{n:20,page:382,s:27,a:56,word:'Fama kana'},{n:21,page:402,s:29,a:46,word:'Wala tujadiloo'},{n:22,page:422,s:33,a:31,word:'Waman yaqnut'},{n:23,page:442,s:36,a:28,word:'Wama anzalna'},{n:24,page:462,s:39,a:32,word:'Faman athlam'},{n:25,page:482,s:41,a:47,word:'Ilayhi yuraddu'},{n:26,page:502,s:46,a:1,word:'Ha Meem tanzeel'},{n:27,page:522,s:51,a:31,word:'Qala fama khatbukum'},{n:28,page:542,s:58,a:1,word:'Qad sami'},{n:29,page:562,s:67,a:1,word:'Tabarak'},{n:30,page:582,s:78,a:1,word:'Amma'}];
const REVELATION_ORDER=[96,68,73,74,1,111,81,87,92,89,93,94,103,100,108,102,107,109,105,113,114,112,53,80,97,91,85,95,106,101,75,104,77,50,90,86,54,38,7,72,36,25,35,19,20,56,26,27,28,17,10,11,12,15,6,37,31,34,39,40,41,42,43,44,45,46,51,88,18,16,71,14,21,23,32,52,67,69,70,78,79,82,84,30,29,83,2,8,3,33,60,4,99,57,47,13,55,76,65,98,59,24,22,63,58,49,66,64,61,62,48,5,9,110];
function el(id){return document.getElementById(id)}function t(k){return (TR[lang]&&TR[lang][k])||TR.fr[k]||k}function readerUrl(s,a){return 'reader.html?s='+encodeURIComponent(s)+(a?'&a='+encodeURIComponent(a):'')}function focusHomeSearch(){el('home-search')?.focus()}function showToast(msg){const b=el('toast');if(!b)return;b.textContent=msg;b.classList.add('show');clearTimeout(showToast._t);showToast._t=setTimeout(()=>b.classList.remove('show'),2400)}
function closePopovers(except){['langMenu','footerLangMenu','themeMenu'].forEach(id=>{if(id!==except)el(id)?.classList.remove('open')});if(except!=='menuPanel')el('menuPanel')?.classList.remove('open')}function togglePopover(id){const m=el(id);const open=m.classList.contains('open');closePopovers(id);m.classList.toggle('open',!open)}function toggleMenu(){const m=el('menuPanel');const open=m.classList.contains('open');closePopovers('menuPanel');m.classList.toggle('open',!open)}
document.addEventListener('click',e=>{if(!e.target.closest('.select-pop')&&!e.target.closest('#menuPanel')&&!e.target.closest('#menuBtn'))closePopovers();if(!e.target.closest('.search-wrap'))el('searchResults')?.classList.remove('open')});
function sysTheme(){return matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}function themeLabel(){return themeMode==='auto'?'Auto':themeMode==='dark'?'Sombre':themeMode==='light'?'Clair':'Sepia'}function themeIcon(){return themeMode==='auto'?'monitor':themeMode==='dark'?'moon':themeMode==='light'?'sun':'book'}function applyTheme(){document.body.dataset.theme=themeMode==='auto'?sysTheme():themeMode;if(el('themeBtn'))el('themeBtn').textContent=themeLabel();if(el('headerThemeBtn')){el('headerThemeBtn').innerHTML=NQIcon.svg(themeIcon());el('headerThemeBtn').title='Thème: '+themeLabel();el('headerThemeBtn').setAttribute('aria-label','Thème: '+themeLabel())}document.querySelectorAll('[data-theme-choice]').forEach(b=>b.classList.toggle('on',b.dataset.themeChoice===themeMode))}function setThemeMode(m){themeMode=m;localStorage.setItem('aq_home_theme',m);localStorage.setItem('aq_theme',m);if(window.AQGlobal)window.AQGlobal.setTheme(m);applyTheme();closePopovers()}function cycleThemeMode(){const modes=['auto','dark','light','sepia'];setThemeMode(modes[(modes.indexOf(themeMode)+1)%modes.length]);showToast('Thème: '+themeLabel())}matchMedia('(prefers-color-scheme: light)').addEventListener?.('change',()=>{if(themeMode==='auto')applyTheme()});
function applyLang(){document.documentElement.lang=lang;document.querySelectorAll('[data-i18n]').forEach(n=>n.textContent=t(n.dataset.i18n));document.querySelectorAll('[data-i18n-placeholder]').forEach(n=>n.placeholder=t(n.dataset.i18nPlaceholder));if(el('langBtn'))el('langBtn').textContent=lang.toUpperCase();if(el('footerLangBtn'))el('footerLangBtn').textContent=lang==='fr'?'Français':lang==='en'?'English':'العربية';document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));renderBrowse();updateResume()}function setLang(l){lang=l;localStorage.setItem('aq_home_lang',l);localStorage.setItem('aq_lang',l);if(window.AQGlobal)window.AQGlobal.setLang(l);applyLang();closePopovers();showToast(l==='fr'?'Langue: français':l==='en'?'Language: English':'اللغة: العربية')}
function norm(v){return (v||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}function parseReference(q){const m=(q||'').trim().match(/^(\d{1,3})\s*[:/.\-\s]\s*(\d{1,3})$/);if(!m)return null;const s=+m[1],a=+m[2],meta=SS[s-1];if(!meta||a<1||a>meta.v)return null;return {s,a,meta}}function searchRes(q){const ref=parseReference(q);if(ref)return [{type:'ref',...ref}];const nq=norm(q),raw=q.trim();if(!raw)return [];return SS.filter(s=>String(s.n)===raw||norm(s.fr).includes(nq)||norm(s.en).includes(nq)||s.ar.includes(raw)).slice(0,8)}
function recentSearches(){try{return JSON.parse(localStorage.getItem('aq_recent_searches')||'[]').filter(Boolean).slice(0,6)}catch(e){return []}}function saveRecentSearch(q){q=(q||'').trim();if(!q)return;const list=[q,...recentSearches().filter(x=>norm(x)!==norm(q))].slice(0,6);localStorage.setItem('aq_recent_searches',JSON.stringify(list))}function clearRecentSearches(){localStorage.removeItem('aq_recent_searches');renderSearch('');focusHomeSearch()}function useRecentSearch(v){const q=decodeURIComponent(v);el('home-search').value=q;renderSearch(q);const r=searchRes(q);if(r.length)openSurah(r[0].n)}
function recentPanel(){const recent=recentSearches(),clear=recent.length?'<button class="search-clear-all" type="button" onclick="clearRecentSearches()">Effacer tout</button>':'';const rows=recent.length?recent.map(q=>'<div class="search-recent-row"><button class="search-recent-main" type="button" onclick="useRecentSearch(&quot;'+encodeURIComponent(q)+'&quot;)"><span>◷</span><span>'+q.replace(/[<>&]/g,m=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[m]))+'</span></button></div>').join(''):'<div class="search-empty">'+t('emptySearch')+'</div>';const sug='<div class="search-suggestions"><div class="search-head"><span>Suggestions</span></div><button class="search-item" type="button" onclick="openSurah(36)"><span class="search-num">36</span><span><strong>Ya-Sin</strong><br><span style="color:var(--muted)">Lecture populaire</span></span><span class="search-ar">يس</span></button><button class="search-item" type="button" onclick="openSurah(2)"><span class="search-num">2</span><span><strong>Al-Baqarah</strong><br><span style="color:var(--muted)">Ayatul Kursi: 2:255</span></span><span class="search-ar">البقرة</span></button></div>';return '<div class="search-head"><span>Recherches récentes</span>'+clear+'</div>'+rows+sug}
function showSearchPanel(){renderSearch(el('home-search')?.value||'')}function renderSearch(q){const box=el('searchResults'),clear=el('clearSearch');clear?.classList.toggle('show',!!q.trim());if(!box)return;if(!q.trim()){box.innerHTML=recentPanel();box.classList.add('open');return}const r=searchRes(q);if(!r.length){box.innerHTML='<div class="search-empty">'+t('noResults')+'<br><button class="link-btn" type="button" onclick="openKeywordSearch()">'+t('searchKeyword')+'</button></div>';box.classList.add('open');return}box.innerHTML=r.map((s,i)=>s.type==='ref'?'<button class="search-item" type="button" data-i="'+i+'" onclick="openAyah('+s.s+','+s.a+', true)"><span class="search-num">'+s.s+':'+s.a+'</span><span><strong>'+s.meta.en+'</strong><br><span style="color:var(--muted)">Ouvrir le verset '+s.s+':'+s.a+'</span></span><span class="search-ar">'+s.meta.ar+'</span></button>':'<button class="search-item" type="button" data-i="'+i+'" onclick="openSurah('+s.n+', true)"><span class="search-num">'+s.n+'</span><span><strong>'+s.en+'</strong><br><span style="color:var(--muted)">'+s.fr+'</span></span><span class="search-ar">'+s.ar+'</span></button>').join('');box.classList.add('open');searchIndex=-1}function handleSearchInput(){renderSearch(el('home-search').value)}function handleSearchKeys(e){const items=[...document.querySelectorAll('.search-item')];if(e.key==='ArrowDown'&&items.length){e.preventDefault();searchIndex=(searchIndex+1)%items.length;items.forEach((x,i)=>x.classList.toggle('active',i===searchIndex))}else if(e.key==='ArrowUp'&&items.length){e.preventDefault();searchIndex=(searchIndex-1+items.length)%items.length;items.forEach((x,i)=>x.classList.toggle('active',i===searchIndex))}else if(e.key==='Enter'&&searchIndex>=0&&items[searchIndex]){e.preventDefault();items[searchIndex].click()}}function clearSearchBox(focus=true){el('home-search').value='';el('clearSearch')?.classList.remove('show');renderSearch('');if(focus)focusHomeSearch()}function searchAndOpen(e){e.preventDefault();const q=el('home-search').value.trim();const r=searchRes(q);if(!q){renderSearch(q);return}saveRecentSearch(q);if(r.length){if(r[0].type==='ref'){openAyah(r[0].s,r[0].a);return}openSurah(r[0].n);return}location.href='reader.html?q='+encodeURIComponent(q)}function openKeywordSearch(){const q=el('home-search').value.trim();saveRecentSearch(q);location.href='reader.html?q='+encodeURIComponent(q)}function openSurah(n,fromSearch=false){if(fromSearch){const s=SS[n-1];saveRecentSearch(s?s.en:String(n))}location.href=readerUrl(n)}function openAyah(s,a,fromSearch=false){if(fromSearch)saveRecentSearch(s+':'+a);location.href=readerUrl(s,a)}
function getLastRead(){try{return JSON.parse(localStorage.getItem('aq_last_read')||'null')}catch(e){return null}}function updateResume(){const last=getLastRead();const n=last?Math.max(1,Math.min(114,+last.s||1)):1;const s=SS[n-1],a=last?+last.a||1:1;el('resume-ar').textContent=s.ar;el('resume-meta').innerHTML=s.n+'. '+s.en+' <span>'+s.fr+'</span>';el('resume-ayah').textContent=(lang==='ar'?'الآية ':'Ayah ')+a;el('resume-num').textContent=s.n}function resumeReading(){const last=getLastRead();if(!last){showToast(t('defaultResume'));setTimeout(()=>location.href=readerUrl(1,1),450);return}location.href=readerUrl(last.s,last.a)}function goReaderHash(h){location.href='reader.html#'+h}function showPopular(){document.getElementById('surahs').scrollIntoView({behavior:'smooth'});showToast('Al-Fatiha, Ayatul Kursi, Yaseen, Al-Mulk, Al-Kahf')}
function setBrowseMode(mode){browseMode=['surah','juz','revelation'].includes(mode)?mode:'surah';document.querySelectorAll('[data-browse]').forEach(b=>b.classList.toggle('active',b.dataset.browse===browseMode));renderBrowse()}
function sourceNote(){const n=el('browse-note');if(!n)return;if(browseMode==='juz')n.innerHTML='Liste des 30 Juz basée sur les départs page/sourate/premier mot de SurahQuran.';else if(browseMode==='revelation')n.innerHTML='Ordre de révélation indicatif basé sur VivreLeCoran. Cet ordre peut varier selon les sources.';else n.textContent=''}
function renderBrowse(){sourceNote();updateSortButton();document.querySelectorAll('[data-browse]').forEach(b=>b.classList.toggle('active',b.dataset.browse===browseMode));if(browseMode==='juz')return renderJuzs();if(browseMode==='revelation')return renderRevelation();return renderSurahs()}
function renderSurahs(){const list=[...SS].sort((a,b)=>descending?b.n-a.n:a.n-b.n),label=lang==='en'?'Ayahs':lang==='ar'?'آيات':'versets';el('surah-grid').innerHTML=list.map(s=>'<a class="surah-card" href="'+readerUrl(s.n)+'"><span class="diamond"><span>'+s.n+'</span></span><span><span class="surah-name">'+s.en+'</span><span class="surah-fr">'+s.fr+'</span></span><span class="surah-side"><span class="surah-ar">'+s.ar+'</span><span class="surah-count">'+s.v+' '+label+'</span></span></a>').join('')}
function renderJuzs(){const list=descending?[...JUZ_DATA].reverse():JUZ_DATA;el('surah-grid').innerHTML=list.map(j=>{const s=SS[j.s-1];return '<a class="surah-card" href="'+readerUrl(j.s,j.a)+'"><span class="diamond"><span>'+j.n+'</span></span><span><span class="surah-name">Juz '+j.n+'</span><span class="surah-fr">Page '+j.page+' · '+s.en+' '+j.s+':'+j.a+'</span></span><span class="surah-side"><span class="surah-ar">'+s.ar+'</span><span class="surah-count">'+j.word+'</span></span></a>'}).join('')}
function renderRevelation(){const mapped=REVELATION_ORDER.map((n,i)=>({order:i+1,s:SS[n-1]}));const list=descending?mapped.reverse():mapped;el('surah-grid').innerHTML=list.map(x=>'<a class="surah-card" href="'+readerUrl(x.s.n)+'"><span class="diamond"><span>'+x.order+'</span></span><span><span class="surah-name">'+x.s.en+'</span><span class="surah-fr">'+x.s.fr+' · Sourate '+x.s.n+'</span></span><span class="surah-side"><span class="surah-ar">'+x.s.ar+'</span><span class="surah-count">'+x.s.t+'</span></span></a>').join('')}
function updateSortButton(){const label=descending?(lang==='en'?'Descending':lang==='ar'?'تنازلي':'Décroissant'):(lang==='en'?'Ascending':lang==='ar'?'تصاعدي':'Croissant');if(el('sort-label'))el('sort-label').textContent=label;if(el('sort-icon'))el('sort-icon').innerHTML=descending?'&darr;':'&uarr;'}function toggleSort(){descending=!descending;updateSortButton();const btn=document.querySelector('.sort');if(btn){btn.classList.remove('sort-flash');void btn.offsetWidth;btn.classList.add('sort-flash')}renderBrowse()}
function subscribeNewsletter(e){e.preventDefault();const mail=el('newsletterEmail')?.value.trim()||'';if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)){showToast(lang==='en'?'Enter a valid email address.':lang==='ar'?'أدخل بريداً صحيحاً.':'Entrez une adresse e-mail valide.');return}localStorage.setItem('aq_newsletter_email',mail);el('newsletterEmail').value='';showToast(lang==='en'?'Thanks, subscription saved locally.':lang==='ar'?'شكراً، تم الحفظ محلياً.':'Merci, inscription enregistrée localement.')}
let dailyAudio=null;function playDailyAyah(){if(!dailyAudio){dailyAudio=new Audio('https://cdn.islamic.network/quran/audio/128/ar.alafasy/962.mp3');dailyAudio.addEventListener('error',()=>showToast('Audio indisponible pour ce verset.'))}if(dailyAudio.paused){dailyAudio.play().then(()=>showToast('Lecture du verset lancée.')).catch(()=>showToast('Impossible de lancer l’audio.'))}else{dailyAudio.pause();showToast('Lecture en pause.')}}
async function shareDailyAyah(){const text='Al-A’raf 7:8 — Et la pesée, ce jour-là, sera équitable. '+location.origin+location.pathname.replace(/index\.html$/,'')+'reader.html?s=7&a=8';try{if(navigator.share){await navigator.share({title:'NoorQuran',text})}else{await navigator.clipboard.writeText(text);showToast('Lien du verset copié.')}}catch(e){showToast('Partage annulé.')}}
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
applyTheme();applyLang();renderBrowse();
