import { db } from "@/db/db";
import { SaleItemProps } from "@/types/types";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { Request, Response } from "express";

/**
 * Crée une nouvelle vente et met à jour les informations du client et du produit en conséquence.
 *
 * @param req - L'objet de requête contenant les informations de la vente, y compris les articles de vente, le montant du solde, l'ID du client, etc.
 * @param res - L'objet de réponse utilisé pour envoyer les réponses HTTP.
 *
 * @returns Une réponse HTTP avec le statut et les données de la vente créée.
 *
 * @throws Une erreur HTTP 404 si le client n'est pas trouvé.
 * @throws Une erreur HTTP 400 si le montant du solde dépasse la limite de crédit maximale du client.
 * @throws Une erreur HTTP 500 si la mise à jour du montant impayé du client ou de la quantité de produit échoue.
 * @throws Une erreur HTTP 404 si la création d'un article de vente échoue.
 */
export const createSale = async (req: Request, res: Response) => {
  const saleItems: SaleItemProps[] = req.body.saleItems;
  try {
    const saleId = await db.$transaction(async (transaction) => {
      // create sale
      // if balanceAmount > 0
      if (req.body.balanceAmount > 0) {
        // if a customer is buying on credit
        const existingCustomer = await transaction.customer.findUnique({
          where: { id: req.body.customerId },
        });
        if (!existingCustomer) {
          res.status(404).json({
            error: "Customer not found",
            data: null,
          });
          return;
        }
        if (req.body.balanceAmount > existingCustomer.maxCreditLimit) {
          res.status(403).json({
            error: "this Customer is not allowed to buy on credit",
            data: null,
          });
          return;
        }
        // create credit sale
        // update customer unpaidAmount
        //update customer maxCreditAmount
        const unpaidAmount = parseFloat(req.body.balanceAmount);
        const updatedCustomer = await transaction.customer.update({
          where: { id: req.body.customerId },
          data: {
            unpaidCreditAmount: {
              increment: req.body.balanceAmount,
            },
            maxCreditLimit: {
              decrement: req.body.balanceAmount,
            },
          },
        });

        if (!updatedCustomer) {
          res.status(500).json({
            error: "Fail to update Customer unpaidAmount",
            data: null,
          });
          return;
        }
      }
      const sale = await transaction.sale.create({
        data: {
          customerId: req.body.customerId,
          customerName: req.body.customerName,
          customerEmail: req.body.customerEmail,
          paymentMethode: req.body.paymentMethode,
          saleAmount: req.body.saleAmount,
          saleType: req.body.saleType,
          balanceAmount: req.body.balanceAmount,
          paidAmount: req.body.paidAmount,
          transactionCode: req.body.transactionCode,
          shopId: req.body.shopId,
        },
      });

      if (saleItems && saleItems.length > 0) {
        for (const item of saleItems) {
          // update product quantity
          const updatedProduct = await transaction.product.update({
            where: { id: item.productId },
            data: {
              stockQuantity: {
                decrement: item.quantity,
              },
            },
          });

          if (!updatedProduct) {
            res.status(500).json({
              error: "Fail to update Product Quantity ",
              data: null,
            });
            return;
          }

          // create sale item
          const saleItem = await transaction.saleItem.create({
            data: {
              saleId: sale.id,
              productId: item.productId,
              productName: item.productNom,
              productPrice: item.productPrice,
              quantity: item.quantity,
              productImage: item.productImage,
            },
          });
          if (!saleItem) {
            res.status(404).json({
              error: `Failed to create sale item for the Product   ${item.productNom}`,
              data: null,
            });
            return;
          }
        }
      }
      return sale.id;
    });
    const sale = await db.sale.findUnique({
      where: { id: saleId },
      include: {
        saleItems: true,
      },
    });

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: `Failed to create sale ${error}` });
  }
};

// craete sale item
export const createSaleItem = async (req: Request, res: Response) => {
  const saleItems = req.body;
  try {
    // update product quantity
    await db.product.update({
      where: { id: saleItems.productId },
      data: {
        quantity: {
          decrement: saleItems.quantity,
        },
      },
    });
    const saleItem = await db.saleItem.create({
      data: saleItems,
    });
    res.status(201).json({ data: saleItem, error: null });
  } catch (error) {
    res.status(500).json({ error: `Failed to create sale item ${error}` });
  }
};

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await db.sale.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ data: sales, error: null });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch sales ${error}` });
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sale = await db.sale.findUnique({
      where: { id },
    });
    if (!sale) {
      res.status(404).json({ error: "Sale not found" });
      return;
    }
    res.status(200).json({ data: sale, error: null });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch sale ${error}` });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingSale = await db.sale.findUnique({
      where: { id },
    });
    if (!existingSale) {
      res.status(404).json({ error: "Sale not found" });
      return;
    }

    const sale = await db.sale.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({ data: sale, error: null });
  } catch (error) {
    res.status(500).json({ error: "Failed to update sale" });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sale = await db.sale.findUnique({
      where: { id },
    });
    if (!sale) {
      res.status(404).json({ error: "Sale not found" });
      return;
    }

    await db.sale.delete({
      where: { id },
    });

    res.status(204).send({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `Failed to delete sale ${error}` });
  }
};

