/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { homeGallery } from "../data/homeGallery";

const ImageGallery = () => {
  const [galleryImages, setGalleryImages] = useState(homeGallery);
  const [indexPanel, setIndexPanel] = useState(0);

  const growPanel = (e) => {
    const panel = e.target.closest(".panel");
    const index = +panel.dataset.index;
    setIndexPanel(index);
  };

  return (
    <section className="section">
      <h2 className="heading__secondary centar-text mb-medium">
        Featuring the best
      </h2>

      <div className="panels">
        {galleryImages.map((img, i) => {
          return (
            <div
              className={indexPanel === i ? "panel panel--active" : "panel"}
              onClick={(e) => growPanel(e)}
              data-index={i}
            >
              <img src={img} alt="" />
              <div className="shadow"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImageGallery;
