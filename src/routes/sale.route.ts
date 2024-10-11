import {
  createSale,
  createSaleItem,
  deleteSale,
  getSaleById,
  getSales,
  getShopSales,
  getShopsSales,
  updateSale,
} from "@/controllers/sale.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { auth } from "@/middleware/verifyTokenMiddleware";
import {
  saleCreateSchema,
  saleItemSchema,
  saleUpdateSchema,
} from "@/validators/sale.form";

import express from "express";

const salesRouter = express.Router();
/**
 * @swagger
 * /api/v1/sales:
 *   get:
 *     summary: Retrieve a list of sales
 *     tags: [Sales]
 *     description: Retrieve a list of all sales from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sales.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 */
salesRouter.get("/sales", auth, getSales);

/**
 * @swagger
 * /api/v1/sales/shop/{shopId}:
 *   get:
 *     summary: Retrieve sales for a specific shop
 *     tags: [Sales]
 *     description: Retrieve a list of sales for a specific shop.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of sales for the shop.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 */
salesRouter.get("/sales/shop/:shopId", auth, getShopSales);

/**
 * @swagger
 * /api/v1/sales/all-shops:
 *   get:
 *     summary: Retrieve sales for all shops
 *     tags: [Sales]
 *     description: Retrieve a list of sales for all shops.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sales for all shops.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 */
salesRouter.get("/sales/all-shops", auth, getShopsSales);

/**
 * @swagger
 * /api/v1/sales/{id}:
 *   get:
 *     summary: Get a sale by ID
 *     tags: [Sales]
 *     description: Retrieve a single sale by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single sale.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Sale not found.
 */
salesRouter.get("/sales/:id", auth, getSaleById);

/**
 * @swagger
 * /api/v1/sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     description: Creates a new sale in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Sale successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 */
salesRouter.post("/sales", auth, validateData(saleCreateSchema), createSale);

/**
 * @swagger
 * /api/v1/sales/items:
 *   post:
 *     summary: Create a new sale item
 *     tags: [Sales]
 *     description: Creates a new sale item in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaleItem'
 *     responses:
 *       201:
 *         description: Sale item successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleItem'
 */
salesRouter.post(
  "/sales/items",
  auth,
  validateData(saleItemSchema),
  createSaleItem
);

/**
 * @swagger
 * /api/v1/sales/{id}:
 *   put:
 *     summary: Update a sale by ID
 *     tags: [Sales]
 *     description: Update an existing sale's information by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         description: Sale information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Sale not found.
 */
salesRouter.put("/sales/:id", auth, validateData(saleUpdateSchema), updateSale);

/**
 * @swagger
 * /api/v1/sales/{id}:
 *   delete:
 *     summary: Delete a sale by ID
 *     tags: [Sales]
 *     description: Delete a sale from the system by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sale successfully deleted.
 *       404:
 *         description: Sale not found.
 */
salesRouter.delete("/sales/:id", auth, deleteSale);

export default salesRouter;
