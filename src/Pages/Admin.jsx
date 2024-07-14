import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [lxcContainers, setLxcContainers] = useState([]);
  const apiUrl = 'https://81.169.237.72:8006/api2/json/nodes/h3066910/lxc';
  const headers = {
    Authorization: 'PVEAPIToken=API@pve!dash-app=0e39b17b-1e8e-490c-9251-bc24407c0f5c',
  };

  useEffect(() => {
    const fetchLxcContainers = async () => {
        try {
          const response = await axios.get(apiUrl, { headers });
          setLxcContainers(response.data.data);
        } catch (error) {
          console.error('Error fetching LXC containers:', error);
          // Handle specific error cases here, such as network errors or server issues
        }
      };
      

    fetchLxcContainers();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-semibold mb-2">LXC Containers</h2>
        
        {lxcContainers.length === 0 ? (
          <p>No containers found.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {lxcContainers.map((container) => (
              <div key={container.vmid} className="py-4">
                <p className="text-lg font-semibold">{container.name}</p>
                <p>Status: {container.status}</p>
                <p>CPU: {container.cpu}</p>
                <p>Memory Usage: {container.mem} bytes</p>
                <p>Disk Usage: {container.disk} bytes</p>
                <p>Network In: {container.netin} bytes</p>
                <p>Network Out: {container.netout} bytes</p>
                <p>Uptime: {container.uptime} seconds</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
