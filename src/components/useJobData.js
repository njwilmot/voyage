import { useState, useEffect } from 'react';

export const useJobData = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const jobData = [
      { title: "Software Engineer", company: "Tech Co", location: "San Francisco, CA", price: "$120,000/year", image: "/images/job1.png", position: { lat: 40.8074, lng: -74.1278 } },
      { title: "Data Analyst", company: "Data Corp", location: "New York, NY", price: "$95,000/year", image: "/images/job2.png", position: { lat: 33.4484, lng: -112.0740 } },
      { title: "Product Manager", company: "Retail Inc", location: "Los Angeles, CA", price: "$130,000/year", image: "/images/job3.png", position: { lat: 51.5096, lng: -0.1182 } },
      { title: "Graphic Designer", company: "Design Studio", location: "Chicago, IL", price: "$85,000/year", image: "/images/job4.png", position: { lat: 41.8781, lng: -87.6298 } },
      { title: "Sales Associate", company: "SalesCom", location: "Miami, FL", price: "$75,000/year", image: "/images/job1.png", position: { lat: 25.7617, lng: -80.1918 } },
      { title: "Marketing Manager", company: "AdWise", location: "Austin, TX", price: "$110,000/year", image: "/images/job2.png", position: { lat: 30.2672, lng: -97.7431 } },
      { title: "DevOps Engineer", company: "CloudNet", location: "Seattle, WA", price: "$140,000/year", image: "/images/job3.png", position: { lat: 47.6062, lng: -122.3321 } },
      { title: "HR Specialist", company: "PeopleFirst", location: "Boston, MA", price: "$90,000/year", image: "/images/job4.png", position: { lat: 42.3601, lng: -71.0589 } },
      { title: "Cybersecurity Analyst", company: "SecureTech", location: "Washington, DC", price: "$125,000/year", image: "/images/job5.png", position: { lat: 38.9072, lng: -77.0369 } },
      { title: "Operations Manager", company: "LogisticsPlus", location: "Houston, TX", price: "$115,000/year", image: "/images/job1.png", position: { lat: 29.7604, lng: -95.3698 } },
      { title: "UX/UI Designer", company: "Creative Labs", location: "San Diego, CA", price: "$95,000/year", image: "/images/job2.png", position: { lat: 32.7157, lng: -117.1611 } },
      { title: "Network Engineer", company: "NetSecure", location: "Philadelphia, PA", price: "$130,000/year", image: "/images/job3.png", position: { lat: 39.9526, lng: -75.1652 } },
      { title: "AI Researcher", company: "DeepMind", location: "Mountain View, CA", price: "$150,000/year", image: "/images/job4.png", position: { lat: 37.3861, lng: -122.0839 } },
      { title: "Financial Analyst", company: "MoneyMatters", location: "Charlotte, NC", price: "$100,000/year", image: "/images/job5.png", position: { lat: 35.2271, lng: -80.8431 } },
      { title: "Social Media Manager", company: "ViralMarketing", location: "Los Angeles, CA", price: "$85,000/year", image: "/images/job1.png", position: { lat: 34.0522, lng: -118.2437 } },
      { title: "Technical Writer", company: "DocuTech", location: "Denver, CO", price: "$80,000/year", image: "/images/job2.png", position: { lat: 39.7392, lng: -104.9903 } },
      { title: "Customer Support Specialist", company: "HelpDesk Inc.", location: "Nashville, TN", price: "$65,000/year", image: "/images/job3.png", position: { lat: 36.1627, lng: -86.7816 } },
      { title: "Account Manager", company: "SalesForce", location: "Orlando, FL", price: "$90,000/year", image: "/images/job4.png", position: { lat: 28.5383, lng: -81.3792 } },
      { title: "Legal Consultant", company: "LawMax", location: "San Francisco, CA", price: "$150,000/year", image: "/images/job5.png", position: { lat: 37.7749, lng: -122.4194 } },
      { title: "Content Strategist", company: "ThinkContent", location: "Dallas, TX", price: "$105,000/year", image: "/images/job1.png", position: { lat: 32.7767, lng: -96.7970 } },
      { title: "Mobile Developer", company: "AppWorks", location: "San Jose, CA", price: "$130,000/year", image: "/images/job2.png", position: { lat: 37.3382, lng: -121.8863 } },
      { title: "Cloud Architect", company: "CloudWiz", location: "Chicago, IL", price: "$145,000/year", image: "/images/job3.png", position: { lat: 41.8781, lng: -87.6298 } },
      { title: "Data Scientist", company: "DataPros", location: "Phoenix, AZ", price: "$135,000/year", image: "/images/job4.png", position: { lat: 33.4484, lng: -112.0740 } },
      { title: "IT Support Specialist", company: "TechHelp", location: "Portland, OR", price: "$70,000/year", image: "/images/job5.png", position: { lat: 45.5051, lng: -122.6750 } },
      { title: "Business Analyst", company: "BizPro", location: "Salt Lake City, UT", price: "$105,000/year", image: "/images/job1.png", position: { lat: 40.7608, lng: -111.8910 } }
    ];

    setJobs(jobData);
  }, []);

  return jobs;
};
