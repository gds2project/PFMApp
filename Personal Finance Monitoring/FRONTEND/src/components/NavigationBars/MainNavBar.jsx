import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';
import LoginButton from '../LogOut/LoginButton';
import ProfileMenu from '../LogOut/ProfileMenu';
import BalanceComponent from '../Login/BalanceComponent';

const MainNavBar = ({ toastRef }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div style={{ backgroundColor: '' }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to={"/home"}>
            <img
              src={require('../../Assets/Images/Arise_Logo.jpg')}
              alt="Logo"
              width="60" // Increased size
              height="48" // Increased size
              className="d-inline-block align-text-top"
              style={{ marginRight: '10px' }} // Optional: Add space between logo and text
            />
            <span>Arise</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="nav nav-underline me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`/home`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/contactUs`}>
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/faq`}>
                  FAQ
                </Link>
              </li>
              <li className="nav-item" style={{ position: 'absolute', right: '60px' }}>
                {isAuthenticated ? <BalanceComponent /> : ''}
              </li>
              <li className="nav-item" style={{ position: 'absolute', right: '10px' }}>
                {isAuthenticated ? <ProfileMenu toastRef={toastRef} /> : <LoginButton />}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainNavBar;
