const asyncWrapper = require("../middleware/async");
const Products = require("../models/productsModel");
const data = require("../data/products.json");

const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Products.find();
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

const getSearchResult = async (req, res) => {
  const { query } = req;
  const searchQuery = query.query || "";
  const category = query.category || "";
  const brand = query.brand || "";
  const price = query.price || "";
  const color = query.color || "";
  const order = query.order || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

  const categoryFilter = category && category !== "all" ? { category } : {};

  const brandFilter = brand && brand !== "all" ? { brand } : {};

  const colorFilter = color && color !== "all" ? { color } : {};

  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const sortOrder =
    order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await Products.find({
    ...queryFilter,
    ...categoryFilter,
    ...brandFilter,
    ...colorFilter,
    ...priceFilter,
  }).sort(sortOrder);

  res.send(products);
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getSearchResult,
};
