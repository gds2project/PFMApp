import React, { useState, useEffect } from 'react';
import Axios_request from '../../Axios_request';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const IncomeTable = ({dataSource}) => {
  const [incomes, setincomes] = useState([]);
  const [sortedField, setSortedField] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  const [hoverincomeId, setHoverInvestmentId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setincomes(dataSource);
    // Axios_request("get",
    //   "/incomes/today",
    //   {}
    // )
    //   .then(response => {
    //     console.log(response.data);
    //     setincomes(response.data); // Assuming the response data is an array of income objects
    //   })
    //   .catch(error => {
    //     console.error('There was an error fetching the data!', error);
    //   });
  }, [dataSource]);


  useEffect(() => {
    const sortedIncomes = [...dataSource].sort((a, b) => {
      const aValue = sortedField === 'incomeAmount' ? Number(a[sortedField]) : a[sortedField];
      const bValue = sortedField === 'incomeAmount' ? Number(b[sortedField]) : b[sortedField];
  
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setincomes(sortedIncomes);
  }, [dataSource, sortedField, sortDirection]);
  
  
  const handleCategoryEnter = (incomeId) => {
    setHoverInvestmentId(incomeId);
  };

  const handleMouseLeave = () => {
    setHoverInvestmentId(null);
  }

  const handleEditClick = (incomeId) => {
    navigate(`/incomes/edit/${incomeId}`);
  };

  const handleDeleteClick = (incomeId) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
        Axios_request("delete", `/incomes/${incomeId}`)
            .then(response => {
                console.log('Income deleted successfully:', response.data);
               
                setincomes(incomes.filter(income => income.incomeId !== incomeId));
            })
            .catch(error => {
                console.error('There was an error deleting the income!', error);
            });
    }
};

const handleSort = (field) => {
  const newDirection = sortedField === field && sortDirection === 'asc' ? 'desc' : 'asc';
  setSortedField(field);
  setSortDirection(newDirection);
};

  return (
    <div className="container mt-4">
   
      <table className="table table-bordered table-hover table-responsive">
        <thead className="thead-light">
          <tr>
          <th onClick={() => handleSort('date')}>
                Date {sortedField === 'date' && (sortDirection === 'asc' ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('time')}>
                Time {sortedField === 'time' && (sortDirection === 'asc' ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('incomeSource')}>
                Source {sortedField === 'incomeSource' && (sortDirection === 'asc' ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('incomeAmount')}>
                Amount {sortedField === 'incomeAmount' && (sortDirection === 'asc' ? '🔼' : '🔽')}
              </th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <React.Fragment key={income.incomeId}>
              <tr onMouseEnter={() => handleCategoryEnter(income.incomeId)}
                onMouseLeave={handleMouseLeave}
              >
                <td>{new Date(income.date).toLocaleDateString()}</td>
                <td>{income.time}</td>
                <td>{income.incomeSource}</td>
                <td>{income.incomeAmount}</td>
                <td><FaEdit style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => handleEditClick(income.incomeId)} /></td>
                <td>
                  <FaTrash style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleDeleteClick(income.incomeId)} />
                </td>
              </tr>
              {hoverincomeId === income.incomeId && (
                <tr>
                  <td colSpan="6" className="bg-light">
                    <strong>Mode Of Payment:</strong> {income.modeOfPayment} <span style={{ marginRight: '10px' }} />
                    <strong>Description:</strong> {income.description}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeTable;
