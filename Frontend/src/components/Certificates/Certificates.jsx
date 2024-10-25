import React, { useState, useEffect } from "react";
import Popup from "./ClaimCertificates";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import StateData from "./States.json";

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
  const [states, setStates] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStates(StateData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://full-stack-bytesminders.onrender.com/api/v1/admin/GetAllWorkShop");
        if (response.data.data) {
          setWorkshops(response.data.data.filter(ws => ws.OnOffStatus === "On"));
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
        setError("Failed to fetch workshops.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWorkshopChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const workshopName = selectedOption.text;
    const workshopId = selectedOption.value;

    setFormData({
      ...formData,
      Workshop: workshopName,
      WorkShopid: workshopId,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("https://full-stack-bytesminders.onrender.com/api/v1/users/Register", formData);
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
      } else if (response.data.statusCode === 409) {
        toast.info("Request is already sent with this phone and email.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response?.status === 409) {
        setError(error.response.data.data.error);
        toast.error(error.response.data.data.error);
      } else if (error.response?.status === 400) {
        toast.error("Form is now closed.");
      } else {
        setError("Error submitting the form. Please try again.");
        toast.error("Error submitting the form. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-darkBg">
      <div className="bg-darkCard p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-around mb-6">
          <button className="text-white bg-primary py-2 px-4 rounded-full">
            WORKSHOP
          </button>
          <button className="text-white py-2 px-4 rounded-full">COURSE</button>
          <button className="text-white py-2 px-4 rounded-full">INTERNSHIP</button>
        </div>
        <h1 className="text-center text-xl text-primary mb-4">Register - Workshop Certificate</h1>
        <p className="text-center text-white mb-6 font-bold text-xl">Bytes Minders</p>

        {loading ? (
          <div className="flex justify-center">
            <ThreeDots height="80" width="80" radius="9" color="#00BFFF" ariaLabel="three-dots-loading" visible={true} />
          </div>
        ) : (
          <form className="space-y-4" onSubmit={submitData}>
            <input
              onChange={handleChange}
              value={formData.FullName}
              name="FullName"
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              required
            />
            <div className="flex space-x-4">
              <input
                onChange={handleChange}
                value={formData.phone}
                name="phone"
                type="number"
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                required
              />
              <select
                onChange={handleChange}
                value={formData.state}
                name="state"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                required
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              required
            />
            <select
              onChange={handleWorkshopChange}
              value={formData.WorkShopid}
              name="Workshop"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              required
            >
              <option value="">Select Workshop</option>
              {workshops.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.WorkShopName}
                </option>
              ))}
            </select>
            <button type="submit" className="w-full py-2 mt-4 bg-primary rounded-lg text-white">
              REGISTER
            </button>
          </form>
        )}

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="mt-6 text-center text-white">
          <p>Or Claim Your Workshop Certificate:</p>
          <button
            className="w-full py-2 mt-4 bg-secondary rounded-lg text-white"
            onClick={openPopup}
          >
            Claim Workshop Certificate
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/">
            <button className="w-full py-2 mt-4 bg-accent rounded-lg text-white">
              GO BACK
            </button>
          </Link>
        </div>
      </div>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  );
};

export default Certificates;
