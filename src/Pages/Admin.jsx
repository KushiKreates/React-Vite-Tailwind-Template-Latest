import React, { useState, useEffect } from 'react';
import Header from './Header';
import anime from 'animejs/lib/anime.es.js'; // Import anime.js
import axios from 'axios';
import { Resizable } from 're-resizable';
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '../Comps/ui/avatar';
import {
  HomeIcon,
  ServerIcon,
  ActivityIcon,
  ReceiptIcon,
  StoreIcon,
  SettingsIcon
} from '../Comps/ui/Icons'; // Assuming Icons are exported from Icons.jsx

const bytesToGB = (bytes) => {
  if (bytes === 0) return '0 GB';
  const gigaBytes = bytes / (1024 * 1024 * 1024);
  return gigaBytes.toFixed(2) + ' GB';
};

const secondsToHours = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const Admin = () => {
  const [lxcContainers, setLxcContainers] = useState([]);
  const [message, setMessage] = useState('');

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

  const handlePowerOn = async (vmid) => {
    try {
      const response = await axios.post(`${apiUrl}/start/${vmid}`);
      console.log(`Successfully powered on container with VMID ${vmid}`);
      setMessage(`Container '${response.data.name}' has been powered on.`);
      fetchLxcContainers(); // Refresh containers list after action
    } catch (error) {
      console.error(`Error powering on container with VMID ${vmid}:`, error);
    }
  };

  const handlePowerOff = async (vmid) => {
    try {
      const response = await axios.post(`${apiUrl}/stop/${vmid}`);
      console.log(`Successfully powered off container with VMID ${vmid}`);
      setMessage(`Container '${response.data.name}' has been powered off.`);
      fetchLxcContainers(); // Refresh containers list after action
    } catch (error) {
      console.error(`Error powering off container with VMID ${vmid}:`, error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <aside className="flex flex-col w-64 p-4 bg-gray-900">
        <div className="flex items-center justify-center h-16 mb-8">
          <img src="/logo.svg" alt="Neko-Astral Logo" className="w-12 h-12" />
        </div>
        <nav className="flex-1 space-y-4">
          <a href="#" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
            <ServerIcon className="w-5 h-5" />
            <span>Servers</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
            <ActivityIcon className="w-5 h-5" />
            <span>Activity</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
            <ReceiptIcon className="w-5 h-5" />
            <span>Payment</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
            <StoreIcon className="w-5 h-5" />
            <span>Shop</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>
        <div className="flex items-center justify-center h-16 mt-8">
          <Resizable
            defaultSize={{
              width: 26,
              height: 26,
            }}
          >
            <Avatar>
              <AvatarImage src="/user.svg" className="avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Resizable>
          <span className="ml-2">Username</span>
        </div>
      </aside>
      <main className="flex-1 p-8 bg-gray-800 rounded-tl-lg overflow-y-auto">
        <div className="container mx-auto p-4">
          <div className="bg-gray-900 shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2">LXC Containers</h2>
            {lxcContainers.length === 0 ? (
              <p>No containers found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lxcContainers.map((container) => (
                  <div
                    key={container.vmid}
                    className="container-card bg-gray-800 p-4 rounded-lg shadow-md relative"
                  >
                    <div className="mb-4">
                      <p className="text-lg font-semibold">{container.name || 'No Name'}</p>
                      <p className="text-gray-400">{container.status}</p>
                    </div>
                    <div className="mb-2">
                      <p><span className="font-semibold">CPU:</span> {container.cpu}</p>
                      <p><span className="font-semibold">Memory:</span> {bytesToGB(container.mem)}</p>
                      <p><span className="font-semibold">Disk:</span> {bytesToGB(container.disk)}</p>
                      <p><span className="font-semibold">Network In:</span> {bytesToGB(container.netin)}</p>
                      <p><span className="font-semibold">Network Out:</span> {bytesToGB(container.netout)}</p>
                      <p><span className="font-semibold">Uptime:</span> {secondsToHours(container.uptime)}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                      <button
                        onClick={() => handlePowerOn(container.vmid)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Power On
                      </button>
                      <button
                        onClick={() => handlePowerOff(container.vmid)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Power Off
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {message && (
              <div className="mt-4 p-2 bg-gray-600 rounded-md">
                <p className="text-green-300">{message}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
