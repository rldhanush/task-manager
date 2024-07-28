import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try{
            const apiURL = 'http://localhost:5001/api/auth/signup'
            console.log(apiURL);
            
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response === 201){
                console.log('Signup successful');
                navigate('/login');
            }
            if (response === 400){
                console.log('Signup failed');
                setError('Signup Failed');
            }
        }catch(error){
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Signup</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <button className="google-btn">Signup with Google</button>
        </div>
    );
};

export default Signup;
