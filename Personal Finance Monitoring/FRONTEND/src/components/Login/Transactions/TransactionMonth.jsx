import React from 'react'
import TransactionTable from './TransactionTable'
import MonthAllTransactionsGroupedBarGraph from './MonthAllTransactionsGroupedBarGraph'


const TransactionMonth = ({incomeData,investmentData,expenditureData}) => {
    return (
        <div>
            <MonthAllTransactionsGroupedBarGraph incomeData={incomeData} investmentData={investmentData} expenditureData={expenditureData}/>
            <TransactionTable incomeData={incomeData} investmentData={investmentData} expenditureData={expenditureData}/>
            
        </div>
    )
}

export default TransactionMonth
