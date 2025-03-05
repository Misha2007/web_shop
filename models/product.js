const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: { type: Sequelize.STRING, allowNull: false },
  userId: {
    type: Sequelize.INTEGER,
    references: { model: "users", key: "id" },
  },
});

module.exports = Product;
