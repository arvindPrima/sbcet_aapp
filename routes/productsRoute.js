const express = require("express");
const path = require("path");
const users = require("../controllers/authController");
const productsController = require("../controllers/productsController");

const router = express.Router();
router.use((req, res, next) => {
  console.log("this is a product router level middleware");
  next();
});
router.get("/products", productsController.listProducts);

router.get("/get-products", productsController.getProducts);

router.get("/add-product", productsController.addProduct);

router.post("/save-product", productsController.saveProduct);

router.get("/view-product", productsController.viewProduct);

module.exports = router;
