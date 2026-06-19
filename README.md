# القرآن الكريم — Al-Quran Al-Karim

Site web complet du Saint Coran — 114 sourates, audio multi-récitateurs, traductions FR/EN, générateur vidéo et panneau d'administration.

## Fichiers du projet

| Fichier | Rôle |
|---|---|
| `index.html` | Site principal — lecture du Coran, audio, verset du jour, partage |
| `video.html` | Générateur de vidéos de versets avec audio synchronisé |
| `admin.html` | Panneau d'administration (stats, configuration du don) |
| `vercel.json` | Configuration de déploiement + headers de sécurité |

## Fonctionnalités

### Site principal (index.html)
- 114 sourates complètes — texte arabe, traduction FR/EN, translittération phonétique
- Audio par verset — 12 récitateurs disponibles (Alafasy, As-Sudais, Al-Husary...)
- Lecture continue (autoplay) et mode répétition (1x à 10x) pour la mémorisation
- Verset du jour automatique
- Partage de versets en image PNG (3 thèmes)
- Mode nuit / jour
- Salutation arabe à l'ouverture du site

### Générateur vidéo (video.html)
- Sélection de plusieurs versets (cases à cocher + réorganisation par glisser-déposer)
- Formats : 9:16 (Stories), 1:1 (Instagram), 16:9 (YouTube), 4:5 (Feed)
- Audio synchronisé verset par verset via Web Audio API
- Animations : révélation mot par mot, traduction progressive, particules
- Export en MP4 (conversion via ffmpeg.wasm) ou WebM

### Administration (admin.html)
- Connexion sécurisée par email + mot de passe (hash SHA-256, jamais en clair)
- Protection anti brute-force (verrouillage 15 min après 5 tentatives)
- Tableau de bord : visiteurs, versets écoutés, partages, vidéos générées
- Configuration du bouton de don (Wave, Orange Money, PayPal)
- Générateur de code à intégrer dans le site principal

## Sécurité

Le fichier `vercel.json` inclut les protections suivantes :
- `X-Frame-Options: DENY` + `Content-Security-Policy: frame-ancestors 'none'` (anti-clickjacking)
- Frame Buster JavaScript dans chaque page HTML
- `Access-Control-Allow-Origin` restreint au domaine du site (pas de wildcard `*`)
- `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`

## Déploiement sur Vercel

### Via GitHub (recommandé)
1. Créez un dépôt GitHub et uploadez les 4 fichiers à la racine
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt
3. Framework Preset : **Other** — laissez Build/Output Directory vides
4. Déployez

### Mise à jour
Chaque `git push` (ou upload via l'interface GitHub) redéploie automatiquement le site.

## Avant la mise en ligne — checklist sécurité

- [ ] Changez les identifiants admin par défaut dans `admin.html` (panneau "Changer les identifiants" sur la page de connexion)
- [ ] Remplacez l'URL `https://al-quran1.vercel.app` dans `vercel.json` par votre propre domaine si différent
- [ ] Configurez vos liens de don (Wave / Orange Money / PayPal) depuis l'admin

## APIs utilisées (gratuites, sans clé)

| API | Usage |
|---|---|
| `api.alquran.cloud` | Texte arabe, traductions, translittération |
| `cdn.islamic.network` | Fichiers audio des récitations |

---
صَدَقَ اللَّهُ الْعَظِيمُ — Allah le Très-Grand a dit la vérité

Conçu par Yatus — Dakar, Sénégal
