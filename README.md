# Vaubia • React SaaS Starter (no external services)

Implémente tout ce qui était demandé **sans outil tiers** (pas de backend/DB) :

- ✅ **Routing** (react-router) : `/`, `/pricing`, `/login`, `/signup`, `/dashboard`, `/settings`, `/components`
- ✅ **Zones protégées** via `ProtectedRoute` + session mock (localStorage)
- ✅ **Login / Signup** réalistes (validations, loaders, erreurs)
- ✅ **Settings** (profil local, mode sombre/clair, langue FR/EN, préférences)
- ✅ **Accessibilité** (ARIA, focus, labels) + **Responsive** + **Skeleton**
- ✅ **États vides/erreur** (alertes, graph)
- ✅ **Mocks de données** + bouton **Rafraîchir**
- ✅ **i18n maison** (FR/EN)
- ✅ **Tests** (Vitest) + **ESLint/Prettier**
- ✅ **Docs** `/components` (storybook light)

## Démarrer

```bash
npm install
npm run dev
```

Visite http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Notes
- Sessions & données sont **mockées** (localStorage). Remplacez par une vraie API quand vous serez prêt.
- Pour reset : ouvrir la console → `localStorage.clear()`.
