const Comment = ({ comment, userName }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
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
      <p className="comment__text">{comment.text}</p>
      <div className="comment__btns">
        <buuton className="btn btn__comment-edit">edit</buuton>
        <buuton className="btn btn__comment-delete">delete</buuton>
      </div>
    </div>
  );
};

export default Comment;
