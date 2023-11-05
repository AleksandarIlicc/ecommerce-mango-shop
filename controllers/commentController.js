const asyncWrapper = require("../middleware/async");
const Comment = require("../models/commentModel");

const getAllCommentsByProduct = asyncWrapper(async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId }).exec();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error getting comments." });
  }
});

const createComment = asyncWrapper(async (req, res) => {
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
});

const deleteComment = asyncWrapper(async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.deleteOne({ _id: commentId }).exec();

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error deleting comment." });
  }
});

const updateComment = asyncWrapper(async (req, res) => {
  try {
    const { commentId } = req.params;
    const updatedCommentText = req.body.text;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        text: updatedCommentText,
      },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Error while updating the comment." });
  }
});

const likeComment = asyncWrapper(async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, isLiked, isDisliked } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment didn't find." });
    }

    const existingLike = comment.likes.find((like) => like.userId == userId);

    if (existingLike) {
      existingLike.isLiked = isLiked;
      existingLike.isDisliked = isDisliked;
    } else {
      comment.likes.push({ userId, isLiked, isDisliked });
    }

    const updatedComment = await comment.save();

    res.json(comment);
  } catch (err) {
    console.error("Error while liking the comment.", err);
    res.status(500).json({ error: "Error while liking the comment." });
  }
});

const dislikeComment = asyncWrapper(async (req, res) => {
  try {
    const { commentId } = req.params;
    const likes = req.body;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { likes },
      {
        new: true,
      }
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment didn't find." });
    }

    res.json(comment);
  } catch (err) {
    console.error("Error while disliking the comment.", err);
    res.status(500).json({ error: "Error while disliking the comment." });
  }
});

module.exports = {
  getAllCommentsByProduct,
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  dislikeComment,
};
