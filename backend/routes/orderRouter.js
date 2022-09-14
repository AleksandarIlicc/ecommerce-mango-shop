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

router.put("/:id/pay", auth, async (req, res) => {
  const orderID = req.params.id;

  const order = await Order.findById(orderID);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();

    res.send({ message: "Order Paid", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

module.exports = router;
