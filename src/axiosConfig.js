import axios from 'axios';

// Create an instance of axios with configured defaults
const axiosInstance = axios.create({
  baseURL: 'https://drinking-acre-provide-similarly.trycloudflare.com', // Adjust with your backend URL
  withCredentials: true  // Ensure credentials (including cookies) are sent with each request
});

export default axiosInstance;
