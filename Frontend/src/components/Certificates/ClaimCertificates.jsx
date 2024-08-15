import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner"; // Optional: loader spinner if needed

const Popup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(""); // To store the selected workshop
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(""); // Error state to handle any issues

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading on form submission
    setError(""); // Reset any previous errors

    try {
      const response = await axios.post(
        "https://full-stack-bytesminders.onrender.com/api/v1/users/ClaimCertificates",
        { email, Workshop: selectedWorkshop }, // Submit both email and selected workshop
        { responseType: "arraybuffer" }
      );

      // Convert response data to blob
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the blob and initiate download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "certificate.pdf";

      // Append link to the document and trigger click to start download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error claiming certificate", error);
      setError("Failed to claim certificate. Please check your details and try again.");
    } finally {
      setLoading(false); // End loading after form submission
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleWorkshopChange = (e) => {
    setSelectedWorkshop(e.target.value); // Update selected workshop
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://full-stack-bytesminders.onrender.com/api/v1/admin/GetAllWorkShop"
        );
        if (response.data.data) {
          setWorkshops(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
        setError("Failed to fetch workshops.");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Enter Valid Credential - Workshop</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Registered Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
            onChange={handleEmailChange}
            value={email}
            name="email"
            required
          />
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
            value={selectedWorkshop}
            onChange={handleWorkshopChange}
            required
          >
            <option value="">Select Workshop</option>
            {workshops.map((item) => (
              <option key={item._id} value={item.WorkShopName}>
                {item.WorkShopName}
              </option>
            ))}
          </select>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error */}
          
          <p className="text-red-500 text-xs mt-2">
            If facing any issues: Contact Admin of your WhatsApp Group.
          </p>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="#FFF"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
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
