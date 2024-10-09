import { createSupplier, deleteSupplier, getSuppliers, getSupplierById, updateSupplier } from '@/controllers/supplier.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { supplierCreateSchema, supplierUpdateSchema } from '@/validators/supplier.form';
import express from 'express';

const supplierRouter = express.Router();

// Get all suppliers
supplierRouter.get('/suppliers', getSuppliers);

// Get a single supplier by ID
supplierRouter.get('/suppliers/:id', getSupplierById);

// Create a new supplier
supplierRouter.post('/suppliers', validateData(supplierCreateSchema), createSupplier);

// Update an existing supplier by ID
supplierRouter.put('/suppliers/:id', validateData(supplierUpdateSchema), updateSupplier);

// Delete a supplier by ID
supplierRouter.delete('/suppliers/:id', deleteSupplier);

export default supplierRouter;