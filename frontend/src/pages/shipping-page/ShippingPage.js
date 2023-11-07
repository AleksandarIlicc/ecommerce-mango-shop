import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";
import { saveShippingAddress } from "../../features/cart/cartSlice";

const ShippingPage = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { userInfo } = user;
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    navigate("/payment");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  return (
    <main>
      <section className="form-section">
        {userInfo && <CheckoutSteps step1={true} step2={true} />}
        <div className="form-box">
          <div className="form-box__left">
            <div className="form-box__logo">
              <span>Mango</span>Shop
            </div>
          </div>
          <div className="form-box__right">
            <form className="form" onSubmit={handleSubmit}>
              <div>
                <h1
                  style={{ color: "black" }}
                  className="heading__primary mt-small mb-small"
                >
                  Shipping Address
                </h1>
              </div>
              <div className="form__input-box">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter full name"
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form__input-box">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form__input-box">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter city"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form__input-box">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  placeholder="Enter postal code"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="form__input-box">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  placeholder="Enter country"
                  value={country}
                  required7
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <label />
              <button className="btn btn__form" type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShippingPage;
