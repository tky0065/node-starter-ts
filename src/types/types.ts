import { Adjustement, Product } from "@prisma/client";

export type SaleItemProps = {
    saleId: string;
    productId: string;
    quantity: number;
    productPrice: number;
    productNom: string;
    productImage: string;

};

export interface AdjustmentItem {
  
    productId: string;
    adjustmentId: string;
    adjustment: Adjustement;
    type: string;
    quantity: number;
    currentStock: number;
    productName: string;
   
}


