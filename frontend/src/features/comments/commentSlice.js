import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: true,
    error: null,
  },
  reducers: {
    commentsStartRequest: (state, action) => {
      return { ...state, loading: true };
    },
    commentsSuccessRequest: (state, action) => {
      return { ...state, loading: false, comments: action.payload };
    },
    commentsErrorRequest: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    updateComment: (state, action) => {
      const { likedComment, userId, isLiked, isDisliked } = action.payload;
      const updatedComments = state.comments.map((comment) => {
        if (comment._id === likedComment._id) {
          const updatedLikes = likedComment.likes.map((like) => {
            if (like.userId == userId) {
              return {
                ...like,
                isLiked,
                isDisliked,
              };
            }
            return like;
          });

          return {
            ...comment,
            likes: updatedLikes,
          };
        }
        return comment;
      });
      return { ...state, comments: updatedComments };
    },
  },
});

export const {
  commentsStartRequest,
  commentsSuccessRequest,
  commentsErrorRequest,
  updateComment,
} = commentSlice.actions;
export default commentSlice.reducer;
