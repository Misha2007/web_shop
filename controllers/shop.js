const Product = require("../models/product");
const CartItem = require("../models/cart-item");
const Cart = require("../models/cart");

class shopController {
  async getAllProducts(req, res) {
    const products = await Product.findAll();
    console.log(products);
    res.status(201).json({
      products: products,
    });
  }

  async getCart(req, res) {
    const userCart = await req.user.getCart();
    console.log(userCart);
    const cartProducts = await userCart.getProducts();
    res.status(201).json({
      products: cartProducts,
    });
  }

  async createCart(req, res) {
    const userCart = await req.user.getCart();
    const quantity = Number(req.body.quantity);

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    let cartItem = await CartItem.findOne({
      where: {
        cartId: userCart.id,
        productId: product.id,
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: userCart.id,
        productId: product.id,
        quantity: Number(quantity),
      });
    }

    const cartProducts = await userCart.getProducts();

    res.status(201).json({
      products: cartProducts,
    });
  }

  async deleteCart(req, res) {
    const userCart = await req.user.getCart();
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    let cartItem = await CartItem.findOne({
      where: {
        cartId: userCart.id,
        productId: product.id,
      },
    });

    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        await cartItem.save();
      } else {
        await cartItem.destroy();
      }
    } else {
      return res.status(404).json({ message: "Product not found." });
    }

    console.log(product);
    res.status(201).json({
      message: "Product deleted from cart successfully",
      product: product,
    });
  }
}

module.exports = new shopController();
