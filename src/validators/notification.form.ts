import { z } from 'zod';

const NotificationStatus = z.enum(['WARNING', 'INFO', 'DANGER']);

const createNotificationSchema = z.object({
    message: z.string().min(1, "Message is required"),
    status: NotificationStatus.default('INFO'),
    statusText: z.string().optional(),
    read: z.boolean().default(false),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

const updateNotificationSchema = z.object({
    message: z.string().optional(),
    status: NotificationStatus.optional(),
    statusText: z.string().optional(),
    read: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export { createNotificationSchema, updateNotificationSchema };