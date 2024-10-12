import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import Trending from './Trending';
import './HomePage.css';
import { useJobData } from './useJobData';  // Import the hook

function HomePage() {
  const jobs = useJobData();  // Use the centralized job data
  const navigate = useNavigate();

  const handleSearch = (term, location) => {
    navigate(`/jobs?search=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`); // Pass both search term and location
  };

  return (
    <div className="home-page">
      <h1>Map Your Next Opportunity</h1>
      <div className="content-wrapper">
        <SearchBar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
        <section className="trending-jobs">
          <Trending jobData={jobs} /> {/* Pass the job data to Trending */}
        </section>
      </div>
    </div>
  );
}

export default HomePage;
