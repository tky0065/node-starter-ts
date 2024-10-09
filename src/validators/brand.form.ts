import { z } from 'zod';

const createBrandSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name must be at least 1 character long"),
    slug: z.string().min(1, "Slug must be at least 1 character long"),
    products: z.array(z.any()).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

const updateBrandSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
    products: z.array(z.any()).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export { createBrandSchema, updateBrandSchema };