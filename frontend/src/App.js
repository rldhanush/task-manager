// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ManagerNavBar from './components/ManagerNavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Manager from './pages/Manager';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ConditionalNavbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/manager" element={<Manager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  return location.pathname === '/manager' ? <ManagerNavBar/> : <Navbar />;
}

export default App;
