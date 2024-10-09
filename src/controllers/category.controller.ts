import { Request, Response } from 'express';
import { db } from '@/db/db';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await db.category.create({
            data: req.body,
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await db.category.findMany(
            { orderBy: { createdAt: 'desc' } },
        );
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const category = await db.category.findUnique({
            where: { id },
        });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingCategory = await db.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const category = await db.category.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const category = await db.category.findUnique({
            where: { id },
        });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        await db.category.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};