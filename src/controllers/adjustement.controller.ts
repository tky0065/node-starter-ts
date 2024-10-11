import { db } from "@/db/db";
import { AdjustmentItem } from "@/types/types";
import { generateRef } from "@/utils/generate.ref";
import { NotificationStatus } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface createAdjustementProps { 
    reason: string;
    items:AdjustmentItem[];
}
// Create a new adjustement
export const createAdjustement = async (req: Request, res: Response) => {
    const {  reason, items }:createAdjustementProps = req.body;
    try {
        // create a transaction
        const adjustementId = await db.$transaction(async (transaction) => {

            // create adjustement
            const adjustement = await transaction.adjustement.create({
                data: {
                    reason,
                    ref: generateRef()
                    
                },
            });
            
            // create ajustement items
            for (const item of items) {
                let query;
                if (item.type === "Addition") {
                    query = {
                        increment: item.quantity,
                    };
                } else if (item.type === "Subtraction") {
                    query = {
                        decrement: item.quantity,
                    };
                }

                // update product stock quantity
                const updatedProduct = await transaction.product.update({
                    where: { id: item.productId },
                    data: {
                        quantity: query,
                    },
                });

                if (!updatedProduct) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Failed to update this product ${item.productId}`, data: null });
                    return;
                }
                // create a notification if the product has gone below the threshold stock alert quantity
                if (updatedProduct.quantity < updatedProduct.alertQuantity) {
                    // send/create notification
                    const message = updatedProduct.quantity === 0
                        ? `The stock of ${updatedProduct.name} is out. Current stock is ${updatedProduct.quantity}.`
                        : `The stock of ${updatedProduct.name} has gone below threshold. Current stock is ${updatedProduct.quantity}.`;
                    const statusText = updatedProduct.quantity === 0 ? "Out of stock" : "Warning";
                    const status: NotificationStatus = updatedProduct.quantity === 0 ? "DANGER" : "WARNING";
                    
                    const newNotification = {
                        message,
                        status,
                        statusText,
                    
                    }
                    await transaction.notification.create({
                        data: newNotification,
                    })
                    // send email notification
                }

                // create adjustement item
                const adjustementItem = await transaction.adjustementItem.create({
                    data: {
                        adjustementId: adjustement.id,
                        productId: item.productId,
                        productName: item.productName,
                        curentStock: item.currentStock,
                        type: item.type,
                        quantity: item.quantity,
                    }
                });

                if (!adjustementItem) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Failed to create adjustement item for product ${item.productId}`, data: null });
                    return;
                }


            }

            // return adjustement id
            return adjustement.id;
        });
        
        if (!adjustementId) { 
            res.status(StatusCodes.NOT_FOUND).json({ error: `Failed to create adjustement`, data: null });
            return;
        }
        // save the adjustement
        const savedAdjustement = await db.adjustement.findUnique({
            where: { id: adjustementId },
            include: { items: true },
        });

        res.status(StatusCodes.CREATED).json({ data: savedAdjustement, error: null });
    
    } catch (error) {
        res.status(500).json({ error: `Failed to create adjustement: ${error}` });
    }
};

// Get all adjustements
export const getAdjustements = async (req: Request, res: Response) => {
    try {
        const adjustements = await db.adjustement.findMany({
            orderBy: { createdAt: "desc" },
            include: { items: true },
        });
        res.status(200).json({ data: adjustements, error: null });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch adjustements: ${error}` });
    }
};

// Get adjustement by ID
export const getAdjustementById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const adjustement = await db.adjustement.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!adjustement) {
            res.status(404).json({ error: "adjustement not found" });
            return;
        }
        res.status(200).json({ data: adjustement, error: null });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch adjustement: ${error}` });
    }
};

// Update adjustement
export const updateAdjustement = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingadjustement = await db.adjustement.findUnique({
            where: { id },
        });
        if (!existingadjustement) {
            res.status(404).json({ error: "adjustement not found" });
            return;
        }

        const adjustement = await db.adjustement.update({
            where: { id },
            data: req.body,
        });

        res.status(200).json({ data: adjustement, error: null });
    } catch (error) {
        res.status(500).json({ error: "Failed to update adjustement" });
    }
};

// Delete adjustement
export const deleteAdjustement = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const adjustement = await db.adjustement.findUnique({
            where: { id },
        });
        if (!adjustement) {
            res.status(404).json({ error: "adjustement not found" });
            return;
        }

        await db.adjustement.delete({
            where: { id },
        });

        res.status(204).send({ message: "adjustement deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete adjustement: ${error}` });
    }
};