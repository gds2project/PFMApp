import React from 'react'
import { Link } from 'react-router-dom'
import IncomeTable from './IncomeTable'
import IncomeGraph from './IncomeGraph'
import MonthlyIncomeBarGraph from './MonthlyIncomeBarGraph'

const IncomeMonth = ({dataSource}) => {
    return (
        <div>
             <Link to={'/incomes'}>
                    Add Income            
            </Link>
            <IncomeTable dataSource={dataSource}/>
           <MonthlyIncomeBarGraph dataSource={dataSource}/>
           <IncomeGraph dataSource={dataSource}/>
        </div>
    )
}

export default IncomeMonth
