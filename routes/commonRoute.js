const express = require("express");
const common = require("../controllers/commonController");

const router = express.Router();

router.get("/", common.home);
router.get("/home", common.home);
router.get("/about", common.about);
router.get("/contact", common.contact);
router.get("/cart", common.cart);
router.get("/get-cart-items", common.getCartItems);

module.exports = router;
