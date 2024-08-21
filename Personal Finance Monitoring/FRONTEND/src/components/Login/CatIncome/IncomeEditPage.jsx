import React, { useEffect, useState } from 'react';
import Axios_request from '../../Axios_request';
import { useNavigate, useParams } from 'react-router-dom';

const paymentModes = [
  'online',
  'cash'
];
const IncomeEditPage = () => {
  const { incomeId } = useParams(); // Retrieve the incomeId from the URL
  const navigate = useNavigate();
  const [income, setIncome] = useState({
    incomeSource: '',
    incomeAmount: '',
    description: '',
    modeOfPayment: 'online', // Default to 'online'
    date: '',
    time: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    Axios_request("get",
      "/incomes/" + incomeId,
      {}
    )
      .then(response => {
        setIncome(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching income data:', error);
        setIsLoading(false);
      });
  }, [incomeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome(prevIncome => ({
      ...prevIncome,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    Axios_request("put",
      "/incomes/" + incomeId,
      income
    )
      .then(response => {
        alert('Income data updated successfully!');
        navigate("/loginHome");
      })
      .catch(error => {
        console.error('Error updating income data:', error);
        alert('Failed to update income data.');
      });
  };

  if (isLoading) {
    return <div className="container mt-4"><p>Loading...</p></div>;
  } else {
    return (
      <div className="container justify-content-center align-items-center " style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card">
          <div className="card-header">
            <h2>Income Details</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="incomeSource">Income Source:</label>
                <input
                  type="text"
                  id="incomeSource"
                  name="incomeSource"
                  className="form-control"
                  value={income.incomeSource}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="incomeAmount">Income Amount:</label>
                <input
                  type="number"
                  id="incomeAmount"
                  name="incomeAmount"
                  className="form-control"
                  value={income.incomeAmount}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows="3"
                  value={income.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="modeOfPayment">Mode of Payment:</label>
                <select
                  id="modeOfPayment"
                  name="modeOfPayment"
                  className="form-control"
                  value={income.modeOfPayment}
                  onChange={handleChange}
                >
                  {paymentModes.map(mode => (
                    <option key={mode} value={mode}>
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group " style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={income.date}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="time">Time:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="form-control"
                  value={income.time}
                  onChange={handleChange}
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default IncomeEditPage;
