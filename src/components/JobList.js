import React from 'react';
import { Link } from 'react-router-dom';
import './JobList.css';  // Style as needed

function JobList() {
    // Example static data, replace with data fetched from server
    const jobs = [
        { id: 1, title: "Software Engineer", location: "San Francisco, CA", salary: "$120,000" },
        { id: 2, title: "Data Scientist", location: "New York, NY", salary: "$110,000" },
        // Add more jobs
    ];

    return (
        <div className="jobs">
            {jobs.map(job => (
                <div key={job.id} className="job">
                    <h3>{job.title}</h3>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                    <Link to={`/jobs/${job.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
}

export default JobList;
