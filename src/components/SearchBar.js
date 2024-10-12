import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '' || location.trim() !== '') {
      onSearch(searchTerm, location); // Pass both values to the onSearch function
    }
  };
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Job title, keywords, or company"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="City, state, or zip code"
      />
      <button type="button" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
