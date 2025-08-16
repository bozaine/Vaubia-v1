# Vaubia — Machine de guerre (React + Vite)

Design sombre teal/bleu, landing *Runway-like* (fond dégradé + loupe qui révèle la recherche au survol),
menu hamburger, topics horizontaux, page **Pricing** avec carrousel *swipe* d’un geste,
auth mock (localStorage), **routing**, **zones protégées** (dashboard/settings), bannière cookies, i18n FR/EN.

## Lancer en local
```bash
npm i
npm run dev
```

## Déployer sur Vercel (ZIP)
1. Compressez ce dossier (ou prenez le .zip fourni).
2. Vercel → **New Project** → **Upload**.
3. Framework détecté: *Vite*.
   - Build command: `npm run build`
   - Output: `dist`
4. Déployez.

## Pages
- `/` : Landing minimaliste avec gradient + search-icon qui se déploie.
- `/pricing` : Carrousel tactile (mensuel/annuel/entreprise).
- `/login` / `/signup` : Auth mock (localStorage).
- `/dashboard` (protégée) : métriques simulées.
- `/settings` (protégée) : langue, apparence (démo).
- `/services`, `/contact`, `/mentions-legales`, `/politique-confidentialite`, `/cookies`.

> A brancher plus tard sur un vrai backend & Stripe.
