import React from "react";
import FilterContainer from "./FilterContainer";
import ProductList from "./ProductList";

const ProductsContainer = () => {
  return (
    <section className="products-container">
      <FilterContainer />
      <ProductList />
    </section>
  );
};

export default ProductsContainer;
