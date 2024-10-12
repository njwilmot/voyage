import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function JobDetails() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        // Here you would fetch the job details from your backend or API
        // For now, we just use a placeholder
        setJob({ title: "Software Engineer", location: "San Francisco, CA", salary: "$120,000", description: "Detailed job description here..." });
    }, [jobId]);

    return (
        <div>
            {job ? (
                <div>
                    <h1>{job.title}</h1>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                    <p>{job.description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default JobDetails;
