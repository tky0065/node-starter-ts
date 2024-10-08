import { z } from 'zod';

const createCustomerSchema = z.object({
    customerType: z.enum(["RETAIL", "WHOLESALE", "DISTRIBUTOR", "OTHER"]),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone is required"),
    gender: z.enum(["MALE", "FEMALE"]),
    maxCreditLimit: z.number().min(0, "Max credit limit must be a positive number"),
    maxCreditDays: z.number().min(0, "Max credit days must be a positive number"),
    taxPin: z.string().optional(),
    dob: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    nationalId: z.string().optional(),
    country: z.string().optional(),
    location: z.string().min(1, "Location is required"),
});

const updateCustomerSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    location: z.string().optional(),
    maxCreditLimit: z.number().optional(),
    maxCreditDays: z.number().optional(),
    taxPin: z.string().optional(),
    dob: z.string().optional(),
    nationalId: z.string().optional(),
    country: z.string().optional(),
    customerType: z.enum(["RETAIL", "WHOLESALE", "DISTRIBUTOR", "OTHER"]).optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
});

export { createCustomerSchema, updateCustomerSchema };