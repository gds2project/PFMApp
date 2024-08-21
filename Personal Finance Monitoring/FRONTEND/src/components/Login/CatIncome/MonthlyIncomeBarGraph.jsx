import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const MonthlyIncomeBarGraph = ({ dataSource }) => {
  if (!Array.isArray(dataSource)) {
    return <div>Data is not an array!</div>;
  }

  // Aggregate income by day of the month
  const dailyData = dataSource.reduce((acc, item) => {
    const date = new Date(item.date); // Convert date string to Date object
    const dayOfMonth = date.getDate(); // Extract the day of the month

    if (!acc[dayOfMonth]) {
      acc[dayOfMonth] = 0;
    }
    acc[dayOfMonth] += item.incomeAmount || 0;
    return acc;
  }, {});

  // Generate labels for all days of the month and corresponding amounts
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // Days from 1 to 31
  const amounts = days.map(day => dailyData[day] || 0); // Get amounts for each day, default to 0 if no data

  const chartData = {
    labels: days.map(day => `Day ${day}`), // Labels formatted as "Day X"
    datasets: [
      {
        label: 'Daily Income',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const totalIncome = amounts.reduce((acc, amount) => acc + amount, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Daily Income Distribution</h2>
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
                      const amount = tooltipItem.raw;
                      return `₹${amount}`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Day of the Month',
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 31, // Maximum number of days in a month
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Income Amount (₹)',
                  },
                  beginAtZero: true
                }
              }
            }}
          />
          <div className="text-center mt-3">
            <h5>Total Income: ₹{totalIncome}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyIncomeBarGraph;
