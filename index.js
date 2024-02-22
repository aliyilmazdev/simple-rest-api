const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { db } = require("./src/config/database");
const { authRouter } = require("./src/routes/auth");
const { productRouter } = require("./src/routes/product");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(authRouter);
app.use(productRouter);

db();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
