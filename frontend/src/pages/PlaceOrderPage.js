import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderPage = () => {
  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  return (
    <main>
      <section className="form-section">
        {userInfo && (
          <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
        )}
      </section>
    </main>
  );
};

export default PlaceOrderPage;
