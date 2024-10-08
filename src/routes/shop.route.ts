import { Router } from 'express';

import { validateData } from '@/middleware/validationMiddleware';
import { shopCreateSchema, shopUpdateSchema } from '@/validators/shop.form';
import { createShop, deleteShop, getShopAttendants, getShopById, getShops, updateShop } from '@/controllers/shop.controller';


const shopRouter = Router();

shopRouter.post("/shops", validateData(shopCreateSchema), createShop);
shopRouter.get("/shops", getShops);
shopRouter.get("/attendants/shops/:id", getShopAttendants);
shopRouter.get("/shops/:id", getShopById);
shopRouter.put("/shops/:id", validateData(shopUpdateSchema), updateShop);
shopRouter.delete("/shops/:id", deleteShop);

export default shopRouter;