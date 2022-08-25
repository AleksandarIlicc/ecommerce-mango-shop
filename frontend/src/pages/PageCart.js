import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleCartProduct from "../components/SingleCartProduct";

const PageCart = () => {
  const navigate = useNavigate();
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

  const handleCheckout = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <section className="cart-section">
      <h2 className="heading__secondary mb-medium">shopping cart</h2>
      <div className="cart__container">
        <div className="cart__left">
          {productCart.length > 0 &&
            productCart.map((product) => {
              return <SingleCartProduct product={product} />;
            })}
          {!productCart.length && <div>There are no items in your bag.</div>}
        </div>
        <div className="cart__right">
          <div>
            <p>Number of products:</p>
            <span>{numOfProducts}</span>
          </div>
          <div>
            <p>Shipping:</p>
            <span className="cart__shipping">
              ${shippingPrice().toFixed(2)}
            </span>
          </div>
          <div>
            <p>Total:</p>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div>
            <p className="total-price">Total Price:</p>
            <span>
              ${(+totalPrice.toFixed(2) + +shippingPrice()).toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            className="btn btn__proceed mt-large"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default PageCart;
