const Order = require("../models/order");
const OrderItem = require("../models/order-item");
const Cart = require("../models/cart");
const Product = require("../models/product");
const CartItem = require("../models/cart-item");

class orderController {
  async createOrder(req, res) {
    const userCart = await req.user.getCart();
    const cartProducts = await userCart.getProducts();

    if (!cartProducts.length) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const order = await Order.create({
      userId: req.user.id,
      totalAmount: 0,
      status: "pending",
    });

    let totalAmount = 0;

    for (const product of cartProducts) {
      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: product.cartItem.quantity,
      });

      totalAmount += product.price * product.cartItem.quantity;
    }

    order.totalAmount = totalAmount;
    await order.save();

    await userCart.setProducts([]);

    res.status(201).json({
      message: "Order created successfully",
      orderId: order.id,
    });
  }

  async getAllOrders(req, res) {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });

    res.status(200).json({
      orders: orders,
    });
  }

  async getOrderById(req, res) {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      order: order,
    });
  }

  async deleteOrder(req, res) {
    const order = await Order.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  }
}

module.exports = new orderController();
