import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/form/form.component";

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

const fields = [
  {
    label: "Full name",
    type: "text",
    id: "name",
    name: "name",
    placeholder: "Enter name",
  },
  {
    label: "Email address",
    type: "email",
    id: "email",
    name: "email",
    placeholder: "Enter email",
  },
  {
    label: "Password",
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Enter password",
  },
  {
    label: "Confirm password",
    type: "password",
    id: "password2",
    name: "password2",
    placeholder: "Confirm password",
  },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const userClient = new UserClinent();

  const handleFormData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

  return (
    <main>
      <section className="form-section">
        <Form
          onSubmit={onSubmit}
          handleFormData={handleFormData}
          formData={formData}
          formTitle="Sing up"
          formSubtitle=""
          redirectPage="signin"
          redirect={redirect}
          textLink="Already have an account?"
          fields={fields}
        />
      </section>
    </main>
  );
};

export default RegisterPage;
