import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';

// jos näkymä on kotisivu näyttää isomman headerin ja navigaation, muuten vain pienempi header
const Home = () => {
  const [location] = useState(useLocation())

  return (
    <div className='flex flex-col'>
      <Navigation />
    </div>
  )
}

export default Home