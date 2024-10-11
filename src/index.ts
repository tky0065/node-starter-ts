import express, { NextFunction } from "express";
import { Request, Response } from 'express';
import authRouter from "./routes/auth.route";
import brandRouter from "./routes/brand.route";
import categoryRouter from "./routes/category.route";
import customerRouter from "./routes/customer.route";
import productRouter from "./routes/product.route";
import salesRouter from "./routes/sale.route";
import shopRouter from "./routes/shop.route";
import supplierRouter from "./routes/supplier.route";
import unitRouter from "./routes/unit.route";
import userRouter from "./routes/user.route";
import expenseCategoryRouter from "./routes/expense-category.route";
import payeeRouter from "./routes/payee.route";
import expenseRouter from "./routes/expense.route";
import { genralRequestLimiter, strictRequestLimiter } from "./middleware/rate-limite.middleware";
import rateLimit from "express-rate-limit";
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

app.use(genralRequestLimiter);


// Apply stricter rate limit to sensitive routes
app.use("/api/v1/sales", strictRequestLimiter);
app.use("/api/v1/users", strictRequestLimiter);
app.use("/api/v1/expenses", strictRequestLimiter);





app.use(express.json());
app.use("/api/v1", customerRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", shopRouter);
app.use("/api/v1", supplierRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", brandRouter);
app.use("/api/v1", unitRouter);
app.use("/api/v1", salesRouter);
app.use("/api/v1", expenseCategoryRouter);
app.use("/api/v1", payeeRouter);
app.use("/api/v1", expenseRouter);



const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
