import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "../../components/checkout-steps/checkout-steps.component";
import ShippingInfo from "../../components/shipping-info/shipping-info.component";
import PaymentInfo from "../../components/payment-info/payment-info.component";
import OrderItems from "../../components/order-items/order-items.component";
import OrderSummary from "../../components/order-summary/order-summary.component";

import { cartEmpty, saveOrderSummaryInfo } from "../../features/cart/cartSlice";
import {
  orderRequest,
  orderSuccess,
  orderFail,
  orderReset,
} from "../../features/order/orderSlice";

import OrderClient from "../../api/ordersApis";
import { handleResponse } from "../../utils/helpers";

const PlaceOrderPage = () => {
  const orederClient = new OrderClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart);

  const { cartItems, shippingAddress, paymentMethod } = cart;
  const { success, order } = orderCreate;

  if (!paymentMethod) {
    navigate("/payment");
  }

  const createOrder = async (order) => {
    dispatch(orderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await orederClient.createOrder(order, config);
    const handledResponse = handleResponse(response);

    if (handledResponse?.errorMessage) {
      dispatch(orderFail(handledResponse.errorMessage));
    } else {
      dispatch(orderSuccess(handledResponse));
      dispatch(cartEmpty());
      localStorage.removeItem("cartItems");
    }
  };

  const placeOrderHandler = () => createOrder(cart);

  const toPrice = (num) => Number(num.toFixed(2));

  const productsQuantity = toPrice(
    cartItems.reduce((acc, product) => {
      return acc + parseInt(product.quantity);
    }, 0)
  );

  const productsPrice = toPrice(
    cartItems.reduce((acc, product) => {
      return acc + parseInt(product.quantity) * product.price;
    }, 0)
  );

  const calcShippingPrice = () => {
    const upperLimitForShipping = 250;
    const shippingPercentage = 20;
    const freeShippingThreshold = 0;

    return productsPrice < upperLimitForShipping
      ? (shippingPercentage * productsPrice) / 100
      : freeShippingThreshold;
  };

  const shippingPrice = toPrice(calcShippingPrice());
  const totalPrice = toPrice(productsPrice + shippingPrice);

  useEffect(() => {
    dispatch(
      saveOrderSummaryInfo({
        productsQuantity,
        productsPrice,
        shippingPrice,
        totalPrice,
      })
    );
  }, [dispatch, productsQuantity, productsPrice, shippingPrice, totalPrice]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(orderReset());
    }
  }, [success, order, navigate, dispatch]);

  return (
    <main>
      <section className="form-section form-section--order section">
        <div className="container">
          <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />

          <h3 className="heading__tertiary mb-medium">Shipping</h3>
          <div className="order__container">
            <div className="order__list">
              <ShippingInfo {...shippingAddress} />
              <PaymentInfo paymentMethod={paymentMethod} />
              <OrderItems items={cartItems} />
            </div>

            <OrderSummary
              numOfProducts={productsQuantity}
              shippingPrice={shippingPrice}
              productsPrice={productsPrice}
              totalPrice={totalPrice}
              cartItems={cartItems}
              onClick={placeOrderHandler}
              textBtn={paymentMethod}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlaceOrderPage;
