const mysql2 = require("mysql2/promise");

const mysqlconn = mysql2.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "sbcet_commerce",
});

module.exports = mysqlconn;
