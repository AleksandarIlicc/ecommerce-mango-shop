import React, { useEffect } from "react";
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

const OrderPage = () => {
  const { id: orderID } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

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
    detailsOrder(orderID);
  }, [dispatch, orderID]);

  const {
    orderProducts,
    shippingAddress,
    paymentMethod,
    numOfProducts,
    shippingPrice,
    productsPrice,
    totalPrice,
  } = order;

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
                  <span>Name:</span> {shippingAddress?.fullName}
                </p>
                <p>
                  <span>Address:</span> {shippingAddress?.address},{" "}
                  {shippingAddress?.postalCode} {shippingAddress?.city},{" "}
                  {shippingAddress?.country}
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
                {orderProducts.length > 0 &&
                  orderProducts.map((product) => {
                    return (
                      <SingleCartProduct
                        product={product}
                        productsPrice={productsPrice}
                      />
                    );
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderPage;
