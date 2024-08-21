import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Axios_request from '../../Axios_request';

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Goal = () => {
    const [goalPercentage, setGoalPercentage] = useState(0);
    const [fulfillPercentage, setFulfillPercentage] = useState(0);
    const [warning, setWarning] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios_request("get", "/getGoal", {});
                const { goalP, fulfilP } = response.data;
                setGoalPercentage(parseFloat(goalP.toFixed(2)));
                setFulfillPercentage(parseFloat(fulfilP.toFixed(2)));
            } catch (err) {
                setError(true);
            }
        };

        fetchData();
    }, []);

    // Function to determine color based on fulfillment percentage
    const getColor = () => {
        const percentage = fulfillPercentage;
        if (percentage < 20) {
            return '#C8102E'; // Dark red
        } else if (percentage < 40) {
            return '#E94F37'; // Light red
        } else if (percentage < 60) {
            return '#F6C667'; // Light orange
        } else if (percentage < 80) {
            return '#F7E7A5'; // Light yellow
        } else {
            return '#B0E57C'; // Light green
        }
    };

    const handleInputChange = (e) => {
        const value = Number(e.target.value);
        if (value < 0) {
            setWarning('Warning: Cannot be less than 0');
        } else if (value > 80) {
            setWarning('Warning: Exceeds 80%');
        } else {
            setWarning('');
            setGoalPercentage(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios_request("post", "/setGoal", { goalP: goalPercentage });
            const { goalP, fulfilP } = response.data;
            setGoalPercentage(parseFloat(goalP.toFixed(2)));
            setFulfillPercentage(parseFloat(fulfilP.toFixed(2)));
        } catch (err) {
            setError(true);
        }
    };

    const data = {
        labels: ['Fulfilled', 'Remaining'],
        datasets: [
            {
                data: [fulfillPercentage, 100 - fulfillPercentage],
                backgroundColor: [getColor(), 'lightgrey'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}%`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '90%', maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2 className="text-center mb-4">Your Investment Goal</h2>
            {error ? (
                <div style={{ textAlign: 'center' }}>
                    <img src="/path-to-apology-image.jpg" alt="Apology" style={{ width: '200px' }} />
                    <p>Something went wrong. Please try again later.</p>
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h6>Enter Investemnt Goal: (% of your Income)</h6>
                            <input
                                type="number"
                                value={goalPercentage}
                                onChange={handleInputChange}
                                placeholder="Goal Percentage"
                                min="0"
                                max="80"
                                style={{ marginBottom: '10px', width: '100px' }}
                            />
                            <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '10px' }}>
                                Submit
                            </button>
                            {warning && <p style={{ color: 'red' }}>{warning}</p>}
                            <p>Percentage Fulfilled: {fulfillPercentage}%</p>
                        </form>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Doughnut data={data} options={options} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Goal;
