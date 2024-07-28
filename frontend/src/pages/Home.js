import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import expressLogo from '../assets/express.png';
import firebaseLogo from '../assets/firebase.png';
import reactLogo from '../assets/react.png';

function Home() {
  return (
    <div className="home-container">
      <h1>Simple Drag Drop Task Manager</h1>
      <p>This is a simple drag-and-drop task manager created using:</p>
      <div className="tech-logos">
        <img src={expressLogo} alt="Express JS" />
        <img src={firebaseLogo} alt="Firebase" />
        <img src={reactLogo} alt="React" />
      </div>
      <Link to="/login" className="btn-login">Login</Link>
    </div>
  );
}

export default Home;
