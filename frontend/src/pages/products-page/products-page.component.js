import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import FilterContainer from "../../components/filter-container/filter-container.component";
import ProductList from "../../components/product-list/product-list.component";

import {
  productsSuccess,
  productsFail,
  productsRequest,
} from "../../features/products/productsSlice";

import ProductClient from "../../api/productsApis";

import "./products-page.style.scss";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  const productClient = new ProductClient();

  const dispatch = useDispatch();

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
      dispatch(productsRequest());
      const result = await productClient.fetchAllSearchProducts(
        query,
        category,
        brand,
        price,
        color,
        order
      );

      if (typeof result === "string") {
        dispatch(productsFail(result));
      } else {
        dispatch(productsSuccess(result));
      }
    };

    fetchData();
  }, [dispatch, query, category, brand, price, color, order]);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(productsRequest());
      const result = await productClient.fetchAllCategories();

      if (typeof result === "string") {
        dispatch(productsFail(result));
      } else {
        dispatch(productsSuccess(result));
      }

      const { uniqueBrands, uniqueCategories, uniqueColors } = result.reduce(
        (accumulator, item) => {
          accumulator.uniqueBrands.add(item.brand);
          accumulator.uniqueCategories.add(item.category);
          accumulator.uniqueColors.add(item.color);
          return accumulator;
        },
        {
          uniqueBrands: new Set(),
          uniqueCategories: new Set(),
          uniqueColors: new Set(),
        }
      );

      setBrands([...uniqueBrands]);
      setCategories([...uniqueCategories]);
      setColors([...uniqueColors]);
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
    return `/products?query=${filterQuery}&category=${filterCategory}&brand=${filterBrand}&price=${filterPrice}&color=${filterColor}&order=${sortOrder}`;
  };

  return (
    <section className="products-container">
      <FilterContainer
        getFilterUrl={getFilterUrl}
        categories={categories}
        brands={brands}
        colors={colors}
      />
      <ProductList getFilterUrl={getFilterUrl} order={order} />
    </section>
  );
};

export default ProductsPage;
