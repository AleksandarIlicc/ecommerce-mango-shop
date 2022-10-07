/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { headerSlider } from "../data/headerSlider";
import {
  FaChevronUp,
  FaChevronDown,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(headerSlider);

  const nextImg = () => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prevImg = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    let imageSlider = setInterval(() => {
      nextImg();
    }, 3000);
    return () => {
      clearInterval(imageSlider);
    };
  });

  return (
    <header className="header">
      <div className="header__flex-container">
        <div className="header__left">
          <h1 className="heading__primary centar-text">
            COMFORT THAT KEEPS UP
          </h1>
          <p className="paragraph--header">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            pellentesque arcu quis justo blandit.
          </p>
          <button type="button" className="btn btn__get-in-touch">
            <Link to="/signin">Get in touch</Link>
          </button>
        </div>
        <div className="header__right">
          {images.map((img, i) => {
            return (
              <figure
                className="header__img"
                style={{ transform: `translateY(${100 * (i - index)}%)` }}
              >
                <img src={img} key={i} alt="header-img" />
              </figure>
            );
          })}
        </div>
      </div>
      <div className="header__arrows">
        <FaChevronUp onClick={nextImg} />
        <FaChevronDown onClick={prevImg} />
      </div>
      <div className="social-icons">
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
        <FaFacebookF />
      </div>
    </header>
  );
};

export default Header;
