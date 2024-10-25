import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Overview = () => {
  // Temporary data
  const chartData = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
    datasets: [
      {
        label: 'Number of Students by Category',
        data: [50, 30, 70, 40, 90], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-darkCard rounded-xl shadow-lg">
      <h1 className="text-2xl text-primary mb-6">Overview</h1>
      <div className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Number of Students by Category',
              },
            },
            maintainAspectRatio: false, // Allows the chart to be responsive
          }}
          style={{ height: '400px' }} // Set the height for the chart
        />
      </div>
    </div>
  );
};

export default Overview;
