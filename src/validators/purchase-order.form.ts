import { z } from "zod";

const createPurchaseOrderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  productName: z.string().min(1, "Product name is required"),
  unitCost: z.number().min(0, "Unit cost must be non-negative"),
  subTotal: z.number().min(0, "Subtotal must be non-negative"),
  currentStock: z.number().int().min(0, "Current stock cannot be negative"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be non-negative"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const updatePurchaseOrderItemSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().optional(),
  unitCost: z.number().min(0).optional(),
  subTotal: z.number().min(0).optional(),
  currentStock: z.number().int().min(0).optional(),
  quantity: z.number().int().min(1).optional(),
  price: z.number().min(0).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const createPurchaseOrderSchema = z.object({
  refNo: z.string().optional(),
  supplierId: z.string().min(1, "Supplier ID is required"),
  status: z.enum(["PAID", "UNPAID", "PARTIAL"]).default("PAID"),
  tax: z.number().optional(),
  discount: z.number().min(0).optional(),
  note: z.string().optional(),
  balanceAmount: z.number().min(0, "Balance amount must be non-negative"),
  shippingCost: z.number().min(0).optional(),
  totalAmount: z.number().min(0, "Total amount must be non-negative"),
  items: z.array(createPurchaseOrderItemSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const updatePurchaseOrderSchema = z.object({
  refNo: z.string().optional(),
  supplierId: z.string().optional(),
  status: z.enum(["PAID", "UNPAID", "PARTIAL"]).optional(),
  tax: z.number().optional(),
  discount: z.number().min(0).optional(),
  note: z.string().optional(),
  balanceAmount: z.number().min(0).optional(),
  shippingCost: z.number().min(0).optional(),
  totalAmount: z.number().min(0).optional(),
  items: z.array(updatePurchaseOrderItemSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export {
  createPurchaseOrderItemSchema,
  createPurchaseOrderSchema,
  updatePurchaseOrderItemSchema,
  updatePurchaseOrderSchema,
};
