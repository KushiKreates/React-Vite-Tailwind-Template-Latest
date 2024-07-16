import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';
import anime from 'animejs';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/api/user');
        setIsAuthenticated(true);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    anime({
      targets: '.loading',
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeInOutQuad',
      loop: true,
      direction: 'alternate'
    });
  }, []);

  if (isAuthenticated === null || isAdmin === null) {
    return <div className="loading text-center text-white">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
