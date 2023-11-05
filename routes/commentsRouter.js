const { Router } = require("express");
const router = new Router();
const {
  getAllCommentsByProduct,
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  dislikeComment,
} = require("../controllers/commentController");

router.route("/:productId").get(getAllCommentsByProduct);
router.route("/").post(createComment);
router.route("/:commentId").delete(deleteComment);
router.route("/:commentId").put(updateComment);
router.route("/like/:commentId").put(likeComment);
router.route("/dislike/:commentId").put(dislikeComment);

module.exports = router;
