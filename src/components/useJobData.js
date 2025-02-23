import { useState, useEffect } from 'react';
import axios from 'axios';

export const useJobData = () => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobsData');
    return savedJobs ? JSON.parse(savedJobs) : null;
  });

  const stateAbbreviations = {
    "al": "alabama",
    "ak": "alaska",
    "az": "arizona",
    "ar": "arkansas",
    "ca": "california",
    "co": "colorado",
    "ct": "connecticut",
    "de": "delaware",
    "fl": "florida",
    "ga": "georgia",
    "hi": "hawaii",
    "id": "idaho",
    "il": "illinois",
    "in": "indiana",
    "ia": "iowa",
    "ks": "kansas",
    "ky": "kentucky",
    "la": "louisiana",
    "me": "maine",
    "md": "maryland",
    "ma": "massachusetts",
    "mi": "michigan",
    "mn": "minnesota",
    "ms": "mississippi",
    "mo": "missouri",
    "mt": "montana",
    "ne": "nebraska",
    "nv": "nevada",
    "nh": "new hampshire",
    "nj": "new jersey",
    "nm": "new mexico",
    "ny": "new york",
    "nc": "north carolina",
    "nd": "north dakota",
    "oh": "ohio",
    "ok": "oklahoma",
    "or": "oregon",
    "pa": "pennsylvania",
    "ri": "rhode island",
    "sc": "south carolina",
    "sd": "south dakota",
    "tn": "tennessee",
    "tx": "texas",
    "ut": "utah",
    "vt": "vermont",
    "va": "virginia",
    "wa": "washington",
    "wv": "west virginia",
    "wi": "wisconsin",
    "wy": "wyoming"
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const normalizeLocation = (location) => {
    const [city, stateAbbreviation] = location.split(', ').map(part => part.trim().toLowerCase());
    const stateFullName = stateAbbreviations[stateAbbreviation];
    const normalizedState = stateFullName ? capitalizeWords(stateFullName) : capitalizeWords(stateAbbreviation || '');
    return `${capitalizeWords(city)}, ${normalizedState}`;
  };

  const fetchCoordinates = async (location) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: location,
          key: process.env.REACT_APP_API_KEY,
        },
      });
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchJobDataWithCoordinates = async () => {
      if (!jobs) {
        const jobData = [
          { title: "Software Engineer", company: "Tech Co", location: "San Francisco, CA", salary: "$120,000", image: "/images/job1.png", position: { lat: 40.8074, lng: -74.1278 } },
          { title: "Data Analyst", company: "Data Corp", location: "New York, NY", salary: "$95,000", image: "/images/job2.png", position: { lat: 33.4484, lng: -112.0740 } },
          { title: "Product Manager", company: "Retail Inc", location: "Los Angeles, CA", salary: "$130,000", image: "/images/job3.png", position: { lat: 51.5096, lng: -0.1182 } },
          { title: "Graphic Designer", company: "Design Studio", location: "Chicago, IL", salary: "$85,000", image: "/images/job4.png", position: { lat: 41.8781, lng: -87.6298 } },
          { title: "Sales Associate", company: "SalesCom", location: "Miami, FL", salary: "$75,000", image: "/images/job1.png", position: { lat: 25.7617, lng: -80.1918 } },
          { title: "Marketing Manager", company: "AdWise", location: "Austin, TX", salary: "$110,000", image: "/images/job2.png", position: { lat: 30.2672, lng: -97.7431 } },
          { title: "DevOps Engineer", company: "CloudNet", location: "Seattle, WA", salary: "$140,000", image: "/images/job3.png", position: { lat: 47.6062, lng: -122.3321 } },
          { title: "HR Specialist", company: "PeopleFirst", location: "Boston, MA", salary: "$90,000", image: "/images/job4.png", position: { lat: 42.3601, lng: -71.0589 } },
          { title: "Cybersecurity Analyst", company: "SecureTech", location: "Washington, DC", salary: "$125,000", image: "/images/job5.png", position: { lat: 38.9072, lng: -77.0369 } },
          { title: "Operations Manager", company: "LogisticsPlus", location: "Houston, TX", salary: "$115,000", image: "/images/job1.png", position: { lat: 29.7604, lng: -95.3698 } },
        ];

        const jobsWithCoordinates = await Promise.all(jobData.map(async (job) => {
          const normalizedLocation = normalizeLocation(job.location);
          const position = await fetchCoordinates(normalizedLocation);
          return {
            ...job,
            location: normalizedLocation,
            position,
          };
        }));

        setJobs(jobsWithCoordinates);
        localStorage.setItem('jobsData', JSON.stringify(jobsWithCoordinates)); // Save to localStorage
      }
    };

    fetchJobDataWithCoordinates();
  }, [jobs]); // Only runs if jobs is null

  return jobs;
};
