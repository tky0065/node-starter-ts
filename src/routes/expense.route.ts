import { createExpense, deleteExpense, getExpenses, getExpenseById, updateExpense } from '@/controllers/expense.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createExpenseSchema, updateExpenseSchema } from '@/validators/expense.form';
import express from 'express';

const expenseRouter = express.Router();

// Get all expenses
expenseRouter.get("/expenses", auth, getExpenses);

// Get a single expense by ID
expenseRouter.get("/expenses/:id", auth, getExpenseById);

// Create a new expense
expenseRouter.post(
    "/expenses",
    auth,
    validateData(createExpenseSchema),
    createExpense
);

// Update an existing expense by ID
expenseRouter.put(
    "/expenses/:id",
    auth,
    validateData(updateExpenseSchema),
    updateExpense
);

// Delete an expense by ID
expenseRouter.delete("/expenses/:id", auth, deleteExpense);

export default expenseRouter;