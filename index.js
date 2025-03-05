const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = require("./util/db");

const models = require("./models/index");
sequelize.models = models;

app.use((req, res, nexr) => {
  models.User.findByPk(1)
    .then((user) => {
      req.user = user;
      nexr();
    })
    .catch((err) => console.log(err));
});

const productAdminRoutes = require("./routes/admin/products");
app.use("/admin", productAdminRoutes);

const productRoutes = require("./routes/products");
app.use(productRoutes);

sequelize
  .sync({})
  .then(() => {
    return models.User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      const user = models.User.create({
        name: "user",
        email: "user@local.com",
      });
    }
    return user;
  })
  .then((user) => {
    app.listen(3002, () => {
      console.log("server is running on http://localhost:3002");
    });
  })
  .catch((error) => console.error("Error connecting to database", error));

app.get("/", (req, res) => {
  res.send({ message: "web shop app" });
});
