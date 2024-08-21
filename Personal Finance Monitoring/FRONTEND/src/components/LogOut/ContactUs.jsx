import React from 'react'
import { FaMapPin, FaPhoneAlt,FaEnvelope} from 'react-icons/fa';
const ContactUs = () => {
  return (
    <div className='container'>
        <br/><br/><br/>
      <h3>How Can We Help You?</h3><br/>
      <h1><strong>Contact Us</strong></h1>
      <p><h4>We are here to help and answer any question you might have.We look forward to hearing from you!</h4></p>
      <div>
        <p>
      <span><FaMapPin style={{ color: 'red', fontSize: '24px' }} /> 
                       Infoway Pune
      </span>
      </p>
      <p>
        <FaPhoneAlt style={{ color: 'green', fontSize: '24px' }} /> 
        +91 9730263087
      </p>
      
      <p>
        <FaEnvelope style={{ color: 'blue', fontSize: '24px' }} /> 
        projectinfoway@gmail.com
      </p>
      
      </div>

    </div>
  )
}

export default ContactUs;