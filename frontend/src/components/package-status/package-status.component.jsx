import React from "react";

const PackageStatus = React.memo(
  ({ order, getOrderButtonClass, handleDeliverOrder }) => {
    return (
      <div className="flex-1 pt-[1rem]">
        <h3 className="heading__tertiary mb-4">Package Status</h3>

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
            className={getOrderButtonClass(order)}
            disabled={order.isPaid && (!order.isShipped || order.isDelivered)}
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
    );
  }
);

export default PackageStatus;
