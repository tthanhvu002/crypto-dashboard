import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useState } from "react";
import "./style.css";
function Search({ search, onSearchChange }) {
  return (
    <div className="search-flex">
      <SearchRoundedIcon />
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
