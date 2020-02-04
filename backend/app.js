// MONGODB PW: x5KHwCCGlYd79MPm
// MONGODBN CONNECTION: mongodb+srv://technified:<password>@cluster0-srp73.mongodb.net/test?retryWrites=true&w=majority

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const stuffRoutes = require("./routes/stuff");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://technified:x5KHwCCGlYd79MPm@cluster0-srp73.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection successful");
  })
  .catch(error => {
    console.log("Unable to connect");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/stuff", stuffRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
