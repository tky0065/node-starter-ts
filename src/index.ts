import express from "express";
import customerRouter from "./routes/customer.route";
import shopRouter from "./routes/shop.route";
import supplierRouter from "./routes/supplier.route";
import userRouter from "./routes/user.route";

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
