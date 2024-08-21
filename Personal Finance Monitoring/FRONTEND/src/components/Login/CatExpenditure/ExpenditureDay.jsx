import React from 'react'
import ExpenditureTable from './ExpenditureTable'
import ExpenditureBarGraph from './ExpenditureBarGraph'
import ExpenditureDonutGraph from './ExppenditureDonutGraph'
import { Link } from 'react-router-dom'


const ExpenditureDay = ({dataSource}) => {
    return (
        <div>
            <Link to={`/expense/add`}>
                Add Expenditure
            </Link>
            <ExpenditureTable dataSource={dataSource}/>
            <ExpenditureBarGraph dataSource={dataSource}/>
            <ExpenditureDonutGraph dataSource={dataSource}/>
        </div>
    )
}

export default ExpenditureDay
