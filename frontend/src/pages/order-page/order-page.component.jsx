import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ShippingInfo from "../../components/shipping-info/shipping-info.component";
import PaymentInfo from "../../components/payment-info/payment-info.component";
import OrderItems from "../../components/order-items/order-items.component";
import OrderSummary from "../../components/order-summary/order-summary.component";
import PaymentGateaway from "../../components/payment-gateaway/payment-gateaway.component";
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

    if (handledResponse?.errorMessage) {
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

    if (handledResponse?.errorMessage) {
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
              <h3 className="heading__tertiary mb-small">Shipping</h3>
              <div className="order__container ">
                <div className="order__list">
                  <ShippingInfo
                    fullName={order.shippingAddress?.fullName}
                    address={order.shippingAddress?.address}
                    city={order.shippingAddress?.city}
                    postalCode={order.shippingAddress?.postalCode}
                    country={order.shippingAddress?.country}
                    isDelivered={order.isDelivered}
                    deliveredAt={order.deliveredAt}
                  />
                  <PaymentInfo
                    paymentMethod={order.paymentMethod}
                    isPaid={order.isPaid}
                    paidAt={order.paidAt}
                  />
                  <OrderItems
                    items={order.products}
                    productsPrice={order.costInfo.productsPrice}
                  />
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
