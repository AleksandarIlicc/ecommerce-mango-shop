import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/checkout-steps/checkout-steps.component";
import { savePaymentMethod } from "../../features/cart/cartSlice";
import Form from "../../components/form/form.component";

const fields = [
  {
    htmlFor: "paypal",
    label: "PayPal",
    type: "radio",
    id: "paypal",
    name: "paymentMethod",
    imgSrc: "https://img.icons8.com/fluency/48/000000/paypal.png",
    required: true,
  },
  {
    htmlFor: "stripe",
    label: "Stripe",
    type: "radio",
    id: "stripe",
    name: "paymentMethod",
    imgSrc: "https://img.icons8.com/fluency/48/000000/stripe.png",
    required: true,
  },
];

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const { userInfo } = user;
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const [formData, setFormData] = useState({
    paymentMethod: "",
  });

  const handleFormData = (e) => {
    setFormData({ paymentMethod: e.target.id });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(formData.paymentMethod));
    navigate("/placeorder");
  };

  return (
    <main>
      <section className="form-section">
        {userInfo && <CheckoutSteps step1={true} step2={true} step3={true} />}

        <Form
          onSubmit={onSubmit}
          handleFormData={handleFormData}
          formData={formData}
          formTitle="Payment Method"
          formSubtitle=""
          page=""
          redirect=""
          textLink=""
          fields={fields}
        />
      </section>
    </main>
  );
};

export default PaymentPage;
