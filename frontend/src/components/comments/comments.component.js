import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Comment from "../comment/comment.component";
import {
  commentsErrorRequest,
  commentsStartRequest,
  commentsSuccessRequest,
} from "../../features/comments/commentSlice";
import Loader from "../loader/loader.component";
import ErrorMessage from "../error-message/error-message.component";

const Comments = () => {
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const singleProduct = useSelector((state) => state.product);
  const { _id: productId } = singleProduct.product;
  const user = useSelector((state) => state.user);
  const { _id: userId, name: userName } = user.userInfo || "";
  const [commentText, setCommentText] = useState("");
  const {
    comments,
    loading,
    error: errorComment,
  } = useSelector((state) => state.comments);

  const getAllComments = async () => {
    try {
      dispatch(commentsStartRequest());
      const { data } = await axios.get(`/api/comments/${productId}`);
      dispatch(commentsSuccessRequest(data));
    } catch (err) {
      console.log(err.message);
      dispatch(commentsErrorRequest(err.message));
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText || !userId || !productId) {
      setError("You must enter all the required information.");
      return;
    }

    try {
      const response = await axios.post("/api/comments", {
        commentText,
        userName,
        userId,
        productId,
      });
      getAllComments();
      setCommentText("");
    } catch (err) {
      setError(err.message);
    }
  };

  const onChangeComment = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="comments-container">
      <form className="comments-form" onSubmit={handleSubmit}>
        <h3 className="heading__secondary heading__secondary--white">
          Comments ({comments.length})
        </h3>
        <textarea
          placeholder="Add comments..."
          value={commentText}
          onChange={onChangeComment}
        />
        <button type="submit" className="btn btn__cart">
          Add comment
        </button>
      </form>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments
            .slice(0)
            .reverse()
            .map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  comment={comment}
                  getAllComments={getAllComments}
                />
              );
            })
        ) : (
          <p style={{ color: "white", textAlign: "center" }}>
            No comments yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Comments;
