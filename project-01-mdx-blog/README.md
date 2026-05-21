# Blog MDX — Next.js 14

Un blog de développement moderne construit avec Next.js 14 App Router, MDX, et Tailwind CSS.
Design épuré et éditorial avec mode sombre, table des matières interactive et mise en évidence syntaxique Shiki.

## Description

Ce projet est un blog technique statiquement généré qui exploite la puissance des fichiers MDX pour
un contenu riche en code. Les articles sont écrits en MDX (Markdown + JSX), stockés localement dans
le dossier `content/`, et rendus avec `next-mdx-remote`. Le résultat : des articles avec coloration
syntaxique, composants interactifs, et une table des matières dynamique.

## Technologies utilisées

- **Next.js 14** — App Router, Server Components, `generateStaticParams`
- **React 18** — Composants serveur et client
- **TypeScript** — Typage statique complet
- **MDX** — Markdown enrichi de composants React
- **next-mdx-remote** — Compilation MDX côté serveur (RSC)
- **Shiki + rehype-pretty-code** — Coloration syntaxique thème One Dark Pro
- **Tailwind CSS** — Styles utilitaires, plugin Typography pour le prose
- **next-themes** — Mode sombre avec préférence système
- **gray-matter** — Parsing des frontmatter YAML
- **lucide-react** — Icônes

## Fonctionnalités

- **3 articles complets** (~600 mots chacun) sur React Hooks, CSS Grid et TypeScript Generics
- **Mode sombre / clair** avec persistance localStorage et respect de la préférence système
- **Table des matières interactive** : sidebar sticky sur desktop, surlignage de la section active
  via `IntersectionObserver`
- **Bouton Copier** sur chaque bloc de code (composant client)
- **Filtre par tag** : navigation URL-based (`?tag=react`), sans rechargement de page
- **Temps de lecture** calculé (mots ÷ 200)
- **Flux RSS** disponible à `/rss`
- **SEO** : `generateMetadata` par article, Open Graph, Twitter Card
- **Transitions CSS** : fadeIn et slideUp à l'entrée de page
- **Responsive** : mobile / tablette / desktop

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Alex00121/portfolio-nextjs.git
cd portfolio-nextjs/project-01-mdx-blog

# Installer les dépendances
npm install
```

## Lancer le projet

```bash
# Développement (localhost:3000)
npm run dev

# Build de production
npm run build
npm run start
```

## Aperçu

L'interface se compose de deux grandes vues :

**Page d'accueil** — En-tête avec titre et description, barre de filtres par tag, grille
de cartes d'articles (titre, extrait sur 2 lignes, tags colorés, date et temps de lecture).
Fond blanc en mode clair, fond `#0f172a` en mode sombre.

**Page article** — Colonne principale avec le contenu MDX en police serif (Lora), blocs de code
dark-themed avec bouton copier, citations stylisées, tableaux responsives. Sidebar sticky avec
la table des matières qui surligne la section visible. Lien de retour en haut.

**Navbar** — Fond translucide avec `backdrop-blur`, logo, liens, et bouton de basculement
soleil/lune pour le mode sombre.
