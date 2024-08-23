const path = require("path");
const mysqlConn = require("../config/db");
const { error } = require("console");

module.exports = {
  listProducts: (req, res) => {
    res.render("products");
  },
  getProducts: (req, res) => {
    console.log(req.query.search);
    var query = "SELECT * FROM products";
    var condi = [];
    if (req.query.search) {
      condi.push(`product_name LIKE "%${req.query.search}%"`);
    }
    if (req.query.category_id) {
      condi.push(`category_id = "${req.query.category_id}"`);
    }

    if (condi.length > 0) {
      query = query + " WHERE " + condi.join(" AND ");
    }
    console.log(query);
    mysqlConn.query(query).then(function (response) {
      res.send(response[0]);
    });
  },
  addProduct: (req, res) => {
    mysqlConn
      .query("SELECT * FROM product_categories")
      .then(function (response) {
        res.render("add-product", {
          categories: response[0],
        });
      });
  },
  saveProduct: (req, res) => {
    if (
      req.files.product_image.mimetype != "	image/jpeg" ||
      req.files.product_image.mimetype != "	image/png"
    ) {
      console.log("Invalid image");
      res.redirect("/add-product");
    }
    console.log("body here", req.body, req.files.product_image.mimetype);
    var uploadPath = path.resolve(
      __dirname,
      "../public/uploads/" + req.files.product_image.name
    );
    console.log(uploadPath);
    req.files.product_image.mv(uploadPath, function (err) {
      if (err) {
        console.log("error", err);
      }
      console.log("file uploaded successfull");
    });
    mysqlConn
      .query(
        `INSERT INTO products (product_name, price, discount, description, category_id, product_image) 
VALUES ("${req.body.product_name}", ${req.body.price}, ${req.body.discount}, "${req.body.product_description}", ${req.body.category_id}, "${req.files.product_image.name}")`
      )
      .then(function (response) {
        console.log("data inserted successfull");
        res.redirect("/add-product");
      });
  },
  viewProduct: (req, res) => {
    var id = req.query.id;
    if (id == undefined) {
      res.send("product id is invalid");
    } else {
      console.log("=================", id);
      mysqlConn
        .query(
          `SELECT p.*, pc.category_name FROM products p JOIN product_categories pc ON p.category_id = pc.id WHERE p.id= ${id}`
        )
        .then(function (response) {
          console.log(response[0]);
          res.render("view-product", {
            product: response[0][0],
          });
        });
    }
  },
};
