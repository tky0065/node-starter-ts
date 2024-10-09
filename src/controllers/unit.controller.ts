import { Request, Response } from 'express';
import { db } from '@/db/db';

export const createUnit = async (req: Request, res: Response) => {
    try {
        // check if slug  already exist
        const existingUnit = await db.unit.findFirst({
            where: { slug: req.body.slug },
        });
        if (existingUnit) {
            res.status(409).json({ error: 'Unit with this slug already exists' });
            return;
        }

      const unit = await db.unit.create({
        data: req.body,
      });
      res.status(201).json(unit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create unit' });
    }
};

export const getUnits = async (req: Request, res: Response) => {
    try {
        const units = await db.unit.findMany(
            { orderBy: { createdAt: 'desc' } },
        );
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch units' });
    }
};

export const getUnitById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const unit = await db.unit.findUnique({
            where: { id },
        });
        if (!unit) {
            res.status(404).json({ error: 'Unit not found' });
            return;
        }
        res.status(200).json(unit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch unit' });
    }
};

export const updateUnit = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingUnit = await db.unit.findUnique({
            where: { id },
        });
        if (!existingUnit) {
            res.status(404).json({ error: 'Unit not found' });
            return;
        }
        // check if slug  already exists if user is updating  slug
        if (req.body.slug) {
            const existingUnit = await db.unit.findFirst({
                where: {
                    slug: req.body.slug,
                },
            });
            if (existingUnit) {
                res.status(409).json({ error: 'Unit with this slug already exists' });
                return;
            }
        }
        
        const unit = await db.unit.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json(unit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update unit' });
    }
};

export const deleteUnit = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const unit = await db.unit.findUnique({
            where: { id },
        });
        if (!unit) {
            res.status(404).json({ error: 'Unit not found' });
            return;
        }
        await db.unit.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete unit' });
    }
};