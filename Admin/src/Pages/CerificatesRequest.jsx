import React from 'react';
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';


const CertificatesRequests = () => {
  // Sample data
  const [data , setData] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await axios.get("http://localhost:5000/api/v1/users/AllRequest") ;
      console.log(response) ;
      if(response){
        setData(response.data.data)
      }
    }

    fetchData()
  }, [])
  // Sample functions for handling actions
  const handleApprove = async (id) => {
    const response = await axios.patch(`http://localhost:5000/api/v1/users/ApproveCertificateRequest/${id}`)
    console.log(response);
    if(response){
      console.log("ok");
      
    }
    
  };

  const handleDeny = (id) => {
    alert(`Denied request with id: ${id}`);
    // Add your denial logic here
  };

  const handleDelete = (id) => {
    alert(`Deleted request with id: ${id}`);
    // Add your deletion logic here
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Certificates Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">WorkShop</th>
              <th className="py-3 px-4 text-left">Request Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((request) => (
              <tr key={request._id} className="hover:bg-gray-100">
                <td className="border-t px-4 py-3">{request.FullName}</td>
                <td className="border-t px-4 py-3">{request.Workshop}</td>
                <td className="border-t px-4 py-3">{request.email}</td>
                <td className="border-t px-4 py-3">{new Date(request.createdAt).toLocaleString()}</td>
                <td className="border-t px-4 py-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleApprove(request._id)}
                      className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDeny(request._id)}
                      className="bg-yellow-600 text-white p-2 rounded-full hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CertificatesRequests;
