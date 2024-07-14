import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [lxcContainers, setLxcContainers] = useState([]);
  const apiUrl = 'http://de-prem-01.hosts.optikservers.com:35300/lxc';

  useEffect(() => {
    const fetchLxcContainers = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLxcContainers(data.data); // Assuming data structure is { data: [...] }
      } catch (error) {
        console.error('Error fetching LXC containers:', error);
      }
    };

    fetchLxcContainers();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-semibold mb-2">LXC Containers</h2>
        <div>
          {lxcContainers.map((container) => (
            <div key={container.vmid} className="border-b border-gray-200 mb-2 pb-2">
              <p className="text-gray-700">ID: {container.vmid}</p>
              <p className="text-gray-700">Status: {container.status}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
