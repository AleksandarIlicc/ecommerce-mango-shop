import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { productCart } = cart;

  const userSignin = useSelector((state) => state.user);
  const { userInfo } = userSignin;

  const totalPrice = productCart.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);

  const numOfProducts = productCart.reduce((acc, product) => {
    return acc + +product.quantity;
  }, 0);

  const shippingPrice = () => {
    const upperLimitForShipping = 250;
    const shippingPercentage = 20;

    if (totalPrice < upperLimitForShipping) {
      return (shippingPercentage * totalPrice) / 100;
    } else {
      return 0;
    }
  };

  const handleCheckout = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/signin?redirect=/shipping");
    }
  };

  return (
    <div className="cart__order-summary">
      <div>
        <p>Number of products:</p>
        <span>{numOfProducts}</span>
      </div>
      <div>
        <p>Shipping:</p>
        <span className="cart__shipping">${shippingPrice().toFixed(2)}</span>
      </div>
      <div>
        <p>Total:</p>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div>
        <p className="total-price">Total Price:</p>
        <span>${(+totalPrice.toFixed(2) + +shippingPrice()).toFixed(2)}</span>
      </div>
      <button
        type="button"
        className="btn btn__proceed mt-large"
        onClick={handleCheckout}
        disabled={productCart.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
