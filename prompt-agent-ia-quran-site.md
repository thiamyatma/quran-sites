# Contexte du projet — Al-Quran Al-Karim

Tu travailles sur un site web complet du Saint Coran, déployé sur Vercel à l'adresse https://al-quran1.vercel.app. Le projet est composé de 4 fichiers à la racine :

- `index.html` — site principal (lecture du Coran, audio, traductions)
- `video.html` — générateur de vidéos de versets avec audio synchronisé
- `admin.html` — panneau d'administration (stats, configuration des dons)
- `vercel.json` — configuration de déploiement + headers de sécurité

## Stack technique
HTML/CSS/JavaScript vanilla, aucun framework, aucune dépendance npm. Tout est en fichiers HTML autonomes. Les seules librairies externes chargées via CDN sont ffmpeg.wasm (conversion vidéo MP4) dans video.html.

## APIs externes utilisées
- `api.alquran.cloud` — texte arabe, traductions (français Hamidullah, anglais Asad), translittération
- `cdn.islamic.network/quran/audio/128/{recitateur}/{verset}.mp3` — fichiers audio par récitateur

## Fonctionnalités déjà implémentées
- 114 sourates complètes avec navigation (dropdown + panneau latéral)
- 12 récitateurs sélectionnables avec fallback automatique vers Alafasy si audio indisponible
- Traduction FR/EN + translittération phonétique togglable
- Verset du jour (calculé depuis la date)
- Mode répétition Hifz (1x à 10x) pour la mémorisation
- Partage de versets en image PNG (3 thèmes, Canvas API)
- Générateur vidéo multi-versets avec sélection, réorganisation par glisser-déposer, animations (révélation mot par mot, traduction progressive), export MP4/WebM
- Mode nuit/jour
- Panneau admin avec authentification email/mot de passe hashée en SHA-256, protection anti brute-force (verrouillage 15 min après 5 tentatives), configuration des liens de don
- Headers de sécurité : X-Frame-Options, CSP frame-ancestors, CORS restreint, HSTS

## Style de code à respecter
- Variables CSS centralisées en `:root` (couleurs or/émeraude/nuit, voir `--gold`, `--bg`, `--tx` etc.)
- Polices : Noto Naskh Arabic (texte arabe), Cinzel Decorative (titres), Crimson Pro (corps de texte)
- JavaScript en noms de variables courts mais cohérents dans chaque fichier (ex: `curS`, `curV` dans index.html)
- Pas de framework, tout doit rester déployable en HTML statique sur Vercel sans build step

## Ce qui reste à améliorer (priorité décroissante)
1. Sauvegarder les préférences utilisateur (langue, thème, récitateur, dernière sourate) en localStorage — actuellement perdues à chaque rechargement
2. Ajouter le widget de don (Wave/Orange Money/PayPal) sur le site principal — configuré dans l'admin mais pas encore affiché sur index.html
3. Cache sessionStorage pour les sourates déjà chargées — éviter de refaire les 4 appels API à chaque visite de la même sourate
4. Meta tags Open Graph + description SEO dans le `<head>` de index.html — actuellement absents, donc aucun aperçu lors du partage sur WhatsApp/Facebook
5. PWA — manifest.json + service worker pour rendre le site installable sur mobile
6. Recherche plein texte dans les 6236 versets du Coran
7. Suivi de progression Khatm (cocher les sourates lues) + marque-pages avec reprise de lecture
8. Slider de taille de police pour le texte arabe + contrôle de vitesse audio (0.5x/0.75x/1x/1.25x)
9. video.html : actuellement limité à une seule sourate à la fois pour la sélection multi-versets — permettre de mélanger des versets de sourates différentes

## Contraintes à respecter impérativement
- Ne jamais introduire de dépendance npm ou de build step — le site doit rester un simple dossier de fichiers HTML statiques déployables tel quel
- Toujours tester que les 3 fichiers HTML restent valides et fonctionnels après modification
- Garder la cohérence visuelle (palette or/émeraude/nuit, typographie arabe soignée)
- Ne jamais stocker de mot de passe en clair — toujours hasher en SHA-256 via WebCrypto API comme dans admin.html
- Les vidéos générées doivent rester exportables sans serveur backend (tout se passe dans le navigateur via Canvas + MediaRecorder + ffmpeg.wasm)

Commence par lire les 4 fichiers existants pour bien comprendre la structure actuelle, puis propose un plan avant de coder.
