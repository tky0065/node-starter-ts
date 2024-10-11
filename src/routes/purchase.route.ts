import { Router } from "express";

import { auth } from "@/middleware/verifyTokenMiddleware";
import { getPurchaseOrders, getPurchaseOrderById, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } from "@/controllers/purchase.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { createPurchaseOrderSchema, updatePurchaseOrderSchema } from "@/validators/purchase-order.form";


const purchaseRouter = Router();

// Get all purchase orders
purchaseRouter.get("/purchase-orders", auth, getPurchaseOrders);

// Get a single purchase order by ID
purchaseRouter.get("/purchase-orders/:id", auth, getPurchaseOrderById);

// Create a new purchase order
purchaseRouter.post(
  "/purchase-orders",
  auth,
  validateData(createPurchaseOrderSchema),
  createPurchaseOrder
);

// Update an existing purchase order by ID
purchaseRouter.put(
  "/purchase-orders/:id",
  auth,
  validateData(updatePurchaseOrderSchema),
  updatePurchaseOrder
);

// Delete a purchase order by ID
purchaseRouter.delete("/purchase-orders/:id", auth, deletePurchaseOrder);

export default purchaseRouter;