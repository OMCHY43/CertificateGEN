import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Popup from "./ClaimCertificates";
import states from "./States.json"

const Certificates = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    phone: "",
    state: "",
    Workshop: "",
    WorkShopid: "",
  });
  const [workshops, setWorkshops] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWorkshops() {
      setLoading(true);
      try {
        const response = await axios.get("https://certificate-gen-c66k.onrender.com/api/v1/admin/GetAllWorkShop");
        setWorkshops(response.data.data || []);
      } catch (error) {
        setError("Failed to load workshops.");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkshops();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://certificate-gen-c66k.onrender.com/api/v1/users/Register", formData);
      alert(response.data.message || "Registration successful!");
    } catch (error) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-800 to-black flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Register for Workshop
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="FullName"
            placeholder="Full Name"
            value={formData.FullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-4 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-4 focus:ring-purple-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 appearance-none shadow-lg hover:shadow-xl transition-shadow"
          />
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 appearance-none shadow-lg hover:shadow-xl transition-shadow"
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            name="Workshop"
            value={formData.WorkShopid}
            onChange={(e) =>
              setFormData({
                ...formData,
                Workshop: e.target.options[e.target.selectedIndex].text,
                WorkShopid: e.target.value,
              })
            }
            required
            className="w-full px-4 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 appearance-none shadow-lg hover:shadow-xl transition-shadow"
          >
            <option value="">Select Workshop</option>
            {workshops.map((workshop) => (
              <option key={workshop._id} value={workshop._id}>
                {workshop.WorkShopName}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg hover:from-indigo-500 hover:to-purple-600"
          >
            {loading ? <ThreeDots height="20" width="20" color="#fff" /> : "Register"}
          </button>
        </form>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-full py-2 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg"
        >
          Claim Certificate
        </button>
      </div>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Certificates;
