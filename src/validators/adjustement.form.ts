import { z } from "zod";

const createAdjustementItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  curentStock: z.number().int().min(0, "Current stock cannot be negative"),
  productName: z.string().min(1, "Product name is required"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const updateAdjustementItemSchema = z.object({
  productId: z.string().optional(),
  quantity: z.number().int().min(1).optional(),
  curentStock: z.number().int().min(0).optional(),
  productName: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const createAdjustementSchema = z.object({
  ref: z.string().optional(),
  reason: z.string().min(1, "Reason is required"),
  items: z.array(createAdjustementItemSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const updateAdjustementSchema = z.object({
  ref: z.string().optional(),
  reason: z.string().optional(),
  items: z.array(updateAdjustementItemSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export {
  createAdjustementItemSchema,
  createAdjustementSchema,
  updateAdjustementItemSchema,
  updateAdjustementSchema,
};
