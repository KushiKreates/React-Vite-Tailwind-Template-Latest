import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const instance = axios.create({
  baseURL: process.env.PROXMOX_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.PROXMOX_API_TOKEN,
  },
  // Axios does not support httpsAgent in browser environments
  // Configure https options directly in the request
  https: {
    rejectUnauthorized: false, // Ignore SSL certificate errors
  },
});

export default instance;
