import { loginUser } from "@/controllers/auth.controller";
import {
  createUser,
  deleteUser,
  getAttendants,
  getUser,
  getUserById,
  updateUser,
  updateUserPassword,
} from "@/controllers/user.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { auth } from "@/middleware/verifyTokenMiddleware";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "@/validators/user.form";
import { Router } from "express";

const userRouter = Router();

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Creates a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post("/users", validateData(createUserSchema), createUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     description: Retrieve a list of users from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/users", auth, getUser);

/**
 * @swagger
 * /api/v1/attendants:
 *   get:
 *     summary: Retrieve a list of attendants
 *     tags: [Users]
 *     description: Retrieve a list of attendant users from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of attendants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/attendants", auth, getAttendants);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *      tags: [Auth]
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
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
userRouter.post("/auth/login", validateData(loginUserSchema), loginUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: Retrieve a single user by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get("/users/:id", auth, getUserById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     description: Update an existing user's information.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated user information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.put("/users/:id", auth, validateData(updateUserSchema), updateUser);

/**
 * @swagger
 * /api/v1/users/update-password/{id}:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     description: Update an existing user's password.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Password successfully updated.
 *       400:
 *         description: Invalid current password.
 *       404:
 *         description: User not found.
 */
userRouter.put(
  "/users/update-password/:id",
  validateData(updateUserSchema),
  updateUserPassword
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Delete a user by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *       404:
 *         description: User not found.
 */
userRouter.delete("/users/:id", auth, deleteUser);

export default userRouter;
