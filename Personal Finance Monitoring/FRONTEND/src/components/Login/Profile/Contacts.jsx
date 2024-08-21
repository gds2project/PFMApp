import React from 'react'
import { Link } from 'react-router-dom'
import ContactTable from './ContactTable'

const Contacts = () => {
  return (
    <div>
      <Link to='/contacts/add'>Add Contacts</Link>
      <ContactTable/>
    </div>
  )
}

export default Contacts
