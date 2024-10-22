import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import './JobMap.css';
import { useJobData } from './useJobData';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
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

  const [mapCenter, setMapCenter] = useState({ lat: 33.4484, lng: -112.0740 });
  const [mapInstance, setMapInstance] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchTermFromQuery || "");
  const [locationQuery, setLocationQuery] = useState(locationFromQuery || "");
  const [blueCircleIcon, setBlueCircleIcon] = useState(null);

  useEffect(() => {
    if (window.google) {
      setBlueCircleIcon({
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8, 
        fillColor: '#4285F4', 
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: '#FFFFFF', 
      });
    }
  }, []);

  useEffect(() => {
    if (searchTerm || locationQuery) {
      const filteredJobs = jobs.filter(job =>
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (locationQuery ? job.location.toLowerCase().includes(locationQuery.toLowerCase()) : true)
      );

      if (filteredJobs.length > 0) {
        setMapCenter(filteredJobs[0].position);
      }
    }
  }, [searchTerm, locationQuery, jobs]);

  const filteredJobs = jobs.filter(job =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (locationQuery ? job.location.toLowerCase().includes(locationQuery.toLowerCase()) : true)
  );

  const handleMarkerClick = (job) => {
    setMapCenter(job.position);
    if (mapInstance) {
      mapInstance.setZoom(14);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const firstMatchingJob = filteredJobs.length > 0 ? filteredJobs[0] : null;
      if (firstMatchingJob) {
        setMapCenter(firstMatchingJob.position);
        if (mapInstance) {
          mapInstance.setZoom(14);
        }
      }
    }
  };

  return (
    <div className="job-map-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          placeholder="City, state, or zip code"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="button" className="search-button">Search</button>
      </div>
      <div className="map-and-listings">
        <div className="google-map">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={13}
            options={mapOptions}
            onLoad={map => setMapInstance(map)}
          >
            {filteredJobs.map((job, index) => (
              <Marker
                key={index}
                position={job.position}
                icon={blueCircleIcon}
                onClick={() => handleMarkerClick(job)}
              />
            ))}
          </GoogleMap>
        </div>

        <div className="job-listing-panel">
          <h3>Job Listings</h3>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div key={index} className="job-item" onClick={() => handleMarkerClick(job)}>
                <div className="job-info">
                  <h4>{job.title}</h4>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                  <p className="salary-label">{job.salary || 'Salary not provided'}</p>
                </div>
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
