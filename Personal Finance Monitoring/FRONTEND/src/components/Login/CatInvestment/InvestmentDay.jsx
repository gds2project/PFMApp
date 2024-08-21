import React from 'react'
import InvestmentTable from './InvestmentTable'
import InvestmentBarGraph from './InvestmentBarGraph'
import InvestmentDonutGraph from './InvestmentDonutGraph'
import { Link } from 'react-router-dom'


const InvestmentDay = ({ dataSource }) => {
    return (
        <div>
            <Link to="/Investment/add">
                Add Investment
            </Link>
            <InvestmentTable dataSource={dataSource} />
            <InvestmentDonutGraph dataSource={dataSource} />
            <InvestmentBarGraph dataSource={dataSource} />
        </div>
    )
}

export default InvestmentDay
