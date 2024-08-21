import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const IncomeBarGraph = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        axios.get('https://192.168.110.30:8080/api/incomes/today')
            .then(response => {
                const fetchedData = response.data || []; // Default to empty array if data is undefined

                console.log(response.data); // Debug log to verify the response format

                // Ensure data is an array
                if (!Array.isArray(fetchedData)) {
                    console.error('Data is not an array:', fetchedData);
                    return;
                }

                // Extract unique time labels and income sources
                const timeLabels = [...new Set(fetchedData.map(item => item.time))];
                const sources = [...new Set(fetchedData.map(item => item.incomeSource))];

                // Create datasets for each income source
                const datasets = sources.map(source => {
                    return {
                        label: source,
                        data: timeLabels.map(time => {
                            const item = fetchedData.find(d => d.time === time && d.incomeSource === source);
                            return item ? item.incomeAmount : 0;
                        }),
                        backgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
                        hoverBackgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
                    };
                });

                const totalIncome = fetchedData.reduce((acc, item) => acc + item.incomeAmount, 0);

                // Update state
                setChartData({
                    labels: timeLabels,
                    datasets: datasets,
                });
                setTotalIncome(totalIncome);
            })
            .catch(error => {
                console.error('There was an error fetching the data:', error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Income Distribution by Time</h2>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* Conditional rendering to avoid rendering chart with incomplete data */}
                    {chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
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
                                                return `${incomeSource}: $${amount}`;
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
                                            text: 'Income Amount ($)',
                                        },
                                        beginAtZero: true
                                    }
                                }
                            }}
                        />
                    ) : (
                        <div className="text-center">
                            <p>No data available for the chart.</p>
                        </div>
                    )}
                    <div className="text-center mt-3">
                        <h5>Total Income: ${totalIncome}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeBarGraph;
