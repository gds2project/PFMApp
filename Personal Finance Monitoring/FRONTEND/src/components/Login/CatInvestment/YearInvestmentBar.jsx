import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Helper function to format month-year as "Month YYYY"
// eslint-disable-next-line no-unused-vars
const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are 0-indexed
  const year = date.getFullYear();
  return `${month}/${year}`; // Format as "MM/YYYY"
};

const YearInvestmentBar = ({ dataSource }) => {
  if (!Array.isArray(dataSource)) {
    return <div>Data is not an array!</div>;
  }

  // Aggregate investment data by month and year
  const monthlyData = dataSource.reduce((acc, item) => {
    const date = new Date(item.investmentDate); // Convert date string to Date object
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Format as YYYY-MM

    // Calculate the amount as unitCost * quantity
    const amount = item.unitCost * item.quantity;

    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += amount;
    return acc;
  }, {});

  // Generate a list of all months for the current year
  const currentYear = new Date().getFullYear();
  const allMonths = Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, '0'); // Pad month with leading zero
    return `${currentYear}-${month}`; // Format as YYYY-MM
  });

  // Prepare data for the chart
  const months = allMonths;
  const amounts = months.map(month => monthlyData[month] || 0); // Use 0 for months with no data

  const chartData = {
    labels: months.map(month => {
      const [year, monthNumber] = month.split('-');
      return `${monthNumber}/${year}`; // Format as "MM/YYYY"
    }), // Set labels to formatted months
    datasets: [
      {
        label: 'Monthly Investment',
        data: amounts,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalInvestment = amounts.reduce((acc, amount) => acc + amount, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Monthly Investment Distribution</h2>
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
                    text: 'Month/Year',
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12, // Limit the number of ticks to fit better on the x-axis
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
          <div className="text-center mt-3">
            <h5>Total Investment: ₹{totalInvestment}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearInvestmentBar;
