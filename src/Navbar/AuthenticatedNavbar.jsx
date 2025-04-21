import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

const AuthNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <p>IdealMart</p>
      </div>
     
      <ul className={`navbar-links`}>
        {/* <li><a href="/home">Home</a></li> */}
        {/* <li><a href="/chatbot/services">Services</a></li> */}
        {/* <li><a href="/chatbot/mail_connect">Contact</a></li> */}
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default AuthNavbar;
