// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios_request from '../Axios_request';
import { useAuth } from '../Authentication/AuthContext';

// Set default withCredentials to true
//axios.defaults.withCredentials = true;

const Login = ({ toastRef }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted', { email, password });
    try {
      const response = await Axios_request("post", "/login", { email, password });
      console.log('Response received', response);
      if (response.status === 200) {
        login();
        navigate('/loginHome');
        toastRef.current.showToast('Login successful..!');
      } else {
        console.error('Login failed', response);
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="container">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card p-4">
            <form className="login-form" onSubmit={handleSubmit}>
              <h3 className="text-center">Login</h3>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Id</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
              <div className="text-center mt-3">
                <Link to={`/register`}>SignUp/Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
