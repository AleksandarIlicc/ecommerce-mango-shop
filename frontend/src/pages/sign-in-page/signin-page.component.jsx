import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLoginFail, userLoginSuccess } from "../../features/user/authSlice";

import CheckoutSteps from "../../components/checkout-steps/checkout-steps.component";
import Form from "../../components/form/form.component";

import { loadUser } from "../register-page/register-page.component";
import AuthClient from "../../api/authApis";
import { handleResponse } from "../../utils/helpers";

import { toast } from "react-toastify";

const fields = [
  {
    label: "Email address",
    type: "email",
    id: "email",
    name: "email",
    placeholder: "Enter email",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Enter password",
    required: true,
  },
];

const SigninPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      // const errors = err.response.data.errors;
      const errors = handledResponse.errorMessage;

      // if (errors) {
      //   errors.forEach((error) => toast.error(error.msg));
      // }

      // dispatch(userLoginFail());
    } else {
      dispatch(userLoginSuccess(handledResponse));
      loadUser();
    }
  };

  const handleFormData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <main>
      <section className="form-section">
        <CheckoutSteps step1={true} />

        <Form
          onSubmit={onSubmit}
          handleFormData={handleFormData}
          formData={formData}
          formTitle="Sing in"
          formSubtitle="Welcome back you've been missed!"
          redirectPage="register"
          redirect={redirect}
          textLink="Create your account"
          fields={fields}
        />
      </section>
    </main>
  );
};

export default SigninPage;
