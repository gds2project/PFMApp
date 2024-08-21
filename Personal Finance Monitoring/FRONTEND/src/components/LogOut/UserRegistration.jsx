import React, { useState } from 'react';
import Axios_request from '../Axios_request';
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
  const localDate = new Date();
  const formattedDate = localDate.toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    gender: 'm',
    dob: '',
    password: '',
    mobile: '',
    doj: formattedDate,
    isActive: true,
    otp: '' // Added OTP field to formData
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(''); // State for feedback message
  const [feedbackColor, setFeedbackColor] = useState(''); // State for feedback color

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOtpChange = (e) => {
    const otpValue = e.target.value;
    setOtp(otpValue);
    setIsOtpValid(otpValue.length === 6 && /^\d{6}$/.test(otpValue));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOtpValid) {
      const updatedFormData = { ...formData, otp };

      Axios_request("post", "/register", updatedFormData)
        .then(response => {
          if (response.data === 1) {
            alert('User registered successfully!');
            navigate('/login');
          } else if (response.data === 2) {
            alert('Email or OTP is incorrect.');
          } else {
            alert('Already registered User');
            navigate('/login');
          }
        })
        .catch(error => {
          alert('Error registering user!');
        });
    } else {
      alert('Please enter a valid OTP.');
    }
  };

  const sendOtp = (e) => {
    e.preventDefault();
    Axios_request("post", "/sendOtp", formData)
      .then(response => {
        alert('OTP sent successfully!');
        setOtpSent(true);
      })
      .catch(error => {
        alert('Error sending OTP to user!');
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    Axios_request("post", "/verifyOtp", { email: formData.email, otp: otp })
      .then(response => {
        if (response.data === 1) {
          setFeedbackMessage('OTP verified successfully!');
          setFeedbackColor('green'); // Set color for success message
          setFormDisabled(true);
          setFormData({ ...formData, otp });
        } else {
          setFeedbackMessage('Invalid OTP or Email');
          setFeedbackColor('red'); // Set color for error message
        }
      })
      .catch(error => {
        setFeedbackMessage('Error verifying OTP!');
        setFeedbackColor('red');
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">User Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Id</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={formDisabled}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={formDisabled}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={formDisabled}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                pattern="^\d{10}$"
                title="Please enter a valid 10-digit mobile number"
                disabled={formDisabled}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                disabled={formDisabled}
              >
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                disabled={formDisabled}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                title="Password must be minimum eight characters, at least one letter and one number"
                disabled={formDisabled}
              />
            </div>
            <button type="button" className="btn btn-secondary w-100 mb-3" onClick={sendOtp} disabled={formDisabled}>Send OTP</button>
            {otpSent && (
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                  pattern="^\d{6}$"
                  title="Please enter a valid 6-digit OTP"
                />
                <button type="button" className="btn btn-primary w-100 mt-3" onClick={handleOtpSubmit}>Verify OTP</button>
                {feedbackMessage && (
                  <div style={{ color: feedbackColor, marginTop: '10px' }}>
                    {feedbackMessage}
                  </div>
                )}
              </div>
            )}
            
              <button type="submit" className="btn btn-primary w-100" >Register</button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;