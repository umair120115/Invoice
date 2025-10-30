import React from 'react';
import { Link ,useLocation} from 'react-router-dom';
import '../styles/Navbar.css'
import useAuth from './NavAuth';
import Logo from '../assets/logoidealmart.png'
const AuthNavbar = () => {
  const {isAuthenticated, userType} = useAuth();
  const location =useLocation();
  if (location.pathname==='/home' && userType ==='admin'){
    return (
      <nav className="navbar">
      <div className="navbar-logo">
      <img src={Logo} alt="iDealMart Logo" style={{ height: '40px' }} />
      <p className={'texts-navbar'}>Home</p>
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
        <img src={Logo} alt="iDealMart Logo" style={{ height: '40px' }} />
        
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
      <img src={Logo} alt="iDealMart Logo" style={{ height: '40px' }} />
        <p className={'texts-navbar'}>Store Dashboard</p>
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
      <img src={Logo} alt="iDealMart Logo" style={{ height: '40px' }} />
        <p className={'texts-navbar'}>Order Dashboard</p>
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
      <img src={Logo} alt="iDealMart Logo" style={{ height: '40px' }} />
        <p className={'texts-navbar'}>Analytics</p>
      </div>
     
      <ul className={`navbar-links`}>
      <li className={'texts-navbar'}><Link to="/storedash">Home</Link></li>
        <li className={'texts-navbar'}><Link to="/orderdash">Order Dashboard</Link></li>
        <li className={'texts-navbar'}><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
    )
  }

  else{
    return (
      <nav className="navbar">
      <div className="navbar-logo">
      <img src={Logo} alt="iDealMart Logo" style={{ height: '40px' }} />
        <p className={'texts-navbar'}>IdealMart</p>
      </div>
     
      <ul className={`navbar-links`}>
        <li className={'texts-navbar'}><Link to="/home">Store List</Link></li>
        <li className={'texts-navbar'}><Link to="/winnerlist">Winner List</Link></li>
        <li className={'texts-navbar'}><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
    )
  }
};

export default AuthNavbar;
