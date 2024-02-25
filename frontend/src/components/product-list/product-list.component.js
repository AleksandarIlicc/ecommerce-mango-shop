import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaTimes, FaFilter } from "react-icons/fa";
import { AiFillAppstore, AiOutlineBars } from "react-icons/ai";

import Product from "../product/product.component";
import Loader from "../loader/loader.component";
import ErrorMessage from "../error-message/error-message.component";
import SearchBox from "../search-box/search-box.component";

import { showFilters } from "../../features/buttons/filterButton";

import "./product-list.style.scss";

const styleLoadMoreBtnContainer = {
  display: "grid",
  placeItems: "center",
};

const ProductsList = ({ getFilterUrl, order }) => {
  const [productContainerLayout, setProductContainerLayout] = useState(true);
  const [activeDispalyButton, setActiveDisplayButton] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedProducts = useSelector((state) => state.products);
  const { products, loading, error } = fetchedProducts;

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
              <option value="name-z">z - a</option>s
            </select>
          </div>
          <div
            className="btn-container"
            onClick={(e) => activeContainerButton(e)}
          >
            <button
              className={
                activeDispalyButton
                  ? "btn__product-header btn-cols btn__product-header--active"
                  : "btn__product-header btn-cols"
              }
              onClick={() => setActiveDisplayButton(true)}
            >
              <AiFillAppstore />
            </button>
            <button
              className={
                !activeDispalyButton
                  ? "btn__product-header btn-rows btn__product-header--active"
                  : "btn__product-header btn-rows"
              }
              onClick={() => setActiveDisplayButton(false)}
            >
              <AiOutlineBars />
            </button>
            <button
              className="btn__product-header btn__product-header--show"
              onClick={() => dispatch(showFilters())}
            >
              <FaFilter />
            </button>
          </div>
        </div>
        <div className="products__header--right">
          <SearchBox setShowSearch={setShowSearch} />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div
            className={`${
              productContainerLayout
                ? "products__container products__container--cols"
                : "products__container products__container--rows"
            } ${
              products.length < 3 &&
              "products__container--cols--less-then-three"
            }`}
          >
            {products.map((item) => {
              return (
                <Product
                  key={item._id}
                  item={item}
                  productContainerLayout={productContainerLayout}
                />
              );
            })}
            {products.length === 0 && <p>No Results</p>}
          </div>
          <div style={styleLoadMoreBtnContainer}>
            <button
              className="btn mt-small"
              style={
                true
                  ? // productsLength === products.length
                    { backgroundColor: "rgb(201, 222, 232)" }
                  : { backgroundColor: "rgb(118, 183, 208)" }
              }
              onClick={() => {}}
            >
              {
                // productsLength === products.length
                true ? "all products" : "load more"
              }
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsList;
