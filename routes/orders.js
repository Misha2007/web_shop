const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.post("/create", orderController.createOrder);

router.get("/all", orderController.getAllOrders);

router.get("/order/:id", orderController.getOrderById);

router.delete("/order/:id", orderController.deleteOrder);

module.exports = router;
