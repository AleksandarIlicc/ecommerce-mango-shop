const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    info: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    size: { type: [String], required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
