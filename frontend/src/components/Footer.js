import React from "react";
import {
  FaGooglePlusG,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaClock,
  FaPaypal,
  FaCcStripe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h3>information</h3>
        <p>Our Story</p>
        <p>Privacy &amp; Policy</p>
        <p>Terms &amp; Conditions</p>
        <p>Shipping &amp; Delivery</p>
        <p>Careers</p>
        <p>FAQs</p>
      </div>
      <div className="footer__icons">
        <h3>our social</h3>
        <div>
          <FaGooglePlusG />
          <span>Google</span>
        </div>
        <div>
          <FaYoutube />
          <span>YouTube</span>
        </div>
        <div>
          <FaInstagram />
          <span>Instagram</span>
        </div>
        <div>
          <FaFacebookF />
          <span>Facebook</span>
        </div>
        <div>
          <FaTwitter />
          <span>Twitter</span>
        </div>
      </div>
      <div>
        <h3>opening time</h3>
        <div className="footer__opening-time">
          <div>
            <FaClock />
          </div>
          <div>
            <p>Mon - Fri: 08:30am - 09:30pm</p>
            <p>Sat - Sun: 09:00am - 08:00pm</p>
          </div>
        </div>
      </div>
      <div>
        <h3>payment option</h3>
        <div className="footer__icons">
          <div>
            <FaPaypal />
            <span>Paypal</span>
          </div>
          <div>
            <FaCcStripe />
            <span>Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
