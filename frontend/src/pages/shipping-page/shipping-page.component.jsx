import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormPage from "../form-page/form-page.component";
import { saveShippingAddress } from "../../features/cart/cartSlice";
import { initialShippingData, shippingFields } from "../../utils/formFields";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const initialFormData = {
    ...initialShippingData,
    fullName: shippingAddress.fullName || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  };

  const handleShippingSubmit = (formData) => {
    dispatch(saveShippingAddress(formData));
    navigate("/payment");
  };

  const formConfig = {
    isLoginMode: false,
    redirectPage: "signin",
    redirect: "payment",
    textLink: "Already have an account? Sign In",
    fields: shippingFields,
    initialFormData,
    showCheckoutSteps: true,
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  return (
    <FormPage formConfig={formConfig} onSubmitHandler={handleShippingSubmit} />
  );
};

export default ShippingPage;
