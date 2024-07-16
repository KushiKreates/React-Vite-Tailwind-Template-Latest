import React, { useEffect, useState } from 'react';
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
import { SiIcon } from 'react-icons/si';
import { auth } from '../firebase'; // Import auth from Firebase
import '../firebase'; // Ensure Firebase is initialized

const SideBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Animation configuration
    anime({
      targets: '.sidebar-animation',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: 500,
    });
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className="flex flex-col w-34 p-4 bg-gray-900">
      <div className="flex items-center justify-center h-16 mb-8">
        <img src="/logo.svg" alt="Neko-Astral Logo" className="w-12 h-12" />
      </div>
      <nav className="flex-1 space-y-4 sidebar-animation">
        <a href="/" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </a>
        <a href="/Servers" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
          <ServerIcon className="w-5 h-5" />
          <span>Servers</span>
        </a>
        <a href="/Activity" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
          <ActivityIcon className="w-5 h-5" />
          <span>Activity</span>
        </a>
        <a href="/Payment" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
          <ReceiptIcon className="w-5 h-5" />
          <span>Payment</span>
        </a>
        <a href="/Shop" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
          <StoreIcon className="w-5 h-5" />
          <span>Shop</span>
        </a>
        <a href="/Settings" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
          <SettingsIcon className="w-5 h-5" />
          <span>Settings</span>
        </a>
        {user && user.isAdmin && (
          <a href="/Admin" className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-700 hover:animate-fadeIn">
            <SiIcon className="w-5 h-5" />
            <span>Admin</span>
          </a>
        )}
      </nav>
      {user && (
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
          <span className="ml-2">{user.email}</span>
        </div>
      )}
      {user && (
        <button onClick={handleLogout} className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md">
          Logout
        </button>
      )}
    </aside>
  );
};

export default SideBar;
