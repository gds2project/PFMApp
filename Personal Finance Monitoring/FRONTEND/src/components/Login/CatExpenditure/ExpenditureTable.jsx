import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Axios_request from '../../Axios_request';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ExpenditureTable = ({dataSource}) => {
  const [expenditureData, setexpenditureData] = useState([]);
  const [sortedField, setSortedField] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [hoverexpenditureId, setHoverExpenditureId] = useState(null);
  const navigate = useNavigate();

  useEffect((dataSource) => {
    setexpenditureData(dataSource);
    // Axios_request("get",
    //   "/expenditures/today",
    //   {}
    // )
    //   .then(response => {
    //     console.log(response.data)
    //     setexpenditureData(response.data);
    //   })

    //   .catch(error => {
    //     console.error('There was an error fetching the data!', error);
    //   });
  }, [dataSource]);

  useEffect(() => {
    //console.log('Incomes before sorting:', incomes);
    // Sorting code...
    const sortedExpense = [...dataSource].sort((a, b) => {
      const aValue = sortedField === 'date' ? Number(a[sortedField]) : a[sortedField];
      const bValue = sortedField === 'date' ? Number(b[sortedField]) : b[sortedField];
    
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setexpenditureData(sortedExpense);
  }, [sortedField, dataSource, sortDirection]);
  
  const handleCategoryEnter = (expenditureId) => {
    setHoverExpenditureId(expenditureId);
  };

  const handleMouseLeave = () => {
    setHoverExpenditureId(null);
  }

  const handleEditClick = (expenditureId) => {
    navigate(`/expenditures/edit/${expenditureId}`);
  };

  const handleDeleteClick = (expenditureId) => {
    if (window.confirm("Are you sure you want to delete this expenditure?")) {
        Axios_request("delete", `/expenditures/${expenditureId}`)
            .then(response => {
                console.log('expenditure deleted successfully:', response.data);
                // Update the state to remove the deleted expenditure
                setexpenditureData(expenditureData.filter(expenditure => expenditure.expenditureId !== expenditureId));
            })
            .catch(error => {
                console.error('There was an error deleting the expenditure!', error);
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
      <table className="table table-responsive table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
          <th onClick={() => handleSort('date')}>
                Date {sortedField === 'date' && (sortDirection === 'asc' ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('time')}>
                Time {sortedField === 'time' && (sortDirection === 'asc' ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('category')}>
                Category {sortedField === 'category' && (sortDirection === 'asc' ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('amount')}>
                Amount {sortedField === 'amount' && (sortDirection === 'asc' ? '🔼' : '🔽')}
              </th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenditureData.map((expenditure) => (
            <React.Fragment key={expenditure.expenditureId}>
              <tr onMouseEnter={() => handleCategoryEnter(expenditure.expenditureId)}
                onMouseLeave={handleMouseLeave}
              >
                <td>{new Date(expenditure.date).toLocaleDateString()}</td>
                <td>{expenditure.time}</td>
                <td>{expenditure.category}</td>
                <td>{expenditure.amount}</td>
                <td>
                <FaEdit style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => handleEditClick(expenditure.expenditureId)} />
                </td>
                <td>
                  <FaTrash style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleDeleteClick(expenditure.expenditureId)} />
                </td>
              </tr>
              {hoverexpenditureId === expenditure.expenditureId && (
                <tr>
                  <td colSpan="6" className="bg-light">

                    <div className="hidden-details">
                      <strong>SubCategory:</strong> {expenditure.subCategory}<span style={{whiteSpace: '10px'}}></span>
                      <strong>Transaction Mode:</strong> {expenditure.transactionMode}<br/>
                      <strong>location:</strong> {expenditure.location}<span style={{whiteSpace:'10px'}}></span>
                      <strong>Description:</strong> {expenditure.description}
                    </div>
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
export default ExpenditureTable;
