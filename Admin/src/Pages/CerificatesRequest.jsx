import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CertificatesRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/AllRequest", {
          withCredentials: true,
        });
        setData(response.data.data);
        toast.success("Data Fetched Successfully");
      } catch (error) {
        toast.error("Failed to fetch data");
        navigate('/'); // Redirect if there's an error
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/users/ApproveCertificateRequest/${id}`, {}, {
        withCredentials: true,
      });
      // setData(data.filter((request) => request._id !== id));
      toast.success("User Approved");
    } catch (error) {
      toast.error("Failed to approve user");
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/users/DenyCertificateRequest/${id}`, {}, {
        withCredentials: true,
      });
      // setData(data.filter((request) => request._id !== id));
      toast.error("User Denied");
    } catch (error) {
      toast.error("Failed to deny user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/users/DeleteRequest/${id}`, {
        withCredentials: true,
      });
      setData(data.filter((request) => request._id !== id));
      toast.error("Request deleted");
    } catch (error) {
      toast.error("Failed to delete request");
    }
  };

  async function ApproveAll(){
    try {
     const res = await axios.patch(`http://localhost:5000/api/v1/users/acceptAllreq`, {}, {
        withCredentials: true,
      });
      if(res){

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete request");
    }
    
  }
  
  async function DenyAll(){
    
    try {
     const res = await axios.patch(`http://localhost:5000/api/v1/users/DeniedAllReq`, {}, {
        withCredentials: true,
      });
      if(res){
  
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to denied request");
    }
  }

  async function DeleteAll(){
    try {
      await axios.delete(`http://localhost:5000/api/v1/users/DeleteAllReq`, {
        withCredentials: true,
      });
      setData(data.filter((request) => request._id !== id));
      toast.error("All Request deleted");
    } catch (error) {
      toast.error("Failed to delete request");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-lg w-full shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Certificates Requests</h1>


      <div className="space-x-2 pb-2">
        <button
          onClick={ApproveAll}
          className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
        >
          <FaCheck />
        </button>
        <button
          onClick={DenyAll}
          className="bg-yellow-600 text-white p-2 rounded-full hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
        >
          <FaTimes />
        </button>
        <button
          onClick={DeleteAll}
          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
        >
          <FaTrash />
        </button>
      </div>




      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Workshop</th>
              <th className="py-3 px-4 text-left">Request Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((request) => (
              <tr key={request._id} className="hover:bg-gray-100">
                <td className="border-t px-4 py-3">{request.FullName}</td>
                <td className="border-t px-4 py-3">{request.email}</td>
                <td className="border-t px-4 py-3">{request.Workshop}</td>
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
};

export default CertificatesRequests;
