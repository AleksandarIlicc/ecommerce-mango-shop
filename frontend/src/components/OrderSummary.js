import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ButtonPlaceOrder from "./Buttons/ButtonPlaceOrder";
import ButtonProceedToCheckout from "./Buttons/ButtonProceedToCheckout";

const OrderSummary = () => {
  const pathName = useLocation().pathname;
  const cart = useSelector((state) => state.cart);
  const { productCart } = cart;

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

  return (
    <div className="order-summary">
      <div>
        <p>Number of products:</p>
        <span>{numOfProducts}</span>
      </div>
      <div>
        <p>Shipping:</p>
        <span className="shipping">${shippingPrice().toFixed(2)}</span>
      </div>
      <div>
        <p>Total:</p>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div>
        <p className="total-price">Total Price:</p>
        <span>${(+totalPrice.toFixed(2) + +shippingPrice()).toFixed(2)}</span>
      </div>
      {(pathName === "/cart" && <ButtonProceedToCheckout />) ||
        (pathName === "/placeorder" && <ButtonPlaceOrder />)}
    </div>
  );
};

export default OrderSummary;
