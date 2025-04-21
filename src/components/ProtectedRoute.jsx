import { Navigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants"; // Use the same constant
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null); // null = loading state

    useEffect(() => {
        // Simplified auth check on component mount
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem(AUTH_TOKEN);
        if (!token) {
            setIsAuthorized(false);

            return;
        }

        setIsAuthorized(true); 
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>; 
    }


    return isAuthorized ? children : <Navigate to='/' />; 
}

export default ProtectedRoute;