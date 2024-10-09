import express from "express";
import customerRouter from "./routes/customer.route";
import shopRouter from "./routes/shop.route";
import supplierRouter from "./routes/supplier.route";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import brandRouter from "./routes/brand.route";
import unitRouter from "./routes/unit.route";

require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/v1", customerRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", shopRouter);
app.use("/api/v1", supplierRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", brandRouter);
app.use("/api/v1", unitRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
