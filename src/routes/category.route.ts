import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '@/controllers/category.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createCategorySchema, updateCategorySchema } from '@/validators/category.form';
import express from 'express';

const categoryRouter = express.Router();

// Get all categories
categoryRouter.get("/categories", auth, getCategories);

// Get a single category by ID
categoryRouter.get("/categories/:id", auth, getCategoryById);

// Create a new category
categoryRouter.post(
    "/categories",
    auth,
    validateData(createCategorySchema),
    createCategory
);

// Update an existing category by ID
categoryRouter.put(
    "/categories/:id",
    auth,
    validateData(updateCategorySchema),
    updateCategory
);

// Delete a category by ID
categoryRouter.delete("/categories/:id", auth, deleteCategory);

export default categoryRouter;