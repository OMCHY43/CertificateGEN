import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from "react-router-dom"

const Verifyed = () => {
  const { id } = useParams();
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://certificate-gen-c66k.onrender.com/api/v1/users/Verify/${id}`);
      console.log(response);
      if (response.data && response.data.data.certificate.length > 0) {
        setCertificateData(response.data.data.certificate[0]); 
      }
    }

    fetchData();
  }, [id]);

  if (!certificateData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center transform hover:scale-105 transition-transform duration-500"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1 
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          🎉 Congratulations, {certificateData.FullName}!
        </motion.h1>
        <p className="text-xl text-gray-700 mb-8">
          You have successfully completed the {certificateData.Workshop}<span className="font-bold"></span>.
        </p>
        <motion.div
          className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl shadow-inner mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-lg text-gray-600">
            <strong>Category: {certificateData.Category}</strong>
          </p>
          <p className="text-lg text-gray-600">
            <strong>Completion Date: {new Date(certificateData.createdAt).toLocaleDateString()}</strong>
          </p>
        </motion.div>
        <motion.div
          className="bg-gray-100 rounded-lg p-6 shadow-lg"
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50, delay: 0.6 }}
        >
          <p className="text-lg text-gray-700 font-medium"><strong>Name: {certificateData.FullName}</strong></p>
          <p className="text-lg text-gray-700 font-medium"><strong>Email: {certificateData.email}</strong></p>
          <p className="text-lg text-gray-700 font-medium"><strong>Phone: {certificateData.phone}</strong></p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Verifyed;
