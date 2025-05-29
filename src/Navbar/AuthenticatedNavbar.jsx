import React from 'react';
import { Link ,useLocation} from 'react-router-dom';
import '../styles/Navbar.css'

const AuthNavbar = () => {
  const location =useLocation();
  if (location.pathname==='/home'){
    return (
      <nav className="navbar">
      <div className="navbar-logo">
        <p>IdealMart</p>
      </div>
     
      <ul className={`navbar-links`}>
        <li><Link to="/winnerlist">Winner List</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>

    )
  }
  else if ( location.pathname==='/winnerlist'){
    return (
      <nav className="navbar">
      <div className="navbar-logo">
        <p>IdealMart</p>
      </div>
     
      <ul className={`navbar-links`}>
        <li><Link to="/home">Store List</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>

    )
  }
};

export default AuthNavbar;
