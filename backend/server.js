const express = require("express");
const connectDB = require("./db/connect.js");
require("dotenv").config();

const app = express();
app.use(express.json({ extended: true }));

const productRouter = require("./routes/productsRouter");
const userRouter = require("./routes/userRouter");

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

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
