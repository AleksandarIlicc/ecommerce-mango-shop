import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InfoBox from "../info-box/info-box.component";

import {
  productsRequest,
  productsSuccess,
  productsFail,
} from "../../features/products/productsSlice";
import {
  customersError,
  customersRequest,
  customersSuccess,
} from "../../features/customers/customerSlice";

import ProductClient from "../../api/productsApis";
import UserClinent from "../../api/userApis";
import { handleResponse } from "../../utils/helpers";

const DashboardInfoBoxes = () => {
  const productClinet = new ProductClient();
  const userClient = new UserClinent();

  const dispatch = useDispatch();

  const recentOrders = useSelector((state) => state.recentOrders);
  const fetchedProducts = useSelector((state) => state.products);
  const fetchedCustomers = useSelector((state) => state.customers);
  const { orders, message } = recentOrders;
  const { customers, error } = fetchedCustomers;

  const getAllProducts = async () => {
    dispatch(productsRequest());

    const result = await productClinet.getAllProducts();

    if (result) {
      dispatch(productsSuccess(result));
    } else {
      dispatch(productsFail(result));
    }
  };

  const getAllCustomers = async () => {
    dispatch(customersRequest());

    const response = await userClient.getAllCustomers();

    const handledReponse = handleResponse(response);

    if (handledReponse.errorMessage) {
      dispatch(customersError(handledReponse.errorMessage));
    } else {
      dispatch(customersSuccess(handledReponse));
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCustomers();
  }, []);

  const numberOfProducts = fetchedProducts.products
    ? fetchedProducts.products.length
    : 0;

  const earn = orders.reduce(
    (acc, order) => acc + order.costInfo.totalPrice,
    0
  );

  const formattedEarn = earn.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  const allOrders = orders.length;
  const allCustomers = customers.length;

  return (
    <div className="dashboard__header-boxes">
      <InfoBox
        src="/images/icons/investment.png"
        infoType="Earn"
        data={formattedEarn}
      />
      <InfoBox
        src="/images/icons/order.png"
        infoType="Orders"
        data={allOrders}
      />
      <InfoBox
        src="/images/icons/box.png"
        infoType="Products"
        data={numberOfProducts}
      />
      <InfoBox
        src="/images/icons/team.png"
        infoType="Customers"
        data={allCustomers}
      />
    </div>
  );
};

export default React.memo(DashboardInfoBoxes);
