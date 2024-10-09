import { createUnit, deleteUnit, getUnits, getUnitById, updateUnit } from '@/controllers/unit.controller';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createUnitSchema, updateUnitSchema } from '@/validators/unit.form';
import express from 'express';

const unitRouter = express.Router();

// Get all units
unitRouter.get("/units", auth, getUnits);

// Get a single unit by ID
unitRouter.get("/units/:id", auth, getUnitById);

// Create a new unit
unitRouter.post(
    "/units",
    auth,
    validateData(createUnitSchema),
    createUnit
);

// Update an existing unit by ID
unitRouter.put(
    "/units/:id",
    auth,
    validateData(updateUnitSchema),
    updateUnit
);

// Delete a unit by ID
unitRouter.delete("/units/:id", auth, deleteUnit);

export default unitRouter;