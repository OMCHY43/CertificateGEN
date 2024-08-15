import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
    const [isRegistered, setIsRegistered] = useState(false); // Check if admin is already registered

    const navigate = useNavigate();

    // Check if admin already exists on component mount
    useEffect(() => {
        const checkAdminExists = async () => {
            try {
                const res = await axios.get('https://full-stack-bytesminders.onrender.com/api/v1/Admin/Check');
                setIsRegistered(res.data.exists); // Assuming your backend returns 'exists: true/false'
            } catch (err) {
                console.error("Error checking admin existence:", err);
            }
        };
        checkAdminExists();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                // Handle registration
                const res = await axios.post('https://full-stack-bytesminders.onrender.com/api/v1/Admin/Register', formData);
                alert("Registration successful! Please login.");
                setIsRegistering(false); // Switch to login after registration
                setIsRegistered(true);   // Admin is now registered
            } else {
                // Handle login
                const res = await axios.post('https://full-stack-bytesminders.onrender.com/api/v1/Admin/Login', formData);
                localStorage.setItem('token', res.data.token);
                navigate("/"); // Redirect to the main page after successful login
            }
        } catch (err) {
            setError(isRegistering ? 'Registration failed' : 'Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    {isRegistering ? 'Register Admin' : 'Admin Login'}
                </h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
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
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

                {/* Toggle between login and registration */}
                {isRegistered ? (
                    <p className="mt-4 text-sm text-gray-600">
                        First time here?{' '}
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={() => setIsRegistering(true)}
                        >
                            Register here
                        </button>
                    </p>
                ) : null}
            </div>
        </div>
    );
};

export default AdminLogin;
