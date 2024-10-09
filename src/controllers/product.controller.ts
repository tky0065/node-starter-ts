import { Request, Response } from 'express';
import { db } from '@/db/db';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await db.product.create({
            data: req.body,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await db.product.findMany(
            { orderBy: { createdAt: 'desc' } },
        );
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await db.product.findUnique({
            where: { id },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
       const existingProduct = await db.product.findUnique({
          where: { id },
        });
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const product = await db.product.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const product = await db.product.findUnique({
            where: { id },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await db.product.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
