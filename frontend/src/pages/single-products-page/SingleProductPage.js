import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import SingleProduct from "../../components/SingleProduct";
import { TbArrowBack } from "react-icons/tb";
import axios from "axios";
import {
  singleProductSuccessRequest,
  fetchSingleProduct,
  singleProductErrorRequest,
} from "../../features/products/singleProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Comments from "../../components/Comments";

const SingleProductPage = () => {
  const productId = useParams().id;
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.product);
  const { product, loading, error } = singleProduct;
  const user = useSelector((state) => state.user);

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

  return (
    <main>
      <section className="single-product-container">
        <button className="btn btn__back-arrow">
          <Link to="/products">
            <TbArrowBack />
          </Link>
        </button>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          <div className="product-comments-container">
            <SingleProduct product={product} />

            {user.userInfo && <Comments />}
          </div>
        )}
      </section>
    </main>
  );
};

export default SingleProductPage;
