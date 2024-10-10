import { createPayee, deletePayee, getPayees, getPayeeById, updatePayee } from '@/controllers/payee.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createPayeeSchema, updatePayeeSchema } from '@/validators/payee.form';
import express from 'express';

const payeeRouter = express.Router();

// Get all payees
payeeRouter.get("/payees", auth, getPayees);

// Get a single payee by ID
payeeRouter.get("/payees/:id", auth, getPayeeById);

// Create a new payee
payeeRouter.post(
    "/payees",
    auth,
    validateData(createPayeeSchema),
    createPayee
);

// Update an existing payee by ID
payeeRouter.put(
    "/payees/:id",
    auth,
    validateData(updatePayeeSchema),
    updatePayee
);

// Delete a payee by ID
payeeRouter.delete("/payees/:id", auth, deletePayee);

export default payeeRouter;