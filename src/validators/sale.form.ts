import { z } from 'zod';

const SaleStatus = z.enum(["PENDING", "COMPLETED", "CANCELLED"]);
const SaleType = z.enum(["PAID", "CREDIT"]);
const PaymentMethode = z.enum(['CASH', 'MOBILE_MONEY', 'BANK_TRANSFER', 'CREDIT_CARD', 'OTHER']);

const saleItemSchema = z.object({
    id: z.string().optional(),
    productId: z.string(),
    quantity: z.number().int().positive(),
    productPrice: z.number().positive(),
    productName: z.string(),
    productImage: z.string().optional(),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
});

const saleCreateSchema = z.object({
    saleNumber: z.string().optional(),
    customerId: z.string(),
    customerName: z.string(),
    customerEmail: z.string().email().optional(),
    saleAmount: z.number().optional(),
    balanceAmount: z.number().default(0),
    paidAmount: z.number().default(0),
    creditAmount: z.number().default(0),
    status: SaleStatus.default("PENDING"),
    saleType: SaleType.default("PAID"),
    paymentMethode: PaymentMethode.default("CASH"),
    transactionCode: z.string().optional(),
    saleItems: z.array(saleItemSchema).optional(),
});

const saleUpdateSchema = saleCreateSchema.partial().extend({
    id: z.string(),
    updatedAt: z.date().default(new Date()),
});

export { saleCreateSchema, saleUpdateSchema, saleItemSchema };