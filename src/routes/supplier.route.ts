import { createSupplier, deleteSupplier, getSuppliers, getSupplierById, updateSupplier } from '@/controllers/supplier.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { supplierCreateSchema, supplierUpdateSchema } from '@/validators/supplier.form';
import express from 'express';

const supplierRouter = express.Router();

// Get all suppliers
supplierRouter.get("/suppliers", auth, getSuppliers);

// Get a single supplier by ID
supplierRouter.get("/suppliers/:id", auth, getSupplierById);

// Create a new supplier
supplierRouter.post(
  "/suppliers",
  auth,
  validateData(supplierCreateSchema),
  createSupplier
);

// Update an existing supplier by ID
supplierRouter.put(
  "/suppliers/:id",
  auth,
  validateData(supplierUpdateSchema),
  updateSupplier
);

// Delete a supplier by ID
supplierRouter.delete("/suppliers/:id", auth, deleteSupplier);

export default supplierRouter;