import { useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SingleOrderHistory from "../../components/single-order-history/single-order-history.component";

import {
  orderHistoryFail,
  orderHistoryRequest,
  orderHistorySuccess,
  updateIsDelivered,
} from "../../features/order/orderHistorySlice";

import { formatDate } from "../../utils/helpers";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const BUTTON_CLASS_PENDING =
  "recent-order__active-status recent-order__active-status--pending";
const BUTTON_CLASS_SHIPPED =
  "recent-order__active-status recent-order__active-status--shipped";
const BUTTON_CLASS_DELIVERED =
  "recent-order__active-status recent-order__active-status--delivered";
const BUTTON_CLASS_DEFAULT = "recent-order__active-status";

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderHistory = useSelector((state) => state.orderHistory);
  const user = useSelector((state) => state.user);

  const { orders, message } = orderHistory;
  const { name: userName } = user?.userInfo || "";

  useEffect(() => {
    if (!user.userInfo) {
      navigate("/");
    }
  }, [user]);

  const formatDate = useMemo(
    () => (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    },
    []
  );

  const currentUserOrders = async () => {
    const userID = user?.userInfo._id;

    dispatch(orderHistoryRequest());

    try {
      const { data } = await axios.get(`/api/orders/user/${userID}`);

      dispatch(orderHistorySuccess(data));
    } catch (error) {
      dispatch(orderHistoryFail(error.message));
    }
  };

  useEffect(() => {
    currentUserOrders();
  }, [user.userInfo]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  const deliverOrder = async (orderID) => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderID}/delivery`,
        { isDelivered: true, deliveredDate: formattedDate },
        config
      );

      dispatch(updateIsDelivered(data));
      toast.success(data.message);
    } catch (error) {
      dispatch(orderHistoryFail(error.message));
    }
  };

  const handleDeliverOrder = useCallback(
    (orderID) => {
      dispatch(orderHistoryRequest());
      deliverOrder(orderID);
    },
    [dispatch, deliverOrder]
  );

  return (
    <main>
      <section className="section">
        <div className="container">
          <h3 className="heading__tertiary mb-8">Hello, {userName}</h3>

          <div className="history-orders">
            {user.userInfo && orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <div key={order._id} className="mb-6">
                    <div className="bg-[#f1f5f9] p-6">
                      <div className="flex gap-[2rem]">
                        <h4 className="font-bold">Order ID: {order._id}</h4>
                        <span className="text-lg text-[#94a3b8] self-center">
                          {formatDate(order.paidAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-[2rem]">
                      <ul className="flex-1">
                        {order.products.map((product) => {
                          return (
                            <SingleOrderHistory
                              key={product._id}
                              order={order}
                              product={product}
                            />
                          );
                        })}
                      </ul>

                      <div className="flex-1 pt-[1rem]">
                        <h3 className="heading__tertiary mb-4">
                          Shipping Info
                        </h3>

                        <div className="order__shipping">
                          <p>{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city}</p>
                          <p>{order.shippingAddress.postalCode}</p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>

                      <div className="flex-1 pt-[1rem]">
                        <h3 className="heading__tertiary mb-4">
                          Package Status
                        </h3>

                        <div className="order__statuses flex mb-8">
                          <div className="order__status-box">
                            <h4>Confirmed</h4>
                            <div
                              className={
                                order.isPaid
                                  ? "order__status order__status--active"
                                  : "order__status"
                              }
                            ></div>
                          </div>
                          <div className="order__status-box">
                            <h4>Shipped</h4>
                            <div
                              className={
                                order.isShipped
                                  ? "order__status order__status--active"
                                  : "order__status"
                              }
                            ></div>
                          </div>
                          <div className="order__status-box">
                            <h4>Delivered</h4>
                            <div
                              className={
                                order.isDelivered
                                  ? "order__status order__status--active"
                                  : "order__status"
                              }
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <button
                            className={
                              order.isPaid && !order.isShipped
                                ? BUTTON_CLASS_PENDING
                                : order.isPaid &&
                                  order.isShipped &&
                                  !order.isDelivered
                                ? BUTTON_CLASS_SHIPPED
                                : order.isPaid &&
                                  order.isShipped &&
                                  order.isDelivered
                                ? BUTTON_CLASS_DELIVERED
                                : BUTTON_CLASS_DEFAULT
                            }
                            disabled={order.isPaid && !order.isShipped}
                            onClick={() => handleDeliverOrder(order._id)}
                          >
                            {order.isDelivered
                              ? "Delivered"
                              : order.isShipped
                              ? "Shipped"
                              : order.isPaid
                              ? "Pending"
                              : "Unknown Status"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No orders found for the user.</p>
            )}
          </div>
        </div>

        <ToastContainer />
      </section>
    </main>
  );
};

export default OrderHistory;
