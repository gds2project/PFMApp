import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ExpenditureBarGraph = ({ dataSource }) => {
  if (!Array.isArray(dataSource)) {
    return <div>Data is not an array!</div>;
  }

  // Prepare time labels and sources (assuming similar structure as IncomeBarGraph)
  const timeLabels = [...new Set(dataSource.map(item => item.time))];
  const categories = [...new Set(dataSource.map(item => item.category))];

  // Create datasets for each category
  const datasets = categories.map(category => ({
    label: category,
    data: timeLabels.map(time => {
      const item = dataSource.find(d => d.time === time && d.category === category);
      return item ? item.amount : 0;
    }),
    backgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
    hoverBackgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
  }));

  const totalExpenditure = dataSource.reduce((acc, item) => acc + item.amount, 0);

  const chartData = {
    labels: timeLabels,
    datasets: datasets,
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Expenditure Distribution by Time</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      const dataset = tooltipItem.dataset;
                      const dataIndex = tooltipItem.dataIndex;
                      const category = dataset.label;
                      const amount = dataset.data[dataIndex];
                      return `${category}: ₹${amount}`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Time (Hours)',
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Amount (₹)',
                  },
                  beginAtZero: true
                }
              }
            }}
          />
          <div className="text-center mt-3">
            <h5>Total Expenditure: ₹{totalExpenditure}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenditureBarGraph;
