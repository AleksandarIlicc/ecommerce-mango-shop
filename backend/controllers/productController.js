const asyncWrapper = require("../middleware/async");
const Products = require("../models/productsModel");
const data = require("../data/products.json");

const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Products.insertMany(data);
  res.send(products);
});

const getSingleProduct = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const products = await Products.findById(id);

  if (products) {
    res.send(products);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

module.exports = {
  getAllProducts,
  getSingleProduct,
};
