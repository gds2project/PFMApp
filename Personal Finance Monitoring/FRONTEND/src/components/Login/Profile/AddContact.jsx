import React, { useState } from 'react';
import Axios_request from '../../Axios_request';
import { useNavigate } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

const AddContact = () => {
  const [searchBy, setSearchBy] = useState('email');
  const [inputValue, setInputValue] = useState('');
  const [contactData, setContactData] = useState(null);
  const navigate=useNavigate();

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setInputValue('');
    setContactData(null);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const requestBody = { [searchBy]: inputValue };
      const response = await Axios_request("post",
        "/findUser",
        requestBody
      );
      setContactData(response.data);
    } catch (error) {
      console.error('Error fetching contact data:', error);
      setContactData(null);
    }
  };
  

  const handleAddContact = async () => {
    if (!contactData) return;
    try {
      await Axios_request("post",
        "/contact",
        { email: contactData.email }
      ).then(response => {
        if(response.data === 1){
          alert('Contact added successfully');
          navigate(`/contacts`);
        }
        else alert('Error adding contact ');
      })      
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };
  


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Add Contact</h2>
        <div className="mb-3">
          <label htmlFor="searchBy" className="form-label">Search by</label>
          <select
            id="searchBy"
            className="form-select"
            value={searchBy}
            onChange={handleSearchByChange}
          >
            <option value="email">Email</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="searchInput" className="form-label">
            {searchBy === 'email' ? 'Email Address' : 'Mobile Number'}
          </label>
          <input
            type={searchBy === 'email' ? 'email' : 'tel'}
            id="searchInput"
            className="form-control"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleSearch}
        >
          Search
        </button>
        {contactData && (
          <>
            <div className="mb-3">
              <h5>Contact Information</h5>
              <p><strong>First Name:</strong> {contactData.firstName}</p>
              <p><strong>Last Name:</strong> {contactData.lastName}</p>
              <input type="hidden" value={contactData.email} />
            </div>
            <button
              className="btn btn-success w-100"
              onClick={handleAddContact}
            >
              Add Contact
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddContact;
