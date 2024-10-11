import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '@/controllers/category.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createCategorySchema, updateCategorySchema } from '@/validators/category.form';
import express from 'express';

const categoryRouter = express.Router();

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [Categories]
 *     description: Retrieve a list of all categories from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
categoryRouter.get("/categories", auth, getCategories);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     description: Retrieve a single category by its ID.
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
 *         description: A single category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 */
categoryRouter.get("/categories/:id", auth, getCategoryById);

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     description: Creates a new category in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
categoryRouter.post(
    "/categories",
    auth,
    validateData(createCategorySchema),
    createCategory
);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     description: Update an existing category's information by its ID.
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 */
categoryRouter.put(
    "/categories/:id",
    auth,
    validateData(updateCategorySchema),
    updateCategory
);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     description: Delete a category from the system by its ID.
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
 *         description: Category successfully deleted.
 *       404:
 *         description: Category not found.
 */
categoryRouter.delete("/categories/:id", auth, deleteCategory);

export default categoryRouter;