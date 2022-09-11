const express = require("express");
const connectDB = require("./db/connect.js");
require("dotenv").config();

const app = express();
app.use(express.json({ extended: true }));

const productRouter = require("./routes/productsRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const orderRouter = require("./routes/orderRouter");

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
