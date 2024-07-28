// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.length >= 5) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search:</label>
      <input
        type="text"
        id="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
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