export const getShopSales = async (req: Request, res: Response) => {
  const { shopId } = req.params;

  if (!shopId) {
    res.status(400).json({ error: "Shop ID is required", data: null });
    return;
  }

  // Define time periods
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  try {
    // Fetch all sales and group by shopId for different periods
    const fetchSalesData = async (startDate: Date, endDate: Date) => {
      return await db.sale.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          shopId: true,
          saleAmount: true,
          balanceAmount: true,
          paymentMethode: true,
          saleType: true,
        },
      });
    };
    // Fetch sales for different periods
    const categorizeSales = async (sales: any[]) => {
      return {
        total: sales,
        salesPaidInCash: sales.filter(
          (sale) => sale.paymentMethod === "CASH" && sale.balanceAmount <= 0
        ),
        salesPaidInBankTransfer: sales.filter(
          (sale) => sale.paymentMethod === "BANK_TRANSFER"
        ),
        salesPaidInOther: sales.filter(
          (sale) => sale.paymentMethod === "OTHER"
        ),
        salesPaidInCredit: sales.filter((sale) => sale.balanceAmount > 0),
        salesByMobileMoney: sales.filter(
          (sale) => sale.paymentMethod === "MOBILE_MONEY"
        ),
        salesByHandCash: sales.filter(
          (sale) => sale.paymentMethod === "CASH" && sale.balanceAmount <= 0
        ),
      };
    };

    // fetch and categorize sales for different periods
    const salesToday = await fetchSalesData(todayStart, todayEnd);
    const salesThisWeek = await fetchSalesData(weekStart, weekEnd);
    const salesThisMonth = await fetchSalesData(monthStart, monthEnd);

    const salesAllTime = await db.sale.findMany({
      select: {
        shopId: true,
        saleAmount: true,
        balanceAmount: true,
        paymentMethode: true,
      },
    });

    res.status(200).json({
      today: await categorizeSales(salesToday),
      thisWeek: await categorizeSales(salesThisWeek),
      thisMonth: await categorizeSales(salesThisMonth),
      allTime: await categorizeSales(salesAllTime),
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
};

export async function getShopsSales(req: Request, res: Response) {
  // Define time periods
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  try {
    // Fetch all sales and group by shopId for different periods
    const fetchSalesData = async (startDate: Date, endDate: Date) => {
      return await db.sale.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          shopId: true,
          saleAmount: true,
          balanceAmount: true,
          paymentMethode: true,
          saleType: true,
        },
      });
    };
    const categorizeSales = (sales: any[]) => {
      return {
        totalSales: sales,
        salesPaidInCash: sales.filter(
          (sale) => sale.paymentMethod === "CASH" && sale.balanceAmount <= 0
        ),
        salesPaidInBankTransfer: sales.filter(
          (sale) => sale.paymentMethod === "BANK_TRANSFER"
        ),
        //OTHER
        salesPaidInOther: sales.filter(
          (sale) => sale.paymentMethod === "OTHER"
        ),
        salesPaidInCredit: sales.filter((sale) => sale.balanceAmount > 0),
        salesByMobileMoney: sales.filter(
          (sale) => sale.paymentMethod === "MOBILE_MONEY"
        ),
        salesByHandCash: sales.filter(
          (sale) => sale.paymentMethod === "CASH" && sale.balanceAmount <= 0
        ),
      };
    };

    // fetch  and categorize sales for different periods
    const salesToday = await fetchSalesData(todayStart, todayEnd);
    const salesThisWeek = await fetchSalesData(weekStart, weekEnd);
    const salesThisMonth = await fetchSalesData(monthStart, monthEnd);
    const salesAllTime = await await db.sale.findMany({
      select: {
        shopId: true,
        saleAmount: true,
        balanceAmount: true,
        paymentMethode: true,
      },
    });
    res.status(200).json({
      today: categorizeSales(salesToday),
      thisWeek: categorizeSales(salesThisWeek),
      thisMonth: categorizeSales(salesThisMonth),
      allTime: categorizeSales(salesAllTime),
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}
