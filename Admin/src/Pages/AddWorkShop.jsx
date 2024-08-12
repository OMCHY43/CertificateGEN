import React, { useState } from 'react';
import axios from 'axios';

const AddWorkShop = () => {
    const [workshopName, setWorkshopName] = useState('');
    const [fromClosing, setFromClosing] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [workshops, setWorkshops] = useState([
        { id: 1, WorkShopName: 'Workshop 1', FromClosing: '2024-08-30' },
        { id: 2, WorkShopName: 'Workshop 2', FromClosing: '2024-09-15' },
    ]);
    const [editingWorkshop, setEditingWorkshop] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (editingWorkshop) {
            // Update existing workshop
            try {
                await axios.put(`/api/workshops/${editingWorkshop.id}`, {
                    WorkShopName: workshopName,
                    FromClosing: fromClosing
                });
                setWorkshops(workshops.map(ws =>
                    ws.id === editingWorkshop.id
                        ? { ...ws, WorkShopName: workshopName, FromClosing: fromClosing }
                        : ws
                ));
                setSuccess('Workshop updated successfully!');
                setEditingWorkshop(null);
            } catch (error) {
                setError('Failed to update workshop. Please try again.');
            }
        } else {
            // Add new workshop
            try {
                const response = await axios.post('/api/workshops', {
                    WorkShopName: workshopName,
                    FromClosing: fromClosing
                });
                const newWorkshop = response.data;
                setWorkshops([...workshops, newWorkshop]);
                setSuccess('Workshop added successfully!');
            } catch (error) {
                setError('Failed to add workshop. Please try again.');
            }
        }

        setWorkshopName('');
        setFromClosing('');
    };

    const handleEdit = (workshop) => {
        setEditingWorkshop(workshop);
        setWorkshopName(workshop.WorkShopName);
        setFromClosing(workshop.FromClosing);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/workshops/${id}`);
            setWorkshops(workshops.filter(ws => ws.id !== id));
            setSuccess('Workshop deleted successfully!');
        } catch (error) {
            setError('Failed to delete workshop. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">{editingWorkshop ? 'Edit Workshop' : 'Add New Workshop'}</h1>
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {editingWorkshop ? 'Update Workshop' : 'Add Workshop'}
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
                                    <tr key={workshop.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {workshop.WorkShopName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {workshop.FromClosing}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(workshop)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(workshop.id)}
                                                className="text-red-600 hover:text-red-900"
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
