import { createNotification, deleteNotification, getNotifications, getNotificationById, updateNotification } from '@/controllers/notification.controllers';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createNotificationSchema, updateNotificationSchema } from '@/validators/notification.form';
import express from 'express';

const notificationRouter = express.Router();

// Get all notifications
notificationRouter.get("/notifications", auth, getNotifications);

// Get a single notification by ID
notificationRouter.get("/notifications/:id", auth, getNotificationById);

// Create a new notification
notificationRouter.post(
    "/notifications",
    auth,
    validateData(createNotificationSchema),
    createNotification
);

// Update an existing notification by ID
notificationRouter.put(
    "/notifications/:id",
    auth,
    validateData(updateNotificationSchema),
    updateNotification
);

// Delete a notification by ID
notificationRouter.delete("/notifications/:id", auth, deleteNotification);

export default notificationRouter;