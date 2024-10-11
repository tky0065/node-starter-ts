import { createPayee, deletePayee, getPayees, getPayeeById, updatePayee } from '@/controllers/payee.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createPayeeSchema, updatePayeeSchema } from '@/validators/payee.form';
import express from 'express';

const payeeRouter = express.Router();

/**
 * @swagger
 * /api/v1/payees:
 *   get:
 *     summary: Retrieve a list of payees
 *     tags: [Payees]
 *     description: Retrieve a list of all payees from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of payees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payee'
 */
payeeRouter.get("/payees", auth, getPayees);

/**
 * @swagger
 * /api/v1/payees/{id}:
 *   get:
 *     summary: Get a payee by ID
 *     tags: [Payees]
 *     description: Retrieve a single payee by its ID.
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
 *         description: A single payee.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payee'
 *       404:
 *         description: Payee not found.
 */
payeeRouter.get("/payees/:id", auth, getPayeeById);

/**
 * @swagger
 * /api/v1/payees:
 *   post:
 *     summary: Create a new payee
 *     tags: [Payees]
 *     description: Creates a new payee in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payee'
 *     responses:
 *       201:
 *         description: Payee successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payee'
 */
payeeRouter.post(
    "/payees",
    auth,
    validateData(createPayeeSchema),
    createPayee
);

/**
 * @swagger
 * /api/v1/payees/{id}:
 *   put:
 *     summary: Update a payee by ID
 *     tags: [Payees]
 *     description: Update an existing payee's information by its ID.
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
 *             $ref: '#/components/schemas/Payee'
 *     responses:
 *       200:
 *         description: Payee information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payee'
 *       404:
 *         description: Payee not found.
 */
payeeRouter.put(
    "/payees/:id",
    auth,
    validateData(updatePayeeSchema),
    updatePayee
);

/**
 * @swagger
 * /api/v1/payees/{id}:
 *   delete:
 *     summary: Delete a payee by ID
 *     tags: [Payees]
 *     description: Delete a payee from the system by its ID.
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
 *         description: Payee successfully deleted.
 *       404:
 *         description: Payee not found.
 */
payeeRouter.delete("/payees/:id", auth, deletePayee);

export default payeeRouter;