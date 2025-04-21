import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'
import Logo from '../assets/iDealMartLogoNew.png'

const GuestNavbar = () => {
  return (
    <nav className="navbar">
    <div className="navbar-logo">
      {/* <a href="/"></a> */}
      <img src={Logo} alt="iDealMart" />
    </div>
   
    <ul className={`navbar-links `}>
      {/* <li><a href="/">Home</a></li> */}
      {/* <li><a href="/chatbot/services">Services</a></li> */}
      {/* <li><a href="/">Home</a></li> */}
      {/* <li><a href="/register">Register</a></li> */}
      {/* <li><a href="/login">Login</a></li> */}
    </ul>
  </nav>
  );
};

export default GuestNavbar;
