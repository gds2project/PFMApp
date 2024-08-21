import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const YearlyIncomeBar = ({ dataSource }) => {
  if (!Array.isArray(dataSource)) {
    return <div>Data is not an array!</div>;
  }

  // Aggregate income by month and year
  const monthlyData = dataSource.reduce((acc, item) => {
    const date = new Date(item.date); // Convert date string to Date object
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Format as YYYY-MM

    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += item.incomeAmount;
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
        label: 'Monthly Income',
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
      <h2 className="text-center">Monthly Income Distribution</h2>
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
                    text: 'Month and Year',
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12, // Limit the number of ticks to fit better on the x-axis
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

export default YearlyIncomeBar;
