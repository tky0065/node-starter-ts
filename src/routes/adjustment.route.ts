import { createAdjustement, deleteAdjustement, getAdjustementById, getAdjustements, updateAdjustement } from "@/controllers/adjustement.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { auth } from "@/middleware/verifyTokenMiddleware";
import { createAdjustementSchema, updateAdjustementSchema } from "@/validators/adjustement.form";
import { Router } from "express";

const adjustementRouter = Router();

// Get all adjustements
adjustementRouter.get("/adjustements", auth, getAdjustements);

// Get a single adjustement by ID
adjustementRouter.get("/adjustements/:id", auth, getAdjustementById);

// Create a new adjustement
adjustementRouter.post(
  "/adjustements",
  auth,
  validateData(createAdjustementSchema),
  createAdjustement
);

// Update an existing adjustement by ID
adjustementRouter.put(
  "/adjustements/:id",
  auth,
  validateData(updateAdjustementSchema),
  updateAdjustement
);

// Delete an adjustement by ID
adjustementRouter.delete("/adjustements/:id", auth, deleteAdjustement);

export default adjustementRouter;
