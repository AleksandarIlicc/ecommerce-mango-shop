import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ButtonProceedToCheckout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { productCart } = cart;
  const userSignin = useSelector((state) => state.user);
  const { userInfo } = userSignin;

  const handleCheckout = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/signin?redirect=/shipping");
    }
  };

  return (
    <button
      type="button"
      className="btn btn__proceed mt-large"
      onClick={handleCheckout}
      disabled={productCart.length === 0}
    >
      Proceed to Checkout
    </button>
  );
};

export default ButtonProceedToCheckout;
