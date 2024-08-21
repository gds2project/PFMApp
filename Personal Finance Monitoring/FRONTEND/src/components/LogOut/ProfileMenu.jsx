import React, { useEffect, useRef, useState } from 'react';
import { FaUserCircle, FaPhone, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useAuth } from '../Authentication/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Axios_request from '../Axios_request';
import { FaPeopleGroup } from 'react-icons/fa6';

const ProfileMenu = ({ toastRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle the dropdown open/close state
  const toggleDropdown = () => setIsOpen(prev => !prev);

  // Close the dropdown if clicked outside of it
  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Handle logout action
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios_request("get", "/logout", {});
      console.log(response.data);
      logout();
      navigate('/login');
      toastRef.current.showToast('Logout successful..!');
    } catch (error) {
      alert('Error logging out user!');
    }
  };

  // Add and remove event listeners for clicks outside the dropdown
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeDropdown);
    } else {
      document.removeEventListener('click', closeDropdown);
    }

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isOpen]);

  // Handle mouse leave to close the dropdown
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className="dropdown" 
      ref={dropdownRef}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="d-flex align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <FaUserCircle size={24} />
        {/* <FaCaretDown style={{ marginLeft: '5px' }} /> */}
      </div>

      {isOpen && (
        <div className="dropdown-menu show" style={{ position: 'absolute', right: '0px' }}>
          <Link className="dropdown-item" to="/profile">
            <FaUserCircle className="mr-2" /> Profile
          </Link>
          <Link className="dropdown-item" to="/loginHome">
            <FaHome className="mr-2" /> My Home
          </Link>
          <Link className="dropdown-item" to="/contacts">
            <FaPeopleGroup className="mr-2" /> Your Contacts
          </Link>
          <Link className="dropdown-item" to="/feedback">
            <FaPhone className="mr-2" /> Feedback
          </Link>
          <Link className="dropdown-item" onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" /> Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
