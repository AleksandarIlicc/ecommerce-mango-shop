const { Router } = require("express");
const router = new Router();
const Order = require("../models/orderModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { orderProducts, shippingAddress, paymentMethod } = req.body;
  const { numOfProducts, productsPrice, shippingPrice, totalPrice } =
    req.body.orderSummaryInfo;

  if (req.body.orderProducts.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    const order = new Order({
      orderProducts,
      shippingAddress,
      paymentMethod,
      numOfProducts,
      productsPrice,
      shippingPrice,
      totalPrice,
      user: req.user.id,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  }
});

router.get("/:id", auth, async (req, res) => {
  const orderID = req.params.id;

  const order = await Order.findById(orderID);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
module.exports = router;
