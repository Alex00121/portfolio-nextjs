# ShopNext — Boutique E-commerce

## Description

Application e-commerce complète construite avec Next.js 14 (App Router). Permet de parcourir un catalogue de 16 produits répartis en 4 catégories, de les filtrer, de les ajouter au panier et de passer commande via un tunnel de paiement en 3 étapes. L'état du panier est persisté dans le localStorage via Zustand.

## Technologies utilisées

- **Next.js 14** — App Router, Server Components, `generateMetadata`
- **React 18** — hooks, état client
- **TypeScript** — typage strict sur toute la codebase
- **Zustand** — gestion du panier avec persistance `localStorage`
- **Tailwind CSS** — design system utilitaire
- **Lucide React** — icônes SVG
- **picsum.photos** — images produit réalistes

## Fonctionnalités

- Catalogue de 16 produits sur 4 catégories (Vêtements, Électronique, Maison, Sport)
- Filtres : catégorie, fourchette de prix, note minimale, couleurs disponibles
- Tri : plus récents, prix croissant/décroissant, meilleures notes
- Fiche produit : galerie 4 images, sélecteur de couleur, de taille et de quantité
- Panier persistant avec gestion des quantités, sous-total, TVA et livraison
- Livraison gratuite dès 50€
- Tunnel de paiement 3 étapes avec validation inline des champs
- Page de confirmation de commande avec numéro unique et tracking visuel
- Navigation responsive avec menu hamburger sur mobile
- Filtre bottom-sheet sur mobile

## Installation

```bash
cd project-03-ecommerce-store
npm install
```

## Lancer le projet

```bash
npm run dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

## Aperçu

L'interface adopte un design minimaliste sur fond blanc avec des accents sombres (`#111827`). La page produits affiche une grille responsive (2→3→4 colonnes) avec une barre de filtres latérale sur desktop et un bottom-sheet sur mobile. Chaque carte produit propose un survol avec bouton d'ajout rapide au panier. La fiche détail affiche 4 images en galerie avec sélecteurs de couleur et de taille. Le panier résume les articles, calcule les frais et la TVA. Le checkout guide l'utilisateur en 3 étapes (Contact → Livraison → Paiement) avec validation inline et retour arrière possible. La confirmation affiche un numéro de commande unique et un suivi de statut visuel.
