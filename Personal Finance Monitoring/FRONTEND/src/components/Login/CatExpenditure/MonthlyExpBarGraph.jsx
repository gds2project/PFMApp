import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyExpBarGraph = ({ dataSource }) => {
  if (!Array.isArray(dataSource)) {
    return <div>Data is not an array!</div>;
  }

  // Aggregate expenditure data by day
  const dailyData = dataSource.reduce((acc, item) => {
    const date = new Date(item.date); // Convert date string to Date object
    const day = date.getDate(); // Extract the day of the month

    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day] += item.amount;
    return acc;
  }, {});

  // Prepare data for the chart
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // Days 1 to 31
  const amounts = days.map(day => dailyData[day] || 0); // Default to 0 if no data for that day

  const chartData = {
    labels: days.map(day => `${day}`), // Format labels as "Day X"
    datasets: [
      {
        label: 'Daily Expenditure',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalExpenditure = amounts.reduce((acc, amount) => acc + amount, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Daily Expenditure Distribution</h2>
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
                    text: 'Day of Month',
                  },
                  ticks: {
                    autoSkip: false, // Show all ticks for days 1 to 31
                    maxTicksLimit: 31, // Ensure up to 31 ticks
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

export default MonthlyExpBarGraph;
