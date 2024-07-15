import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Shop from './Pages/Shop';
import Settings from './Pages/Settings';
import Activity from './Pages/Activity';
import Servers from './Pages/Servers';
import User from './Pages/User';
import Header from './Pages/Header';
import SideBar from './Pages/SideBar';

const App = () => {
  return (
    <Router>
     
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/servers" element={<Servers />} />
              <Route path="/user" element={<User />} />
            </Routes>
    </Router>
  );
}

export default App;
