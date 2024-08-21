import React, { useEffect, useState } from 'react';
import Axios_request from '../../Axios_request';
import { useNavigate, useParams } from 'react-router-dom';

const categories = {
  "Bills and Utilities": ["Electricity Bill", "Gas Bill", "Internet Bills", "Phone Bills", "Television Bills", "Water Bill", "Loan / Credit Card", "Vehicle", "Others"],
  "Education": ["Stationary", "School/College Fees", "Uniform", "Others"],
  "Entertainment": ["Movies", "Games", "Streaming Services", "Others"],
  "Family": ["Home Maintenance", "Home Services", "Pets", "Others"],
  "Food": ["Restaurants", "Online-Delivery", "Others"],
  "Health": ["Gym", "Medical", "Others"],
  "House Rent/Loan Payments": ["Rent", "Loans", "Others"],
  "Shopping": ["Clothes", "Footwears", "Electronics", "Home Appliances", "Others"],
  "Child-care": ["Others"],
  "Insurance": ["Bike", "Car", "Health", "Others"],
  "Investment": ["Stocks/ETF/Mutual funds", "Term deposit", "Gold", "Bond", "Others"],
  "Others": ["Others"]
};

const ExpenditureEditPage = () => {
  const { expenditureId } = useParams(); // Retrieve the expenditureId from the URL
  const navigate = useNavigate();
  const [expenditure, setExpenditure] = useState({
    category: '',
    subCategory: '',
    amount: '',
    date: '',
    time: '',
    location: '',
    description: '',
    transactionMode: 'Online', // Default to 'Online'
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the data when the component mounts
    Axios_request("get",
      "/expenditures/" + expenditureId,
      {}
    )
      .then(response => {
        setExpenditure(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching expenditure data:', error);
        setIsLoading(false);
      });
  }, [expenditureId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenditure(prevExpenditure => ({
      ...prevExpenditure,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    Axios_request("put",
      "/expenditures/" + expenditureId,
      expenditure
    )
      .then(response => {
        alert('Expenditure data updated successfully!');
        navigate("/expenditureTable"); // Navigate to expenditure table after update
      })
      .catch(error => {
        console.error('Error updating expenditure data:', error);
        alert('Failed to update expenditure data.');
      });
  };

  if (isLoading) {
    return <div className="container mt-4"><p>Loading...</p></div>;
  } else {
    return (
      <div className="container justify-content-center align-items-center " style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card">
          <div className="card-header">
            <h2>Expenditure Details</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={expenditure.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {Object.keys(categories).map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="subCategory">Subcategory:</label>
                <select
                  id="subCategory"
                  name="subCategory"
                  className="form-control"
                  value={expenditure.subCategory}
                  onChange={handleChange}
                  disabled={!expenditure.category} // Disable subcategory if no category is selected
                >
                  <option value="">Select Subcategory</option>
                  {expenditure.category && categories[expenditure.category].map(subCategory => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="form-control"
                  value={expenditure.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={expenditure.date}
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
                  value={expenditure.time}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  value={expenditure.location}
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
                  value={expenditure.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
                <label>Transaction Mode:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="online"
                      name="transactionMode"
                      value="Online"
                      checked={expenditure.transactionMode === 'Online'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="online">Online</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="cash"
                      name="transactionMode"
                      value="Cash"
                      checked={expenditure.transactionMode === 'Cash'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="cash">Cash</label>
                  </div>
                </div>
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

export default ExpenditureEditPage;
