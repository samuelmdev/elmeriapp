import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex align-items-start bg-primary-blue py-4 pl-12'>
      <p className='bg-primary-blue text-white text-xl'><Link to="/">Elmeri</Link></p>
    </div>
  )
}

export default Header