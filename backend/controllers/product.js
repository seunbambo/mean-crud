const Product = require("../models/product");

exports.createProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock
  });
  product
    .save()
    .then(() => {
      res.json({
        product: product
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getOneProduct = (req, res, next) => {
  Product.findOne({
    _id: req.params.id
  })
    .then(product => {
      res.status(200).json({ product });
    })
    .catch(error => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifyProduct = (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock
  });
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.status(201).json({
        message: "Product updated successfully!"
      });
    })
    .catch(error => {
      res.status(400).then({
        error: error
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({
    _id: req.params.id
  })
    .then(() => {
      res.status(200).json({
        message: "Deleted!"
      });
    })
    .catch(error => {
      res.status(400).then({
        error: error
      });
    });
};

exports.getAllProduct = (req, res, next) => {
  Product.find()
    .then(products => {
      res.status(200).json({ products });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};
