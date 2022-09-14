import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SingleCartProduct from "../components/SingleCartProduct";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} from "../features/order/orderDetailsSlice";
import axios from "axios";
import {
  payOrderRequest,
  payOrderFail,
  payOrderSuccess,
  payOrderReset,
} from "../features/order/payOrderSlice";

const OrderPage = () => {
  const { id: orderID } = useParams();
  const [sdkReady, setSdkReady] = useState();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const orderPay = useSelector((state) => state.payOrder);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  useEffect(() => {
    const detailsOrder = async (orderID) => {
      dispatch(orderDetailsRequest(orderID));
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.get(`/api/orders/${orderID}`, config);
        dispatch(orderDetailsSuccess(data));
      } catch (error) {
        dispatch(
          orderDetailsFail(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      }
    };

    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || (order && order._id !== orderID)) {
      dispatch(payOrderReset());
      detailsOrder(orderID);
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderID, sdkReady, successPay, order]);

  const payOrder = async (order, paymentResult) => {
    dispatch(payOrderRequest(order, paymentResult));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        config
      );
      dispatch(payOrderSuccess(data));
    } catch (err) {
      dispatch(
        payOrderFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

  const successPaymentHandler = async (paymentResult) => {
    payOrder(order, paymentResult);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorMessage error={error} />
  ) : (
    <main>
      <section className="form-section section">
        <div className="order__container">
          <div className="order__list">
            <div className="order__box">
              <h3 className="heading__tertiary mb-medium">Shipping</h3>
              <div>
                <p>
                  <span>Name:</span> {order.shippingAddress?.fullName}
                </p>
                <p>
                  <span>Address:</span> {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.postalCode}{" "}
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.country}
                </p>
              </div>
              {order.isDelivered ? (
                <p className="alert alert--success">
                  Delivered at {order.deliveredAt}
                </p>
              ) : (
                <p className="alert alert--danger">Not delivered</p>
              )}
            </div>
            <div className="order__box">
              <h3 className="heading__tertiary mb-medium">Paymnet</h3>
              <div>
                <p>
                  <span>Method:</span> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <p className="alert alert--success">Paid at {order.paidAt}</p>
                ) : (
                  <p className="alert alert--danger">Not paid</p>
                )}
              </div>
            </div>
            <div className="order__box">
              <h3 className="heading__tertiary mb-medium">Order Items</h3>
              <div>
                {order.orderProducts.length > 0 &&
                  order.orderProducts.map((product) => {
                    return (
                      <SingleCartProduct
                        product={product}
                        productsPrice={order.productsPrice}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="order-summary">
            <div>
              <p>Number of products:</p>
              <span>{order.numOfProducts}</span>
            </div>
            <div>
              <p>Shipping:</p>
              <span className="shipping">${order.shippingPrice}</span>
            </div>
            <div>
              <p>Products price:</p>
              <span>${order.productsPrice}</span>
            </div>
            <div className="mb-medium">
              <p className="total-price">Total Price:</p>
              <span>${order.totalPrice}</span>
            </div>
            {!order.isPaid && (
              <div>
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <>
                    {errorPay && <ErrorMessage error={errorPay} />}
                    {loadingPay && <Loader />}
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderPage;
