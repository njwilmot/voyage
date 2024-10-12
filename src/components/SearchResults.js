import React from 'react';
import './SearchResults.css';

function SearchResults({ results }) {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <h3>{result.title}</h3>
          <p>{result.company}</p>
          <p>{result.location}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
