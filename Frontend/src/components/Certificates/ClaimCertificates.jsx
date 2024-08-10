import React, { useState } from "react";
const Popup = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-bold mb-4">Enter Valid Credential - Workshop</h2>
          <form className="space-y-4">
            <input 
              type="email" 
              placeholder="Enter Registered Email" 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
            />
            <select 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none "
            >
              <option>Select Workshop</option>
              <option>Workshop 1</option>
              <option>Workshop 2</option>
            </select>
            <p className="text-red-500 text-xs mt-2">If facing any issues: Contact Admin of your WhatsApp Group.</p>
          </form>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={onClose} className="bg-purple-500 text-white py-2 px-4 rounded-lg">Close</button>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg">Claim Now</button>
          </div>
        </div>
      </div>
    );
  };

  export default Popup