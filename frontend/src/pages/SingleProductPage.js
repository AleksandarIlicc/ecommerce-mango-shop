import React, {useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { TbArrowBack } from "react-icons/tb";
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import SingleProduct from "../components/SingleProduct";
import {
  singleProductSuccessRequest,
  fetchSingleProduct,
  singleProductErrorRequest,
} from "../features/products/singleProductSlice";
import axios from "axios";

const SingleProductPage = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const productId = useParams().id;
  const dispatch = useDispatch();

  const singleProduct = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);

  const { product, loading, error } = singleProduct;
  const { userInfo } = user;

  useEffect(() => {
    dispatch(singleProductSuccessRequest());
    const getSingleProduct = async (productId) => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch(fetchSingleProduct(data));
      } catch (err) {
        dispatch(
          singleProductErrorRequest(
            err.message && err.message ? err.response.data.message : err.message
          )
        );
      }
    };
    getSingleProduct(productId);
  }, [dispatch, productId]);

  const getProductComments = async (productId) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}/comments`);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductComments(productId);
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/api/products/${productId}/comments`, {
        userId: userInfo._id,
        userName: userInfo.name,
        comment,
        like: [],
      });
      const newCommnet = data;

      setComments([...comments, newCommnet])

      setComment("");
    } catch (err) {
      console.log(err)
    }
  };

  const handleLike = async (comment) => {
    const newLike = {
      userId: userInfo._id,
      isLiked: true
    }
    console.log(userInfo._id)

    const existingLike = comment.like.find(comm => comm.userId === userInfo._id);
    console.log(existingLike)

    if(existingLike) {
      existingLike.isLiked = !existingLike.isLiked;
      await axios.put(`/api/products/${productId}/comments/${comment._id}`, { existingLike });
    } else {
      await axios.put(`/api/products/${productId}/comments/${comment._id}`, { newLike });
    }
  }

  return (
    <main>
      <section className="single-product-container">
        <button className="btn__back-arrow">
          <Link to="/products">
            <TbArrowBack />
          </Link>
        </button>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          <SingleProduct product={product} />
        )}

        {userInfo && 
          <>
            <div className="add-comment-form">
              <form onSubmit={handleSubmit}>
                <textarea rows={20} cols={40} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button type="submit" style={{ cursor: "pointer" }}>Add comment</button>
              </form>
            </div>

            <div className="comments-section">
              <h2 className="mb-medium">Comments</h2>

              {comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <div>
                    <p className="mb-small">
                      <strong>{comment.comment}</strong>
                    </p>
                    <p>Posted by: <strong>{comment.userName}</strong></p>
                    <p>Posted at: <strong>{comment.createdAt}</strong></p>
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <button className="btn-like-dislike" onClick={() => handleLike(comment)}>
                      {
                        comment.like && comment.like.some(comm => comm.isLiked && comm.userId === userInfo.id) ? (
                          <FaThumbsUp />
                          ) : (
                          <FaRegThumbsUp />
                        )
                      }
                      <span>{comment.like.filter(comm => comm.isLiked).length}</span>
                    </button>
                    <button className="btn-like-dislike">
                      <FaRegThumbsDown />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        }
      </section>
    </main>
  );
};

export default SingleProductPage;
