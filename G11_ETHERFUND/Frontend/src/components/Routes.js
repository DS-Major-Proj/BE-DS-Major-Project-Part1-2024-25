import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EtherFundHomepage from './EtherFundHomepage';
import AuthForm from './AuthForm'; // Import AuthForm

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EtherFundHomepage />} />
        <Route path="/login" element={<AuthForm />} /> {/* Login route */}
        <Route path="/signup" element={<AuthForm />} /> {/* Sign Up route */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
