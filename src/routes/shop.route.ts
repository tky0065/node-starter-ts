import { Router } from 'express';

import { validateData } from '@/middleware/validationMiddleware';
import { shopCreateSchema, shopUpdateSchema } from '@/validators/shop.form';
import { createShop, deleteShop, getShopAttendants, getShopById, getShops, updateShop } from '@/controllers/shop.controller';
import { auth } from '@/middleware/verifyTokenMiddleware';


const shopRouter = Router();

shopRouter.post("/shops", auth, validateData(shopCreateSchema), createShop);
shopRouter.get("/shops", auth, getShops);
shopRouter.get("/attendants/shops/:id", auth, getShopAttendants);
shopRouter.get("/shops/:id", auth, getShopById);
shopRouter.put("/shops/:id", auth, validateData(shopUpdateSchema), updateShop);
shopRouter.delete("/shops/:id", auth, deleteShop);

export default shopRouter;