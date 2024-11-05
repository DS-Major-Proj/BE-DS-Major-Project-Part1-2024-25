import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
const Login = () => {
  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="login-btn">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;