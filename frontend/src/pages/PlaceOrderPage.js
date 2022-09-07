import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import OrderSummary from "../components/OrderSummary";

const PlaceOrderPage = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const { userInfo } = user;
  const {
    productCart,
    shippingAddress: { fullName, address, city, postalCode, country },
    paymentMethod,
  } = cart;

  return (
    <main>
      <section className="form-section section">
        {userInfo && (
          <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
        )}
        <div className="order__container">
          <div className="order__list">
            <div className="order__box">
              <h3 className="heading__tertiary mb-medium">Shipping</h3>
              <div>
                <p>
                  <span>Name:</span> {fullName}
                </p>
                <p>
                  <span>Address:</span> {address}, {postalCode} {city},{" "}
                  {country}
                </p>
              </div>
            </div>
            <div className="order__box">
              <h3 className="heading__tertiary mb-medium">Paymnet</h3>
              <div>
                <p>
                  <span>Method:</span> {paymentMethod}
                </p>
              </div>
            </div>
            <div className="order__box">
              <h3 className="heading__tertiary mb-medium">Order Items</h3>
              <div>
                {productCart.map((product) => (
                  <div className="order-product">
                    <figure className="order-product__img">
                      <img src={product.image} alt="" />
                    </figure>
                    <p className="order-product__name">{product.name}</p>
                    <p>
                      {product.quantity}x{product.price}= $
                      <span className="order-product__total-price">
                        {(product.quantity * product.price).toFixed(2)}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <OrderSummary />
        </div>
      </section>
    </main>
  );
};

export default PlaceOrderPage;
