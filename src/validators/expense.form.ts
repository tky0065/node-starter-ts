import { z } from 'zod';

const createExpenseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.number().positive("Amount must be a positive number"),
    description: z.string().min(1, "Description is required"),
    attachments: z.array(z.string()).optional(),
    expenseDate: z.date().optional(),
    shopId: z.string().min(1, "Shop ID is required"),
    categoryId: z.string().min(1, "Category ID is required"),
    payeeId: z.string().min(1, "Payee ID is required"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

const updateExpenseSchema = z.object({
    title: z.string().optional(),
    amount: z.number().positive().optional(),
    description: z.string().optional(),
    attachments: z.array(z.string()).optional(),
    expenseDate: z.date().optional(),
    shopId: z.string().optional(),
    categoryId: z.string().optional(),
    payeeId: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export { createExpenseSchema, updateExpenseSchema };