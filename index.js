const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = require("./util/db");

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => console.error("Error connecting to database", error));

app.get("/", (req, res) => {
  res.send({ message: "web shop app" });
});

app.listen(3002, () => {
  console.log("server is running on http://localhost:3002");
});
