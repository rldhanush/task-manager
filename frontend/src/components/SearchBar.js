import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onSort }) => {
  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search:</label>
      <input
        type="text"
        id="search-input"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <label htmlFor="sort-select">Sort By:</label>
      <select id="sort-select" onChange={(e) => onSort(e.target.value)}>
        <option value="recent">Recent</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default SearchBar;
