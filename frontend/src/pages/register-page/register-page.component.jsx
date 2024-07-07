import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/form/form.component";
import useFormData from "../../customHooks/useFormData";
import { registerFields, initialRegisterData } from "../../utils/formFields";

import {
  userLoaded,
  userRegisterSuccess,
  userRegisterFail,
  authError,
} from "../../features/user/authSlice";
import { store } from "../../store";

import setAuthToken from "../../utils/setAuthToken";
import UserClinent from "../../api/userApis";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const { data } = await axios.get("/api/auth");
    store.dispatch(userLoaded(data.user));
  } catch (err) {
    store.dispatch(authError());
  }
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, handleFormData] = useFormData(initialRegisterData);

  const { name, email, password, password2 } = formData;

  const userClient = new UserClinent();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const register = async (name, email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    const result = await userClient.registerUser(body, config);

    if (result?.response?.status === 400) {
      const errors = result.response.data.errors;

      if (errors) {
        errors.forEach((error) => toast.error(error.msg));
      }

      dispatch(userRegisterFail());
    } else {
      dispatch(userRegisterSuccess(result));
      loadUser();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password do not match");
    } else {
      register(name, email, password);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const formConfig = {
    isLoginMode: false,
    redirectPage: "signin",
    redirect,
    textLink: "Already have an account?",
    fields: registerFields,
  };

  return (
    <main>
      <section className="form-section">
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

export default RegisterPage;
