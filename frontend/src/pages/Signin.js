import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  userSigninRequest,
  userSigninSuccess,
  userSigninFail,
} from "../features/user/userSlice";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch;

  const signin = async () => {
    dispatch(userSigninRequest({ email, password }));
    try {
      const { data } = axios.get("/api/users", { email, password });
      dispatch(userSigninSuccess(data));
    } catch (err) {
      dispatch(
        userSigninFail(
          err.message && err.message ? err.response.data.message : err.message
        )
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    signin();
  };

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
            <form className="form" onSubmit={submitHandler}>
              <div>
                <h1
                  style={{ color: "black" }}
                  className="heading__primary mt-small mb-small"
                >
                  Sign In
                </h1>
              </div>
              <div className="form__input-box">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeHolder="Enter email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form__input-box">
                <label htmlFor="password">Enter password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeHolder="Enter password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="btn btn__form" type="submit">
                  Sign In
                </button>
              </div>
              <div>
                <p className="paragraph">
                  New customer? {""}{" "}
                  <Link to="/register">Create your account</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signin;
