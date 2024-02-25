import { useState } from "react";
import { homeGallery } from "../../data/homeGallery";

import "./image-gallery.style.scss";

const ImageGallery = () => {
  const [galleryImages] = useState(homeGallery);
  const [indexPanel, setIndexPanel] = useState(0);

  const growPanel = (e) => {
    const panel = e.target.closest(".panel");
    const index = +panel.dataset.index;
    setIndexPanel(index);
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="heading__secondary centar-text mb-medium">
          Featuring the best
        </h2>

        <div className="panels">
          {galleryImages.map((img, i) => {
            return (
              <div
                key={i}
                className={indexPanel === i ? "panel panel--active" : "panel"}
                onClick={(e) => growPanel(e)}
                data-index={i}
              >
                <img src={img} alt="" />
                <div
                  className={
                    indexPanel === i ? "shadow" : "shadow shadow--active"
                  }
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
