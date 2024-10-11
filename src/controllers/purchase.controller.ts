import { db } from "@/db/db";
import { PurchaseOrderItem } from "@/types/types";
import { generateRef } from "@/utils/generate.ref";
import { NotificationStatus, PurchaseOrderStatus } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface createPurchaseOrderProps {
    supplierId: string;
    discount?: number;
    note?: string;
    status: PurchaseOrderStatus;
    tax:number;
    balanceAmount: number;
    shippingCost?: number;
    totalAmount: number;
    items: PurchaseOrderItem[];
}

// Create a new purchase order
export const createPurchaseOrder = async (req: Request, res: Response) => {
    const { supplierId, discount, tax, status, note, balanceAmount, shippingCost, totalAmount, items }: createPurchaseOrderProps = req.body;
    try {
        // create a transaction
        const purchaseOrderId = await db.$transaction(async (transaction) => {

            // create purchase order
            const purchaseOrder = await transaction.purchaseOrder.create({
                data: {
                    supplierId,
                    discount,
                    note,
                    status,
                    tax,
                    balanceAmount,
                    shippingCost,
                    totalAmount,
                    refNo: generateRef()
                },
            });

            // create purchase order items
            for (const item of items) {
              // update product stock quantity
              const updatedProduct = await transaction.product.update({
                where: { id: item.productId },
                data: {
                    quantity: {
                      increment: item.quantity,
                  },
                },
              });

              if (!updatedProduct) {
                res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json({
                    error: `Failed to update this product ${item.productId}`,
                    data: null,
                  });
                return;
              }
              // create a notification if the product has gone below the threshold stock alert quantity
              if (updatedProduct.quantity < updatedProduct.alertQuantity) {
                // send/create notification
                const message = `New stock for ${updatedProduct.name} . Current stock is ${updatedProduct.quantity}.`;
                const statusText ="New Stock";
                  const status: NotificationStatus = "INFO";
                  
                const newNotification = {
                  message,
                  status,
                  statusText,
                };
                await transaction.notification.create({
                  data: newNotification,
                });
                // send email notification
                }
                
                // create purchase order item
              const purchaseOrderItem =
                await transaction.purchaseOrderItem.create({
                  data: {
                    purchaseOrderId: purchaseOrder.id,
                    productId: item.productId,
                    productName: item.productName,
                    quantity: item.quantity,
                    unitCost: item.unitCost,
                    subTotal: item.subTotal,
                    currentStock:item.currentStock,
                  },
                });

              if (!purchaseOrderItem) {
                res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json({
                    error: `Failed to create purchase order item for product ${item.productId}`,
                    data: null,
                  });
                return;
              }
            }

            // return purchase order id
            return purchaseOrder.id;
        });

        if (!purchaseOrderId) {
            res.status(StatusCodes.NOT_FOUND).json({ error: `Failed to create purchase order`, data: null });
            return;
        }

        // save the purchase order
        const savedPurchaseOrder = await db.purchaseOrder.findUnique({
            where: { id: purchaseOrderId },
            include: { items: true },
        });

        res.status(StatusCodes.CREATED).json({ data: savedPurchaseOrder, error: null });

    } catch (error) {
        res.status(500).json({ error: `Failed to create purchase order: ${error}`, data: null });
    }
};

// Get all purchase orders
export const getPurchaseOrders = async (req: Request, res: Response) => {
    try {
        const purchaseOrders = await db.purchaseOrder.findMany({
            orderBy: { createdAt: "desc" },
            include: { items: true },
        });
        res.status(200).json({ data: purchaseOrders, error: null });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch purchase orders: ${error}` });
    }
};

// Get purchase order by ID
export const getPurchaseOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const purchaseOrder = await db.purchaseOrder.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!purchaseOrder) {
            res.status(404).json({ error: "Purchase order not found" });
            return;
        }
        res.status(200).json({ data: purchaseOrder, error: null });
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch purchase order: ${error}` });
    }
};

// Update purchase order
export const updatePurchaseOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingPurchaseOrder = await db.purchaseOrder.findUnique({
            where: { id },
        });
        if (!existingPurchaseOrder) {
            res.status(404).json({ error: "Purchase order not found" });
            return;
        }

        const purchaseOrder = await db.purchaseOrder.update({
            where: { id },
            data: req.body,
        });

        res.status(200).json({ data: purchaseOrder, error: null });
    } catch (error) {
        res.status(500).json({ error: "Failed to update purchase order" });
    }
};

// Delete purchase order
export const deletePurchaseOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const purchaseOrder = await db.purchaseOrder.findUnique({
            where: { id },
        });
        if (!purchaseOrder) {
            res.status(404).json({ error: "Purchase order not found" });
            return;
        }

        await db.purchaseOrder.delete({
            where: { id },
        });

        res.status(204).send({ message: "Purchase order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete purchase order: ${error}` });
    }
};