import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import axios from "axios";
import { updateComment } from "../features/comments/commentSlice";

export const Comment = ({ comment, getAllComments }) => {
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);
  const [updatedComment, setUpdatedComment] = useState(comment.text);
  const [likes, setLikes] = useState({
    userId: comment.userId,
    isLiked: false,
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { _id: userId, name: userName } = user.userInfo || "";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const editComment = async (id) => {
    try {
      const { data } = await axios.put(`/api/comments/${id}`, {
        text: editedComment,
      });
      setUpdatedComment(data.text);
      setIsEdit(false);
    } catch (err) {
      setError(err);
    }
    setIsEdit(false);
  };

  const handleEditedCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleDeleteComment = async (id) => {
    try {
      const response = await axios.delete(`/api/comments/${id}`);
      getAllComments();
    } catch (err) {
      setError(err);
    }
  };

  const handleLikeComment = async (id) => {
    let response;
    const newLike = {
      userId: comment.userId,
      isLiked: true,
      isDisliked: false,
    };

    const commentIsAlreadyLiked = comment.likes.find(
      (like) => like.userId === comment.userId
    );

    try {
      if (!commentIsAlreadyLiked) {
        response = await axios.put(`/api/comments/like/${id}`, newLike);
      } else {
        newLike.isLiked = !commentIsAlreadyLiked.isLiked;
        newLike.isDisliked = !newLike.isLiked;
        response = await axios.put(`/api/comments/like/${id}`, newLike);
      }

      if (response.status === 200) {
        dispatch(
          updateComment({
            commentId: comment._id,
            userId: comment.userId,
            isLiked: !commentIsAlreadyLiked
              ? true
              : !commentIsAlreadyLiked.isLiked,
          })
        );
      } else {
        console.log("Nije uspelo lajkovanje komentara.");
      }
    } catch (err) {
      console.error(
        "Greška prilikom slanja zahteva za lajkovanje komentara:",
        err
      );
    }
  };

  const handleDislikeComment = async (id) => {
    let response;
    const newDislike = {
      userId: comment.userId,
      isLiked: true,
    };

    const commentIsAlreadyLiked = comment.likes.find(
      (like) => like.userId === comment.userId
    );

    try {
      if (!commentIsAlreadyLiked) {
        response = await axios.put(`/api/comments/dislike/${id}`, newDislike);
      } else {
        newDislike.isLiked = !commentIsAlreadyLiked.isLiked;
        response = await axios.put(`/api/comments/dislike/${id}`, newDislike);
      }

      if (response.status === 200) {
        dispatch(
          updateComment({
            commentId: comment._id,
            userId: comment.userId,
            isLiked: !commentIsAlreadyLiked
              ? true
              : !commentIsAlreadyLiked.isLiked,
          })
        );
      } else {
        console.log("Nije uspelo lajkovanje komentara.");
      }
    } catch (err) {
      console.error(
        "Greška prilikom slanja zahteva za lajkovanje komentara:",
        err
      );
    }
  };

  return (
    <div key={comment._id} className="comment">
      <figure>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          alt="User image"
        />
      </figure>
      <div>
        <span className="comment__username">
          {comment.userName === userName ? "You" : comment.userName}
        </span>
        <span className="comment__date">{formatDate(comment.createdAt)}</span>
      </div>
      <div className="flex justify-end">
        <button className="me-4" onClick={() => handleLikeComment(comment._id)}>
          {comment.likes.some((like) => like.isLiked) ? (
            <FaThumbsUp />
          ) : (
            <FaRegThumbsUp />
          )}
        </button>
        <button onClick={() => handleDislikeComment(comment._id)}>
          {comment.likes.some((like) => !like.isLiked) ? (
            <FaThumbsDown />
          ) : (
            <FaRegThumbsDown />
          )}
        </button>
      </div>
      {isEdit ? (
        <textarea
          className="comment__text"
          value={editedComment}
          onChange={handleEditedCommentChange}
          rows={4}
        ></textarea>
      ) : (
        <p className="comment__text">{updatedComment}</p>
      )}
      {comment.userName === userName && (
        <div className="comment__btns flex justify-end">
          {isEdit ? (
            <buuton
              className="btn btn__comment-edit"
              onClick={() => editComment(comment._id)}
            >
              save
            </buuton>
          ) : (
            <buuton
              className="btn btn__comment-edit"
              onClick={() => setIsEdit(true)}
            >
              edit
            </buuton>
          )}
          <buuton
            className="btn btn__comment-delete"
            onClick={() => handleDeleteComment(comment._id)}
          >
            delete
          </buuton>
        </div>
      )}
    </div>
  );
};
