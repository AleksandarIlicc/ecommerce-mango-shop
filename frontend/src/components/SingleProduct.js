import axios from "axios";
import React, { useState } from "react";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../features/cart/cartSlice";
import { store } from "../store";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");

  const addToCart = async (productId) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(
      addProductToCart({
        ...data,
        size: selectedSize,
        quantity,
      })
    );
    localStorage.setItem(
      "productCart",
      JSON.stringify(store.getState().cart.productCart)
    );
  };

  return (
    <article className="single-product" key={product.id}>
      <figure className="single-product__img">
        <img src={product.image} alt={product.name} />
      </figure>
      <div className="single-product__info">
        <h3
          style={{ marginBottom: "1rem" }}
          className="heading__primary heading__primary--black"
        >
          {product.name}
        </h3>
        <div style={{ marginBottom: "1rem" }}>
          <Rating rating={product.rating} />
          <span className="single-product__price">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="paragraph paragraph--small">{product.info}</p>
        <div className="size-box">
          <label htmlFor="sort">Select size:</label>
          <select
            value={selectedSize}
            name="sort"
            id="sort"
            onChange={(e) => setSelectedSize(e.target.value)}
            className="select-container"
          >
            {product.size.length &&
              product.size.map((productSize) => {
                return <option value={productSize}>{productSize}</option>;
              })}
            {!product.size.length && <option>no sizes</option>}
          </select>
        </div>
        <div className="single-product__counter mt-small">
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="select-container"
          >
            {[...Array(product.countInStock).keys()].map((count) => {
              return (
                <option value={count + 1} key={count + 1}>
                  {count + 1}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="btn btn__cart mt-medium"
          onClick={() => addToCart(product._id)}
        >
          add to cart
        </button>
      </div>
    </article>
  );
};

export default SingleProduct;
