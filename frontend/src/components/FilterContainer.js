import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  searchRequest,
  searchSuccess,
  searchFail,
} from "../features/searchResult/searchSlice";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $500",
    value: "201-500",
  },
];

const FilterContainer = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get("query") || "all";
  const category = searchParams.get("category") || "all";
  const brand = searchParams.get("brand") || "all";
  const price = searchParams.get("price") || "all";
  const color = searchParams.get("color") || "all";
  const order = searchParams.get("order") || "newest";

  useEffect(() => {
    const fetchData = async () => {
      dispatch(searchRequest());
      try {
        const { data } = await axios.get(
          `/api/products/search?query=${query}&category=${category}&brand=${brand}&price=${price}&color=${color}&order=${order}`
        );
        dispatch(searchSuccess(data));
      } catch (err) {
        dispatch(searchFail(err));
      }
    };
    fetchData();
  }, [dispatch, query, category, brand, price, color, order]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products`);

        const brands = data.map((d) => d.brand);
        const categories = data.map((d) => d.category);
        const colors = data.map((d) => d.color);

        const uniqueBrands = [...new Set(brands)];
        const uniqueCategories = [...new Set(categories)];
        const uniqueColors = [...new Set(colors)];

        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
        setColors(uniqueColors);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const getFilterUrl = (filter) => {
    const filterQuery = filter.query || query;
    const filterCategory = filter.category || category;
    const filterBrand = filter.brand || brand;
    const filterPrice = filter.price || price;
    const filterColor = filter.color || color;
    const sortOrder = filter.order || order;
    return `/search?query=${filterQuery}&category=${filterCategory}&brand=${filterBrand}&price=${filterPrice}&color=${filterColor}&order=${sortOrder}`;
  };

  return (
    <div className="filter-container">
      <div>
        <h3>category</h3>
        <ul>
          <li>
            <Link
              className="btn__category"
              to={getFilterUrl({ category: "all" })}
            >
              All
            </Link>
          </li>
          {categories.map((c, i) => {
            return (
              <li key={i} className="btn__category">
                <Link to={getFilterUrl({ category: c })}>{c}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>brand</h3>
        <ul>
          <li>
            <Link className="btn__category" to={getFilterUrl({ brand: "all" })}>
              All
            </Link>
          </li>
          {brands.map((b, i) => {
            return (
              <li key={i} className="btn__category">
                <Link to={getFilterUrl({ brand: b })}>{b}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Color</h3>
        <ul className="color-list">
          <li>
            <Link className="btn__category" to={getFilterUrl({ color: "all" })}>
              All
            </Link>
          </li>
          {colors.map((c, i) => {
            return (
              <li key={i}>
                <Link
                  className={`color-list__item color-list__item--${c}`}
                  to={getFilterUrl({ color: c })}
                ></Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Price</h3>
        <ul>
          <li>
            <Link className="btn__category" to={getFilterUrl({ price: "all" })}>
              All
            </Link>
          </li>
          {prices.map((p) => (
            <li key={p.value}>
              <Link
                to={getFilterUrl({ price: p.value })}
                className="btn__category"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterContainer;
