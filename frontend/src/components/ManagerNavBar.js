import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './Navbar.css';

const ManagerNavbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        const apiURL = 'http://localhost:5001/api/auth/logout';
        const token = localStorage.getItem('jwt_token');

        if(!token){
            console.error('No JWT token found in localStorage');
            return;
        }

        try{
            const response = await fetch(apiURL,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.status === 200){
                localStorage.removeItem('jwt_token');
                navigate('/');
            }else{
                console.error('Failed to logout');
            }

        }catch(error){
            console.error("Fetch Error ",error);
        }

    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">🗓️</Link>
            </div>
            <div className="nav-links">
                <Link onClick={handleLogout}>Logout</Link>
            </div>
        </nav>
    );
};

export default ManagerNavbar;
