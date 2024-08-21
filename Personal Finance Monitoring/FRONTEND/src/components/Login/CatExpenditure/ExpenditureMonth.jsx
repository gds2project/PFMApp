import React from 'react'
import { Link } from 'react-router-dom'
import ExpenditureTable from './ExpenditureTable'
import MonthlyExpBarGraph from './MonthlyExpBarGraph'
import ExppenditureDonutGraph from './ExppenditureDonutGraph'

const ExpenditureMonth = ({dataSource}) => {
    return (
        <div>
            <Link to={`/expense/add`}>
                Add Expenditure
            </Link>
            <ExpenditureTable dataSource={dataSource}/>            
            <MonthlyExpBarGraph dataSource={dataSource}/>
            <ExppenditureDonutGraph dataSource={dataSource}/>
        </div>
    )
}

export default ExpenditureMonth