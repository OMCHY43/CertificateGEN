import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isAdminExists, setIsAdminExists] = useState(false);
    const [hasCheckedAdmin, setHasCheckedAdmin] = useState(false); // Added state to track if admin check has been completed

    const navigate = useNavigate();
    const hasNavigated = useRef(false); // Track if redirection has already occurred

    useEffect(() => {
        // If token is present in localStorage, navigate to /admin
        if (localStorage.getItem('token')) {
            if (!hasNavigated.current) { // Prevent multiple redirects
                hasNavigated.current = true;
                navigate("/admin", { replace: true });
            }
            return;
        }

        // Check if admin exists, but only do this once
        const checkAdminExists = async () => {
            try {
                const res = await axios.get('https://full-stack-bytesminders.onrender.com/api/v1/Admin/Check');
                setIsAdminExists(res.data.exist);
            } catch (err) {
                console.error(err);
                setError('Error checking admin existence');
            } finally {
                setHasCheckedAdmin(true); // Mark admin check as completed
            }
        };

        // Call the admin existence check only if it hasn't been done yet
        if (!hasCheckedAdmin) {
            checkAdminExists();
        }
    }, [navigate, hasCheckedAdmin]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (isAdminExists) {
                // If admin exists, login
                res = await axios.post('https://full-stack-bytesminders.onrender.com/api/v1/Admin/Login', formData);
                console.log(res);
                
            } else {
                // If admin doesn't exist, register
                res = await axios.post('https://full-stack-bytesminders.onrender.com/api/v1/Admin/Register', formData);
            }

            // Store the token and navigate to /admin
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                if (!hasNavigated.current) { // Prevent multiple redirects
                    hasNavigated.current = true;
                    navigate("/admin", { replace: true });
                }
            } else {
                setError('Error: No token received');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid credentials or registration error');
        }
    };

    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    {isAdminExists ? 'Admin Login' : 'Admin Registration'}
                </h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        {isAdminExists ? 'Login' : 'Register'}
                    </button>
                </form>
                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;
