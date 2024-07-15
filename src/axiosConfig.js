
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Make sure this matches your Express server's URL
  withCredentials: true, // This ensures cookies are sent with requests
});

export default axiosInstance;
