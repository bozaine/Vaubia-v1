VAUBIA — NO-STRIPE STARTER + RGPD + DOUBLE OPT-IN (lite)

Ce pack rend votre formulaire d’inscription conforme et ajoute une confirmation d’adresse e‑mail sans backend.

Ce que ça ajoute
- Case RGPD obligatoire (politique + mentions).
- Auto‑réponse e‑mail au visiteur avec un lien “Confirmer” (page `confirmed.html`).
- Vous recevez aussi l’e‑mail avec les infos d’inscription (FormSubmit).

Étapes
1) Ouvrez `signup.html` et remplacez `YOUR_EMAIL` par votre e‑mail (ex. contact@vaubia.com).
   - À la première soumission, FormSubmit demandera de valider votre adresse (clic dans un e‑mail qu’ils envoient à VOTRE adresse).
2) Uploadez `signup.html`, `thanks.html` et `confirmed.html` à la racine du site.
3) Dans `pricing.html`, faites pointer “Souscrire” vers `signup.html`.
4) Testez le flux :
   - Remplissez `signup.html` → vous arrivez sur `thanks.html` → regardez l’auto‑réponse e‑mail reçue par le visiteur (avec le lien `confirmed.html`).

Important (limites et bonnes pratiques)
- Sans backend, la page `confirmed.html` **ne vérifie pas** de jeton unique. Pour un vrai suivi d’état “confirmé / non confirmé”, on passera plus tard sur Stripe + base (Supabase) et un lien signé unique.
- En attendant, vous pouvez demander au visiteur de **répondre “CONFIRME”** à l’e‑mail (déjà mentionné dans l’autoresponse). Cette réponse constitue une preuve de consentement.
- Conservez les e‑mails reçus (FormSubmit) comme journal d’inscription et preuve RGPD.

Optionnel
- Ajouter une case “Recevoir les actus” (opt‑in marketing distinct).
- Ajouter reCAPTCHA (FormSubmit gère `_captcha=false` par défaut, vous pouvez remettre à `true` si besoin).

Besoin d’un vrai double opt‑in avec lien unique signé ? Je peux vous générer la version Stripe + Supabase (webhooks Vercel) quand vous serez prêt.
