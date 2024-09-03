import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddWorkShop = () => {
  const [workshopName, setWorkshopName] = useState("");
  const [fromClosing, setFromClosing] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshops = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/v1/admin/GetAllWorkShop", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        const DATA = response.data.data 
        console.log(DATA);
        
        const activeWorkshops = DATA.filter(workshop => workshop.status === 'active');
        setWorkshops(activeWorkshops);
        toast.success("Data fetched successfully");
      } catch (error) {
        setError("Failed to fetch workshops. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const workshopData = { WorkShopName: workshopName, FromClosing: fromClosing };

    try {
      if (editingWorkshop) {
        // Update existing workshop
        const response = await axios.put(`http://localhost:5000/api/v1/admin/UpdateWorkShop/${editingWorkshop._id}`, workshopData, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setWorkshops(workshops.map((ws) =>
          ws._id === editingWorkshop._id ? { ...ws, ...workshopData } : ws
        ));
        setSuccess("Workshop updated successfully!");
        setEditingWorkshop(null);
      } else {
        // Add new workshop
        const response = await axios.post("http://localhost:5000/api/v1/admin/AddWorkShop", workshopData, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        const newWorkshop = response.data.data;
        setWorkshops([...workshops, newWorkshop]);
        setSuccess("Workshop added successfully!");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to process request. Please try again.");
    } finally {
      setWorkshopName("");
      setFromClosing("");
    }
  };

  const handleEdit = (workshop) => {
    setEditingWorkshop(workshop);
    setWorkshopName(workshop.WorkShopName);
    setFromClosing(workshop.FromClosing);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/admin/DeleteWorkShop/${id}`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setWorkshops(workshops.filter((ws) => ws._id !== id));
      setSuccess("Workshop deleted successfully!");
    } catch (error) {
      setError("Failed to delete workshop. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          {editingWorkshop ? "Edit Workshop" : "Add New Workshop"}
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="workshopName" className="block text-sm font-medium text-gray-700">
              Workshop Name
            </label>
            <input
              type="text"
              id="workshopName"
              value={workshopName}
              onChange={(e) => setWorkshopName(e.target.value)}
              required
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="fromClosing" className="block text-sm font-medium text-gray-700">
              From Closing Date
            </label>
            <input
              type="date"
              id="fromClosing"
              value={fromClosing}
              onChange={(e) => setFromClosing(e.target.value)}
              required
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {editingWorkshop ? "Update Workshop" : "Add Workshop"}
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Workshops List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Workshop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From Closing Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workshops.map((workshop) => (
                  <tr key={workshop._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {workshop.WorkShopName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(workshop.FromClosing).toISOString().split('T')[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(workshop)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(workshop._id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkShop;
