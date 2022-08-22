import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <section className="signin">
        <div className="signin-box">
          <div className="signin-box__left">
            <div className="signin-box__logo">
              <span>Mango</span>Shop
            </div>
          </div>
          <div className="signin-box__right">
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
                  placeHolder="Enter password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="btn btn__signin" type="submit">
                  Sign In
                </button>
              </div>
              <div>
                <p className="paragraph">
                  New customer? {""}{" "}
                  <Link to="/regisgter">Create your account</Link>
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
