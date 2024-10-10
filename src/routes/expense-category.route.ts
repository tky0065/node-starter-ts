import { createExpenseCategory, deleteExpenseCategory, getExpenseCategories, getExpenseCategoryById, updateExpenseCategory } from '@/controllers/expense-category.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createExpenseCategorySchema, updateExpenseCategorySchema } from '@/validators/expense-categorie.form';

import express from 'express';

const expenseCategoryRouter = express.Router();

// Get all expense categories
expenseCategoryRouter.get("/expense-categories", auth, getExpenseCategories);

// Get a single expense category by ID
expenseCategoryRouter.get("/expense-categories/:id", auth, getExpenseCategoryById);

// Create a new expense category
expenseCategoryRouter.post(
    "/expense-categories",
    auth,
    validateData(createExpenseCategorySchema),
    createExpenseCategory
);

// Update an existing expense category by ID
expenseCategoryRouter.put(
    "/expense-categories/:id",
    auth,
    validateData(updateExpenseCategorySchema),
    updateExpenseCategory
);

// Delete an expense category by ID
expenseCategoryRouter.delete("/expense-categories/:id", auth, deleteExpenseCategory);

export default expenseCategoryRouter;