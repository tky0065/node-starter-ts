import { Request, Response } from 'express';
import { db } from '@/db/db';

export const createPayee = async (req: Request, res: Response) => {
    try {
        // check if phone or email already exists
        const existingPayee = await db.payee.findFirst({
            where: {
                OR: [
                    { phone: req.body.phone },
                    { email: req.body.email }
                ]
            },
        });
        if (existingPayee) {
            res.status(409).json({ error: 'Payee with this phone or email already exists' });
            return;
        }
        const payee = await db.payee.create({
            data: req.body,
        });
        res.status(201).json(payee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create payee' });
    }
};

export const getPayees = async (req: Request, res: Response) => {
    try {
        const payees = await db.payee.findMany(
            { orderBy: { createdAt: 'desc' } },
        );
        res.status(200).json(payees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payees' });
    }
};

export const getPayeeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const payee = await db.payee.findUnique({
            where: { id },
        });
        if (!payee) {
            res.status(404).json({ error: 'Payee not found' });
            return;
        }
        res.status(200).json(payee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payee' });
    }
};

export const updatePayee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingPayee = await db.payee.findUnique({
            where: { id },
        });
        if (!existingPayee) {
            res.status(404).json({ error: 'Payee not found' });
            return;
        }
        // check if phone or email already exists if user is updating them
        if (req.body.phone || req.body.email) {
            const existingPayee = await db.payee.findFirst({
                where: {
                    OR: [
                        { phone: req.body.phone },
                        { email: req.body.email }
                    ],
                    NOT: { id }
                },
            });
            if (existingPayee) {
                res.status(409).json({ error: 'Payee with this phone or email already exists' });
                return;
            }
        }
        const payee = await db.payee.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json(payee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update payee' });
    }
};

export const deletePayee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const payee = await db.payee.findUnique({
            where: { id },
        });
        if (!payee) {
            res.status(404).json({ error: 'Payee not found' });
            return;
        }
        await db.payee.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete payee' });
    }
};