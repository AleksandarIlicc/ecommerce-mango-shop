import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLoginFail, userLoginSuccess } from "../../features/user/authSlice";

import CheckoutSteps from "../../components/checkout-steps/checkout-steps.component";
import Form from "../../components/form/form.component";
import { loginFields, initialLoginData } from "../../utils/formFields";
import useFormData from "../../customHooks/useFormData";

import { loadUser } from "../register-page/register-page.component";
import AuthClient from "../../api/authApis";
import { handleResponse } from "../../utils/helpers";

import { toast } from "react-toastify";

const SigninPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, handleFormData] = useFormData(initialLoginData);

  const authClient = new AuthClient();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { email, password } = formData;

  const login = async (email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    const response = await authClient.userLogin(body, config);
    const handledResponse = handleResponse(response);

    if (handledResponse.errorMessage) {
      const errors = response.response.data.errors;

      if (errors) {
        errors.forEach((error) => toast.error(error.msg));
      }
      dispatch(userLoginFail());
    } else {
      dispatch(userLoginSuccess(handledResponse));
      loadUser();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const formConfig = {
    isLoginMode: true,
    redirectPage: "register",
    redirect,
    textLink: "Create your account",
    fields: loginFields,
  };

  return (
    <main>
      <section className="form-section">
        <CheckoutSteps step1={true} />

        <Form
          onSubmit={onSubmit}
          handleFormData={handleFormData}
          formData={formData}
          formConfig={formConfig}
        />
      </section>
    </main>
  );
};

export default SigninPage;
