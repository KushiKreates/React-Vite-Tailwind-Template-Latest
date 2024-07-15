// src/api/proxmoxApi.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://81.169.237.72:8006/api2/json',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'PVEAPIToken=API@pve!dash-app=0e39b17b-1e8e-490c-9251-bc24407c0f5c',
  },
  // Axios does not support httpsAgent in browser environments
  // Configure https options directly in the request
  https: {
    rejectUnauthorized: false, // Ignore SSL certificate errors
  },
});

export default instance;
