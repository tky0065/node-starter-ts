import { createBrand, deleteBrand, getBrands, getBrandById, updateBrand } from '@/controllers/brand.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createBrandSchema, updateBrandSchema } from '@/validators/brand.form';
import express from 'express';

const brandRouter = express.Router();

// Get all brands
brandRouter.get("/brands", auth, getBrands);

// Get a single brand by ID
brandRouter.get("/brands/:id", auth, getBrandById);

// Create a new brand
brandRouter.post(
    "/brands",
    auth,
    validateData(createBrandSchema),
    createBrand
);

// Update an existing brand by ID
brandRouter.put(
    "/brands/:id",
    auth,
    validateData(updateBrandSchema),
    updateBrand
);

// Delete a brand by ID
brandRouter.delete("/brands/:id", auth, deleteBrand);

export default brandRouter;