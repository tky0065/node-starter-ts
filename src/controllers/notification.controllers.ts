import { Request, Response } from 'express';
import { db } from '@/db/db';



export const createNotification = async (req: Request, res: Response) => {
    try {
        const notification = await db.notification.create({
            data: req.body,
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });
    }
};

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await db.notification.findMany(
            { orderBy: { createdAt: 'desc' } },
        );
        res.status(200).json({data:notifications,error:null});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications',data:null });
    }
};

export const getNotificationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const notification = await db.notification.findUnique({
            where: { id },
        });
        if (!notification) {
            res.status(404).json({ error: 'Notification not found',data:null });
            return;
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notification' ,data:null});
    }
};

export const updateNotification = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingNotification = await db.notification.findUnique({
            where: { id },
        });
        if (!existingNotification) {
            res.status(404).json({ error: 'Notification not found',data:null });
            return;
        }
        const notification = await db.notification.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json({data:notification,error:null});
    } catch (error) {
        res.status(500).json({ error: 'Failed to update notification' });
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const notification = await db.notification.findUnique({
            where: { id },
        });
        if (!notification) {
            res.status(404).json({ error: 'Notification not found' ,data:null});
            return;
        }
        await db.notification.delete({
            where: { id },
        });
        res.status(200).send({message:'Notification deleted successfully',data:null});
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete notification',data:null });
    }
};