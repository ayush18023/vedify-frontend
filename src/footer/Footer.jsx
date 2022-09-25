import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer mt-10 p-10'>
      <hr />
      <ul className='list-none flex w-100 justify-around top_footer'>
        <li>Privacy Policy</li>
        <li>Replacement Policy</li>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>
      <hr className='text-sky-400' />
      <div className='w-full flex justify-center mt-10'>&copy; Ayush Deshmukh</div>

    </div>
  )
}

export default Footer