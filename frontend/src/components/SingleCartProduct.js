import React from "react";
import { removeProductFromCart } from "../features/cart/cartSlice";
import { addProductToCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";

const SingleCartProduct = ({ product, productsPrice }) => {
  const dispatch = useDispatch();
  const productPrice = product.price.toFixed(2);
  const productQuantity = product.quantity;
  const totalPrice = productPrice * productQuantity || productsPrice;

  return (
    <div className="cart__product">
      <div className="product-box">
        <figure className="cart__img">
          <img src={product.image} alt={product.name} />
        </figure>
        <div className="product-info">
          <h3 className="heading__tertiary">
            {product.name.length > 10
              ? product.name.substring(0, 10) + "..."
              : product.name}
          </h3>
          <p>
            <span>Size:</span> {product.size} <span>Color:</span>{" "}
            {product.color}
          </p>
          <p>
            {" "}
            <span>Brand:</span> {product.brand}
          </p>
        </div>
      </div>
      <div className="cart__product-num">
        <select
          value={product.quantity}
          onChange={(e) =>
            dispatch(
              addProductToCart({
                ...product,
                quantity: e.target.value,
              })
            )
          }
          className="select-container select-container--cart mt-small"
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
      <div className="cart__price">
        <h3>total price</h3>
        <p>${totalPrice.toFixed(2)}</p>
        <p className="cart__price--single">${product.price.toFixed(2)} each</p>
      </div>
      <div className="cart__remove">
        <button
          className="btn__remove"
          onClick={() => dispatch(removeProductFromCart(product._id))}
        >
          <span>remove</span>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default SingleCartProduct;
