import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import FilterContainer from "../../components/FilterContainer";
import ProductList from "../../components/ProductList";
import {
  fetchProducts,
  productsErrorRequest,
  productsSuccessRequest,
} from "../../features/products/productsSlice";
import ProductClient from "./api";

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
      dispatch(productsSuccessRequest());
      const result = await productClient.fetchAllProducts(
        query,
        category,
        brand,
        price,
        color,
        order
      );

      if (typeof result === "string") {
        dispatch(productsErrorRequest(result));
      } else {
        dispatch(fetchProducts(result));
      }
    };

    fetchData();
  }, [dispatch, query, category, brand, price, color, order]);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(productsSuccessRequest());
      const result = await productClient.fetchAllCategories();

      if (typeof result === "string") {
        dispatch(productsErrorRequest(result));
      } else {
        dispatch(fetchProducts(result));
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
