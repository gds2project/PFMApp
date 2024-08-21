import React from 'react'
import IncomeTable from './IncomeTable'
import IncomeBarGraph from './IncomeBarGraph'
import IncomeGraph from './IncomeGraph'
import { Link } from 'react-router-dom'

const IncomeDay = ({dataSource}) => {
    return (
        <div>
             <Link to={'/incomes'}>
                    Add Income            
            </Link>
           <IncomeTable dataSource={dataSource}/>
           <IncomeBarGraph dataSource={dataSource}/>
           <IncomeGraph dataSource={dataSource}/>
        </div>
    )
}

export default IncomeDay
