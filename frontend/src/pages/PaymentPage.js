import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../features/cart/cartSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const { userInfo } = user;

  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <main>
      <section className="form-section">
        {userInfo && <CheckoutSteps step1={true} step2={true} step3={true} />}
        <div className="form-box">
          <div className="form-box__left">
            <div className="form-box__logo">
              <span>Mango</span>Shop
            </div>
          </div>
          <div className="form-box__right">
            <form className="form" onSubmit={handleSubmit}>
              <div>
                <h1 style={{ color: "black" }} className="heading__primary">
                  Payment Method
                </h1>
              </div>
              <div className="form__radio-input">
                <div>
                  <label htmlFor="paypal">PayPal</label>
                  <input
                    type="radio"
                    id="paypal"
                    value="PayPal"
                    name="paymentMethod"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
                <div>
                  <img
                    src="https://img.icons8.com/fluency/48/000000/paypal.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="form__radio-input mb-medium">
                <div>
                  <label htmlFor="stripe">Stripe</label>
                  <input
                    type="radio"
                    id="stripe"
                    value="Stripe"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
                <div>
                  <img
                    src="https://img.icons8.com/fluency/48/000000/stripe.png"
                    alt=""
                  />
                </div>
              </div>
              <button className="btn btn__form" type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentPage;
