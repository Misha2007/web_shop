const Product = require("../models/product");

class productController {
  async getAllProducts(req, res) {
    const products = await Product.findAll();
    console.log(products);
    res.status(201).json({
      products: products,
    });
  }

  async getProductById(req, res) {
    const product = await Product.findOne({ where: { id: req.params.id } });
    console.log(product);
    res.status(201).json({
      product: product,
    });
  }
}

module.exports = new productController();
