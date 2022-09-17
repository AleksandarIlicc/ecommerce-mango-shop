import React, { useEffect, useState } from "react";
import Product from "./Product";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { AiFillAppstore, AiOutlineBars } from "react-icons/ai";
import axios from "axios";
import {
  productsSuccessRequest,
  fetchProducts,
  productsErrorRequest,
} from "../features/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const { products, loading, error } = productList;
  const [productContainerLayout, setProductContainerLayout] = useState(true);
  const [activeDispalyButton, setActiveDisplayButton] = useState(true);
  const [endpointOfProductArr, setEndpointOfProductArr] = useState(6);
  const [productsLength, setProductsLength] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search?query=${query}` : "/search");
  };

  const styleLoadMoreBtnContainer = {
    display: "grid",
    placeItems: "center",
  };

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

  useEffect(() => {
    dispatch(productsSuccessRequest());
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProductsLength(data.length);
        dispatch(fetchProducts(data.slice(0, endpointOfProductArr)));
      } catch (err) {
        dispatch(productsErrorRequest(err.message));
      }
    };
    getProducts();
  }, [dispatch, endpointOfProductArr]);

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
            <select name="sort" id="sort" className="select-container">
              <option value="price-lowest">lowest price</option>
              <option value="price-highest">highest price</option>
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
          <form className="search" onSubmit={searchHandler}>
            <input
              type="text"
              placeholder="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <FiSearch
              className="icon__search"
              onClick={() => setShowSearch(true)}
            />
          </form>
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
          </div>
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
