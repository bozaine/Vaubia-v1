
# Vaubia — bundle drag & drop (v3)

**Ce dossier est directement déployable sur Vercel par simple glisser‑déposer.**  
Multi‑pages statiques + JS partagé (pas de build).

## Pages
- `index.html` (Home + search pill + 3 topics)
- `pricing.html` (**carrousel tactile** infini avec swipe)
- `login.html`, `signup.html` (inscription -> tarifs, connexion -> dashboard)
- `dashboard.html` (**protégé** : redirige vers Login si non connecté)
- `settings.html` (mode sombre/clair, langue, préférences)
- `services.html`, `contact.html`
- `legal/…` (mentions, confidentialité, cookies)
- `vercel.json` (headers sécurité)

## Auth simulée
- Inscription → enregistre un *pending signup* → Tarifs → `Souscrire` crée un *plan* + session.
- Connexion → crée une session mock (`localStorage`) → accès au `dashboard.html`.

## Déploiement
1. Aller sur **vercel.com → New Project → Upload**.
2. Glisser tout le dossier **ou** le ZIP ci‑joint.
3. C’est en ligne ✔️

> Pour repartir de zéro : `localStorage.clear()` (dans la console) ou “Se déconnecter”.

