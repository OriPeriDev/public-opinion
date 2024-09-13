// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Create this file for specific styles for the Home component

function Home() {
  return (
    <div className="home-container">
      <h1>Public Opinion</h1>
      <div className="button-container">
        <Link to="/add">
          <button className="add-button">Add</button>
        </Link>
        <Link to="/view">
          <button className="view-button">View</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
