import { Request, Response } from 'express';
import { db } from '@/db/db';

export const createCategory = async (req: Request, res: Response) => {
    try {
        // check if slug  already exist
        const existingCategory = await db.category.findFirst({
            where: { slug: req.body.slug },
        });
        if (existingCategory) {
            res.status(409).json({ error: 'Category with this slug already exists' });
            return;
        }
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
            res.status(404).json({ error: 'Category not found' });
            return;
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
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        // check if slug  already exists if user is updating  slug
        if (req.body.slug) {
            const existingCategory = await db.category.findFirst({
                where: {
                    slug: req.body.slug,
                },
            });
            if (existingCategory) {
                res.status(409).json({ error: 'Category with this slug already exists' });
                return;
            }
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
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        await db.category.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};