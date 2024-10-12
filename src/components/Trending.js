import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Trending.css';

function Trending({ jobData }) {  // Pass jobData as props
  const [jobs, setJobs] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    // Use the job data passed as props instead of hardcoded data
    if (jobData) {
      setJobs(jobData);
    }
  }, [jobData]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleJobClick = (job) => {
    // Navigate to the JobMap page with the search and location parameters
    navigate(`/jobs?search=${encodeURIComponent(job.title)}&location=${encodeURIComponent(job.location)}`);
  };

  return (
    <div className="trending-container">
      <h2>Trending Jobs</h2>
      <div className="scroll-buttons">
        <button onClick={scrollLeft}>&#8249;</button>
        <button onClick={scrollRight}>&#8250;</button>
      </div>
      <div className="trending-job-list" ref={scrollRef}>
        {jobs.map((job, index) => (
          <div 
            key={index} 
            className="trending-job-card" 
            onClick={() => handleJobClick(job)}  // Make the job card clickable
            style={{ cursor: 'pointer' }}  // Add pointer cursor
          >
            <div className="job-image">
              <img src={job.image} alt={`${job.title}`} />
            </div>
            <div className="job-info">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;
