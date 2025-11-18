
import api from "../api";
import { useState,useEffect } from "react";
import { AUTH_TOKEN } from "../constants"; // Make sure to define AUTH_TOKEN in constants.js
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Navbar from "../Navbar/Navbar";
import Logo from '../assets/iDealMartLogoNew.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
        // Auto-logout when landing on login page
        localStorage.removeItem(AUTH_TOKEN);
        // Optional: clear cookies/sessionStorage if needed
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    
    const data = {
      email: email, 
      password: password,
    };

    try {
      
      const response = await api.post("/api/accounts/admin/login/", data);

      if (response.status === 200) {
        //storing user's cred 
        localStorage.setItem(AUTH_TOKEN, response.data.token);

        // Optional: Store other user data if needed globally
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("user_name", response.data.user_name);
        localStorage.setItem("user_type", response.data.user_type);
        // Add other fields from the DRF response as needed...

        const user_type = response.data.user_type;
        if (user_type === 'admin'){
          navigate("/home");
        }
        else if (user_type === 'storeOwner'){
          navigate("/storedash");
        }
        else if (user_type==='adminManager'){
          navigate("/order-management")
        }

        // navigate("/home"); // Or your desired protected route
      } else {
         // Handle non-200 success codes if applicable, though DRF usually uses 200 or errors
         setError(response.data.error || "Login failed. Please try again.");
      }
    } catch (err) {
       // Handle errors (like 400 Bad Request for invalid credentials)
        if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
        } else {
            setError("An error occurred during login. Please try again.");
        }
        console.error("Login error:", err);
    }
  };

  return (
    <><Navbar />
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
      
        <div className="text-center mb-6">
          <img src={Logo} alt="iDealMart Logo" className="company-logo" />
        </div>

       
        <div className="welcome-text">
          <h1>Login to !DealMart</h1>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email or Username</label> {/* Changed label */}
          <input
            id="email" 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email or username"
            className="form-input"
            required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="form-input"
            required />
        </div>

      
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
    </>
  );
}

export default Login;