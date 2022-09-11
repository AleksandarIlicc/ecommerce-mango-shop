import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleCartProduct from "../components/SingleCartProduct";

const CartPage = () => {
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

  const toPrice = (num) => Number(num.toFixed(2));

  const numOfProducts = toPrice(
    productCart.reduce((acc, product) => {
      return acc + +product.quantity;
    }, 0)
  );

  const productsPrice = toPrice(
    productCart.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0)
  );

  const calcShippingPrice = () => {
    const upperLimitForShipping = 250;
    const shippingPercentage = 20;

    if (productsPrice < upperLimitForShipping) {
      return (shippingPercentage * productsPrice) / 100;
    } else {
      return 0;
    }
  };

  const shippingPrice = toPrice(calcShippingPrice());
  const totalPrice = toPrice(productsPrice + shippingPrice);

  return (
    <main>
      <section className="cart-section section">
        <h2 className="heading__secondary mb-medium">shopping cart</h2>
        <div className="cart__container">
          <div className="cart__list">
            {productCart.length > 0 &&
              productCart.map((product) => {
                return <SingleCartProduct product={product} />;
              })}
            {!productCart.length && <div>There are no items in your bag.</div>}
          </div>
          <div className="order-summary">
            <div>
              <p>Number of products:</p>
              <span>{numOfProducts}</span>
            </div>
            <div>
              <p>Shipping:</p>
              <span className="shipping">${shippingPrice}</span>
            </div>
            <div>
              <p>Products price:</p>
              <span>${productsPrice}</span>
            </div>
            <div>
              <p className="total-price">Total Price:</p>
              <span>${totalPrice}</span>
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
        </div>
      </section>
    </main>
  );
};

export default CartPage;
