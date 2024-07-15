import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js'; // Import anime.js
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

const SideBar = () => {
  useEffect(() => {
    // Animation configuration
    anime({
      targets: '.header-animation',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: 500,
    });
  }, []);

  return (
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
  );
};

export default SideBar;
