import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// pienempi header elmeri-linkillä
const Header = () => {
  const [location] = useState(useLocation())

  return (
    <div>
      {(window.location.pathname === "/") ?
            <p className='flex bg-primary-blue text-white align-items-start py-16 pl-16 text-5xl mb-16'>Elmeri</p> :      
      <div className='flex align-items-start bg-primary-blue py-4 pl-12'>
        <p className='bg-primary-blue text-white text-xl'><Link to="/">Elmeri</Link></p>
      </div>}
    </div>
  )
}

export default Header