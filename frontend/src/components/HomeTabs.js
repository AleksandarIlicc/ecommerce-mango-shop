import React, { useRef } from "react";

const HomeTabs = () => {
  const tabHeader = useRef(null);
  const tabBody = useRef(null);

  const handleActiveTab = (e) => {
    const tab = e.target;
    const tabHeaderElement = tabHeader.current;
    const tabBodyElement = tabBody.current;
    const tabs = [...tabHeaderElement.querySelectorAll(".operations__tab")];
    const tabContents = [
      ...tabBodyElement.querySelectorAll(".operations__tab-content"),
    ];
    const tabNumber = tab.dataset.tabNumber;

    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    tab.classList.add("operations__tab--active");

    tabContents.forEach((content) =>
      content.classList.remove("operations__tab-content--active")
    );
    document
      .querySelector(`.operations__tab-content--${tabNumber}`)
      .classList.add("operations__tab-content--active");
  };

  return (
    <section className="section">
      <h2 className="heading__secondary centar-text mb-medium">
        Who are you shopping for?
      </h2>
      <div className="operations">
        <div
          className="operations__tab-header"
          onClick={(e) => handleActiveTab(e)}
          ref={tabHeader}
        >
          <div
            className="operations__tab operations__tab--active"
            data-tab-number="1"
          >
            men
          </div>
          <div className="operations__tab" data-tab-number="2">
            woman
          </div>
          <div className="operations__tab" data-tab-number="3">
            kids
          </div>
        </div>
        <div ref={tabBody} className="operations__tab-body">
          <div className="operations__tab-content operations__tab-content--1 operations__tab-content--active">
            <div>
              <h3 className="heading__tertiary">Did you go to the gym?</h3>
              <p>Get dressed from head to toe in one place. Be comfortable.</p>
              <div>
                <h3>Most often ordered</h3>
                <ul>
                  <li>Shoes</li>
                  <li>T-shirt</li>
                  <li>Sweatsuit</li>
                </ul>
              </div>
            </div>
            <figure>
              <img src="/images/tab--1.png" alt="" />
            </figure>
          </div>
          <div className="operations__tab-content operations__tab-content--2">
            <div>
              <h3 className="heading__tertiary">
                You want to look attractive and sport a combination?
              </h3>
              <p>
                Find your ideal mix in one location while looking swanky and
                athletic.
              </p>
              <div>
                <h3>Most often ordered</h3>
                <ul>
                  <li>Shoes</li>
                  <li>T-shirt</li>
                  <li>Sweatsuit</li>
                </ul>
              </div>
            </div>
            <figure>
              <img src="/images/tab--2.png" alt="" />
            </figure>
          </div>
          <div className="operations__tab-content operations__tab-content--3">
            <div>
              <h3 className="heading__tertiary">
                You want your kid to appear athletic?
              </h3>
              <p>
                You are in the right place. View the collection we help in
                providing.
              </p>
              <div>
                <h3>Most often ordered</h3>
                <ul>
                  <li>Shoes</li>
                  <li>T-shirt</li>
                  <li>Jacket</li>
                </ul>
              </div>
            </div>
            <figure>
              <img src="/images/tab--3.png" alt="" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTabs;
