# Auth Dashboard

## Description

Tableau de bord professionnel avec authentification complète via NextAuth.js. L'application propose une interface d'administration moderne avec gestion de projets, d'utilisateurs et de paramètres de profil, le tout protégé par un système de rôles (admin / membre).

## Technologies utilisées

- **Next.js 14** — App Router, Server Components, Server Actions
- **NextAuth.js** — Authentification JWT avec stratégie Credentials
- **TypeScript** — Typage statique complet
- **Tailwind CSS** — Mise en page et design system
- **Recharts** — Graphique en barres pour l'activité mensuelle
- **Lucide React** — Icônes modernes

## Fonctionnalités

- Authentification par email/mot de passe (NextAuth Credentials)
- Deux rôles : **admin** (accès complet) et **membre** (accès restreint)
- Protection des routes `/dashboard/*` via `middleware.ts`
- Affichage/masquage du mot de passe sur la page de connexion
- Identifiants de démonstration affichés directement sur le formulaire
- Tableau de bord principal : 4 KPI cards + graphique + fil d'activité
- Page Projets : tableau complet avec statuts colorés et menu d'actions
- Page Utilisateurs : réservée aux admins, liste avec rôles et badges
- Page Paramètres : mise à jour du nom/email (côté client, session synchronisée)
- Sidebar responsive avec navigation active et déconnexion
- Animations CSS d'entrée de page (`fadeIn`)

## Installation

```bash
cd project-04-auth-dashboard
npm install
```

Copiez le fichier d'environnement et remplissez les valeurs :

```bash
cp .env.example .env.local
```

`.env.local` :
```
NEXTAUTH_SECRET="une-chaine-aleatoire-longue-et-secrete"
NEXTAUTH_URL="http://localhost:3000"
```

## Lancer le projet

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) — vous serez redirigé vers `/login`.

## Aperçu

### Page de connexion
Carte centrée sur fond dégradé sombre (slate → indigo). Champ email + mot de passe avec bouton afficher/masquer. Deux boutons de démonstration permettent de remplir automatiquement les identifiants admin ou utilisateur.

### Tableau de bord
Sidebar sombre fixe à gauche (#1e293b) avec logo, liens de navigation et avatar de l'utilisateur connecté. Zone principale claire (#f8fafc) avec :
- **4 KPI cards** aux bordures supérieures colorées : Utilisateurs (1 284), Revenus (24 500 €), Projets actifs (42), Satisfaction (98 %)
- **Graphique en barres** (Recharts) — projets créés par mois sur l'année 2025
- **Fil d'activité** — 10 entrées avec avatars initiales colorés

### Page Projets
Tableau complet de 8 projets fictifs avec : nom, client, statut (badge coloré : actif/terminé/en pause), budget, échéance, responsable, menu d'actions (Voir / Modifier / Supprimer).

### Page Utilisateurs (admin uniquement)
Tableau de 6 utilisateurs avec avatar initiales coloré, email, rôle (Admin / Membre / Visiteur) et statut actif/inactif. Redirige les non-admins vers le tableau de bord.

### Page Paramètres
Avatar grand format généré depuis les initiales (dégradé indigo → purple), formulaire de mise à jour nom/email, zone de danger.
