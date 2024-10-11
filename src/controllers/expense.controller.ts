import { Request, Response } from 'express';
import { db } from '@/db/db';

export const createExpense = async (req: Request, res: Response) => {
    try {
        const expense = await db.expense.create({
            data: req.body,
        });
        res.status(201).json({ data: expense, error: null });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense', data: null });
    }
};

export const getExpenses = async (req: Request, res: Response) => {
    try {
        const expenses = await db.expense.findMany(
            { orderBy: { createdAt: 'desc' } },
        );
        res.status(200).json({ data: expenses, error: null });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses', data: null });
    }
};

export const getExpenseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const expense = await db.expense.findUnique({
            where: { id },
        });
        if (!expense) {
            res.status(404).json({ error: 'Expense not found', data: null });
            return;
        }
        res.status(200).json({ data: expense, error: null });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expense', data: null });
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingExpense = await db.expense.findUnique({
            where: { id },
        });
        if (!existingExpense) {
            res.status(404).json({ error: 'Expense not found', data: null });
            return;
        }
        const expense = await db.expense.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json({ data: expense, error: null });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update expense', data: null });
    }
};

export const deleteExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const expense = await db.expense.findUnique({
            where: { id },
        });
        if (!expense) {
            res.status(404).json({ error: 'Expense not found' ,data:null});
            return;
        }
        await db.expense.delete({
            where: { id },
        });
        res.status(200).send({ data: null,message:'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense', data: null });
    }
};