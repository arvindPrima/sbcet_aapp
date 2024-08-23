const express = require("express");
const path = require("path");
const auth = require("../controllers/authController");

const router = express.Router();
router.use((req, res, next) => {
  console.log("this is auth router level middleware");
  next();
});
router.get("/login", auth.login);
router.post("/login", auth.doLogin);

module.exports = router;
