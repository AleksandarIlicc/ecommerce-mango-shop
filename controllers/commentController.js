const asyncWrapper = require("../middleware/async");
const Comment = require("../models/commentModel");

const getAllCommentsByProduct = asyncWrapper(async (req, res) => {
  const { productId } = req.params;
  const comments = await Comment.find({ productId }).exec();
  if (comments) {
    res.json(comments);
  } else {
    res.status(500).json({ error: "Error getting comments." });
  }
});

const createComment = asyncWrapper(async (req, res) => {
  const { commentText, userName, userId, productId } = req.body;

  const newComment = new Comment({
    text: commentText,
    userName,
    userId,
    productId,
  });

  const savedComment = await newComment.save();

  if (savedComment) {
    res.status(201).json(savedComment);
  } else {
    res.status(500).json({ error: "Error adding comment." });
  }
});

const deleteComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.deleteOne({ _id: commentId }).exec();

  if (!comment) {
    return res.status(404).json({ error: "Comment not found." });
  }

  if (comment) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: "Error deleting comment." });
  }
});

const updateComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const updatedCommentText = req.body.text;

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      text: updatedCommentText,
    },
    { new: true }
  );

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(500).json({ error: "Error while updating the comment." });
  }
});

const likeComment = asyncWrapper(async (req, res) => {
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
});

const dislikeComment = asyncWrapper(async (req, res) => {
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
});

module.exports = {
  getAllCommentsByProduct,
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  dislikeComment,
};
