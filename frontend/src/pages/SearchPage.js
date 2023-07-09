import React, { useEffect } from "react";
import ProductList from "../components/ProductList";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  searchRequest,
  searchSuccess,
  searchFail,
} from "../features/searchResult/searchSlice";
import FilterContainer from "../components/FilterContainer";

const SearchPage = () => {
  const dispatch = useDispatch();

  const searchProducts = useSelector((state) => state.searchResult);
  const { products, loading, error } = searchProducts;

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get("query") || "all";
  const category = searchParams.get("category") || "all";
  const brand = searchParams.get("brand") || "all";
  const price = searchParams.get("price") || "all";
  const order = searchParams.get("order") || "newest";

  useEffect(() => {
    const fetchData = async () => {
      dispatch(searchRequest());
      try {
        const { data } = await axios.get(
          `/api/products/search?query=${query}&category=${category}&brand=${brand}&price=${price}&order=${order}`
        );
        dispatch(searchSuccess(data));
      } catch (err) {
        dispatch(searchFail(err));
      }
    };
    fetchData();
  }, [dispatch, query, category, brand, price, order]);

  const getFilterUrl = (filter) => {
    const filterQuery = filter.query || query;
    const filterCategory = filter.category || category;
    const filterBrand = filter.brand || brand;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?query=${filterQuery}&category=${filterCategory}&brand=${filterBrand}&price=${filterPrice}&order=${sortOrder}`;
  };

  return (
    <section className="products-container">
      <FilterContainer />
      <ProductList
        getFilterUrl={getFilterUrl}
        products={products}
        loading={loading}
        error={error}
      />
    </section>
  );
};

export default SearchPage;
