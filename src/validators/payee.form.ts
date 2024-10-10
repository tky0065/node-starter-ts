import { z } from 'zod';

const createPayeeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email format").optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    Expenses: z.array(z.string()).optional(), // Assuming expenses are represented by their IDs
});

const updatePayeeSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    Expenses: z.array(z.string()).optional(), // Assuming expenses are represented by their IDs
});

export { createPayeeSchema, updatePayeeSchema };