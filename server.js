const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./db/connect.js");
dotenv.config({ path: "config.env" });

const app = express();
app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}.`);
  console.log(`Shutting down the server for handling uncaught exception.`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}.`);
  console.log(`Shutting down the server for unhandled promise rejection.`);

  server.close(() => {
    process.exit(1);
  });
});

const productRouter = require("./routes/productsRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const orderRouter = require("./routes/orderRouter");
const commentsRouter = require("./routes/commentsRouter");

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/comments", commentsRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
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
