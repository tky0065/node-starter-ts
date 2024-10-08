import { z } from 'zod';

const shopCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    location: z.string().min(1, "Location is required"),
    adminId: z.string().min(1, "Admin ID is required"),
    attendantIds: z.array(z.string()).optional(),
});

const shopUpdateSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    slug: z.string().min(1, "Slug is required").optional(),
    location: z.string().min(1, "Location is required").optional(),
    adminId: z.string().min(1, "Admin ID is required").optional(),
    attendantIds: z.array(z.string()).optional(),
});

export { shopCreateSchema, shopUpdateSchema };