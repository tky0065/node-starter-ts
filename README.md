
# API de Gestion de Vente

Cette API est un service de gestion de ventes développé avec Node.js, TypeScript et Prisma. Elle permet de gérer des opérations liées aux produits, aux clients et aux ventes dans un système de gestion de points de vente.

## Fonctionnalités

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
- **PostgreSQL/MongoDB** : Base de données utilisée (selon votre choix).

## Endpoints principaux

| Méthode | Endpoint            | Description                     |
| ------- | ------------------- | ------------------------------- |
| POST    | `/api/v1/auth/login`| Authentifier un utilisateur     |
| GET     | `/api/v1/customers` | Récupérer la liste des clients  |
| POST    | `/api/v1/customers` | Ajouter un nouveau client       |
| GET     | `/api/v1/users`     | Récupérer la liste des utilisateurs |
| POST    | `/api/v1/users`     | Ajouter un nouvel utilisateur   |
| GET     | `/api/v1/shops`     | Récupérer la liste des magasins |
| POST    | `/api/v1/shops`     | Ajouter un nouveau magasin      |
| GET     | `/api/v1/suppliers` | Récupérer la liste des fournisseurs |
| POST    | `/api/v1/suppliers` | Ajouter un nouveau fournisseur  |
| GET     | `/api/v1/products`  | Récupérer la liste des produits |
| POST    | `/api/v1/products`  | Ajouter un nouveau produit      |
| GET     | `/api/v1/categories`| Récupérer la liste des catégories |
| POST    | `/api/v1/categories`| Ajouter une nouvelle catégorie  |
| GET     | `/api/v1/brands`    | Récupérer la liste des marques  |
| POST    | `/api/v1/brands`    | Ajouter une nouvelle marque     |
| GET     | `/api/v1/units`     | Récupérer la liste des unités   |
| POST    | `/api/v1/units`     | Ajouter une nouvelle unité      |

## Utilisation

1. Clonez le repository :

    ```bash
    git clone https://github.com/votre-utilisateur/point-vente-api.git
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
