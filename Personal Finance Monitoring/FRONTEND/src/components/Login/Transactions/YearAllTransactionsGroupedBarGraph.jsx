import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Helper function to format month-year as "MM/YYYY"
const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are 0-indexed
  const year = date.getFullYear();
  return `${month < 10 ? '0' + month : month}/${year}`; // Format as "MM/YYYY"
};

// Helper function to generate all months of a given year
const generateMonths = (year) => {
  return Array.from({ length: 12 }, (_, i) => `${year}-${i + 1}`);
};

const YearAllTransactionsGroupedBarGraph = ({ incomeData, investmentData, expenditureData }) => {
  const currentYear = new Date().getFullYear(); // Use current year or pass as prop
  const allMonths = generateMonths(currentYear);

  // Helper function to aggregate data
  const aggregateData = (data, amountField, dateField, calcAmount = (item) => item[amountField]) => {
    return data.reduce((acc, item) => {
      const date = new Date(item[dateField]); // Convert date string to Date object
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as YYYY-MM
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += calcAmount(item);
      return acc;
    }, {});
  };

  // Aggregate income, expenditure, and investment data by month
  const incomeMonthlyData = aggregateData(incomeData, 'incomeAmount', 'date');
  const expenditureMonthlyData = aggregateData(expenditureData, 'amount', 'date');
  const investmentMonthlyData = aggregateData(investmentData, 'unitCost', 'investmentDate', (item) => item.unitCost * item.quantity);

  // Prepare data for the chart
  const months = allMonths; // Ensure all months are included
  const formattedMonths = months.map(month => formatMonthYear(`${month}-01`)); // Format as "MM/YYYY"
  const incomeDataValues = months.map(month => incomeMonthlyData[month] || 0);
  const expenditureDataValues = months.map(month => expenditureMonthlyData[month] || 0);
  const investmentDataValues = months.map(month => investmentMonthlyData[month] || 0);

  const chartData = {
    labels: formattedMonths,
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
      <h2 className="text-center">Monthly Transactions</h2>
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
                    text: 'Month/Year',
                  },
                  stacked: false, // Set to false for grouped bars
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12, // Display at most 12 ticks
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

export default YearAllTransactionsGroupedBarGraph;
