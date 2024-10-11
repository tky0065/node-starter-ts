import { createCustomer, deleteCustomer, getCustomer, getCustomerById, updateCustomer } from '@/controllers/customer.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createCustomerSchema, updateCustomerSchema } from '@/validators/customer.form';
import express from 'express';
import { Request, Response } from 'express';

const customerRouter = express.Router();

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Retrieve a list of customers
 *     tags: [Customers]
 *     description: Retrieve a list of all customers from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
customerRouter.get("/customers", auth, getCustomer);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     description: Retrieve a single customer by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single customer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 */
customerRouter.get("/customers/:id", auth, getCustomerById);

/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     description: Creates a new customer in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */
customerRouter.post(
  "/customers",
  auth,
  validateData(createCustomerSchema),
  createCustomer
);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customers]
 *     description: Update an existing customer's information by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 */
customerRouter.put(
  "/customers/:id",
  auth,
  validateData(updateCustomerSchema),
  updateCustomer
);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     description: Delete a customer from the system by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer successfully deleted.
 *       404:
 *         description: Customer not found.
 */
customerRouter.delete("/customers/:id", auth, deleteCustomer);

export default customerRouter;