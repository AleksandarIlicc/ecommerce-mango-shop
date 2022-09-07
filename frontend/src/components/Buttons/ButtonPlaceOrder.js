import React from "react";
import { useSelector } from "react-redux";

const ButtonPlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const { productCart } = cart;

  const placeOrderHandler = () => {
    // dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  return (
    <button
      type="button"
      className="btn btn__proceed mt-large"
      onClick={placeOrderHandler}
      disabled={productCart.length === 0}
    >
      Place Order
    </button>
  );
};

export default ButtonPlaceOrder;
