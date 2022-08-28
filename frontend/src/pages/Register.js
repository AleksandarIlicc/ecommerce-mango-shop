import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setAlert } from "../actions/setAlert";
import FormAlert from "../components/FormAlert";
import { register } from "../actions/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleFormData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      register(name, email, password);
    }
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
                  New customer? {""}{" "}
                  <Link to="/signin">Already have an account?</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
