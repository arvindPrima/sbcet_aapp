const express = require("express");
const usersRoute = require("./routes/usersRoute");
const productsRoute = require("./routes/productsRoute");
const commonRoute = require("./routes/commonRoute");
var useragent = require("express-useragent");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());
app.use(useragent.express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// set the view engine to ejs
app.set("view engine", "ejs");
app.use(
  (req, res, next) => {
    //console.log(req.useragent);
    //console.log("this is a app level middleware");
    next();
  },
  (req, res, next) => {
    //console.log("this is second app level middleware");
    next();
  }
);

app.use("/", usersRoute);
app.use("/", productsRoute);
app.use("/", commonRoute);
app.listen(3006, () => {
  console.log("App is running on port 3006.");
});
