import {
  changePassword,
  forgetPassword,
  loginUser,
  verifyToken,
} from "@/controllers/auth.controller";

import { validateData } from "@/middleware/validationMiddleware";

import { forgetPasswordSchema, loginUserSchema } from "@/validators/user.form";
import { Router } from "express";

const authRouter = Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/auth/login", validateData(loginUserSchema), loginUser);

/**
 * @swagger
 * /api/v1/auth/forget-password:
 *   post:
 *     summary: Forget password
 *     tags: [Auth]
 *     description: Request a password reset link.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       404:
 *         description: User not found
 */
authRouter.post(
  "/auth/forget-password",
  validateData(forgetPasswordSchema),
  forgetPassword
);

/**
 * @swagger
 * /api/v1/auth/verify-token:
 *   get:
 *     summary: Verify token
 *     tags: [Auth]
 *     description: Verify the authenticity of a token.
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Invalid token
 */
authRouter.get("/auth/verify-token", verifyToken);

/**
 * @swagger
 * /api/v1/auth/change-password:
 *   post:
 *     summary: Change password
 *     tags: [Auth]
 *     description: Change the user's password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password successfully changed
 *       400:
 *         description: Invalid current password
 *       404:
 *         description: User not found
 */
authRouter.post("/auth/change-password", changePassword);

export default authRouter;
