import React, { useEffect, useState } from 'react';

import Axios_request from '../../Axios_request';
import { useNavigate, useParams } from 'react-router-dom';

const categories = [
  'Stocks/ETF/Mutual funds',
  'Term deposit',
  'Gold',
  'Bond',
  'Others'
];

const InvestmentEditPage = () => {
  const { investmentId } = useParams(); // Retrieve the investmentId from the URL
  const navigate = useNavigate();
  const [investment, setInvestment] = useState({
    category: '',
    issuer: '',
    quantity: '',
    unitCost: '',
    investmentDate: '',
    maturityDate: '',
    maturityUnitPrice: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the data when the component mounts
    Axios_request("get",
      "/investments/"+investmentId,
      {}
    ) // Replace with your API endpoint
      .then(response => {
        setInvestment(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching investment data:', error);
        setIsLoading(false);
      });
  }, [investmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestment(prevInvestment => ({
      ...prevInvestment,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    Axios_request("put",
      "/investments/"+investmentId,
      investment
    ) // Replace with your API endpoint
      .then(response => {
        alert('Investment data updated successfully!');
        navigate("/loginHome")
      })
      .catch(error => {
        console.error('Error updating investment data:', error);
        alert('Failed to update investment data.');
      });
  };

  if (isLoading) {
    return <div className="container mt-4"><p>Loading...</p></div>;
  }else{
  return (
    <div className="container justify-content-center align-items-center " style={{ maxWidth: '600px', width: '100%' }}>
      <div className="card">
        <div className="card-header">
          <h2>Investment Details</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={investment.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group "style={{ maxWidth: '600px', width: '100%' }}>
              <label htmlFor="issuer">Issuer:</label>
              <input
                type="text"
                id="issuer"
                name="issuer"
                className="form-control"
                value={investment.issuer}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control"
                value={investment.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
              <label htmlFor="unitCost">Unit Cost:</label>
              <input
                type="number"
                id="unitCost"
                name="unitCost"
                step="0.01"
                className="form-control"
                value={investment.unitCost}
                onChange={handleChange}
              />
            </div>
            <div className="form-group "style={{ maxWidth: '600px', width: '100%' }}>
              <label htmlFor="investmentDate">Investment Date:</label>
              <input
                type="date"
                id="investmentDate"
                name="investmentDate"
                className="form-control"
                value={investment.investmentDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
              <label htmlFor="maturityDate">Maturity Date:</label>
              <input
                type="date"
                id="maturityDate"
                name="maturityDate"
                className="form-control"
                value={investment.maturityDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ maxWidth: '600px', width: '100%' }}>
              <label htmlFor="maturityUnitPrice">Maturity Unit Price:</label>
              <input
                type="number"
                id="maturityUnitPrice"
                name="maturityUnitPrice"
                step="0.01"
                className="form-control"
                value={investment.maturityUnitPrice}
                onChange={handleChange}
              />
            </div>
            <div className="form-group"style={{ maxWidth: '600px', width: '100%' }}>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="3"
                value={investment.description}
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

export default InvestmentEditPage;
