import React from 'react'
import TransactionTable from './TransactionTable'
import YearAllTransactionsGroupedBarGraph from './YearAllTransactionsGroupedBarGraph'

const TransactionYear = ({incomeData,investmentData,expenditureData}) => {
    return (
        <div>
            <YearAllTransactionsGroupedBarGraph incomeData={incomeData} investmentData={investmentData} expenditureData={expenditureData}/>
            <TransactionTable incomeData={incomeData} investmentData={investmentData} expenditureData={expenditureData}/>
        </div>
    )
}

export default TransactionYear