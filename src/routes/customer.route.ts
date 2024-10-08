import { createCustomer, getCustomer, getCustomerById } from '@/controllers/customer.controller';
import express from 'express';
import { Request, Response } from 'express';

const customerRouter = express.Router();

// Get all customers
customerRouter.get('/customers',getCustomer);

// Get a single customer by ID
customerRouter.get("/customers/:id", getCustomerById);

// Create a new customer
customerRouter.post("/customers",createCustomer);

// Update an existing customer by ID
customerRouter.put("/customers/:id", (req: Request, res: Response) => {
  const customerId = req.params.id;
  const updatedCustomer = req.body;
  res.send(
    `Update customer with ID: ${customerId}, Data: ${JSON.stringify(
      updatedCustomer
    )}`
  );
});

// Delete a customer by ID
customerRouter.delete("/customers/:id", (req: Request, res: Response) => {
  const customerId = req.params.id;
  res.send(`Delete customer with ID: ${customerId}`);
});

export default customerRouter;