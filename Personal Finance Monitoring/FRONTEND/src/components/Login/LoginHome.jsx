import React from 'react'
import { Link } from 'react-router-dom'
import SecondaryBar from '../NavigationBars/SecondaryBar'

const LoginHome = () => {
  return (
    <div>
      <Link to="/catBar" className="nav-link">
      Login
      </Link>
     <SecondaryBar/>
    </div>
  )
}

export default LoginHome
