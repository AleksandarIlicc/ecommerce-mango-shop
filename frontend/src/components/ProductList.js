import React, { useState } from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { FaTimes } from "react-icons/fa";
import { AiFillAppstore, AiOutlineBars } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

const styleLoadMoreBtnContainer = {
  display: "grid",
  placeItems: "center",
};

const Products = ({
  getFilterUrl,
  products,
  loading,
  error,
  productsLength,
  endpointOfProductArr,
  setEndpointOfProductArr,
}) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { pathname } = useLocation();

  const [productContainerLayout, setProductContainerLayout] = useState(true);
  const [activeDispalyButton, setActiveDisplayButton] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const searchParams = new URLSearchParams(search);
  const order = searchParams.get("order") || "newest";

  const getMoreProducts = () => {
    if (productsLength > products.length) {
      setEndpointOfProductArr(endpointOfProductArr + 3);
    } else {
      return;
    }
  };

  const getAllProducts = () => {
    setEndpointOfProductArr(productsLength);
  };

  const activeContainerButton = (e) => {
    const button = e.target.closest("button");

    if (button.classList.contains("btn-cols")) {
      setProductContainerLayout(true);
    }
    if (button.classList.contains("btn-rows")) {
      setProductContainerLayout(false);
    }
  };

  return (
    <div className="products">
      <div className="products__header">
        <div className="products__header--left">
          <div>
            <label htmlFor="sort">sort by</label>
            <select
              name="sort"
              id="sort"
              className="select-container"
              value={order}
              onChange={(e) => {
                navigate(getFilterUrl({ order: e.target.value }));
              }}
            >
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="name-a">a - z</option>
              <option value="name-z">z - a</option>
            </select>
          </div>
          <div
            className="btn-container"
            onClick={(e) => activeContainerButton(e)}
          >
            <button
              className={
                activeDispalyButton
                  ? "btn__display btn-cols btn__display--active"
                  : "btn__display btn-cols"
              }
              onClick={() => setActiveDisplayButton(true)}
            >
              <AiFillAppstore />
            </button>
            <button
              className={
                !activeDispalyButton
                  ? "btn__display btn-rows btn__display--active"
                  : "btn__display btn-rows"
              }
              onClick={() => setActiveDisplayButton(false)}
            >
              <AiOutlineBars />
            </button>
          </div>
        </div>
        <div className="products__header--right">
          <SearchBox setShowSearch={setShowSearch} />
          <span className="view-all" onClick={() => getAllProducts()}>
            view all
          </span>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div
            className={
              productContainerLayout
                ? "products__container products__container--cols"
                : "products__container products__container--rows"
            }
          >
            {products.map((item) => {
              return (
                <Product
                  item={item}
                  productContainerLayout={productContainerLayout}
                />
              );
            })}
            {products.length === 0 && <p>No Results</p>}
          </div>
          {pathname === "/products" ? (
            <div style={styleLoadMoreBtnContainer}>
              <button
                className="btn btn__load-more mt-small"
                style={
                  productsLength === products.length
                    ? { backgroundColor: "rgb(201, 222, 232)" }
                    : { backgroundColor: "rgb(118, 183, 208)" }
                }
                onClick={() => getMoreProducts()}
              >
                {productsLength === products.length
                  ? "all products"
                  : "load more"}
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      )}
      <form
        className={
          showSearch
            ? "search-container search-container--active"
            : "search-container"
        }
      >
        <input type="text" placeholder="search" />
        <FaTimes className="icon__times" onClick={() => setShowSearch(false)} />
        <div className="search-container__box mt-small">
          <h2>Popular Search Terms</h2>
          <ul>
            <li>Shoes</li>
            <li>T-shirt</li>
            <li>Nike Cap</li>
            <li>Adidas Jacket</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Products;
