# Portfolio Site — Alexandre Leblanc

## Description

Site portfolio personnel d'Alexandre Leblanc, développeur full-stack basé à Paris. Ce site présente le parcours professionnel, les compétences techniques, les projets réalisés et propose un moyen de contact direct. Conçu avec Next.js 14 (App Router), TypeScript et Tailwind CSS, il adopte un design sombre et élégant avec des animations fluides.

## Technologies utilisées

- **Next.js 14** — App Router, Server Components, métadonnées SEO
- **React 18** — Composants fonctionnels, hooks
- **TypeScript** — Typage strict
- **Tailwind CSS** — Styling utilitaire, thème personnalisé
- **Framer Motion** (via animations CSS) — Transitions et effets
- **react-intersection-observer** — Animations au scroll
- **react-hook-form** — Validation de formulaire

## Fonctionnalités

- **Hero** animé avec typewriter cycling entre "développeur", "builder", "créateur", "passionné"
- **Particules flottantes** CSS-only dans le hero
- **Navigation** fixe avec backdrop blur et liens actifs au scroll
- **Section À propos** avec avatar gradient, bio et grille de faits
- **Compétences** groupées par Frontend / Backend / Outils avec barres de progression animées
- **Projets** filtrable par catégorie, cartes avec overlay GitHub/démo
- **Timeline** alternée gauche/droite pour l'expérience et la formation
- **Blog** avec 2 articles prévisualisés
- **Contact** avec formulaire validé inline et liens sociaux
- **Pied de page** avec bouton retour en haut
- **SEO** complet : métadonnées Open Graph, sitemap.xml, robots.txt
- **Design responsive** 375px / 768px / 1280px

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Alex00121/portfolio-nextjs.git
cd portfolio-nextjs/project-05-portfolio-site

# Installer les dépendances
npm install
```

## Lancer le projet

```bash
# Mode développement
npm run dev

# Build de production
npm run build
npm start
```

Le site sera disponible sur `http://localhost:3000`.

## Aperçu

Le site s'ouvre sur une section hero plein écran avec un fond sombre (`#030712`), un accent cyan (`#22d3ee`), des blobs de couleur animés en arrière-plan et des particules flottantes CSS-only. Le titre "Salut, je suis Alexandre" est suivi d'un typewriter animé. La navigation fixe adopte un effet de verre (backdrop blur) au scroll. Les sections se révèlent avec un fondu depuis le bas grâce à l'IntersectionObserver. Les cartes de projets disposent d'un overlay avec liens GitHub et démo au survol.
