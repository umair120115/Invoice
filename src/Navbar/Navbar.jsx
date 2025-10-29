import React from 'react';
import useAuth from './NavAuth';
import AuthNavbar from './AuthenticatedNavbar';
import GuestNavbar from './GuestNavbar';

const Navbar = () => {
  const {isAuthenticated, userType} = useAuth();

  return isAuthenticated ? <AuthNavbar /> : <GuestNavbar />;
};

export default Navbar;
