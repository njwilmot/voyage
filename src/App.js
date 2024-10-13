import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Header from './components/Header';
import HomePage from './components/HomePage';
import JobList from './components/JobList';
import JobMap from './components/JobMap';
import JobDetails from './components/JobDetails';
import Research from './components/Research';
import Profile from './components/Profile';
import Reviews from './components/Reviews';
import './App.css';

function App() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
      onLoad={() => console.log("Google Maps script loaded successfully")}
      onError={() => console.error("Error loading Google Maps script")}
    >
      <Router>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobMap />} />
            <Route path="/research" element={<Research />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
          </Routes>
        </div>
      </Router>
    </LoadScript>
  );
}

export default App;
