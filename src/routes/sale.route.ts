import {
  createSale,
  createSaleItem,
  deleteSale,
  getSaleById,
  getSales,
  updateSale,
} from "@/controllers/sale.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { auth } from "@/middleware/verifyTokenMiddleware";
import {
  saleCreateSchema,
  saleItemSchema,
  saleUpdateSchema,
} from "@/validators/sale.form";

import express from "express";

const salesRouter = express.Router();

// Get all sales
salesRouter.get("/sales", auth, getSales);

// Get a single Sales by ID
salesRouter.get("/sales/:id", auth, getSaleById);

// Create a new Sales
salesRouter.post("/sales", auth, validateData(saleCreateSchema), createSale);
// Create a new Sales Item
salesRouter.post(
  "/sales/items",
  auth,
  validateData(saleItemSchema),
  createSaleItem
);

// Update an existing Sales by ID
salesRouter.put("/sales/:id", auth, validateData(saleUpdateSchema), updateSale);

// Delete a Sales by ID
salesRouter.delete("/sales/:id", auth, deleteSale);

export default salesRouter;
