import { changePassword, forgetPassword, loginUser, verifyToken } from "@/controllers/auth.controller";

import { validateData } from "@/middleware/validationMiddleware";

import { forgetPasswordSchema, loginUserSchema } from "@/validators/user.form";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/auth/login", validateData(loginUserSchema), loginUser);
authRouter.post(
  "/auth/forget-password",
  validateData(forgetPasswordSchema),
  forgetPassword
);
authRouter.get("/auth/verify-token", verifyToken);
authRouter.post("/auth/change-password", changePassword);

export default authRouter;
