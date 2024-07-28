
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const ManagerNavbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">🗓️</Link>
            </div>
            <div className="nav-links">
                <Link to="/logout">Logout</Link>
            </div>
        </nav>
    );
};

export default ManagerNavbar;
