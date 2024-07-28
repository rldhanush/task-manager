import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">🗓️</Link>
            </div>
            <div className="nav-links">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </nav>
    );
};

export default Navbar;
