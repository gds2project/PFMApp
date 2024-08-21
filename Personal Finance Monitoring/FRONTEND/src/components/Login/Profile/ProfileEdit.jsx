// src/ProfileEdit.js
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import Axios_request from '../../Axios_request';

const ProfileEdit = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
   // const [currentPassword, setCurrentPassword] = useState('');
   // const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    // Fetch profile data when component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await Axios_request("get",'/user',{})
                const profile = response.data;
                setFirstName(profile.firstName);
                setLastName(profile.lastName);
                setMobile(profile.mobile);
                setGender(profile.gender);
                setDob(profile.dob);
            } catch (error) {
                setMessage('Error fetching profile data.');
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            await Axios_request("put",'/users', {
                firstName,
                lastName,
                mobile,
                gender,
                dob//,
                //currentPassword,
                //newPassword
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Error updating profile.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '600px' }}>
                <h2 className="mb-4 text-center">Edit Profile</h2>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mobile No.</label>
                    <input
                        type="text"
                        className="form-control"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                        <option value="O">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div> */}
                <button
                    className="btn btn-primary w-100"
                    onClick={handleSave}
                >
                    Save
                </button>
                {message && <p className="mt-3 text-danger text-center">{message}</p>}
            </div>
        </div>
    );
};

export default ProfileEdit;
