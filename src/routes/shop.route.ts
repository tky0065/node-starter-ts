import {
  createShop,
  deleteShop,
  getShopAttendants,
  getShopById,
  getShops,
  updateShop,
} from "@/controllers/shop.controller";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /api/v1/shops:
 *   post:
 *     summary: Create a new shop
 *     tags: [Shops]
 *     description: Creates a new shop in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       201:
 *         description: Shop successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 */
router.post("/api/v1/shops", createShop);

/**
 * @swagger
 * /api/v1/shops:
 *   get:
 *     summary: Retrieve a list of shops
 *     tags: [Shops]
 *     description: Retrieve a list of all shops from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of shops.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 */
router.get("/api/v1/shops", getShops);

/**
 * @swagger
 * /api/v1/attendants/shops/{id}:
 *   get:
 *     summary: Get shop attendants by shop ID
 *     tags: [Shops]
 *     description: Retrieve a list of attendants for a specific shop by the shop's ID.
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
 *         description: A list of shop attendants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendant'
 *       404:
 *         description: Shop not found.
 */
router.get("/api/v1/attendants/shops/:id", getShopAttendants);

/**
 * @swagger
 * /api/v1/shops/{id}:
 *   get:
 *     summary: Get a shop by ID
 *     tags: [Shops]
 *     description: Retrieve a single shop by its ID.
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
 *         description: A single shop.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shop not found.
 */
router.get("/api/v1/shops/:id", getShopById);

/**
 * @swagger
 * /api/v1/shops/{id}:
 *   put:
 *     summary: Update a shop by ID
 *     tags: [Shops]
 *     description: Update an existing shop's information by its ID.
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
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       200:
 *         description: Shop information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shop not found.
 */
router.put("/api/v1/shops/:id", updateShop);

/**
 * @swagger
 * /api/v1/shops/{id}:
 *   delete:
 *     summary: Delete a shop by ID
 *     tags: [Shops]
 *     description: Delete a shop from the system by its ID.
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
 *         description: Shop successfully deleted.
 *       404:
 *         description: Shop not found.
 */
router.delete("/api/v1/shops/:id", deleteShop);

export default router;
