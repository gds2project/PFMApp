import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenditureDonutGraph = ({ dataSource }) => {
  if (!Array.isArray(dataSource) || dataSource.length === 0) {
    return <div>No expenditure data available.</div>;
  }

  // Aggregate amounts by category
  const categoryMap = dataSource.reduce((acc, item) => {
    const category = item.category || 'Unknown';
    acc[category] = (acc[category] || 0) + (item.amount || 0);
    return acc;
  }, {});

  // Convert maps to arrays for chart
  const categoryLabels = Object.keys(categoryMap);
  const categoryData = Object.values(categoryMap);

  // Define a fixed color palette for categories
  const backgroundColors = [
    '#FF6384', // Red
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#E7E9ED', // Light grey
    '#4BC0C0'  // Teal
  ];

  // Ensure the color palette matches the number of categories
  const categoryColors = categoryLabels.map((_, index) => backgroundColors[index % backgroundColors.length]);

  // Prepare the chart data
  const chartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Categories',
        data: categoryData,
        backgroundColor: categoryColors,
        hoverBackgroundColor: categoryColors,
        borderColor: '#fff',
        borderWidth: 1,
      },
    ]
  };

  const totalExpenditure = dataSource.reduce((acc, item) => acc + (item.amount || 0), 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Expenditure Distribution</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Doughnut data={chartData} />
          <div className="text-center mt-3">
            <h5>Total Expenditure: ₹{totalExpenditure}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenditureDonutGraph;
