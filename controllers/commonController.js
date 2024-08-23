const mysqlconn = require("../config/db");

const common = {
  home: function (req, res) {
    res.render("home");
  },
  about: function (req, res) {
    res.render("about");
  },
  contact: function (req, res) {
    res.render("contact");
  },
  cart: function (req, res) {
    res.render("cart");
  },
  getCartItems: function (req, res) {
    console.log(req.query.items);

    var a = JSON.parse(req.query.items);

    console.log();

    mysqlconn
      .query(`SELECT * FROM products WHERE id in (${a.join(",")})`)
      .then(function (response) {
        console.log(response);
        res.send(response[0]);
      });
  },
};

module.exports = common;
