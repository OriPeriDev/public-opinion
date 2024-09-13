import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We'll create this file for navbar styles
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { loginWithRedirect,isAuthenticated, isLoading, user, logout } = useAuth0();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src="/logowide.png" alt="Public Opinion Logo" className="logo" />
        </Link>
      </div>
      <div className="buttons-container">
        <Link to="/add" className="nav-button upload-button">
          Upload
        </Link>
        {!isAuthenticated && !isLoading && (
          <button className="nav-button login-button" onClick={() => loginWithRedirect()}>Log In</button>
        )}
        {isAuthenticated && (
          <div className="user-info">
            <img 
              src={user.picture} 
              alt={user.name} 
              className="user-avatar" 
              onClick={toggleMenu}
            />
            {showMenu && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <button onClick={handleLogout} className="dropdown-item">Log out</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
