import React, { useState, useEffect } from 'react';

const TransactionTable = ({ incomeData, expenditureData, investmentData }) => {
  const [transactions, setTransactions] = useState([]);
  const [sortedField, setSortedField] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const [hoverTransactionId, setHoverTransactionId] = useState(null);

  useEffect(() => {
    const combinedData = [
      ...incomeData.map(item => ({
        ...item,
        Date: item.date,
        type: 'Income',
        amount: item.incomeAmount,
        description: `Source: ${item.incomeSource}`
      })),
      ...expenditureData.map(item => ({
        ...item,
        Date: item.date,
        type: 'Expenditure',
        amount: item.amount,
        description: `Category: ${item.category}`
      })),
      ...investmentData.map(item => ({
        ...item,
        Date: item.investmentDate,
        type: 'Investment',
        amount: item.unitCost,
        description: `Category: ${item.category}`
      }))
    ];

    setTransactions(combinedData);
  }, [incomeData, expenditureData, investmentData]); // Only re-run when data changes

  useEffect(() => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      const aValue = sortedField === 'date' ? new Date(a[sortedField]) : a[sortedField];
      const bValue = sortedField === 'date' ? new Date(b[sortedField]) : b[sortedField];
    
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setTransactions(sortedTransactions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedField, sortDirection]); // Only re-run when sorting criteria change

  const handleSort = (field) => {
    if (sortedField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered table-hover table-responsive">
        <thead className="thead-light">
          <tr>
            <th onClick={() => handleSort('date')}>
              Date {sortedField === 'date' && (sortDirection === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('type')}>
              Type {sortedField === 'type' && (sortDirection === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('amount')}>
              Amount {sortedField === 'amount' && (sortDirection === 'asc' ? '🔼' : '🔽')}
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <tr
                onMouseEnter={() => setHoverTransactionId(index)}
                onMouseLeave={() => setHoverTransactionId(null)}
              >
                <td>{new Date(transaction.Date).toLocaleDateString()}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
              </tr>
              {hoverTransactionId === index && (
                <tr>
                  <td colSpan="3" className="bg-light">
                    <strong>Description:</strong> {transaction.description}
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

export default TransactionTable;
