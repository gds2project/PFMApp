import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register components required for the Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeGraph = ({ dataSource }) => {
  // Check if dataSource is an array and has data
  if (!Array.isArray(dataSource) || dataSource.length === 0) {
    return <div>No income data available for today.</div>;
  }

  // Create a mapping of income sources to unique colors
  const backgroundColors = [
    '#FF6384', // Example color
    '#36A2EB',
    '#1fe1e1',
    '#FFCE56',
    '#ea69e1'
  ];

  const incomeSourceColorMap = {};
  const incomeSources = [];
  const incomeAmounts = [];

  dataSource.forEach(item => {
    const source = item.incomeSource || 'Unknown';
    const amount = item.incomeAmount || 0;

    if (!incomeSourceColorMap[source]) {
      // Assign a color if not already assigned
      const color = backgroundColors[incomeSources.length % backgroundColors.length];
      incomeSourceColorMap[source] = color;
      incomeSources.push(source);
      incomeAmounts.push(0); // Initialize amount
    }

    // Accumulate income amounts for each source
    const index = incomeSources.indexOf(source);
    incomeAmounts[index] += amount;
  });

  // Create chart data
  const chartData = {
    labels: incomeSources,
    datasets: [
      {
        label: 'Income',
        data: incomeAmounts,
        backgroundColor: incomeSources.map(source => incomeSourceColorMap[source]),
        hoverBackgroundColor: incomeSources.map(source => incomeSourceColorMap[source]),
      },
    ],
  };

  const totalIncome = incomeAmounts.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Income Distribution</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Doughnut data={chartData} />
          <div className="text-center mt-3">
            <h5>Total Income: ₹{totalIncome}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeGraph;
