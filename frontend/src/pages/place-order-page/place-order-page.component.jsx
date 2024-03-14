import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "../../components/checkout-steps/checkout-steps.component";
import SingleCartProduct from "../../components/single-cart-product/single-cart-product.component";
import OrderSummary from "../../components/order-summary/order-summary.component";
import Loader from "../../components/loader/loader.component";
import ErrorMessage from "../../components/error-message/error-message.component";

import { cartEmpty, saveOrderSummaryInfo } from "../../features/cart/cartSlice";
import {
  orderRequest,
  orderSuccess,
  orderFail,
  orderReset,
} from "../../features/order/orderSlice";

import OrderClient from "../../api/ordersApis";
import { handleResponse } from "../../utils/helpers";

import "./place-order-page.style.scss";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.order);

  const orederClient = new OrderClient();

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const { userInfo } = user;

  const {
    cartItems,
    shippingAddress: { fullName, address, city, postalCode, country },
    paymentMethod,
  } = cart;

  const { loading, success, order, error } = orderCreate;

  const createOrder = async (order) => {
    dispatch(orderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await orederClient.createOrder(order, config);
    const handledResponse = handleResponse(response);

    if (handledResponse.errorMessage) {
      dispatch(orderFail(handledResponse.errorMessage));
    } else {
      dispatch(orderSuccess(handledResponse));
      dispatch(cartEmpty());
      localStorage.removeItem("cartItems");
    }
  };

  const placeOrderHandler = () => {
    createOrder(cart);
  };

  const toPrice = (num) => Number(num.toFixed(2));

  const productsQuantity = toPrice(
    cartItems.reduce((acc, product) => {
      return acc + +product.quantity;
    }, 0)
  );

  const productsPrice = toPrice(
    cartItems.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0)
  );

  const calcShippingPrice = () => {
    const upperLimitForShipping = 250;
    const shippingPercentage = 20;
    const freeShippingThreshold = 0;

    if (productsPrice < upperLimitForShipping) {
      return (shippingPercentage * productsPrice) / 100;
    } else {
      return freeShippingThreshold;
    }
  };

  const shippingPrice = toPrice(calcShippingPrice());
  const totalPrice = toPrice(productsPrice + shippingPrice);

  useEffect(() => {
    dispatch(
      saveOrderSummaryInfo({
        productsQuantity,
        productsPrice,
        shippingPrice,
        totalPrice,
      })
    );
  }, [dispatch, productsQuantity, productsPrice, shippingPrice, totalPrice]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(orderReset());
    }
  }, [success, order, navigate, dispatch]);

  return (
    <main>
      <section className="form-section form-section--order section">
        <div className="container">
          {userInfo && (
            <CheckoutSteps
              step1={true}
              step2={true}
              step3={true}
              step4={true}
            />
          )}
          <h3 className="heading__tertiary mb-medium">Shipping</h3>
          <div className="order__container">
            <div className="order__list">
              <div className="order__box">
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
                <h3 className="heading__tertiary mb-medium">Payment</h3>
                <div>
                  <p>
                    <span>Method:</span> {paymentMethod}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="heading__tertiary mb-medium">Order Items</h3>

                <div className="flex flex-col gap-[2rem]">
                  {cartItems.length > 0 &&
                    cartItems.map((product) => (
                      <SingleCartProduct key={product._id} product={product} />
                    ))}
                </div>
              </div>
            </div>

            <OrderSummary
              numOfProducts={productsQuantity}
              shippingPrice={shippingPrice}
              productsPrice={productsPrice}
              totalPrice={totalPrice}
              cartItems={cartItems}
              onClick={placeOrderHandler}
              textBtn={paymentMethod}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlaceOrderPage;
