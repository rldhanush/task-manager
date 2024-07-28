import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        //console.log(formData);
        const baseURI = 'http://localhost:5001/api/auth/login';
        try{
            const response = await fetch(baseURI,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 200){
                const data = await response.json();
                //console.log(data);

                //store jwt token in local storage
                localStorage.setItem('jwt_token', data.token);
                //console.log("Local storage jwt",localStorage.getItem('jwt_token'));
                setError('');
                navigate('/manager');
            }
            else{
                const errorData = await response.json();
                setError("Failed Login process");
                console.error(errorData.message);
            }
        }catch (error) {
            setError('An error occurred. Please try again.');
            console.error("Fetch Error ",error);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    autoComplete='none'
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
                <button type="submit">Login</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <p>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
            <button className="google-btn">Login with Google</button>
        </div>
    );
};

export default Login;
