import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddWorkShop = () => {
  const [workshopName, setWorkshopName] = useState("");
  const [EventEndDate , setEventEndDate] = useState("") ;
  const [EventDate , setEventDate] = useState("") ;
  const [fromClosing, setFromClosing] = useState("");
  const [Category, setCategory] = useState("");
  const [Type, setType] = useState("")
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
        const response = await axios.get("/api/v1/admin/GetAllWorkShop", {
          withCredentials: true,
        });
        setWorkshops(response.data.data);
        toast.success("Data fetched successfully");
      } catch (error) {
        setError("Failed to fetch workshops. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);


  const OnOffForm = async (id, OnOffStatus) => {
    try {
      const res = await axios.put(`/api/v1/admin/OnOffForm/${id}`, { OnOffStatus }, {
        withCredentials: true
      });
      console.log(res);

      const updatedWorkshops = workshops.map(ws =>
        ws._id === id ? { ...ws, OnOffStatus } : ws
      );
      setWorkshops(updatedWorkshops);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to update workshop status");
    }
  };

  // Add or update workshop
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const workshopData = { WorkShopName: workshopName, FromClosing: fromClosing, Category, Type , EventDate , EventEndDate };

    try {
      if (editingWorkshop) {
        // Edit workshop
        const response = await axios.put(`/api/v1/admin/UpdateWorkShop/${editingWorkshop._id}`, workshopData, {
          withCredentials: true,
        });
        // Update the workshop in the list
        setWorkshops(workshops.map((ws) =>
          ws._id === editingWorkshop._id ? { ...ws, ...workshopData } : ws
        ));
        setSuccess("Workshop updated successfully!");
        setEditingWorkshop(null);
      } else {
        // Add new workshop
        const response = await axios.post("/api/v1/admin/AddWorkShop", workshopData, {
          withCredentials: true,
        });
        setWorkshops([...workshops, response.data.data]);
        setSuccess("Workshop added successfully!");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to process request. Please try again.");
    } finally {
      // Reset form fields
      setWorkshopName("");
      setFromClosing("");
      setCategory("");
    }
  };

  const handleEdit = (workshop) => {
    setEditingWorkshop(workshop);
    setWorkshopName(workshop.WorkShopName);
    setFromClosing(workshop.FromClosing);
    setCategory(workshop.Category);
  };

  // Delete workshop
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/DeleteWorkShop/${id}`, {
        withCredentials: true,
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

        {/* Workshop Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Workshop Name</label>
            <input
              type="text"
              value={workshopName}
              onChange={(e) => setWorkshopName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Event Date</label>
            <input
              type="date"
              value={EventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Event end date</label>
            <input
              type="date"
              value={EventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">From Closing Date</label>
            <input
              type="date"
              value={fromClosing}
              onChange={(e) => setFromClosing(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={Type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 mt-1 w-44"
            >
              <option value="">Select types</option>
              <option value="Workshop">Workshop</option>
              <option value="Internship">Internship</option>
              <option value="Course">Course</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {editingWorkshop ? "Update Workshop" : "Add Workshop"}
            </button>
          </div>
        </form>

        {/* Workshops List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Workshops List</h2>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th>Workshop Name</th>
                  <th>From Closing Date</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Actions</th>
                  <th>Event Date</th>
                  <th>Event end date</th>
                  <th>On / Off</th>
                </tr>
              </thead>
              <tbody className="w-full bg-white divide-y divide-gray-200">
                {workshops.map((workshop) => (
                  <tr key={workshop._id}>
                    <td>{workshop.WorkShopName}</td>
                    <td>{new Date(workshop.FromClosing).toISOString().split('T')[0]}</td>
                    <td>{workshop.Category}</td>
                    <td>{workshop.Type}</td>
                    <td>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                        onClick={() => handleEdit(workshop)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                        onClick={() => handleDelete(workshop._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>{new Date(workshop.EventDate).toISOString().split('T')[0]}</td>
                    <td>{new Date(workshop.EventEndDate).toISOString().split('T')[0]}</td>
                    <td>
                      <select
                        value={workshop.OnOffStatus}
                        onChange={(e) => OnOffForm(workshop._id, e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="On">On</option>
                        <option value="Off">Off</option>
                      </select>
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
