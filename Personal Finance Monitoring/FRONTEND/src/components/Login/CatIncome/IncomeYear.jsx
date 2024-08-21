import React from 'react'
import { Link } from 'react-router-dom'
import IncomeTable from './IncomeTable'
import IncomeGraph from './IncomeGraph'
import YearlyIncomeBar from './YearlyIncomeBar'

const IncomeYear = ({dataSource}) => {
    return (
        <div>
             <Link to={'/incomes'}>
                    Add Income            
            </Link>
            <IncomeTable dataSource={dataSource}/>
           <YearlyIncomeBar dataSource={dataSource}/>
           <IncomeGraph dataSource={dataSource}/>
        </div>
    )
}

export default IncomeYear