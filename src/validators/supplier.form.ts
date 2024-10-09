import { z } from 'zod';

const supplierCreateSchema = z.object({
    supplierType: z.enum(['MANUFACTURER', 'DISTRIBUTOR', 'WHOLESALER', 'RETAILER', 'OTHER']),
    name: z.string().min(1, 'Name is required'),
    contactPerson: z.string().min(1, 'Contact person is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email().optional(),
    country: z.string().min(1, 'Country is required'),
    location: z.string().min(1, 'Location is required'),
    website: z.string().url().optional(),
    registrationNumber: z.string().optional(),
    bankAccountNumber: z.string().optional(),
    bankName: z.string().optional(),
    paymentTerms: z.string().optional(),
    logo: z.string().url().optional().default('https://utfs.io/f/irA39Q64G7WRu6dordcskJy5SWnRPwVmc4jqhgAe3ZMHvdxi'),
    rating: z.number().optional(),
    notes: z.string().optional(),
});

const supplierUpdateSchema = supplierCreateSchema.partial();

export { supplierCreateSchema, supplierUpdateSchema };