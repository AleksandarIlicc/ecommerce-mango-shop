import React from "react";
import { useSelector } from "react-redux";
import SingleCartProduct from "../components/SingleCartProduct";
import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const { productCart } = cart;

  return (
    <section className="cart-section">
      <h2 className="heading__secondary mb-medium">shopping cart</h2>
      <div className="cart__container">
        <div className="cart__list">
          {productCart.length > 0 &&
            productCart.map((product) => {
              return <SingleCartProduct product={product} />;
            })}
          {!productCart.length && <div>There are no items in your bag.</div>}
        </div>
        <OrderSummary />
      </div>
    </section>
  );
};

export default CartPage;
