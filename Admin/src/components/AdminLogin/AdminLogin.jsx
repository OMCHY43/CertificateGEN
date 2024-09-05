import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isAdminExists, setIsAdminExists] = useState(null); // null for loading state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAndToken = async () => {
      try {
        const adminRes = await axios.get("https://full-stack-bytesminders.onrender.com/api/v1/Admin/Check");
        setIsAdminExists(adminRes.data.exist);

        // Call the CheckToken endpoint to verify token existence
        const tokenRes = await axios.get("https://full-stack-bytesminders.onrender.com/api/v1/Admin/CheckToken", {
          withCredentials: true,
        });

        if (tokenRes.status === 200 && tokenRes.data.token) {
          console.log('Token found, redirecting to /admin');
          navigate("/admin", { replace: true });
          return; // Stop further execution if token is present
        }

      
      } catch (err) {
        console.error(err);
        setError("Error checking or token");
      }
    };

    checkAdminAndToken();
  }, [navigate]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      let res;
      if (isAdminExists) {
        // If admin exists, login
        res = await axios.post(
          "https://full-stack-bytesminders.onrender.com/api/v1/Admin/Login",
          formData,
          { withCredentials: true }
        );
        console.log(res);
        
        

      } else {
        // If admin doesn't exist, register
        res = await axios.post(
          "https://full-stack-bytesminders.onrender.com/api/v1/Admin/Register",
          formData,
          { withCredentials: true }
        );
      }

      if (res.status === 200) {
        // Cookies.set('token', res.data.token);
        console.log('Login successful, redirecting to /admin');
        navigate("/admin", { replace: true });
      } else {
        setError("Error: Unable to process request");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Invalid credentials or registration error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {isAdminExists === null ? "Loading..." : isAdminExists ? "Admin Login" : "Admin Registration"}
        </h2>
        {isAdminExists !== null && (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-label="email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-600 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-label="password"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 ${loading ? "bg-gray-500" : "bg-blue-500"
                } text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75`}
              disabled={loading}
            >
              {loading ? "Processing..." : isAdminExists ? "Login" : "Register"}
            </button>
          </form>
        )}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
