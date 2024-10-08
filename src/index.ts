import express, { Request, Response } from "express";
import { getCustomer } from "./controllers/customer.controller";
import customerRouter from "./routes/customer.route";


require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/v1",customerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



