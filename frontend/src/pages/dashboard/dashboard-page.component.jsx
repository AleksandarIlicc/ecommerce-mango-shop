import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardInfoBoxes from "../../components/dashboard-info-box/dashboard-info-boxes.component";
import DashboardSidebar from "../../components/dashboard-sidebar/dashboard-sidebar.component";
import SingleRecentOrder from "../../components/single-recent-order/single-recent-order.component";
import Loader from "../../components/loader/loader.component";
import ErrorMessage from "../../components/error-message/error-message.component";

import {
  recentOrdersRequest,
  recentOrdersSuccess,
  recentOrdersFail,
} from "../../features/order/recentOrdersSlice";

import { handleResponse } from "../../utils/helpers";
import OrderClient from "../../api/ordersApis";

import "./dashboard-page.style.scss";

const Dashboard = () => {
  const orderClient = new OrderClient();

  const dispatch = useDispatch();

  const recentOrders = useSelector((state) => state.recentOrders);
  const { orders, loading } = recentOrders;

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

  return (
    <section className="dashboard">
      <div className="dashboard__container">
        <DashboardSidebar />

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

              {loading ? (
                <Loader />
              ) : orders.length > 0 ? (
                orders.map((order) => {
                  return <SingleRecentOrder key={order._id} order={order} />;
                })
              ) : (
                <p className="no-orders-message">No orders available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
