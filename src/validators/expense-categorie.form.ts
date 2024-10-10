import { z } from 'zod';

const createExpenseCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    expenses: z.array(z.string()).optional(), // Assuming expenses are represented by their IDs
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

const updateExpenseCategorySchema = z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    expenses: z.array(z.string()).optional(), // Assuming expenses are represented by their IDs
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export { createExpenseCategorySchema, updateExpenseCategorySchema };