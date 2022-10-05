import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import SingleCartProduct from "../components/SingleCartProduct";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { cartEmpty, saveOrderSummaryInfo } from "../features/cart/cartSlice";
import {
  orderRequest,
  orderSuccess,
  orderFail,
} from "../features/order/orderSlice";
import { orderReset } from "../features/order/orderSlice";
import axios from "axios";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.order);

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const { userInfo } = user;

  const {
    productCart,
    shippingAddress: { fullName, address, city, postalCode, country },
    paymentMethod,
  } = cart;

  const { loading, success, order, error } = orderCreate;

  const createOrder = async (order) => {
    dispatch(orderRequest(order));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/orders", order, config);
      dispatch(orderSuccess(data.order));
      dispatch(cartEmpty());
      localStorage.removeItem("productCart");
    } catch (error) {
      dispatch(
        orderFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

  const placeOrderHandler = () => {
    createOrder({ ...cart, orderProducts: cart.productCart });
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

  useEffect(() => {
    dispatch(
      saveOrderSummaryInfo({
        numOfProducts,
        productsPrice,
        shippingPrice,
        totalPrice,
      })
    );
  }, [dispatch, numOfProducts, productsPrice, shippingPrice, totalPrice]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(orderReset());
    }
  }, [success, order, navigate, dispatch]);

  return (
    <main>
      <section className="form-section form-section--order section">
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
            <div>
              <h3 className="heading__tertiary mb-medium">Order Items</h3>
              <div>
                {productCart.length > 0 &&
                  productCart.map((product) => {
                    return <SingleCartProduct product={product} />;
                  })}
              </div>
            </div>
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
              onClick={() => placeOrderHandler()}
              disabled={productCart.length === 0}
            >
              Place Order
            </button>
          </div>
          {loading && <Loader />}
          {error && <ErrorMessage />}
        </div>
      </section>
    </main>
  );
};

export default PlaceOrderPage;
