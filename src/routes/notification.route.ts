import { createNotification, deleteNotification, getNotifications, getNotificationById, updateNotification } from '@/controllers/notification.controllers';
import { validateData } from '@/middleware/validationMiddleware';
import { auth } from '@/middleware/verifyTokenMiddleware';
import { createNotificationSchema, updateNotificationSchema } from '@/validators/notification.form';
import express from 'express';

const notificationRouter = express.Router();
/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Retrieve a list of notifications
 *     tags: [Notifications]
 *     description: Retrieve a list of all notifications from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */
notificationRouter.get("/notifications", auth, getNotifications);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   get:
 *     summary: Get a notification by ID
 *     tags: [Notifications]
 *     description: Retrieve a single notification by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found.
 */
notificationRouter.get("/notifications/:id", auth, getNotificationById);

/**
 * @swagger
 * /api/v1/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     description: Creates a new notification in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 */
notificationRouter.post(
    "/notifications",
    auth,
    validateData(createNotificationSchema),
    createNotification
);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   put:
 *     summary: Update a notification by ID
 *     tags: [Notifications]
 *     description: Update an existing notification's information by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notification information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found.
 */
notificationRouter.put(
    "/notifications/:id",
    auth,
    validateData(updateNotificationSchema),
    updateNotification
);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     description: Delete a notification from the system by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification successfully deleted.
 *       404:
 *         description: Notification not found.
 */
notificationRouter.delete("/notifications/:id", auth, deleteNotification);

export default notificationRouter;