VAUBIA — NO-STRIPE STARTER

Objectif : permettre l'inscription sans Stripe pour démarrer tout de suite.

Ce que fait ce pack
- Ajoute une page `signup.html` (formulaire d'inscription) qui vous envoie les demandes par e‑mail via FormSubmit (aucun backend à gérer).
- `thanks.html` : page de confirmation après envoi.
- Un snippet pour que vos CTA des tarifs pointent vers `signup.html`.

Étapes (3 minutes)
1) Ouvrez `signup.html` et remplacez `YOUR_EMAIL` par votre e‑mail de réception (ex : contact@vaubia.com).
   - La première fois, FormSubmit vous enverra un e‑mail pour *confirmer* que vous autorisez la réception (clic à faire une fois).
2) Déposez `signup.html` et `thanks.html` à la **racine** de votre site (même niveau que index.html, pricing.html, etc.).
3) Dans `pricing.html`, remplacez les boutons "Souscrire" par `href="signup.html"` (ou utilisez le snippet fourni).

Process d'onboarding (manuel au début)
- Un prospect soumet `signup.html` → vous recevez un e‑mail avec le plan choisi.
- Vous envoyez votre facture / lien de paiement (virement, PayPal, etc.).
- Dès paiement reçu, vous envoyez ses **identifiants** par e‑mail (ou lien de création de mot de passe).
- Quand vous voulez automatiser, on branchera Stripe/Lemon Squeezy + un envoi automatique des identifiants.

Astuce RGPD
- Ajoutez dans `signup.html` une case à cocher "J’accepte la politique de confidentialité".
- Conservez les e‑mails reçus comme preuve du consentement.

Besoin d'une version avec Google Forms / Airtable / Notion Forms ? C'est possible, même principe (aucun backend requis).
