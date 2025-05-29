import { useState, useEffect } from 'react';
import { AUTH_TOKEN } from '../constants';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    console.log(AUTH_TOKEN);
    if (token) {
      // Add additional validation if needed (e.g., making an API request to validate the token)
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};

export default useAuth;
