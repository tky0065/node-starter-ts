import { z } from 'zod';

// Define the base schema for the Unit model
const unitBaseSchema = z.object({
    name: z.string().min(2, "Name is required"),
    abreviation: z.string().min(2, "Abreviation is required"),
    slug: z.string().min(2, "Slug is required"),
});

// Create validator schema
export const createUnitSchema = unitBaseSchema.extend({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

// Update validator schema
export const updateUnitSchema = unitBaseSchema.partial().extend({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});