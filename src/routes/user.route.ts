import {
  createUser,
  deleteUser,
  getAttendants,
  getUser,
  getUserById,
  loginUser,
  updateUser,
  updateUserPassword,
} from "@/controllers/user.controller";
import { validateData } from "@/middleware/validationMiddleware";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "@/validators/user.form";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/users", validateData(createUserSchema), createUser);
userRouter.get("/users", getUser);
userRouter.get("/attendants", getAttendants);
userRouter.post("/login", validateData(loginUserSchema), loginUser);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", validateData(updateUserSchema), updateUser);
userRouter.put(
  "/users/update-password/:id",
  validateData(updateUserSchema),
  updateUserPassword
);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
