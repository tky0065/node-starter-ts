import { createExpenseCategory, deleteExpenseCategory, getExpenseCategories, getExpenseCategoryById, updateExpenseCategory } from '@/controllers/expense-category.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createExpenseCategorySchema, updateExpenseCategorySchema } from '@/validators/expense-categorie.form';

import express from 'express';

const expenseCategoryRouter = express.Router();

/**
 * @swagger
 * /api/v1/expense-categories:
 *   get:
 *     summary: Retrieve a list of expense categories
 *     tags: [Expense-Categories]
 *     description: Retrieve a list of all expense categories from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of expense categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExpenseCategory'
 */
expenseCategoryRouter.get("/expense-categories", auth, getExpenseCategories);

/**
 * @swagger
 * /api/v1/expense-categories/{id}:
 *   get:
 *     summary: Get an expense category by ID
 *     tags: [Expense-Categories]
 *     description: Retrieve a single expense category by its ID.
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
 *         description: A single expense category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 *       404:
 *         description: Expense category not found.
 */
expenseCategoryRouter.get("/expense-categories/:id", auth, getExpenseCategoryById);

/**
 * @swagger
 * /api/v1/expense-categories:
 *   post:
 *     summary: Create a new expense category
 *     tags: [Expense-Categories]
 *     description: Creates a new expense category in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExpenseCategory'
 *     responses:
 *       201:
 *         description: Expense category successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 */
expenseCategoryRouter.post(
    "/expense-categories",
    auth,
    validateData(createExpenseCategorySchema),
    createExpenseCategory
);

/**
 * @swagger
 * /api/v1/expense-categories/{id}:
 *   put:
 *     summary: Update an expense category by ID
 *     tags: [Expense-Categories]
 *     description: Update an existing expense category's information by its ID.
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
 *             $ref: '#/components/schemas/ExpenseCategory'
 *     responses:
 *       200:
 *         description: Expense category information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 *       404:
 *         description: Expense category not found.
 */
expenseCategoryRouter.put(
    "/expense-categories/:id",
    auth,
    validateData(updateExpenseCategorySchema),
    updateExpenseCategory
);

/**
 * @swagger
 * /api/v1/expense-categories/{id}:
 *   delete:
 *     summary: Delete an expense category by ID
 *     tags: [Expense-Categories]
 *     description: Delete an expense category from the system by its ID.
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
 *         description: Expense category successfully deleted.
 *       404:
 *         description: Expense category not found.
 */
expenseCategoryRouter.delete("/expense-categories/:id", auth, deleteExpenseCategory);

export default expenseCategoryRouter;