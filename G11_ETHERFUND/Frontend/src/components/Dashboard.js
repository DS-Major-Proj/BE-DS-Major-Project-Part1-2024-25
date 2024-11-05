import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Dashboard.css';

// Expanded mock data for crowdfunding campaigns
const campaigns = [
  {
    id: 1,
    title: 'Eco-Friendly Packaging',
    goal: 5000,
    raised: 3000,
    description: 'Help us create sustainable packaging for everyday products.',
  },
  {
    id: 2,
    title: 'Community Garden Project',
    goal: 2000,
    raised: 1200,
    description: 'Support the development of a community garden in our neighborhood.',
  },
  {
    id: 3,
    title: 'Local Art Initiative',
    goal: 10000,
    raised: 7000,
    description: 'Fund local artists and art projects in our community.',
  },
  {
    id: 4,
    title: 'Tech for Good',
    goal: 8000,
    raised: 5000,
    description: 'Develop innovative tech solutions for non-profit organizations.',
  },
  {
    id: 5,
    title: 'Wildlife Conservation',
    goal: 6000,
    raised: 4500,
    description: 'Help us protect endangered species and their habitats.',
  },
  {
    id: 6,
    title: 'Healthy Meals for Kids',
    goal: 3000,
    raised: 2500,
    description: 'Provide nutritious meals to children in underserved communities.',
  },
  {
    id: 7,
    title: 'Local Music Festival',
    goal: 12000,
    raised: 9000,
    description: 'Support local artists and musicians at our annual music festival.',
  },
  {
    id: 8,
    title: 'Literacy for All',
    goal: 4000,
    raised: 3500,
    description: 'Promote literacy programs for children and adults in our community.',
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Crowdfunding Dashboard</h1>
      <p>Here, you can manage your projects, see funding progress, and interact with backers.</p>
      
      <div className="campaign-cards">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="card">
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>Goal: ${campaign.goal}</p>
            <p>Raised: ${campaign.raised}</p>
            <p>Progress: {((campaign.raised / campaign.goal) * 100).toFixed(2)}%</p>
            {/* Link to CampaignDetail, passing campaign data */}
            <Link to={{ pathname: `/campaign/${campaign.id}`, state: { campaign } }}>
              <button className="donate-button">Donate</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
