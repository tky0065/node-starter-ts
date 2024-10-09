import { z } from 'zod';

const productSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    content: z.string().optional(),
    sku: z.string(),
    slug: z.string(),
    productCode: z.string().optional(),
    image: z.string().url().optional().default("https://utfs.io/f/irA39Q64G7WRu6dordcskJy5SWnRPwVmc4jqhgAe3ZMHvdxi"),
    price: z.number(),
    bayPrice: z.number(),
    tax: z.number().optional(),
    bachNumber: z.string().optional(),
    costPrice: z.number(),
    quantity: z.number(),
    expiryDate: z.date().optional(),
    alertQuantity: z.number(),
    stockQuantity: z.number(),
    barcode: z.string().optional(),
    unitId: z.string(),
    brandId: z.string(),
    categoryId: z.string(),
    supplierId: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

const createProductSchema = productSchema.omit({ id: true, createdAt: true, updatedAt: true });
const updateProductSchema = productSchema.partial();

export { createProductSchema, updateProductSchema };