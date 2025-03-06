const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "in progress",
  },
  totalAmount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
});

module.exports = Order;
