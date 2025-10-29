import { useState, useEffect } from 'react';
import { AUTH_TOKEN } from '../constants';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    // const user_type = localStorage.getItem("user_type");
    setUserType(localStorage.getItem("user_type"));
    console.log(AUTH_TOKEN);
    if (token) {
      // Add additional validation if needed (e.g., making an API request to validate the token)
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return {isAuthenticated,userType};
};

export default useAuth;
