import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register components required for the Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

const InvestmentDonutGraph = ({ dataSource }) => {
  if (!Array.isArray(dataSource) || dataSource.length === 0) {
    return <div>No investment data available.</div>;
  }

  // Prepare categories and aggregate amounts by category
  const categories = [...new Set(dataSource.map(item => item.category || 'Unknown'))];
  
  // Map each category to a consistent color
  const categoryColors = categories.reduce((acc, category, index) => {
    // Define a consistent color scheme
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0'];
    acc[category] = colors[index % colors.length]; // Cycle through colors if there are more categories than colors
    return acc;
  }, {});

  const categoryData = categories.map(category =>
    dataSource
      .filter(item => item.category === category)
      .reduce((acc, curr) => acc + (curr.unitCost * curr.quantity), 0)
  );

  // Prepare the chart data
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Investment Distribution by Category',
        data: categoryData,
        backgroundColor: categories.map(category => categoryColors[category]),
        hoverBackgroundColor: categories.map(category => categoryColors[category]),
        borderColor: '#fff',
        borderWidth: 1
      },
    ]
  };

  const totalInvestment = dataSource.reduce((acc, curr) => acc + (curr.unitCost * curr.quantity), 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Investment Distribution</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Doughnut data={chartData} />
          <div className="text-center mt-3">
            <h5>Total Investment: ₹{totalInvestment}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDonutGraph;
