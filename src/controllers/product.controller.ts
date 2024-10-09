import { Request, Response } from 'express';
import { db } from '@/db/db';

export const createProduct = async (req: Request, res: Response) => {
    try {
        // check if slug barcode or sku already exists
        const existingProduct = await db.product.findFirst({
            where: {
                OR: [
                    { slug: req.body.slug },
                    { barcode: req.body.barcode },
                    { sku: req.body.sku },
                    {productCode: req.body.productCode}
                ],
            },
        });
        if (existingProduct?.slug) {
            // add the existing attribute to the error message

            res.status(409).json({
                error: `Product with this ${existingProduct.slug} already exists`,
                data: null,
            });
            return;
        }
        if (existingProduct?.barcode) {
            // add the existing attribute to the error message
            res.status(409).json({
                error: `Product with this ${existingProduct.barcode} already exists`,
                data: null,
            });
            return;
        }
        if (existingProduct?.sku) {
            // add the existing attribute to the error message
            res.status(409).json({
                error: `Product with this ${existingProduct.sku} already exists`,
                data: null,
            });
            return;
        }
        if (existingProduct?.productCode) {
            // add the existing attribute to the error message
            res.status(409).json({
                error: `Product with this ${existingProduct.productCode} already exists`,
                data: null,
            });
            return;
        }
        
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
            res.status(404).json({ error: 'Product not found' });
            return;
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
        res.status(404).json({ error: "Product not found" });
        return;
      }
        // check if slug barcode or sku already exists if user is updating any slug barcode or sku
        if (req.body.slug || req.body.barcode || req.body.sku) {
            const existingProduct = await db.product.findFirst({
                where: {
                    OR: [
                        { slug: req.body.slug },
                        { barcode: req.body.barcode },
                        { sku: req.body.sku },
                        {productCode: req.body.productCode}
                    ],
                },
            });
            if (existingProduct?.slug) {
                // add the existing attribute to the error message
                res.status(409).json({
                    error: `Product with this ${existingProduct.slug} already exists`,
                    data: null,
                });
                return;
            }
            if (existingProduct?.barcode) {
                // add the existing attribute to the error message
                res.status(409).json({
                    error: `Product with this ${existingProduct.barcode} already exists`,
                    data: null,
                });
                return;
            }
            if (existingProduct?.sku) {
                // add the existing attribute to the error message
                res.status(409).json({
                    error: `Product with this ${existingProduct.sku} already exists`,
                    data: null,
                });
                return;
            }
            if (existingProduct?.productCode) {
                // add the existing attribute to the error message
                res.status(409).json({
                    error: `Product with this ${existingProduct.productCode} already exists`,
                    data: null,
                });
                return;
            }

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
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        await db.product.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
