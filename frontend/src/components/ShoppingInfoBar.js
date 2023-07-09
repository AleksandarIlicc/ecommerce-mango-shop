import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiCube } from "react-icons/bi";

const ShoppingInfoBar = () => {
  return (
    <div className="shopping-info-bar">
      <div className="shopping-info-bar__box">
        <div className="shopping-info-bar__icon">
          <FaShippingFast />
        </div>
        <div>
          <h4>Free Shipping</h4>
          <p>Free delivery over $250</p>
        </div>
      </div>
      <div className="shopping-info-bar__box">
        <div className="shopping-info-bar__icon">
          <GiReturnArrow />
        </div>
        <div>
          <h4>Free Retruns</h4>
          <p>Paypal free returns</p>
        </div>
      </div>
      <div className="shopping-info-bar__box">
        <div className="shopping-info-bar__icon">
          <RiSecurePaymentFill />
        </div>
        <div>
          <h4>Secure Shopping</h4>
          <p>Best security features</p>
        </div>
      </div>
      <div className="shopping-info-bar__box">
        <div className="shopping-info-bar__icon">
          <BiCube />
        </div>
        <div>
          <h4>Unlimited Blocks</h4>
          <p>Any content, any page</p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingInfoBar;
