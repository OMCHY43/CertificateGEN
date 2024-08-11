import React from 'react';

const CertificatesRequests = () => {
  // Sample data
  const requests = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-08-11' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-08-10' },
    // Add more data as needed
  ];

  // Sample functions for handling actions
  const handleApprove = (id) => {
    console.log(`Approved request with id: ${id}`);
    // Add your approval logic here
  };

  const handleDeny = (id) => {
    console.log(`Denied request with id: ${id}`);
    // Add your denial logic here
  };

  const handleDelete = (id) => {
    console.log(`Deleted request with id: ${id}`);
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
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-100">
                <td className="border-t px-4 py-3">{request.name}</td>
                <td className="border-t px-4 py-3">{request.email}</td>
                <td className="border-t px-4 py-3">{request.email}</td>
                <td className="border-t px-4 py-3">{request.date}</td>
                <td className="border-t px-4 py-3 text-center">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(request.id)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 mx-2"
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => handleDelete(request.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
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
  );
}

export default CertificatesRequests;
