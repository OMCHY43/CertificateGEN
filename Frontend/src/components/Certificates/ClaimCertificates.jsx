import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const Popup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [workShopId, setWorkShopId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/v1/users/ClaimCertificates",
        { email, Workshop: selectedWorkshop, WorkShopid: workShopId },
        { responseType: "arraybuffer" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "certificate.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      if (error.response?.status === 403) {
        alert("You are not approved to claim the certificate");
      } else {
        setError("Failed to claim certificate. Please check your details.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const response = await axios.get("/api/v1/admin/GetAllWorkShop");
        setWorkshops(response.data.data || []);
      } catch (error) {
        setError("Failed to load workshops.");
      }
    }
    fetchWorkshops();
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gradient-to-br from-indigo-900 via-black to-gray-900 bg-opacity-90">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform scale-100 hover:scale-105 transition-transform duration-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Claim Your Certificate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-4 focus:ring-indigo-500"
          />
          <select
            value={workShopId}
            onChange={(e) => {
              setSelectedWorkshop(e.target.options[e.target.selectedIndex].text);
              setWorkShopId(e.target.value);
            }}
            required
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-4 focus:ring-indigo-500"
          >
            <option value="">Select Workshop</option>
            {workshops.map((workshop) => (
              <option key={workshop._id} value={workshop._id}>
                {workshop.WorkShopName}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-500 transition-colors duration-300"
            >
              {loading ? (
                <ThreeDots height="20" width="20" color="#fff" />
              ) : (
                "Claim Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
