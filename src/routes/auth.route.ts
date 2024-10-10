import { loginUser } from "@/controllers/auth.controller";

import { validateData } from "@/middleware/validationMiddleware";

import {
  
  loginUserSchema,
  
} from "@/validators/user.form";
import { Router } from "express";

const authRouter = Router();


authRouter.post("/auth/login", validateData(loginUserSchema), loginUser);


export default authRouter;
