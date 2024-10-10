import { Request, Response } from 'express';
import { db } from '@/db/db';

export const createExpense = async (req: Request, res: Response) => {
    try {
        const expense = await db.expense.create({
            data: req.body,
        });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
};

export const getExpenses = async (req: Request, res: Response) => {
    try {
        const expenses = await db.expense.findMany(
            { orderBy: { createdAt: 'desc' } },
        );
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

export const getExpenseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const expense = await db.expense.findUnique({
            where: { id },
        });
        if (!expense) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expense' });
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingExpense = await db.expense.findUnique({
            where: { id },
        });
        if (!existingExpense) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }
        const expense = await db.expense.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
};

export const deleteExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const expense = await db.expense.findUnique({
            where: { id },
        });
        if (!expense) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }
        await db.expense.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};