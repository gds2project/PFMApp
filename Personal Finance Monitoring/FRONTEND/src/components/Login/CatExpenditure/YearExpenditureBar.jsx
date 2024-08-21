import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const YearExpenditureBar = ({ dataSource }) => {
  if (!Array.isArray(dataSource)) {
    return <div>Data is not an array!</div>;
  }

  // Prepare data aggregated by month and year
  const monthYearMap = dataSource.reduce((acc, item) => {
    const date = new Date(item.date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as "YYYY-MM"

    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += item.amount;

    return acc;
  }, {});

  // Generate labels for all months of the year
  const year = new Date().getFullYear(); // Use the current year or adjust if needed
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const monthYearLabels = months.map(month => `${year}-${month}`);
  
  // Prepare data for the chart
  const amounts = monthYearLabels.map(monthYear => monthYearMap[monthYear] || 0);

  const chartData = {
    labels: monthYearLabels.map(monthYear => {
      const [year, month] = monthYear.split('-');
      return `${month.padStart(2, '0')}-${year}`;
    }),
    datasets: [
      {
        label: 'Total Expenditure',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };

  const totalExpenditure = amounts.reduce((acc, amount) => acc + amount, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Monthly Expenditure Distribution</h2>
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
                    text: 'Month-Year',
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12, // Limit the number of ticks for better readability
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

export default YearExpenditureBar;
