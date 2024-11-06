import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import './CampaignDetail.css';

// Sample data for analysis
const data = [
  { name: 'Funds Raised', value: 3000 },
  { name: 'Remaining Goal', value: 2000 },
];

const fundingHistory = [
  { month: 'Jan', raised: 500 },
  { month: 'Feb', raised: 1200 },
  { month: 'Mar', raised: 800 },
  { month: 'Apr', raised: 300 },
];

const CampaignDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  // Log the location state for debugging
  console.log('Location State:', location.state);

  // Attempt to retrieve the campaign data
  const campaign = location.state?.campaign;

  if (!campaign) {
    return <p>No campaign data available. (ID: {id})</p>;
  }

  return (
    <div className="campaign-detail-container">
      <h1>{campaign.title}</h1>
      <p>{campaign.description}</p>
      <p>Goal:10000 ${campaign.goal}</p>
      <p>Raised:5000 ${campaign.raised}</p>
      <p>Progress: {((campaign.raised / campaign.goal) * 100).toFixed(2)}%</p>
      <h2>Fundraising Analysis</h2>
      <p>{campaign.raised >= campaign.goal ? "This campaign has successfully reached its goal!" : "This campaign is still in progress."}</p>

      <h3>Funding Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#ff7300'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <h3>Funding History Over Months</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={fundingHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="raised" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <button className="donate-button">Donate Now</button>
    </div>
  );
};

export default CampaignDetail;
