import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth(); // Use the AuthContext to get the user state and logout function

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? ( // Check if the user is logged in
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
          <Link to="/dashboard">Dashboard</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
