import React, { useEffect, useState } from "react";
import Axios_request from "../../Axios_request";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const InvestmentTable = ({ dataSource }) => {
    const [investmentData, setInvestmentData] = useState([]);
    const [sortedField, setSortedField] = useState('date');
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
    const [hoverInvestmentId, setHoverInvestmentId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setInvestmentData(dataSource);
        // Axios_request("get",
        //     "/investments/today",
        //     {}
        //   )  // Adjust the endpoint as necessary
        //     .then(response => {
        //         console.log(response.data);
        //         setInvestmentData(response.data);
        //     })
        //     .catch(error => {
        //         console.error("There was an error fetching the investment data!", error);
        //     });
    }, [dataSource]);

    useEffect(() => {
        //console.log('Incomes before sorting:', incomes);
        // Sorting code...
        const sortedInvestment = [...dataSource].sort((a, b) => {
            const aValue = sortedField === 'date' ? Number(a[sortedField]) : a[sortedField];
            const bValue = sortedField === 'date' ? Number(b[sortedField]) : b[sortedField];

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        setInvestmentData(sortedInvestment);
    }, [sortedField,dataSource , sortDirection]);

    const handleCategoryEnter = (investmentId) => {
        setHoverInvestmentId(investmentId);
    };

    const handleMouseLeave = () => {
        setHoverInvestmentId(null);
    }

    const handleEditClick = (investmentId) => {
        navigate(`/investment/edit/${investmentId}`);
    };
    const handleDeleteClick = (investmentId) => {
        if (window.confirm("Are you sure you want to delete this investment?")) {
            Axios_request("delete", `/investments/${investmentId}`)
                .then(response => {
                    console.log('investment deleted successfully:', response.data);
                    // Update the state to remove the deleted investment
                    setInvestmentData(investmentData.filter(investment => investment.investmentId !== investmentId));
                })
                .catch(error => {
                    console.error('There was an error deleting the investment!', error);
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
            
            <table className="table table-hover table-bordered table-responsive">
                <thead className="table-light">
                    <tr>
                        <th onClick={() => handleSort('date')}>
                            Date {sortedField === 'date' && (sortDirection === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th onClick={() => handleSort('category')}>
                        Category {sortedField === 'category' && (sortDirection === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th onClick={() => handleSort('unitCost')}>
                        Purchase Cost {sortedField === 'unitCost' && (sortDirection === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th onClick={() => handleSort('maturityDate')}>
                        Maturity Date {sortedField === 'maturityDate' && (sortDirection === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th onClick={() => handleSort('maturityUnitPrice')}>
                        Maturity Price {sortedField === 'maturityUnitPrice' && (sortDirection === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th>Edit Record</th>
                        <th>Delete Record</th>
                    </tr>
                </thead>
                <tbody>
                    {investmentData.map((investment) => (
                        <React.Fragment key={investment.investmentId}>
                            <tr onMouseEnter={() => handleCategoryEnter(investment.investmentId)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <td>{new Date(investment.investmentDate).toLocaleDateString()}</td>
                                <td>{investment.category}</td>
                                <td>{(investment.unitCost) * (investment.quantity)}</td>
                                <td>{new Date(investment.maturityDate).toLocaleDateString()}
                                </td>
                                <td>{(investment.maturityUnitPrice) * (investment.quantity)}</td>
                                <td>
                                    <FaEdit style={{ cursor: "pointer", color: "blue" }}
                                        onClick={() => handleEditClick(investment.investmentId)} />
                                </td>
                                <td>
                                    <FaTrash style={{ cursor: "pointer", color: "blue" }}
                                        onClick={() => handleDeleteClick(investment.investmentId)} />
                                </td>
                            </tr>
                            {hoverInvestmentId === investment.investmentId && (
                                <tr>
                                    <td colSpan="7" className="bg-light">

                                        <strong>Issuer:</strong> {investment.issuer} <span style={{ marginRight: '10px' }} />
                                        <strong>Quantity</strong> {investment.quantity}<br />
                                        <strong>Unit Purchase Cost</strong> {investment.unitCost}<span style={{ marginRight: '10px' }} />
                                        <strong>Maturity Unit Price</strong> {investment.maturityUnitPrice}<span style={{ marginRight: '10px' }} />
                                        <strong>Description:</strong> {investment.description}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    <div>
                        
                    </div>
                  
                </tbody>
            </table>
        </div>
    );
};

export default InvestmentTable;
