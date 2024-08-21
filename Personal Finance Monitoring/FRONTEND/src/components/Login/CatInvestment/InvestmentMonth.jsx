import React from 'react'
import { Link } from 'react-router-dom'
import InvestmentTable from './InvestmentTable'
import MonthlyInvestBarGraph from './MonthlyInvestBarGraph'
import InvestmentDonutGraph from './InvestmentDonutGraph'

const InvestmentMonth = ({dataSource}) => {
    return (
        <div>
            <Link to="/Investment/add">
                Add Investment
            </Link>
            <InvestmentTable dataSource={dataSource}/>
            <MonthlyInvestBarGraph dataSource={dataSource}/>
            <InvestmentDonutGraph dataSource={dataSource}/>
        </div>
    )
}

export default InvestmentMonth
