import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components required for the Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeGraph = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Income',
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: [],
            },
        ],
    });
    const [totalIncome, setTotalIncome] = useState(0);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        axios.get('https://192.168.110.30:8080/api/incomes/today')
            .then(response => {
                const incomeArray = response.data;
                
                if (Array.isArray(incomeArray) && incomeArray.length > 0) {
                    // Extract income sources and amounts
                    const incomeSources = incomeArray.map(item => item.incomeSource || 'Unknown');
                    const incomeAmounts = incomeArray.map(item => item.incomeAmount || 0);

                    // Calculate total income
                    const total = incomeAmounts.reduce((acc, curr) => acc + curr, 0);
                    setTotalIncome(total);

                    // Define background colors
                    const backgroundColors = [
                        '#FF6384', // Salary
                        '#36A2EB', // Loan/Borrowing
                        '#FFCE56', // Investment
                        // Add more colors if needed
                    ];

                    // Set chart data
                    setChartData({
                        labels: incomeSources,
                        datasets: [
                            {
                                label: 'Income',
                                data: incomeAmounts,
                                backgroundColor: backgroundColors.slice(0, incomeSources.length),
                                hoverBackgroundColor: backgroundColors.slice(0, incomeSources.length),
                            },
                        ],
                    });

                    setNoData(false);
                } else {
                    // Handle empty data case
                    setNoData(true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the data:', error);
                setNoData(true);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Income Distribution</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {noData ? (
                        <div className="text-center">
                            <h5>No income data available for today.</h5>
                        </div>
                    ) : (
                        <>
                            <Doughnut data={chartData} />
                            <div className="text-center mt-3">
                                <h5>Total Income: ${totalIncome}</h5>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncomeGraph;
