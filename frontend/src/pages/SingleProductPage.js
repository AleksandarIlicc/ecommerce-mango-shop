import React, {useState, useEffect } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import SingleProduct from "../components/SingleProduct";
import { TbArrowBack } from "react-icons/tb";
import axios from "axios";
import {
  singleProductSuccessRequest,
  fetchSingleProduct,
  singleProductErrorRequest,
} from "../features/products/singleProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

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
            <div>
              <form onSubmit={handleSubmit}>
                <textarea rows={20} cols={40} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button type="submit">Add comment</button>
              </form>
            </div>
            <div className="comments-section">
              <h2>Comments</h2>

              {comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <p>{comment.comment}</p>
                  <p>Posted by: {comment.userId}</p>
                  <p>Posted at: {comment.createdAt}</p>
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
