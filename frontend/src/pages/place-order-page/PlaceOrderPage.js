import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";
import SingleCartProduct from "../../components/SingleCartProduct";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { cartEmpty, saveOrderSummaryInfo } from "../../features/cart/cartSlice";
import {
  orderRequest,
  orderSuccess,
  orderFail,
  orderReset,
} from "../../features/order/orderSlice";

import useRazorpay from "react-razorpay";
import axios from "axios";

const PlaceOrderPage = () => {
  const [book, setBook] = useState({
    name: "The Fault In Our Stars",
    author: "John Green",
    img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
    price: 250,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.order);

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const { userInfo } = user;

  const {
    productCart,
    shippingAddress: { fullName, address, city, postalCode, country },
    paymentMethod,
  } = cart;

  const { loading, success, order, error } = orderCreate;

  // const createOrder = async (order) => {
  //   dispatch(orderRequest());
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     const { data } = await axios.post("/api/orders", order, config);
  //     dispatch(orderSuccess(data.order));
  //     dispatch(cartEmpty());
  //     localStorage.removeItem("productCart");
  //   } catch (error) {
  //     dispatch(
  //       orderFail(
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message
  //       )
  //     );
  //   }
  // };

  // const placeOrderHandler = () => {
  //   createOrder({ ...cart, orderProducts: cart.productCart });
  // };

  // const loadRazorpay = (amount, currency) => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";

  //   script.onerror = () => {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //   };

  //   script.onload = async () => {
  //     try {
  //       const result = await axios.post("/create-order", {
  //         amount: amount,
  //         currency: currency,
  //       });
  //       const { amount, id: order_id, currency } = result.data;
  //       const {
  //         data: { key: razorpayKey },
  //       } = await axios.get("/get-razorpay-key");

  //       const options = {
  //         key: razorpayKey,
  //         amount: amount.toString(),
  //         currency: currency,
  //         name: "example name",
  //         description: "example transaction",
  //         order_id: order_id,
  //         handler: async function (response) {
  //           const result = await axios.post("/pay-order", {
  //             amount: amount,
  //             razorpayPaymentId: response.razorpay_payment_id,
  //             razorpayOrderId: response.razorpay_order_id,
  //             razorpaySignature: response.razorpay_signature,
  //           });
  //           alert(result.data.msg);
  //         },
  //         prefill: {
  //           name: "example name",
  //           email: "email@example.com",
  //           contact: "111111",
  //         },
  //         notes: {
  //           address: "example address",
  //         },
  //         theme: {
  //           color: "#80c0f0",
  //         },
  //       };

  //       const paymentObject = new window.Razorpay(options);
  //       paymentObject.open();
  //     } catch (err) {
  //       alert(err);
  //     }
  //   };
  //   document.body.appendChild(script);
  // };

  // const createOrder = async () => {
  //   try {
  //     const result = await axios.post("/create-order", {
  //       amount: 100,
  //       currency: "USD",
  //     });
  //     console.log("DATA:", result);

  //     const { amount, id: order_id, currency } = result.data;

  //     setOrderId(order_id);
  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //   }
  // };

  const initPayment = (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post("/api/orders/verify", response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/api/orders", { amount: book.price });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleCreateOrderClick = () => {
  //   createOrder();
  // };

  const toPrice = (num) => Number(num.toFixed(2));

  const numOfProducts = toPrice(
    productCart.reduce((acc, product) => {
      return acc + +product.quantity;
    }, 0)
  );

  const productsPrice = toPrice(
    productCart.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0)
  );

  const calcShippingPrice = () => {
    const upperLimitForShipping = 250;
    const shippingPercentage = 20;

    if (productsPrice < upperLimitForShipping) {
      return (shippingPercentage * productsPrice) / 100;
    } else {
      return 0;
    }
  };

  const shippingPrice = toPrice(calcShippingPrice());
  const totalPrice = toPrice(productsPrice + shippingPrice);

  useEffect(() => {
    dispatch(
      saveOrderSummaryInfo({
        numOfProducts,
        productsPrice,
        shippingPrice,
        totalPrice,
      })
    );
  }, [dispatch, numOfProducts, productsPrice, shippingPrice, totalPrice]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(orderReset());
    }
  }, [success, order, navigate, dispatch]);

  return (
    <main>
      <section className="form-section form-section--order section">
        {userInfo && (
          <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
        )}
        <div className="order__container">
          <div className="order__list">
            <div className="order__box">
              <h3 className="heading__tertiary mb-medium">Shipping</h3>
              <div>
                <p>
                  <span>Name:</span> {fullName}
                </p>
                <p>
                  <span>Address:</span> {address}, {postalCode} {city},{" "}
                  {country}
                </p>
              </div>
            </div>
            <div className="order__box">
              <h3 className="heading__tertiary mb-medium">Payment</h3>
              <div>
                <p>
                  <span>Method:</span> {paymentMethod}
                </p>
              </div>
            </div>
            <div>
              <h3 className="heading__tertiary mb-medium">Order Items</h3>
              <div>
                {productCart.length > 0 &&
                  productCart.map((product) => (
                    <SingleCartProduct key={product._id} product={product} />
                  ))}
              </div>
            </div>
          </div>
          <div className="order-summary">
            <div>
              <p>Number of products:</p>
              <span>{numOfProducts}</span>
            </div>
            <div>
              <p>Shipping:</p>
              <span className="shipping">${shippingPrice}</span>
            </div>
            <div>
              <p>Products price:</p>
              <span>${productsPrice}</span>
            </div>
            <div>
              <p className="total-price">Total Price:</p>
              <span>${totalPrice}</span>
            </div>
            <button
              type="button"
              className="btn btn__proceed mt-large"
              onClick={handlePayment}
              disabled={productCart.length === 0}
            >
              Razorpay
            </button>
          </div>

          {loading && <Loader />}
          {error && <ErrorMessage />}
        </div>
      </section>
    </main>
  );
};

export default PlaceOrderPage;
