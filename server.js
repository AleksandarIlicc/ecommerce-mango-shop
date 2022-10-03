const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./db/connect.js");
dotenv.config({ path: "config.env" });

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
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
    });
  } else {
    res.send("API is running");
  }
});

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
