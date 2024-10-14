import swaggerJsdoc from "swagger-jsdoc";
import { allSchemas } from "./generated/shemaUtils";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Post de Vent POSP API",
      version: "1.0.0",
      description:
        "API complète pour la gestion des ventes, des achats et des stocks, conçue pour les commerces de détail.",
    },
    tags: [
      { name: "Users", description: "Gestion des utilisateurs." },
      { name: "Auth", description: "Authentification et autorisation." },
      { name: "Brands", description: "Gestion des marques de produits." },
      {
        name: "Categories",
        description: "Gestion des catégories de produits.",
      },
      { name: "Products", description: "Gestion des produits." },
      { name: "Units", description: "Gestion des unités de mesure." },
      {
        name: "Adjustements",
        description: "Gestion des ajustements de stock.",
      },
      { name: "Sales", description: "Gestion des ventes." },
      { name: "Purchase-Orders", description: "Gestion des achats." },

      { name: "Expenses", description: "Gestion des dépenses." },
      {
        name: "Expense-Categories",
        description: "Gestion des catégories de dépenses.",
      },
      {
        name: "Suppliers",
        description: "Gestion des fournisseurs.",
      },
      { name: "Customers", description: "Gestion des clients." },
      { name: "Shops", description: "Gestion des magasins." },
      {
        name: "Notifications",
        description: "Gestion des notifications.",
      },
      { name: "Payees", description: "Gestion des bénéficiaires." },
    ],
    servers: [
      {
        url: "http://localhost:10000",
        description: "Serveur de développement",
      },
    ],
    components: {
      schemas: allSchemas.components.schemas,
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Chemin vers les fichiers de définition de l'API
};

export const specs = swaggerJsdoc(options);
