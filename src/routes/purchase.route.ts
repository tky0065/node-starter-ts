import { Router } from "express";

import { auth } from "@/middleware/verifyTokenMiddleware";
import { getPurchaseOrders, getPurchaseOrderById, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } from "@/controllers/purchase.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { createPurchaseOrderSchema, updatePurchaseOrderSchema } from "@/validators/purchase-order.form";


const purchaseRouter = Router();

/**
 * @swagger
 * /api/v1/purchase-orders:
 *   get:
 *     summary: Retrieve a list of purchase orders
 *     tags: [Purchase Orders]
 *     description: Retrieve a list of all purchase orders from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of purchase orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseOrder'
 */
purchaseRouter.get("/purchase-orders", auth, getPurchaseOrders);

/**
 * @swagger
 * /api/v1/purchase-orders/{id}:
 *   get:
 *     summary: Get a purchase order by ID
 *     tags: [Purchase Orders]
 *     description: Retrieve a single purchase order by its ID.
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
 *         description: A single purchase order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseOrder'
 *       404:
 *         description: Purchase order not found.
 */
purchaseRouter.get("/purchase-orders/:id", auth, getPurchaseOrderById);

/**
 * @swagger
 * /api/v1/purchase-orders:
 *   post:
 *     summary: Create a new purchase order
 *     tags: [Purchase Orders]
 *     description: Creates a new purchase order in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseOrder'
 *     responses:
 *       201:
 *         description: Purchase order successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseOrder'
 */
purchaseRouter.post(
    "/purchase-orders",
    auth,
    validateData(createPurchaseOrderSchema),
    createPurchaseOrder
);

/**
 * @swagger
 * /api/v1/purchase-orders/{id}:
 *   put:
 *     summary: Update a purchase order by ID
 *     tags: [Purchase Orders]
 *     description: Update an existing purchase order's information by its ID.
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
 *             $ref: '#/components/schemas/PurchaseOrder'
 *     responses:
 *       200:
 *         description: Purchase order information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseOrder'
 *       404:
 *         description: Purchase order not found.
 */
purchaseRouter.put(
    "/purchase-orders/:id",
    auth,
    validateData(updatePurchaseOrderSchema),
    updatePurchaseOrder
);

/**
 * @swagger
 * /api/v1/purchase-orders/{id}:
 *   delete:
 *     summary: Delete a purchase order by ID
 *     tags: [Purchase Orders]
 *     description: Delete a purchase order from the system by its ID.
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
 *         description: Purchase order successfully deleted.
 *       404:
 *         description: Purchase order not found.
 */
purchaseRouter.delete("/purchase-orders/:id", auth, deletePurchaseOrder);

export default purchaseRouter;