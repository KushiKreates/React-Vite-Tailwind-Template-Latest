import React, { useEffect } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import anime from 'animejs/lib/anime.es.js';

// Button Component
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Card Component
const Card = ({ children, className, ...props }) => (
  <div className={`bg-pink-200 p-8 space-y-6 shadow-lg rounded-lg transform transition-transform hover:scale-105 ${className}`} {...props}>
    {children}
  </div>
);

const Shop = () => {
  useEffect(() => {
    // Animate cards on load
    anime({
      targets: '.pricing-card',
      translateY: [50, 0],
      opacity: [0, 1],
      easing: 'easeOutQuad',
      duration: 800,
      delay: anime.stagger(100),
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <SideBar />
      <main className="flex-1 p-8 bg-gray-800 rounded-tl-lg overflow-y-auto">
        <div className="container mx-auto p-4">
          <Header />
          <div className="bg-gray-900 shadow-md rounded-md p-8">
            <h1 className="text-6xl font-bold mb-13 text-">Shop</h1>
            <section id="pricing" className="py-12 md:py-20 lg:py-28">
              <div className="container px-4 md:px-6 grid gap-8 md:gap-12">
                <div className="text-center space-y-4 md:space-y-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">Plans</h2>
                  
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <Card className="pricing-card">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white">Free</h3>
                      <p className="text-4xl font-bold text-white">$0</p>
                      <p className="text-gray-400">per month</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-white">What's Included</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li>2 vCPU</li>
                        <li>4 GB RAM</li>
                        <li>20 GB HDD Storage</li>
                        <li>30 GB Bandwidth</li>
                        <li>1 Dedicated IP</li>
                      </ul>
                    </div>

                  </Card>
                  <Card className="pricing-card">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-pink-500">Developer</h3>
                      <p className="text-4xl font-bold text-pink-500">$5</p>
                      <p className="text-pink-500">per month</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-pink-500">What's Included</h4>
                      <ul className="space-y-2 text-pink-500">
                        <li>4 vCPU</li>
                        <li>8 GB RAM</li>
                        <li>90 GB HDD Storage</li>
                        <li>1 TB Bandwidth</li>
                        <li>2 Dedicated IP</li>
                        <li>Cloud IDE</li>
                      </ul>
                    </div>
               
                  </Card>
                  <Card className="pricing-card">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-purple-300">Pro</h3>
                      <p className="text-4xl font-bold text-purple-300">$12</p>
                      <p className="text-purple-300">per month</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-purple-300">What's Included</h4>
                      <ul className="space-y-2 text-purple-300">
                        <li>16 vCPU</li>
                        <li>24 GB RAM</li>
                        <li>800 GB HDD Storage</li>
                        <li>4 TB Bandwidth</li>
                        <li>2 Dedicated IPs</li>
                        <li>Cloud IDE</li>
                      </ul>
                    </div>
                    
                  </Card>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
