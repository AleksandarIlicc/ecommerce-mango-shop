const { Router } = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const router = new Router();
const Order = require("../models/orderModel");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "USD",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

// router.post("/", auth, async (req, res) => {
//   const { orderProducts, shippingAddress, paymentMethod } = req.body;
//   const { numOfProducts, productsPrice, shippingPrice, totalPrice } =
//     req.body.orderSummaryInfo;

//   if (req.body.orderProducts.length === 0) {
//     res.status(400).send({ message: "Cart is empty" });
//   } else {
//     const order = new Order({
//       orderProducts,
//       shippingAddress,
//       paymentMethod,
//       numOfProducts,
//       productsPrice,
//       shippingPrice,
//       totalPrice,
//       user: req.user.id,
//     });
//     const createdOrder = await order.save();
//     res.status(201).send({ message: "New Order Created", order: createdOrder });
//   }
// });

// router.get("/:id", auth, async (req, res) => {
//   const orderID = req.params.id;

//   const order = await Order.findById(orderID);
//   if (order) {
//     res.send(order);
//   } else {
//     res.status(404).send({ message: "Order Not Found" });
//   }
// });

// router.put("/:id/pay", auth, async (req, res) => {
//   const orderID = req.params.id;

//   const order = await Order.findById(orderID);

//   if (order) {
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.email_address,
//     };
//     const updatedOrder = await order.save();

//     res.send({ message: "Order Paid", order: updatedOrder });
//   } else {
//     res.status(404).send({ message: "Order Not Found" });
//   }
// });

module.exports = router;
