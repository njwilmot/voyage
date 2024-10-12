import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import './JobMap.css';
import { useJobData } from './useJobData';
import axios from 'axios';
import { Autocomplete } from '@react-google-maps/api';


const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const mapOptions = {
  gestureHandling: 'greedy',
};

function JobMap() {
  const jobs = useJobData(); 
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const searchTermFromQuery = queryParams.get('search');
  const locationFromQuery = queryParams.get('location');

  const [selectedJob, setSelectedJob] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 33.4484, lng: -112.0740 });
  const [searchTerm, setSearchTerm] = useState(searchTermFromQuery || "");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState(locationFromQuery || "");
  const [experienceLevel, setExperienceLevel] = useState("");

  useEffect(() => {
    if (searchTermFromQuery || locationFromQuery) {
      const filteredJobs = jobs.filter(job =>
        (job.title.toLowerCase().includes(searchTermFromQuery?.toLowerCase() || '') ||
          job.company.toLowerCase().includes(searchTermFromQuery?.toLowerCase() || '')) &&
        (locationFromQuery ? job.location.toLowerCase().includes(locationFromQuery.toLowerCase()) : true)
      );

      if (filteredJobs.length > 0) {
        setMapCenter(filteredJobs[0].position);
        setSelectedJob(filteredJobs[0]);
      }
    }
  }, [searchTermFromQuery, locationFromQuery, jobs]);

  const filteredJobs = jobs.filter(job =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (jobType ? job.type === jobType : true) &&
    (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true) &&
    (experienceLevel ? job.experience === experienceLevel : true)
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleLocationInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleExperienceLevelChange = (e) => {
    setExperienceLevel(e.target.value);
  };

  const handleMarkerClick = (job) => {
    setSelectedJob(job);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const firstMatchingJob = filteredJobs.length > 0 ? filteredJobs[0] : null;
      if (firstMatchingJob) {
        setMapCenter(firstMatchingJob.position);
        setSelectedJob(firstMatchingJob);
      } else {
        geocodeLocation(location).then((position) => {
          if (position) setMapCenter(position);
        });
      }
    }
  };

  const geocodeLocation = async (locationName) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: locationName,
          key: process.env.REACT_APP_API_KEY,
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return null;
  };

  return (
    <div className="job-map-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs by title or description..."
          value={searchTerm}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
        <select value={jobType} onChange={handleJobTypeChange}>
          <option value="">All Job Types</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
          <option value="Construction">Construction</option>
        </select>
        <input
          type="text"
          placeholder="Search by location..."
          value={location}
          onChange={handleLocationInputChange}
          onKeyPress={handleKeyPress}
        />
        <select value={experienceLevel} onChange={handleExperienceLevelChange}>
          <option value="">All Experience Levels</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="map-and-listings">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={13}
          options={mapOptions}
        >
          {filteredJobs.map((job, index) => (
            <Marker
              key={index}
              position={job.position}
              onClick={() => handleMarkerClick(job)}
            />
          ))}

          {selectedJob && (
            <InfoWindow
              position={selectedJob.position}
              onCloseClick={() => setSelectedJob(null)}
            >
              <div>
                <strong>{selectedJob.title}</strong>
                <p>{selectedJob.company}</p>
                <p>{selectedJob.location}</p>
                <p>{selectedJob.price}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        <div className="job-listing-panel">
          <h3>Job Listings</h3>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div
                key={index}
                className="job-item"
                onClick={() => setSelectedJob(job)}
              >
                <h4>{job.title}</h4>
                <p>{job.company}</p>
                <p>{job.location}</p>
              </div>
            ))
          ) : (
            <div>
              <h3>No matching jobs found.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobMap;
