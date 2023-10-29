import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { hideFilters } from "../features/buttons/filterButton";
import {
  fetchProducts,
  productsErrorRequest,
  productsSuccessRequest,
} from "../features/products/productsSlice";
import axios from "axios";

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

const CategoryList = ({ categories, getFilterUrl }) => {
  return (
    <ul>
      {categories.map((c, i) => (
        <li key={i} className="btn__category">
          <Link to={getFilterUrl({ category: c })}>{c}</Link>
        </li>
      ))}
    </ul>
  );
};

const BrandList = ({ brands, getFilterUrl }) => {
  return (
    <ul>
      {brands.map((b, i) => {
        return (
          <li key={i} className="btn__category">
            <Link to={getFilterUrl({ brand: b })}>{b}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const ColorList = ({ colors, getFilterUrl }) => {
  return (
    <ul className="color-list">
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
  );
};

const PriceList = ({ prices, getFilterUrl }) => {
  return (
    <ul>
      {prices.map((p) => (
        <li key={p.value}>
          <Link to={getFilterUrl({ price: p.value })} className="btn__category">
            {p.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const FilterContainer = ({ getFilterUrl, categories, brands, colors }) => {
  const dispatch = useDispatch();
  const filterButton = useSelector((state) => state.filterButton);
  const { toggleFilters } = filterButton;

  const fetchAllProducts = async () => {
    dispatch(productsSuccessRequest());
    try {
      const { data } = await axios.get(`/api/products`);
      dispatch(fetchProducts(data));
    } catch (err) {
      dispatch(productsErrorRequest(err.message));
    }
  };

  return (
    <div
      className={
        toggleFilters
          ? "filter-container filter-container--show"
          : "filter-container"
      }
    >
      <div>
        <button
          style={{ fontSize: "2rem", color: "#797979" }}
          className="btn__category"
          onClick={fetchAllProducts}
        >
          All Products
        </button>
      </div>
      <div>
        <h3>Category</h3>
        <CategoryList categories={categories} getFilterUrl={getFilterUrl} />
      </div>
      <div>
        <h3>Brand</h3>
        <BrandList brands={brands} getFilterUrl={getFilterUrl} />
      </div>
      <div>
        <h3>Color</h3>
        <ColorList colors={colors} getFilterUrl={getFilterUrl} />
      </div>
      <div>
        <h3>Price</h3>
        <PriceList prices={prices} getFilterUrl={getFilterUrl} />
      </div>
      <button onClick={() => dispatch(hideFilters())}>
        <FaTimes className="icon__times icon__times--filters" />
      </button>
      <button
        onClick={() => dispatch(hideFilters())}
        className="btn btn__apply-filters"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterContainer;
