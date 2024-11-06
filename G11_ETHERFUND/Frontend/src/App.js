import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import EtherFundHomepage from './components/EtherFundHomepage';
import CampaignDetail from './components/CampaignDetail'; 
import CreateCampaign from './components/CreateCampaign'; 
import AuthForm from './components/AuthForm'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<EtherFundHomepage />} />
        <Route path="/" element={<EtherFundHomepage />} />
        <Route path="/createcampaign" element={<CreateCampaign />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} /> {/* Dynamic route for campaign details */}
        <Route path="/auth" element={<AuthForm />} /> {/* Authentication route */}
      </Routes>
    </Router>
  );
}

export default App;
