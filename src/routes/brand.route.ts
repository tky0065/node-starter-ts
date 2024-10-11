import { createBrand, deleteBrand, getBrands, getBrandById, updateBrand } from '@/controllers/brand.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createBrandSchema, updateBrandSchema } from '@/validators/brand.form';
import express from 'express';

const brandRouter = express.Router();
/**
 * @swagger
 * /api/v1/brands:
 *   get:
 *     summary: Retrieve a list of brands
 *     tags: [Brands]
 *     description: Retrieve a list of all brands from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of brands.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */
brandRouter.get("/brands", auth, getBrands);

/**
 * @swagger
 * /api/v1/brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     description: Retrieve a single brand by its ID.
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
 *         description: A single brand.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Brand not found.
 */
brandRouter.get("/brands/:id", auth, getBrandById);

/**
 * @swagger
 * /api/v1/brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     description: Creates a new brand in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Brand successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 */
brandRouter.post(
    "/brands",
    auth,
    validateData(createBrandSchema),
    createBrand
);

/**
 * @swagger
 * /api/v1/brands/{id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     description: Update an existing brand's information by its ID.
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
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Brand information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Brand not found.
 */
brandRouter.put(
    "/brands/:id",
    auth,
    validateData(updateBrandSchema),
    updateBrand
);

/**
 * @swagger
 * /api/v1/brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     description: Delete a brand from the system by its ID.
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
 *         description: Brand successfully deleted.
 *       404:
 *         description: Brand not found.
 */
brandRouter.delete("/brands/:id", auth, deleteBrand);

export default brandRouter;