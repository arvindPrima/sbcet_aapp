const express = require("express");
const users = require("../controllers/usersController");

const router = express.Router();
router.use((req, res, next) => {
  console.log("this is user router level middleware");
  next();
});
router.get("/users", users.list);

module.exports = router;
