import { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  recentOrdersRequest,
  recentOrdersFail,
  updateIsShipped,
} from "../../features/order/recentOrdersSlice";

import { formatDate, handleResponse } from "../../utils/helpers";

import OrderClient from "../../api/ordersApis";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./single-recent-order.style.scss";

const SingleRecentOrder = ({ order }) => {
  const dispatch = useDispatch();
  const orderClient = new OrderClient();

  const formattedDate = useMemo(
    () => formatDate(order.createdAt),
    [order.createdAt]
  );

  const firstOrderItemFromCart = useMemo(
    () => order.products.length > 0 && order.products[0],
    [order.products]
  );

  const handleShippingOrder = useCallback(
    async (orderID) => {
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
    },
    [dispatch, orderClient]
  );

  return (
    <>
      <div className="single-recent-order p-4 pl-8 mb-6">
        <div className="text-[1.3rem]">{formattedDate}</div>
        <div className="">{order.shippingAddress.fullName}</div>

        <div className="flex items-center gap-[1rem]">
          <figure className="single-recent-order__img bg-white">
            <img src={firstOrderItemFromCart?.image} alt="Product" />
          </figure>
          <span>
            {order.products.length > 1 && `+${order.products.length - 1}`}
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
              ? "single-recent-order__active-status single-recent-order__active-status--pending"
              : order.isPaid && order.isShipped && !order.isDelivered
              ? "single-recent-order__active-status single-recent-order__active-status--shipped"
              : order.isPaid && order.isShipped && order.isDelivered
              ? "single-recent-order__active-status single-recent-order__active-status--delivered"
              : "single-recent-order__active-status"
          }
          disabled={order.isPaid && order.isShipped && order.isDelivered}
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

      <ToastContainer />
    </>
  );
};

export default SingleRecentOrder;
