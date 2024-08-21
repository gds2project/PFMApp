import React from 'react'
import { Link } from 'react-router-dom'
import InvestmentTable from './InvestmentTable'
import InvestmentDonutGraph from './InvestmentDonutGraph'
import YearInvestmentBar from './YearInvestmentBar'

const InvestmentYear = ({dataSource}) => {
    return (
        <div>
              <Link to="/Investment/add">
                Add Investment
            </Link>
            <InvestmentTable dataSource={dataSource}/>
            <YearInvestmentBar dataSource={dataSource}/>
            <InvestmentDonutGraph dataSource={dataSource}/>
        </div>
    )
}

export default InvestmentYear
