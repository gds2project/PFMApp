import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const InvestmentBarGraph = ({ dataSource }) => {
  if (!Array.isArray(dataSource)) {
    return <div>Data is not an array!</div>;
  }

  // Aggregate investment data by date
  const investmentData = dataSource.reduce((acc, item) => {
    const date = item.investmentDate; // Assume `item.investmentDate` contains the date
    const amount = item.unitCost * item.quantity; // Calculate amount

    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += amount;
    return acc;
  }, {});

  // Convert aggregated data to chart format
  const dates = Object.keys(investmentData).sort(); // Sort dates chronologically
  const amounts = dates.map(date => investmentData[date]);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Investment Amount',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const totalInvestment = amounts.reduce((acc, amount) => acc + amount, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Investment Distribution by Date</h2>
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
                    label: function(tooltipItem) {
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
                    text: 'Investment Date',
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12, // Adjust if necessary
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
            <h5>Total Investment: ₹{totalInvestment}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentBarGraph;
