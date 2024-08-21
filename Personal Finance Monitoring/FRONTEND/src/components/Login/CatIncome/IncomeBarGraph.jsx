import React, { /*useContext*/ } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
//import { IncomeDataContext } from '../Login/CatIncome/IncomeDataProvider';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const IncomeBarGraph = ({dataSource}) => {
  // const { incomeData, isLoading } = useContext(IncomeDataContext);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const fetchedData = dataSource;

  if (!Array.isArray(fetchedData)) {
    return <div>Data is not an array!</div>;
  }

  const timeLabels = [...new Set(fetchedData.map(item => item.time))];
  const sources = [...new Set(fetchedData.map(item => item.incomeSource))];

  const datasets = sources.map(source => ({
    label: source,
    data: timeLabels.map(time => {
      const item = fetchedData.find(d => d.time === time && d.incomeSource === source);
      return item ? item.incomeAmount : 0;
    }),
    backgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
    hoverBackgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
  }));

  const totalIncome = fetchedData.reduce((acc, item) => acc + item.incomeAmount, 0);

  const chartData = {
    labels: timeLabels,
    datasets: datasets,
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Income Distribution by Time</h2>
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
                      const dataset = tooltipItem.dataset;
                      const dataIndex = tooltipItem.dataIndex;
                      const incomeSource = dataset.label;
                      const amount = dataset.data[dataIndex];
                      return `${incomeSource}: ₹${amount}`;
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

export default IncomeBarGraph;
