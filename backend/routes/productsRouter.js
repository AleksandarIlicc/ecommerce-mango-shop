const { Router } = require("express");
const router = new Router();
const {
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productController");

router.route("/").get(getAllProducts);
router.route("/:id").get(getSingleProduct);

module.exports = router;
