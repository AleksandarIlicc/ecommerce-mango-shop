import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardInfoBoxes from "../../components/dashboard-info-box/dashboard-info-boxes.component";

import {
  recentOrdersRequest,
  recentOrdersSuccess,
  recentOrdersFail,
  updateIsShipped,
} from "../../features/order/recentOrdersSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { formatDate, handleResponse } from "../../utils/helpers";
import OrderClient from "../../api/ordersApis";

const Dashboard = () => {
  const orderClient = new OrderClient();

  const dispatch = useDispatch();

  const recentOrders = useSelector((state) => state.recentOrders);
  const { orders, message } = recentOrders;

  const getAllOreders = async () => {
    dispatch(recentOrdersRequest());

    const response = await orderClient.getAllOrders();
    const handledResponse = handleResponse(response);

    if (handledResponse.errorMessage) {
      dispatch(recentOrdersFail(handledResponse.errorMessage));
    } else {
      dispatch(recentOrdersSuccess(handledResponse));
    }
  };

  useEffect(() => {
    getAllOreders();
  }, []);

  const handleShippingOrder = async (orderID) => {
    dispatch(recentOrdersRequest());

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await orderClient.shippingOrder(
      orderID,
      {
        isShipped: true,
        shippedDate: formattedDate,
      },
      config
    );
    const handledResponse = handleResponse(response);

    if (handledResponse.errorMessage) {
      dispatch(recentOrdersFail(handledResponse.errorMessage));
    } else {
      dispatch(updateIsShipped(handledResponse));
      toast.success(handledResponse.message);
    }
  };

  return (
    <section className="dashboard">
      <div className="dashboard__container">
        <aside className="dashboard__sidebar">SIDE BAR</aside>

        <div className="dashboard__main">
          <header className="dashboard__header">
            <div className="overlay"></div>
            <DashboardInfoBoxes />
          </header>

          <div className="p-12">
            <h2 className="heading__secondary bg-white p-4 pl-7 mb-6">
              Recent Orders
            </h2>

            <div className="recent-orders-container">
              <div className="recent-order__header p-4 pl-8 mb-6">
                <div>Date</div>
                <div>Customer</div>
                <div>Product</div>
                <div>Details</div>
                <div>Price</div>
                <div>Shipping Cost</div>
                <div>Active</div>
              </div>

              {orders.length > 0 ? (
                orders.map((order) => {
                  const firstOrderItemFromCart =
                    order.products.length > 0 && order.products[0];

                  return (
                    <div className="recent-order p-4 pl-8 mb-6">
                      <div className="text-[1.3rem]">
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="">{order.shippingAddress.fullName}</div>

                      <div className="flex items-center gap-[1rem]">
                        <figure className="recent-order__img bg-white">
                          <img
                            src={firstOrderItemFromCart?.image}
                            alt="Product"
                          />
                        </figure>
                        <span>
                          {order.products.length > 1 &&
                            `+${order.products.length - 1}`}
                        </span>
                      </div>

                      <div>{firstOrderItemFromCart?.name}</div>
                      <div>${firstOrderItemFromCart?.price}</div>
                      <div>
                        $
                        {order.costInfo.shippingPrice === 0
                          ? "Free"
                          : order.costInfo.shippingPrice}
                      </div>

                      <button
                        className={
                          order.isPaid && !order.isShipped && !order.isDelivered
                            ? "recent-order__active-status recent-order__active-status--pending"
                            : order.isPaid &&
                              order.isShipped &&
                              !order.isDelivered
                            ? "recent-order__active-status recent-order__active-status--shipped"
                            : order.isPaid &&
                              order.isShipped &&
                              order.isDelivered
                            ? "recent-order__active-status recent-order__active-status--delivered"
                            : "recent-order__active-status"
                        }
                        disabled={
                          order.isPaid && order.isShipped && order.isDelivered
                        }
                        onClick={() => handleShippingOrder(order._id)}
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
                  );
                })
              ) : (
                <p className="no-orders-message">No orders available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Dashboard;
