const path = require("path");
const mysqlconn = require("../config/db");
const ejs = require("ejs");
const users = {
  list: (req, res) => {
    console.log(req.query.message);
    mysqlconn.query("SELECT * FROM users").then((resp) => {
      console.log(resp[0]);
      res.render("users", {
        title: "Hello user",
        users: resp[0],
      });
    });
  },
};

module.exports = users;
