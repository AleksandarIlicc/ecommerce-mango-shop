import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormPage from "../form-page/form-page.component";
import { savePaymentMethod } from "../../features/cart/cartSlice";
import { initialPaymentData, paymentFields } from "../../utils/formFields";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const handleShippingSubmit = (formaData) => {
    dispatch(savePaymentMethod(formaData.paymentMethod));
    navigate("/placeorder");
  };

  const formConfig = {
    isLoginMode: false,
    redirectPage: "signin",
    redirect: "/signin",
    textLink: "Already have an account?",
    fields: paymentFields,
    initialFormData: initialPaymentData,
    showCheckoutSteps: true,
  };

  return (
    <main>
      <section className="form-section">
        <FormPage
          formConfig={formConfig}
          onSubmitHandler={handleShippingSubmit}
        />
      </section>
    </main>
  );
};

export default PaymentPage;
