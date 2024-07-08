import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import SingleCartProduct from "../../components/single-cart-product/single-cart-product.component";
import PaymentGateaway from "../../components/payment-gateaway/payment-gateaway.component";
import OrderSummary from "../../components/order-summary/order-summary.component";
import Loader from "../../components/loader/loader.component";
import ErrorMessage from "../../components/error-message/error-message.component";

import {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  updateIsPaid,
} from "../../features/order/orderDetailsSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OrderClient from "../../api/ordersApis";
import { handleResponse } from "../../utils/helpers";

const OrderPage = () => {
  const orderClient = new OrderClient();

  const dispatch = useDispatch();
  const { id: orderID } = useParams();

  const orderSlice = useSelector((state) => state.order);
  const orderDetails = useSelector((state) => state.orderDetails);

  const { message } = orderSlice;
  const { loading, order, error } = orderDetails;

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  const detailsOrder = async () => {
    dispatch(orderDetailsRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await orderClient.getSingleOrder(orderID, config);
    const handledResponse = handleResponse(response);

    if (handledResponse.errorMessage) {
      dispatch(orderDetailsFail(handledResponse.errorMessage));
    } else {
      dispatch(orderDetailsSuccess(handledResponse));
    }
  };

  useEffect(() => {
    detailsOrder();
  }, []);

  const payOrder = async (e) => {
    e.preventDefault();

    dispatch(orderDetailsRequest());

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await orderClient.payOrder(
      order._id,
      { paymentDate: formattedDate, isPaid: true },
      config
    );
    const handledResponse = handleResponse(response);

    if (handledResponse.errorMessage) {
      dispatch(orderDetailsFail(handledResponse.errorMessage));
    } else {
      dispatch(updateIsPaid(handledResponse.order));
      toast.success(handledResponse.message);
    }
  };

  return (
    <main>
      <section className="form-section form-section--order section">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          order && (
            <div className="container">
              <h2 className="heading__secondary mb-small">Shipping</h2>
              <div className="order__container ">
                <div className="order__list">
                  <div className="order__box">
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
                    </div>
                    {order.isPaid ? (
                      <p className="alert alert--success">
                        Paid at {order.paidAt}
                      </p>
                    ) : (
                      <p className="alert alert--danger">Not paid</p>
                    )}
                  </div>

                  <div>
                    <h3 className="heading__tertiary mb-medium">Order Items</h3>

                    <div className="flex flex-col gap-[2rem]">
                      {order?.products?.length > 0 &&
                        order?.products?.map((product) => {
                          return (
                            <SingleCartProduct
                              product={product}
                              productsPrice={order.costInfo.productsPrice}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="order-summary-section">
                  <OrderSummary
                    numOfProducts={order.costInfo.productsQuantity}
                    shippingPrice={order.costInfo.shippingPrice}
                    productsPrice={order.costInfo.productsPrice}
                    totalPrice={order.costInfo.totalPrice}
                  />

                  <PaymentGateaway order={order} payOrder={payOrder} />
                </div>
              </div>
            </div>
          )
        )}
        <ToastContainer />
      </section>
    </main>
  );
};

export default OrderPage;
