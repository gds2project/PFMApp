import React, { useState } from 'react';
import InvestmentTable from '../CatInvestment/InvestmentTable';
const PaginatedTable = ({ dataSource, ...props }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataSource.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(dataSource.length / itemsPerPage);

    return (
        <div>
            <InvestmentTable dataSource={currentItems} {...props} />
            <div className="pagination">
                {[...Array(totalPages).keys()].map(number => (
                    <button
                        key={number + 1}
                        onClick={() => handlePageChange(number + 1)}
                        className={number + 1 === currentPage ? 'active' : ''}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PaginatedTable;
