import { Request, Response } from 'express';
import { db } from '@/db/db';

export const createBrand = async (req: Request, res: Response) => {
    try {
        // check if slug  already exist
        const existingBrand = await db.brand.findFirst({
            where: { slug: req.body.slug },
        });
        if (existingBrand) {
            res.status(409).json({ error: 'Brand with this slug already exists' });
            return;
        }
      const brand = await db.brand.create({
        data: req.body,
      });
      res.status(201).json(brand);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create brand' });
    }
};

export const getBrands = async (req: Request, res: Response) => {
    try {
        const brands = await db.brand.findMany(
            { orderBy: { createdAt: 'desc' } },
        );
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch brands' });
    }
};

export const getBrandById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const brand = await db.brand.findUnique({
            where: { id },
        });
        if (!brand) {
            res.status(404).json({ error: 'Brand not found' });
            return;
        }
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch brand' });
    }
};

export const updateBrand = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const existingBrand = await db.brand.findUnique({
        where: { id },
      });
      if (!existingBrand) {
        res.status(404).json({ error: "Brand not found" });
        return;
      }
        // check if slug  already exists if user is updating  slug 
        if (req.body.slug) {
            const existingBrand = await db.brand.findFirst({
                where: {
                    slug: req.body.slug,
                },
            });
            if (existingBrand) {
                res.status(409).json({ error: 'Brand with this slug already exists' });
                return;
            }
        }
      const brand = await db.brand.update({
        where: { id },
        data: req.body,
      });
      res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update brand' });
    }
};

export const deleteBrand = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const brand = await db.brand.findUnique({
            where: { id },
        });
        if (!brand) {
            res.status(404).json({ error: 'Brand not found' });
            return;
        }
        await db.brand.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete brand' });
    }
};