import { createExpense, deleteExpense, getExpenses, getExpenseById, updateExpense } from '@/controllers/expense.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createExpenseSchema, updateExpenseSchema } from '@/validators/expense.form';
import express from 'express';

const expenseRouter = express.Router();

/**
 * @swagger
 * /api/v1/expenses:
 *   get:
 *     summary: Retrieve a list of expenses
 *     tags: [Expenses]
 *     description: Retrieve a list of all expenses from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of expenses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */
expenseRouter.get("/expenses", auth, getExpenses);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     tags: [Expenses]
 *     description: Retrieve a single expense by its ID.
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
 *         description: A single expense.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found.
 */
expenseRouter.get("/expenses/:id", auth, getExpenseById);

/**
 * @swagger
 * /api/v1/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     description: Creates a new expense in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Expense successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 */
expenseRouter.post(
    "/expenses",
    auth,
    validateData(createExpenseSchema),
    createExpense
);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     tags: [Expenses]
 *     description: Update an existing expense's information by its ID.
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
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Expense information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found.
 */
expenseRouter.put(
    "/expenses/:id",
    auth,
    validateData(updateExpenseSchema),
    updateExpense
);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     description: Delete an expense from the system by its ID.
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
 *         description: Expense successfully deleted.
 *       404:
 *         description: Expense not found.
 */
expenseRouter.delete("/expenses/:id", auth, deleteExpense);

export default expenseRouter;