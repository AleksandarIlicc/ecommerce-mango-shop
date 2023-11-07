import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setAlert } from "../../components/setAlert";
import FormAlert from "../../components/FormAlert";
import {
  userLoaded,
  userRegisterSuccess,
  userRegisterFail,
  authError,
} from "../../features/user/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { store } from "../../store";
import AuthClient from "./api";

export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const { data } = await axios.get("/api/auth");
    store.dispatch(userLoaded(data));
  } catch (err) {
    store.dispatch(authError());
  }
};

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

  const authClient = new AuthClient();

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

    const result = await authClient.registerUser(body, config);

    if (typeof result === "User already exsits") {
      const errors = result.response.data.errors;

      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "danger"));
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
      setAlert("Password do not match", "danger");
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
        <div className="form-box">
          <div className="form-box__left">
            <div className="form-box__logo">
              <span>Mango</span>Shop
            </div>
          </div>
          <div className="form-box__right">
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div>
                <h1
                  style={{ color: "black" }}
                  className="heading__primary mt-small mb-small"
                >
                  Sign Up
                </h1>
              </div>
              <FormAlert />
              <div className="form__input-box">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => handleFormData(e)}
                />
              </div>
              <div className="form__input-box">
                <label htmlFor="email">Email address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => handleFormData(e)}
                />
              </div>
              <div className="form__input-box">
                <label htmlFor="password">Enter password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => handleFormData(e)}
                />
              </div>
              <div className="form__input-box">
                <label htmlFor="password">Confirm password:</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={password2}
                  placeholder="Confirm password"
                  onChange={(e) => handleFormData(e)}
                />
              </div>
              <div>
                <button className="btn btn__form" type="submit">
                  Sign In
                </button>
              </div>
              <div>
                <p className="paragraph">
                  New customer? {""}
                  <Link to={`/signin?redirect=${redirect}`}>
                    Already have an account?
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
