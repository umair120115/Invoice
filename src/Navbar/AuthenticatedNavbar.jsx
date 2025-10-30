// ---------------------------------------------------------------------------
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import '../styles/Navbar.css'; // <-- TRIPLE-CHECK THIS PATH!
import useAuth from './NavAuth';
import Logo from '../assets/logoidealmart.png'; // <-- TRIPLE-CHECK THIS PATH!
import '../styles/Navbar.css'
const AuthNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userType } = useAuth();
  const { pathname } = useLocation();

  // Navigation state configuration
  const navStates = {
    admin: {
      '/home': {
        title: 'Home',
        links: [
          { path: '/winnerlist', label: 'Winner List' },
          { path: '/email', label: 'Email' },
          { path: '/updated-mobile', label: 'Mobile Notification' },
          { path: '/logout', label: 'Logout' },
        ],
      },
      '/winnerlist': {
        title: 'Winner List',
        links: [
          { path: '/home', label: 'Store List' },
          { path: '/logout', label: 'Logout' },
        ],
      },
    },
    storeOwner: {
      '/storedash': {
        title: 'Store Dashboard',
        links: [
          { path: '/orderdash', label: 'Order Dashboard' },
          { path: '/analyticsdash', label: 'Analytics Dashboard' },
          { path: '/logout', label: 'Logout' },
        ],
      },
      '/orderdash': {
        title: 'Order Dashboard',
        links: [
          { path: '/storedash', label: 'Home' },
          { path: '/analyticsdash', label: 'Analytics Dashboard' },
          { path: '/logout', label: 'Logout' },
        ],
      },
      '/analyticsdash': {
        title: 'Analytics',
        links: [
          { path: '/storedash', label: 'Home' },
          { path: '/orderdash', label: 'Order Dashboard' },
          { path: '/logout', label: 'Logout' },
        ],
      },
    },
  };

  const defaultState = {
    title: 'iDealMart',
    links: [
      { path: '/home', label: 'Store List' },
      { path: '/winnerlist', label: 'Winner List' },
      { path: '/logout', label: 'Logout' },
    ],
  };

  const currentState = navStates[userType]?.[pathname] || defaultState;

  return (
    <nav className="navbar">
      {/* --- LEFT SIDE --- */}
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo-link">
          <img src={Logo} alt="iDealMart Logo" className="navbar-logo-img" />
        </Link>
        {currentState.title && (
          <span className="navbar-title">{currentState.title}</span>
        )}
      </div>

      {/* --- RIGHT SIDE --- */}
      <div className="navbar-navigation">
        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          {currentState.links.map((link) => (
            <li key={link.path}>
              <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AuthNavbar;
