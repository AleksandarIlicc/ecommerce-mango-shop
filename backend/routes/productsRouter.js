const { Router } = require("express");
const router = new Router();
const {
  getAllProducts,
  getSingleProduct,
  getSearchResult,
} = require("../controllers/productController");

router.route("/").get(getAllProducts);
router.route("/search").get(getSearchResult);
router.route("/:id").get(getSingleProduct);

module.exports = router;
