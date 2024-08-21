import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Helper function to format day of the month
// eslint-disable-next-line no-unused-vars
const formatDay = (dateString) => {
  const date = new Date(dateString);
  return date.getDate(); // Extracts the day of the month
};

// Helper function to generate all days of the month
const generateDays = (month) => {
  const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate(); // Get the number of days in the month
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const DailyInvestBarGraph = ({ dataSource }) => {
  if (!Array.isArray(dataSource)) {
    return <div>Data is not an array!</div>;
  }

  const currentMonth = new Date().getMonth(); // Current month (0-indexed, January is 0)
  const allDays = generateDays(currentMonth + 1); // +1 because months are 0-indexed

  // Aggregate investment data by day of the month
  const dailyData = dataSource.reduce((acc, item) => {
    const date = new Date(item.investmentDate); // Convert date string to Date object
    const day = date.getDate(); // Extract the day of the month

    // Calculate the amount as unitCost * quantity
    const amount = item.unitCost * item.quantity;

    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day] += amount;
    return acc;
  }, {});

  // Prepare data for the chart
  const days = allDays; // Ensure all days are included
  const formattedDays = days.map(day => `${day}`); // Format as "Day X"
  const amounts = days.map(day => dailyData[day] || 0);

  const chartData = {
    labels: formattedDays,
    datasets: [
      {
        label: 'Daily Investment',
        data: amounts,
        backgroundColor: 'rgba(153, 102, 255, 0.2)', // Light purple
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalInvestment = amounts.reduce((acc, amount) => acc + amount, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Daily Investment Distribution</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div style={{ width: '100%', height: '500px' }}>
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
                      text: 'Investment Amount (₹)',
                    },
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
          <div className="text-center mt-3">
            <h5>Total Investment: ₹{totalInvestment}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyInvestBarGraph;
