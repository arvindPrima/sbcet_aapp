const path = require("path");
const mysqlconn = require("../config/db");
const auth = {
  login: (req, res) => {
    console.log(req.query.message);
    res.sendFile(path.resolve(__dirname, "../public/login.html"));
  },
  doLogin: (req, res) => {
    console.log(req.body);
    console.log(
      `SELECT * FROM users WHERE username = "${req.body.username}" AND password="${req.body.password}"`
    );
    mysqlconn
      .query(
        `SELECT * FROM users WHERE username = "${req.body.username}" AND password="${req.body.password}"`
      )
      .then((resp) => {
        let respon = "";
        if (resp[0].length) {
          respon = "Logged in success";
          res.redirect("../products");
        } else {
          respon = "Login failed";
          res.redirect("../login?m=incorrect credentials");
        }
        //res.send(respon);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = auth;
