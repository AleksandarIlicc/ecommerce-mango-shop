const asyncWrapper = require("../middleware/async");
const { Router } = require("express");
const router = new Router();
const Comment = require("../models/commentModel");

router.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    try {
      const productId = req.params.id;
      const comments = await Comment.find({ productId }).exec();
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: "Error getting comments." });
    }
  })
);

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    try {
      const { commentText, userName, userId, productId } = req.body;

      const newComment = new Comment({
        text: commentText,
        userName,
        userId,
        productId,
      });

      const savedComment = await newComment.save();

      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json({ error: "Error adding comment." });
    }
  })
);

module.exports = router;
