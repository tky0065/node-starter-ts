import { createCustomer, deleteCustomer, getCustomer, getCustomerById, updateCustomer } from '@/controllers/customer.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createCustomerSchema, updateCustomerSchema } from '@/validators/customer.form';
import express from 'express';
import { Request, Response } from 'express';

const customerRouter = express.Router();

// Get all customers
customerRouter.get("/customers", auth, getCustomer);

// Get a single customer by ID
customerRouter.get("/customers/:id", auth, getCustomerById);

// Create a new customer
customerRouter.post(
  "/customers",
  auth,
  validateData(createCustomerSchema),
  createCustomer
);

// Update an existing customer by ID
customerRouter.put(
  "/customers/:id",
  auth,
  validateData(updateCustomerSchema),
  updateCustomer
);

// Delete a customer by ID
customerRouter.delete("/customers/:id", auth, deleteCustomer);

export default customerRouter;