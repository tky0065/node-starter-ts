import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '@/controllers/product.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createProductSchema, updateProductSchema } from '@/validators/product.form';
import express from 'express';

const productRouter = express.Router();

// Get all products
productRouter.get("/products", auth, getProducts);

// Get a single product by ID
productRouter.get("/products/:id", auth, getProductById);

// Create a new product
productRouter.post(
    "/products",
    auth,
    validateData(createProductSchema),
    createProduct
);

// Update an existing product by ID
productRouter.put(
    "/products/:id",
    auth,
    validateData(updateProductSchema),
    updateProduct
);

// Delete a product by ID
productRouter.delete("/products/:id", auth, deleteProduct);

export default productRouter;