import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ setShowSearch }) => {
  const [inputQuery, setInputQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(inputQuery ? `/products?query=${inputQuery}` : "/products");
  };

  return (
    <form className="search" onSubmit={searchHandler}>
      <input
        type="text"
        placeholder="Search products..."
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
      />
      <FiSearch className="icon__search" onClick={() => setShowSearch(true)} />
    </form>
  );
};

export default SearchBox;
