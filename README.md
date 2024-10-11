# API de Gestion de Vente (POS)

Bienvenue dans le projet **Node Starter TS** !

Ce projet est un point de départ pour les applications Node.js utilisant TypeScript et Prisma. Il fournit une structure de base pour démarrer rapidement le développement d'applications backend robustes et évolutives.

## Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Endpoints principaux](#endpoints-principaux)
- [Mises à jour à venir](#mises-à-jour-à-venir)
- [Modules à ajouter](#modules-à-ajouter)
- [Utilisation](#utilisation)
- [Documentation complète de l'API](#documentation-complète-de-lapi)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Description

Cette API est un service de gestion de ventes développé avec Node.js, TypeScript et Prisma. Elle permet de gérer des opérations liées aux produits, aux clients et aux ventes dans un système de gestion de points de vente.

## Fonctionnalités

- **Gestion des dépenses** : Créer, lire, mettre à jour et supprimer des dépenses.
- **Gestion des ajustements** : Créer, lire, mettre à jour et supprimer des ajustements.
- **Gestion des paiements** : Créer, lire, mettre à jour et supprimer des paiements.
- **Gestion des unités** : Ajouter et gérer les unités de mesure des produits.
- **Gestion des ventes** : Créer, lire, mettre à jour et supprimer des ventes.
- **Gestion des produits** : Ajouter, mettre à jour et supprimer des produits disponibles à la vente.
- **Gestion des clients** : Ajouter et gérer les clients associés aux ventes.
- **Authentification** : Gérer l'authentification des utilisateurs.
- **Gestion des magasins** : Ajouter et gérer les magasins.
- **Gestion des fournisseurs** : Ajouter et gérer les fournisseurs.
- **Gestion des catégories** : Ajouter et gérer les catégories de produits.
- **Gestion des marques** : Ajouter et gérer les marques de produits.
- **Gestion des ventes** : Créer, lire, mettre à jour et supprimer des ventes.
- **Gestion des produits** : Ajouter, mettre à jour et supprimer des produits disponibles à la vente.
- **Gestion des clients** : Ajouter et gérer les clients associés aux ventes.
- **Authentification** : Gérer l'authentification des utilisateurs.
- **Gestion des magasins** : Ajouter et gérer les magasins.
- **Gestion des fournisseurs** : Ajouter et gérer les fournisseurs.
- **Gestion des catégories** : Ajouter et gérer les catégories de produits.
- **Gestion des marques** : Ajouter et gérer les marques de produits.
- **Gestion des unités** : Ajouter et gérer les unités de mesure des produits.

## Technologies utilisées

- **Node.js** : Backend pour le traitement des requêtes.
- **TypeScript** : Superset de JavaScript pour une meilleure gestion des types.
- **Prisma** : ORM pour interagir avec la base de données.
- **Express** : Framework web pour Node.js.
- **PostgreSQL** : Base de données relationnelle.
- **MongoDB** : Base de données NoSQL.
- **Zod** : Validation des schémas de données.
- **bcrypt** : Hachage des mots de passe.
- **jsonwebtoken** : Gestion des tokens JWT pour l'authentification.
- **dotenv** : Gestion des variables d'environnement.
- **cors** : Middleware pour gérer les politiques de partage des ressources entre origines multiples.
- **date-fns** : Bibliothèque pour la manipulation des dates.
- **express-rate-limit** : Limitation du taux de requêtes pour prévenir les abus.
- **http-status-codes** : Codes de statut HTTP standardisés.
- **ts-node-dev** : Outil de développement pour exécuter TypeScript directement.
- **tsc-alias** : Gestion des alias de chemins TypeScript.
- **tsconfig-paths** : Résolution des chemins de modules dans TypeScript.
- **@faker-js/faker** : Génération de données factices pour les tests.
- **resend** : Service d'envoi d'emails.
- **@types** : Types pour les bibliothèques JavaScript courantes.
- **Node.js** : Backend pour le traitement des requêtes.
- **TypeScript** : Superset de JavaScript pour une meilleure gestion des types.
- **Prisma** : ORM pour interagir avec la base de données.
- **Express** : Framework web pour Node.js.
- **PostgreSQL/MongoDB** : Base de données utilisée (selon votre choix).

## Endpoints principaux

| Méthode | Endpoint                | Description                          |
| ------- | ----------------------- | ------------------------------------ |
| POST    | `/api/v1/auth/login`    | Authentifier un utilisateur          |
| GET     | `/api/v1/customers`     | Récupérer la liste des clients       |
| POST    | `/api/v1/customers`     | Ajouter un nouveau client            |
| GET     | `/api/v1/users`         | Récupérer la liste des utilisateurs  |
| POST    | `/api/v1/users`         | Ajouter un nouvel utilisateur        |
| GET     | `/api/v1/shops`         | Récupérer la liste des magasins      |
| POST    | `/api/v1/shops`         | Ajouter un nouveau magasin           |
| GET     | `/api/v1/suppliers`     | Récupérer la liste des fournisseurs  |
| POST    | `/api/v1/suppliers`     | Ajouter un nouveau fournisseur       |
| GET     | `/api/v1/products`      | Récupérer la liste des produits      |
| POST    | `/api/v1/products`      | Ajouter un nouveau produit           |
| GET     | `/api/v1/categories`    | Récupérer la liste des catégories    |
| POST    | `/api/v1/categories`    | Ajouter une nouvelle catégorie       |
| GET     | `/api/v1/brands`        | Récupérer la liste des marques       |
| POST    | `/api/v1/brands`        | Ajouter une nouvelle marque          |
| GET     | `/api/v1/units`         | Récupérer la liste des unités        |
| POST    | `/api/v1/units`         | Ajouter une nouvelle unité           |
| GET     | `/api/v1/expenses`      | Récupérer la liste des dépenses      |
| POST    | `/api/v1/expenses`      | Ajouter une nouvelle dépense         |
| GET     | `/api/v1/adjustements`  | Récupérer la liste des ajustements   |
| POST    | `/api/v1/adjustements`  | Ajouter un nouvel ajustement         |
| GET     | `/api/v1/notifications` | Récupérer la liste des notifications |
| POST    | `/api/v1/notifications` | Ajouter une nouvelle notification    |
| GET     | `/api/v1/payees`        | Récupérer la liste des bénéficiaires |
| POST    | `/api/v1/payees`        | Ajouter un nouveau bénéficiaire      |

## Mises à jour à venir

- **Gestion des stocks** : Suivre et gérer les niveaux de stock des produits.
- **Rapports et analyses** : Générer des rapports de vente et des analyses de performance.
- **Notifications** : Mettre en place des notifications pour les événements importants (ex. : stock faible, nouvelles ventes).
- **Intégration avec des services tiers** : Connecter l'API avec des services externes pour enrichir les fonctionnalités (ex. : services de paiement, CRM).
- **Amélioration de la sécurité** : Ajouter des fonctionnalités de sécurité avancées comme l'authentification à deux facteurs (2FA).
- **Optimisation des performances** : Améliorer les performances de l'API pour gérer un plus grand nombre de requêtes simultanées.
- **Support multilingue** : Ajouter la prise en charge de plusieurs langues pour l'interface utilisateur et les messages d'erreur.
- **Automatisation des tests** : Mettre en place des tests automatisés pour garantir la qualité du code et prévenir les régressions.

## Modules à ajouter

- **Module de fidélisation** : Gérer les programmes de fidélité pour les clients.
- **Module de facturation** : Générer et gérer les factures pour les ventes.
- **Module de livraison** : Gérer les options et les statuts de livraison des commandes.
- **Module de retour** : Gérer les retours et les échanges de produits.
- **Module de support client** : Intégrer un système de support pour les clients.
- **Module d'amélioration de la sécurité** : Ajouter des fonctionnalités de sécurité avancées comme l'authentification à deux facteurs (2FA).
- **Module d'optimisation des performances** : Améliorer les performances de l'API pour gérer un plus grand nombre de requêtes simultanées.
- **Module de support multilingue** : Ajouter la prise en charge de plusieurs langues pour l'interface utilisateur et les messages d'erreur.
- **Module d'automatisation des tests** : Mettre en place des tests automatisés pour garantir la qualité du code et prévenir les régressions.

## Utilisation

1. Clonez le repository :

   ```bash
   git clone https://github.com/tky0065/node-starter-ts
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d'environnement pour la base de données Prisma.

4. Démarrez le serveur de développement :

   ```bash
   npm start
   ```

L'API sera disponible à l'adresse suivante : [https://point-vente-api.onrender.com/api/v1/](https://point-vente-api.onrender.com/api/v1/)

## Documentation complète de l'API

Vous pouvez consulter la documentation complète et tester les endpoints directement via [https://point-vente-api.onrender.com/api/v1/](https://point-vente-api.onrender.com/api/v1/).

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des issues ou des pull requests pour améliorer ce projet.

## Licence

Ce projet est sous licence MIT. Veuillez consulter le fichier [LICENSE](LICENSE) pour plus de détails.
