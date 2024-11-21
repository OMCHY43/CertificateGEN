import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CertificatesRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/v1/users/AllRequest", {
          withCredentials: true,
        });

        console.log(response);
        
        setData(response.data.data);
        toast.success("Data Fetched Successfully");
      } catch (error) {
        toast.error("Failed to fetch data");
        navigate('/'); 
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`/api/v1/users/ApproveCertificateRequest/${id}`, {}, {
        withCredentials: true,
      });
      toast.success("User Approved");
    } catch (error) {
      toast.error("Failed to approve user");
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.patch(`/api/v1/users/DenyCertificateRequest/${id}`, {}, {
        withCredentials: true,
      });
      toast.error("User Denied");
    } catch (error) {
      toast.error("Failed to deny user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/users/DeleteRequest/${id}`, {
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
     const res = await axios.patch(`/api/v1/users/acceptAllreq`, {}, {
        withCredentials: true,
      });
      if(res){
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to approve all requests");
    }
  }
  
  async function DenyAll(){
    try {
     const res = await axios.patch(`/api/v1/users/DeniedAllReq`, {}, {
        withCredentials: true,
      });
      if(res){
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to deny all requests");
    }
  }

  async function DeleteAll(){
    try {
      const res = await axios.delete(`/api/v1/users/DeleteAllReq`, {
        withCredentials: true,
      });
      if(res){
        toast.error("All Requests deleted"); 
      }
    } catch (error) {
      toast.error("Failed to delete all requests");
    }
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const filteredData = data.filter(request => {
    const requestDate = new Date(request.createdAt);
    const requestDateString = requestDate.toISOString().split('T')[0];

    const matchesQuery = request.Category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          request.email.toLowerCase().includes(searchQuery.toLowerCase()) || request.Name.toLowerCase().includes(searchQuery.toLowerCase());

    const isAfterStartDate = startDate ? requestDateString >= startDate : true;
    const isBeforeEndDate = endDate ? requestDateString <= endDate : true;

    return matchesQuery && isAfterStartDate && isBeforeEndDate;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-lg w-full shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Certificates Requests</h1>

  
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Category or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Date Range Filters */}
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

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
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Request Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.map((request) => (
              <tr key={request._id} className="hover:bg-gray-100">
                <td className="border-t px-4 py-3">{request.FullName}</td>
                <td className="border-t px-4 py-3">{request.email}</td>
                <td className="border-t px-4 py-3">{request.Workshop}</td>
                <td className="border-t px-4 py-3">{request.Category}</td>
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
