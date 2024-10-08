import { z } from 'zod';

const createCustomerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email address"),
});

const updateCustomerSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
});

export { createCustomerSchema, updateCustomerSchema };