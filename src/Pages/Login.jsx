import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Ensure this path is correct
import anime from 'animejs';
import SideBar from './SideBar';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    anime({
      targets: '.login-container',
      opacity: [0, 1],
      translateY: [-50, 0],
      duration: 1000,
      easing: 'easeOutExpo'
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      localStorage.setItem('token', userCredential.user.accessToken);
      window.location.href = '/';
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <SideBar />
      <main className="flex-1 p-8 flex justify-center items-center bg-gray-800 rounded-tl-lg overflow-y-auto">
        <div className="login-container bg-gray-900 shadow-md rounded-md p-8 w-full max-w-md">
          <Header />
          <h2 className="text-lg font-semibold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1" htmlFor="email">Email:</label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="password">Password:</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
