import { createCustomer, getCustomer, getCustomerById, updateCustomer } from '@/controllers/customer.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { createCustomerSchema, updateCustomerSchema } from '@/validators/customer.form';
import express from 'express';
import { Request, Response } from 'express';

const customerRouter = express.Router();

// Get all customers
customerRouter.get('/customers',getCustomer);

// Get a single customer by ID
customerRouter.get("/customers/:id", getCustomerById);

// Create a new customer
customerRouter.post("/customers",validateData(createCustomerSchema),createCustomer);

// Update an existing customer by ID
customerRouter.put("/customers/:id",validateData(updateCustomerSchema), updateCustomer);

// Delete a customer by ID
customerRouter.delete("/customers/:id", (req: Request, res: Response) => {
  const customerId = req.params.id;
  res.send(`Delete customer with ID: ${customerId}`);
});

export default customerRouter;