import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCampaign.css'; // Create this CSS file for styling

const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new campaign object
    const newCampaign = {
      id: Math.random(), // Generate a random ID (for demo purposes)
      title,
      goal: parseFloat(goal),
      raised: 0, // Initially raised amount
      description,
    };

    // You can send this object to your server or update your state here
    console.log('New Campaign Created:', newCampaign);

    // Navigate back to the dashboard or any other page
    navigate('/dashboard');
  };

  return (
    <div className="create-campaign-container">
      <h1>Create a New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="goal">Goal ($):</label>
          <input
            type="number"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
