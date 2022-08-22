import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const SingleProduct = ({ item, productContainerLayout }) => {
  return (
    <article
      className={
        productContainerLayout
          ? "product product--cols"
          : "product product--rows"
      }
      key={item._id}
    >
      <Link to={`/api/products/${item._id}`}>
        <figure className="product__img">
          <img src={item.image} alt={item.name} />
        </figure>
      </Link>
      <div
        className={
          productContainerLayout
            ? "product__info product__info--cols"
            : "product__info product__info--rows"
        }
      >
        <h3 className="heading__tertiary">{item.name}</h3>
        <p className="paragraph">{item.info}</p>
        <div>
          <Rating rating={item.rating} />
          <span className="product__price">${item.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
};

export default SingleProduct;
