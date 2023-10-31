import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Comment from "./Comment";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const singleProduct = useSelector((state) => state.product);
  const { _id: productId } = singleProduct.product;
  const user = useSelector((state) => state.user);
  const { _id: userId, name: userName } = user.userInfo || "";

  const getAllComments = async () => {
    try {
      const { data } = await axios.get(`/api/comments/${productId}`);
      setComments(data);
    } catch (err) {
      console.log(err.message);
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
          comments.map((comment) => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                userName={userName}
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
