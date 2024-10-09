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

userRouter.post("/users",  validateData(createUserSchema), createUser);
userRouter.get("/users", auth, getUser);
userRouter.get("/attendants", auth, getAttendants);
userRouter.post("/auth/login", validateData(loginUserSchema), loginUser);
userRouter.get("/users/:id", auth, getUserById);
userRouter.put("/users/:id", auth, validateData(updateUserSchema), updateUser);
userRouter.put(
  "/users/update-password/:id",
  validateData(updateUserSchema),
  updateUserPassword
);
userRouter.delete("/users/:id", auth, deleteUser);

export default userRouter;
