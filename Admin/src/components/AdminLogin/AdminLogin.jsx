// components/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://full-stack-bytesminders.onrender.com/api/v1/Admin/Login', formData);
            localStorage.setItem('token', res.data.token);
             navigate("/")
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminLogin;
