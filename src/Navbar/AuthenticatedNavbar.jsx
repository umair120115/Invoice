import React from 'react';
import { Link ,useLocation} from 'react-router-dom';
import '../styles/Navbar.css'
import useAuth from './NavAuth';
const AuthNavbar = () => {
  const {isAuthenticated, userType} = useAuth();
  const location =useLocation();
  if (location.pathname==='/home' && userType ==='admin'){
    return (
      <nav className="navbar">
      <div className="navbar-logo">
        <p>IdealMart</p>
      </div>
     
      <ul className={`navbar-links`}>
        <li><Link to="/winnerlist">Winner List</Link></li>
        <li><Link to="/email"> Email </Link></li>
        <li><Link to="/updated-mobile"> Mobile Notification </Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>

    )
  }
  else if ( location.pathname==='/winnerlist' && userType ==='admin'){
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
  else if ( location.pathname ==='/storedash' && userType === 'storeOwner'){
    return (
      <nav className="navbar">
      <div className="navbar-logo">
        <p>Store Dashboard</p>
      </div>
     
      <ul className={`navbar-links`}>
        <li><Link to="/home"></Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
    )
  }
  
  else if ( location.pathname ==='/orderdash' && userType === 'storeOwner'){
    return (
      <nav className="navbar">
      <div className="navbar-logo">
        <p>Order Dashboard</p>
      </div>
     
      <ul className={`navbar-links`}>
        <li><Link to="/storedash">Home</Link></li>
        <li><Link to="/analyticsdash">Analytics Dashboard</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
    )
  }

  else if ( location.pathname ==='/analyticsdash' && userType === 'storeOwner'){
    return (
      <nav className="navbar">
      <div className="navbar-logo">
        <p>Analytics</p>
      </div>
     
      <ul className={`navbar-links`}>
      <li><Link to="/storedash">Home</Link></li>
        <li><Link to="/orderdash">Order Dashboard</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
    )
  }

  else{
    return (
      <nav className="navbar">
      <div className="navbar-logo">
        <p>IdealMart</p>
      </div>
     
      <ul className={`navbar-links`}>
        <li><Link to="/home">Store List</Link></li>
        <li><Link to="/winnerlist">Winner List</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
    )
  }
};

export default AuthNavbar;
