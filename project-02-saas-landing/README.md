# FlowSync — Landing Page SaaS

## Description

Page d'atterrissage marketing complète pour **FlowSync**, une plateforme SaaS fictive d'automatisation de workflows. Le projet démontre la conception d'une landing page moderne et performante avec Next.js 14, des animations Framer Motion et un design gradient percutant.

## Technologies utilisées

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — design system, responsive, animations CSS
- **Framer Motion** — animations scroll-triggered, transitions fluides
- **Lucide React** — icônes cohérentes

## Fonctionnalités

- **Navbar sticky** : transparente au départ, fond blanc avec blur au scroll, hamburger sur mobile
- **Hero animé** : gradient mesh animé, maquette dashboard CSS, blobs flottants, badge animé
- **Logo strip** : bande "Trusted by" avec 6 logos d'entreprises tech françaises
- **Section Fonctionnalités** : 6 cartes avec icônes gradient et animations au scroll
- **Comment ça marche** : processus en 3 étapes avec ligne de connexion et numéros
- **Tarification** : toggle mensuel/annuel (-20%), 3 tiers (Gratuit, Pro, Team), badge "le plus populaire"
- **Témoignages** : 3 cartes avec avatars, citations, 5 étoiles, stats de preuve sociale
- **FAQ** : 8 questions avec accordéon animé (AnimatePresence)
- **CTA** : bannière gradient full-width avec formulaire email et état de succès
- **Footer** : grille de liens, icônes sociales, statut système

## Installation

```bash
cd project-02-saas-landing
npm install
```

## Lancer le projet

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

Pour la production :

```bash
npm run build
npm run start
```

## Aperçu

La page s'ouvre sur un **hero plein écran** avec un gradient animé violet → rose, une accroche en 3 lignes bold et une maquette de dashboard CSS qui flotte à droite. En descendant, les sections s'animent progressivement grâce à Framer Motion (`whileInView`). La section **Tarifs** propose un toggle mensuel/annuel interactif qui met à jour les prix instantanément. Le **FAQ** utilise un accordéon smooth avec AnimatePresence. La page se termine par un **CTA gradient** avec formulaire email inline et feedback visuel de soumission.

L'ensemble est **responsive** : hamburger sur mobile (375px), layout 2 colonnes sur tablette (768px), disposition complète sur desktop (1280px+).
