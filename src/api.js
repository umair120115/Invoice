
import axios from 'axios';
import { AUTH_TOKEN } from './constants'; 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL // Make sure your API base URL is configured
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      // Use 'Token <key>' format for DRF Token Authentication
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;