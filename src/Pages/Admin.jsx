import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import anime from 'animejs/lib/anime.es.js'; // Import anime.js

const bytesToGB = (bytes) => {
  if (bytes === 0) return '0 GB';
  const gigaBytes = bytes / (1024 * 1024 * 1024);
  return gigaBytes.toFixed(2) + ' GB';
};

const Admin = () => {
  const [lxcContainers, setLxcContainers] = useState([]);
  const apiUrl = 'http://de-prem-01.hosts.optikservers.com:35300/lxc';

  useEffect(() => {
    const fetchLxcContainers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setLxcContainers(response.data.data);

        // Animate container cards on load
        anime({
          targets: '.container-card',
          translateY: [50, 0],
          opacity: [0, 1],
          easing: 'easeOutQuad',
          duration: 800,
          delay: anime.stagger(100),
        });
      } catch (error) {
        console.error('Error fetching LXC containers:', error);
      }
    };

    fetchLxcContainers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">LXC Containers</h2>
          {lxcContainers.length === 0 ? (
            <p>No containers found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lxcContainers.map((container) => (
                <div
                  key={container.vmid}
                  className="container-card bg-gray-50 p-4 rounded-lg shadow-md"
                >
                  <div className="mb-4">
                    <p className="text-lg font-semibold">{container.name || 'No Name'}</p>
                    <p className="text-gray-500">{container.status}</p>
                  </div>
                  <div className="mb-2">
                    <p><span className="font-semibold">CPU:</span> {container.cpu}</p>
                    <p><span className="font-semibold">Memory:</span> {bytesToGB(container.mem)}</p>
                    <p><span className="font-semibold">Disk:</span> {bytesToGB(container.disk)}</p>
                    <p><span className="font-semibold">Net In:</span> {container.netin} bytes</p>
                    <p><span className="font-semibold">Net Out:</span> {container.netout} bytes</p>
                    <p><span className="font-semibold">Uptime:</span> {container.uptime} seconds</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
