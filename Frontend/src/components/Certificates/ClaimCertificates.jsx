import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Popup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [Workshop , setWorkshop] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/users/ClaimCertificates',
        { email },
        { responseType: 'arraybuffer' }
      );

      // Convert response data to blob
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the blob and initiate download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'certificate.pdf';

      // Append link to the document and trigger click to start download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error claiming certificate', error);
      // Handle error (e.g., notify the user about the error)
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(()=>{
    async function FetchData(){

      const response = await axios.get("http://localhost:5000/api/v1/admin/GetAllWorkShop")
      console.log(response);
      if(response.data.data){
        setWorkshop(response.data.data)
      }
    }
    FetchData()
  } , [])

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
            {
              Workshop.map((item)=> (
                <>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none" 
                >
                <option value="" key={item._id}>Select Workshop</option>
                <option value={item.WorkShopName}>{item.WorkShopName}</option>
                </select>
                </>
              ))
            }
          <p className="text-red-500 text-xs mt-2">If facing any issues: Contact Admin of your WhatsApp Group.</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-purple-500 text-white py-2 px-4 rounded-lg">Close</button>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg">Claim Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
