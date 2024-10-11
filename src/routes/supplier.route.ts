import {
  createSupplier,
  deleteSupplier,
  getSupplierById,
  getSuppliers,
  updateSupplier,
} from "@/controllers/supplier.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { auth } from "@/middleware/verifyTokenMiddleware";
import {
  supplierCreateSchema,
  supplierUpdateSchema,
} from "@/validators/supplier.form";
import express from "express";

const supplierRouter = express.Router();

/**
 * @swagger
 * /api/v1/suppliers:
 *   get:
 *     summary: Retrieve a list of suppliers
 *     tags: [Suppliers]
 *     description: Retrieve a list of all suppliers from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of suppliers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
supplierRouter.get("/suppliers", auth, getSuppliers);

/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Suppliers]
 *     description: Retrieve a single supplier by their ID.
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
 *         description: A single supplier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found.
 */
supplierRouter.get("/suppliers/:id", auth, getSupplierById);

/**
 * @swagger
 * /api/v1/suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     description: Creates a new supplier in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Supplier successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 */
supplierRouter.post(
  "/suppliers",
  auth,
  validateData(supplierCreateSchema),
  createSupplier
);

/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   put:
 *     summary: Update a supplier by ID
 *     tags: [Suppliers]
 *     description: Update an existing supplier's information by their ID.
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
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Supplier information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found.
 */
supplierRouter.put(
  "/suppliers/:id",
  auth,
  validateData(supplierUpdateSchema),
  updateSupplier
);

/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier by ID
 *     tags: [Suppliers]
 *     description: Delete a supplier from the system by their ID.
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
 *         description: Supplier successfully deleted.
 *       404:
 *         description: Supplier not found.
 */
supplierRouter.delete("/suppliers/:id", auth, deleteSupplier);

export default supplierRouter;
