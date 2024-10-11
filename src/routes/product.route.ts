import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '@/controllers/product.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createProductSchema, updateProductSchema } from '@/validators/product.form';
import express from 'express';

const productRouter = express.Router();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     description: Retrieve a list of all products from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRouter.get("/products", auth, getProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     description: Retrieve a single product by its ID.
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
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
productRouter.get("/products/:id", auth, getProductById);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Creates a new product in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.post(
    "/products",
    auth,
    validateData(createProductSchema),
    createProduct
);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     description: Update an existing product's information by its ID.
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
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
productRouter.put(
    "/products/:id",
    auth,
    validateData(updateProductSchema),
    updateProduct
);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     description: Delete a product from the system by its ID.
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
 *         description: Product successfully deleted.
 *       404:
 *         description: Product not found.
 */
productRouter.delete("/products/:id", auth, deleteProduct);

export default productRouter;