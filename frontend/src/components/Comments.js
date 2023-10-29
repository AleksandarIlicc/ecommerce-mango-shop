import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
          comments.map((comment, index) => {
            return (
              <div className="comment">
                <figure>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                    alt="User image"
                  />
                </figure>
                <div>
                  <span className="comment__username">
                    {comment.userName === userName ? "You" : userName}
                  </span>
                  <span>{comment.createdAt}</span>
                </div>
                <p className="comment__text" key={index}>
                  {comment.text}
                </p>
              </div>
            );
          })
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
