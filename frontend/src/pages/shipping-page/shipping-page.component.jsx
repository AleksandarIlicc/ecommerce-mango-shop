import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "../../components/checkout-steps/checkout-steps.component";
import Form from "../../components/form/form.component";

import { saveShippingAddress } from "../../features/cart/cartSlice";

const fields = [
  {
    label: "Full Name",
    type: "text",
    id: "fullName",
    name: "fullName",
    placeholder: "Enter full name",
    required: true,
  },
  {
    label: "Address",
    type: "text",
    id: "address",
    name: "address",
    placeholder: "Enter address",
    required: true,
  },
  {
    label: "City",
    type: "text",
    id: "city",
    name: "city",
    placeholder: "Enter city",
    required: true,
  },
  {
    label: "Postal Code",
    type: "text",
    id: "postalCode",
    name: "postalCode",
    placeholder: "Enter postal code",
    required: true,
  },
  {
    label: "Country",
    type: "text",
    id: "country",
    name: "country",
    placeholder: "Enter country",
    required: true,
  },
];

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { userInfo } = user;
  const { shippingAddress } = cart;

  const [formData, setFormData] = useState({
    fullName: shippingAddress.fullName || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  });

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    navigate("/payment");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  return (
    <main>
      <section className="form-section">
        {userInfo && <CheckoutSteps step1={true} step2={true} />}

        <Form
          onSubmit={onSubmit}
          handleFormData={handleFormData}
          formData={formData}
          formTitle="Shipping Address"
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

export default ShippingPage;
