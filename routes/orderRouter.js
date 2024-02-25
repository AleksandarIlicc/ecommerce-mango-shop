const { Router } = require("express");
const router = new Router();
const Order = require("../models/orderModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { cartItems, shippingAddress, paymentMethod, orderSummaryInfo } =
      req.body;

    if (!cartItems || !shippingAddress || !paymentMethod || !orderSummaryInfo) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    if (cartItems.length === 0) {
      return res.status(400).send({ message: "Cart is empty" });
    }

    const { productsQuantity, productsPrice, shippingPrice, totalPrice } =
      orderSummaryInfo;

    const order = new Order({
      products: cartItems,
      shippingAddress,
      paymentMethod,
      costInfo: {
        productsQuantity,
        productsPrice,
        shippingPrice,
        totalPrice,
      },
      user: req.user.id,
    });

    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/list-orders", async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders.length > 0) {
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully.",
        orders,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No orders found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  const orderID = req.params.id;

  try {
    const order = await Order.findById(orderID);

    res.send(order);
  } catch (error) {
    res.status(404).send({ message: "Order Not Found" });
  }
});

router.put("/:id/pay", auth, async (req, res) => {
  const orderID = req.params.id;
  const { paymentDate, isPaid } = req.body;

  const order = await Order.findById(orderID);

  if (order) {
    order.isPaid = isPaid;
    order.paidAt = paymentDate;

    const updatedOrder = await order.save();

    res.send({ message: "Order successfully paid.", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

router.put("/:id/shipping", async (req, res) => {
  const orderID = req.params.id;

  const { isShipped, shippedDate } = req.body;

  try {
    const order = await Order.findById(orderID);

    if (order) {
      order.isShipped = isShipped;
      order.shippedAt = shippedDate;

      const updatedOrder = await order.save();

      res.send({ message: "Order successfully shipped.", order: updatedOrder });
    }
  } catch (error) {
    res.status(404).send({ message: "Order Not Found" });
  }
});

router.put("/:id/delivery", async (req, res) => {
  const orderID = req.params.id;

  const { isDelivered, deliveredDate } = req.body;

  try {
    const order = await Order.findById(orderID);

    if (order) {
      order.isDelivered = isDelivered;
      order.deliveredAt = deliveredDate;

      const updatedOrder = await order.save();

      res.send({
        message: "Order successfully delivered.",
        order: updatedOrder,
      });
    }
  } catch (error) {
    res.status(404).send({ message: "Order Not Found" });
  }
});

router.get("/user/:id", async (req, res) => {
  const userID = req.params.id;

  try {
    const orders = await Order.find({ user: userID }).sort({ createdAt: -1 });

    if (orders.length > 0) {
      res.status(200).json({ orders, message: "Orders fetched successfully." });
    } else {
      res.status(404).json({ message: "No orders found for the user." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
