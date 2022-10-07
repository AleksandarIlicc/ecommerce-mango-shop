import React from "react";

const HomeTabs = () => {
  return (
    <section className="section">
      <h2 className="heading__secondary centar-text mb-medium">
        Outside Essentials
      </h2>
      <div className="operations">
        <div className="operations__tab-header">
          <div className="operations__tab operations__tab--active">men</div>
          <div className="operations__tab">woman</div>
          <div className="operations__tab">kids</div>
        </div>
        <div
          style={{ textAlign: "center", padding: "5rem" }}
          className="operations__tab-body"
        >
          Tab ONE
        </div>
      </div>
    </section>
  );
};

export default HomeTabs;
