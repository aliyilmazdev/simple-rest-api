const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product");
const auth = require("../middlewares/auth");

productRouter.get("/getProducts", productController.getProducts);
productRouter.post("/createProduct", auth, productController.createProduct);
productRouter.get("/getProductDetail/:id", productController.getProductDetail);
productRouter.patch("/getUpdate/:id", auth, productController.getUpdate);
productRouter.delete(
  "/deleteProduct/:id",
  auth,
  productController.deleteProduct
);
productRouter.get("/searchProduct", productController.searchProduct);

module.exports = {
  productRouter,
};
