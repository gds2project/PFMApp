import React from 'react'
import { Link } from 'react-router-dom'
import ExpenditureTable from './ExpenditureTable'
import ExppenditureDonutGraph from './ExppenditureDonutGraph'
import YearExpenditureBar from './YearExpenditureBar'

const ExpenditureYear = ({dataSource}) => {
    return (
        <div>
             <Link to={`/expense/add`}>
                Add Expenditure
            </Link>
            <ExpenditureTable dataSource={dataSource}/>
            <YearExpenditureBar dataSource={dataSource}/>
            <ExppenditureDonutGraph dataSource={dataSource}/>
        </div>
    )
}

export default ExpenditureYear
