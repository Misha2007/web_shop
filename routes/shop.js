const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/cart", (req, res) => shopController.getCart(req, res));
router.post("/cart/product/add/:id", (req, res) =>
  shopController.createCart(req, res)
);

router.delete("/cart/product/delete/:id", (req, res) =>
  shopController.deleteCart(req, res)
);

module.exports = router;
