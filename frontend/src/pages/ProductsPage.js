import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterContainer from "../components/FilterContainer";
import ProductList from "../components/ProductList";
import {
  fetchProducts,
  productsErrorRequest,
  productsSuccessRequest,
} from "../features/products/productsSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();

  const [endpointOfProductArr, setEndpointOfProductArr] = useState(6);
  const [productsLength, setProductsLength] = useState(0);

  const fetchedProducts = useSelector((state) => state.products);
  const { products, loading, error } = fetchedProducts;

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

  return (
    <section className="products-container">
      <FilterContainer />
      <ProductList
        products={products}
        loading={loading}
        error={error}
        productsLength={productsLength}
        endpointOfProductArr={endpointOfProductArr}
        setEndpointOfProductArr={setEndpointOfProductArr}
      />
    </section>
  );
};

export default ProductsPage;
