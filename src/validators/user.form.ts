import { z } from "zod";

const createUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
  dob: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]),
  image: z.string().url().optional(),
  role: z.enum(["ADMIN", "ATTENDANT"]).default("ATTENDANT"),
});

const updateUserSchema = z.object({
  username: z.string().min(1, "Username is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  phone: z
  .string()
  .min(10, "Phone number must be at least 10 digits long")
  .optional(),
  dob: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  image: z.string().url().optional(),
  role: z.enum(["ADMIN", "ATTENDANT"]).optional(),
});

const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// update password schema
const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters long"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

// forget password schema
const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export { createUserSchema, updateUserSchema, loginUserSchema, updatePasswordSchema, forgetPasswordSchema };