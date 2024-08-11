import React , {useState} from "react";
import Popup from "./ClaimCertificates"
import {Link} from "react-router-dom"

const Certificates = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-darkBg">
      <div className="bg-darkCard p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-around mb-6">
          <button className="text-white bg-primary py-2 px-4 rounded-full">WORKSHOP</button>
          <button className="text-white py-2 px-4 rounded-full">COURSE</button>
          <button className="text-white py-2 px-4 rounded-full">INTERNSHIP</button>
        </div>
        <h1 className="text-center text-xl text-primary mb-4">Register - Workshop Certificate</h1>
        <p className="text-center text-white mb-6 font-bold text-xl">Bytes Minders</p>

        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none" 
          />
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none" 
            />
            <select 
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none" 
            >
              <option>Select State</option>
              <option>Bihar</option>
              <option>West Bangal</option>
              <option>Goa</option>
            </select>
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none" 
          />
          <select 
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none" 
          >
            <option>Select Workshop</option>
            <option>Workshop 1</option>
            <option>Workshop 2</option>
          </select>

          <button className="w-full py-2 mt-4 bg-primary rounded-lg text-white">REGISTER</button>
        </form>

        <div className="mt-6 text-center text-white">
          <p>or Claim for Your Workshop Certificate:</p>
          <button className="w-full py-2 mt-4 bg-secondary rounded-lg text-white"
           onClick={openPopup} 
           >Claim Workshop Certificate</button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/">
          
          <button className="w-full py-2 mt-4 bg-accent rounded-lg text-white">GO BACK</button>
          </Link>
        </div>
      </div>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  );
};

export default Certificates;
