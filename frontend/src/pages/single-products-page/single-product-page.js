import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { TbArrowBack } from "react-icons/tb";

import Loader from "../../components/loader/loader.component";
import ErrorMessage from "../../components/error-message/error-message.component";
import SingleProduct from "../../components/single-product/single-product.component";
import Comments from "../../components/comments/comments.component";

import {
  singleProductRequest,
  singleProductSuccess,
  singleProductErrorRequest,
} from "../../features/products/singleProductSlice";

import ProductClient from "../../api/productsApis";

const SingleProductPage = () => {
  const productClinet = new ProductClient();

  const productId = useParams().id;
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.product);
  const { product, loading, error } = singleProduct;
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(singleProductRequest());

    const getSingleProduct = async (productId) => {
      const result = await productClinet.getSingleProduct(productId);

      if (result) {
        dispatch(singleProductSuccess(result));
      } else {
        dispatch(
          singleProductErrorRequest(
            result.message && result.message
              ? result.response.data.message
              : result.message
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
