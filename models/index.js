const path = require("path");
const fs = require("fs");
const sequelize = require("../util/db");
const models = {};

module.exports = (() => {
  if (!Object.keys(models).length) {
    const files = fs.readdirSync(__dirname);
    const excluded = [".", "..", "index.js"];

    for (const fileName of files) {
      if (!excluded.includes(fileName) && path.extname(fileName) === ".js") {
        const modelFile = require(path.join(__dirname, fileName));
        models[modelFile.getTableName()] = modelFile;
      }
    }
    Object.values(models).forEach((model) => {
      if (typeof model.associate === "function") {
        model.associate(models);
      }
    });
    models.sequelize = sequelize;
  }

  models.User = require("./user");
  models.Product = require("./product");
  models.Cart = require("./cart");
  models.CartItem = require("./cart-item");
  models.Order = require("./order");
  models.OrderItem = require("./order-item");

  models.User.hasMany(models.Product);
  models.Product.belongsTo(models.User, {
    constrains: true,
    onDelete: "CASCADE",
  });
  models.User.hasOne(models.Cart);
  models.Cart.belongsTo(models.User);
  models.Cart.belongsToMany(models.Product, { through: models.CartItem });
  models.Product.belongsToMany(models.Cart, { through: models.CartItem });

  models.User.hasMany(models.Product);
  models.Product.belongsTo(models.User);

  models.Cart.belongsToMany(models.Product, {
    through: models.CartItem,
    onDelete: "CASCADE",
  });
  models.Product.belongsToMany(models.Cart, {
    through: models.CartItem,
    onDelete: "CASCADE",
  });

  models.Order.hasMany(models.OrderItem);
  models.OrderItem.belongsTo(models.Order);

  models.User.hasMany(models.Order);
  models.Order.belongsTo(models.User);

  models.OrderItem.belongsTo(models.Product);
  models.Product.hasMany(models.OrderItem);

  models.OrderItem.belongsTo(models.Product, { onDelete: "CASCADE" });
  models.Product.hasMany(models.OrderItem, { onDelete: "CASCADE" });

  return models;
})();
