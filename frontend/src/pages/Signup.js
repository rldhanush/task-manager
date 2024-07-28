import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        //console.log(formData);
        const apiURL = 'http://localhost:5001/api/auth/signup';
        
        try{
            const response = await fetch(apiURL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 201) {
                //const data = await response.json();
                //console.log(data);
                setError('');
                navigate('/login');

            }else{
                const errorData = await response.json();
                setError("Failed Signup process");
                console.error(errorData.message);
            }            

        }catch (error) {
            setError('An error occurred. Please try again.');
            console.error("Fetch Error ",error);
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
                    autoCapitalize='none'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete='new-password'
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
            {error && <div className="error-message">{error}</div>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <button className="google-btn">Signup with Google</button>
        </div>
    );
};

export default Signup;
