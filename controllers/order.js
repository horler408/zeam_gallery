const mongoose = require("mongoose");


const Order = require("../models/order");
const Product = require("../models/product");


//Handle incoming GET request to /orders
exports.getAll = (req, res) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name price")
    .exec()
    .then((docs) => {
      res.status(201).json({
        count: docs.length,
        order: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

// Make order by the user
exports.createOrder = (req, res) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        res.status(404).json({
          message: "Product Not Found!",
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then((result) => {
      //console.log(result);
      res.status(201).json({
        message: "Orders created succesfully!",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/api/orders/" + result._id,
        },
      });
    })
    .catch((err) => {
      //console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}

// View order by the user
exports.getOrder = (req, res) => {
  Order.findById(req.params.orderId)
    .populate("product")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(500).json({
          message: "Order Not Found!",
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/api/orders/",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

// Remove order by the user
exports.deleteOrder = (req, res) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(201).json({
        message: "Order Deleted Successfully!",
        request: {
          type: "POST",
          url: "http://localhost:3000/api/orders/",
          body: { productId: "ID", quantity: "Number" },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

