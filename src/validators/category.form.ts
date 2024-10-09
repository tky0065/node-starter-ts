import { z } from 'zod';

const createCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    products: z.array(z.string()).optional(), // Assuming products are represented by their IDs
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

const updateCategorySchema = z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    products: z.array(z.string()).optional(), // Assuming products are represented by their IDs
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export { createCategorySchema, updateCategorySchema };