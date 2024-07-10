import { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SingleOrderHistory from "../../components/single-order-history/single-order-history.component";
import PackageStatus from "../../components/package-status/package-status.component";
import ErrorMessage from "../../components/error-message/error-message.component";

import {
  deliverOrder,
  fetchUserOrders,
} from "../../features/order/order-history-slice/orderHistoryThunks";
import { resetMessage } from "../../features/order/order-history-slice/orderHistorySlice";
import { formatDate } from "../../utils/helpers";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BUTTON_CLASS = {
  PENDING:
    "single-recent-order__active-status single-recent-order__active-status--pending",
  SHIPPED:
    "single-recent-order__active-status single-recent-order__active-status--shipped",
  DELIVERED:
    "single-recent-order__active-status single-recent-order__active-status--delivered",
  DEFAULT: "single-recent-order__active-status",
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderHistory = useSelector((state) => state.orderHistory);
  const user = useSelector((state) => state.user);

  const { orders, message, error } = orderHistory;
  const { name: userName } = user?.userInfo || "";

  useEffect(() => {
    if (!user.userInfo) {
      navigate("/");
    }
  }, [user.userInfo, navigate]);

  useEffect(() => {
    if (user.userInfo) {
      dispatch(fetchUserOrders(user.userInfo._id));
    }
  }, [dispatch, user.userInfo]);

  const handleDeliverOrder = useCallback(
    (orderID) => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      dispatch(deliverOrder({ orderID, formattedDate }));
    },
    [dispatch, deliverOrder]
  );

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetMessage());
    }
  }, [message, dispatch]);

  const getOrderButtonClass = useCallback((order) => {
    if (order.isDelivered) {
      return BUTTON_CLASS.DELIVERED;
    } else if (order.isShipped) {
      return BUTTON_CLASS.SHIPPED;
    } else if (order.isPaid) {
      return BUTTON_CLASS.PENDING;
    } else {
      return BUTTON_CLASS.DEFAULT;
    }
  }, []);

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
                          {formatDate(order.createdAt)}
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

                      <PackageStatus
                        order={order}
                        getOrderButtonClass={getOrderButtonClass}
                        handleDeliverOrder={handleDeliverOrder}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <ErrorMessage error={error} />
            )}
          </div>
        </div>

        <ToastContainer />
      </section>
    </main>
  );
};

export default OrderHistory;
