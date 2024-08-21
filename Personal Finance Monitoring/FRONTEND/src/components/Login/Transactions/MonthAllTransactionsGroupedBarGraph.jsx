import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Helper function to format day as "Day X"
// eslint-disable-next-line no-unused-vars
const formatDay = (dateString) => {
  const date = new Date(dateString);
  return date.getDate(); // Extract day of the month
};

// Helper function to generate all days of the month
const generateDays = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const MonthAllTransactionsGroupedBarGraph = ({ incomeData, investmentData, expenditureData }) => {
  const currentYear = new Date().getFullYear(); // Use current year or pass as prop
  const currentMonth = new Date().getMonth() + 1; // Use current month or pass as prop
  const allDays = generateDays(currentYear, currentMonth);

  // Helper function to aggregate data by day
  const aggregateData = (data, amountField, dateField, calcAmount = (item) => item[amountField]) => {
    return data.reduce((acc, item) => {
      const date = new Date(item[dateField]); // Convert date string to Date object
      const day = date.getDate(); // Get day of the month
      if (!acc[day]) {
        acc[day] = 0;
      }
      acc[day] += calcAmount(item);
      return acc;
    }, {});
  };

  // Aggregate income, expenditure, and investment data by day
  const incomeDailyData = aggregateData(incomeData, 'incomeAmount', 'date');
  const expenditureDailyData = aggregateData(expenditureData, 'amount', 'date');
  const investmentDailyData = aggregateData(investmentData, 'unitCost', 'investmentDate', (item) => item.unitCost * item.quantity);

  // Prepare data for the chart
  const days = allDays; // Ensure all days are included
  const formattedDays = days.map(day => `${day}`); // Format as "Day X"
  const incomeDataValues = days.map(day => incomeDailyData[day] || 0);
  const expenditureDataValues = days.map(day => expenditureDailyData[day] || 0);
  const investmentDataValues = days.map(day => investmentDailyData[day] || 0);

  const chartData = {
    labels: formattedDays,
    datasets: [
      {
        label: 'Income',
        data: incomeDataValues,
        backgroundColor: 'rgba(144, 238, 144, 0.5)', // Lighter green
        borderColor: 'rgba(144, 238, 144, 1)',
        borderWidth: 1
      },
      {
        label: 'Expenditure',
        data: expenditureDataValues,
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Lighter red
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Investment',
        data: investmentDataValues,
        backgroundColor: 'rgba(255, 255, 153, 0.5)', // Slightly darker yellow
        borderColor: 'rgba(255, 255, 153, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Daily Transactions for {currentMonth}/{currentYear}</h2>
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
                      const amount = dataset.data[dataIndex];
                      return `${dataset.label}: ₹${amount}`;
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
                  stacked: false, // Set to false for grouped bars
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 31, // Display at most 31 ticks
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
        </div>
      </div>
    </div>
  );
};

export default MonthAllTransactionsGroupedBarGraph;
