import React, { useState } from 'react'
import { BrowserRouter as Router,Routes, Route, Link, useLocation } from 'react-router-dom';
import Report from './Report'
import ReportsList from './ReportsList'
import Guide from './Guide'
import Navigation from './Navigation';
import Header from './Header';

const Home = () => {
  const [location, setLocation] = useState(useLocation())

  return (
    <div className='flex flex-col'>
      {(window.location.pathname === "/") ? <div><p className='flex bg-primary-blue text-white align-items-start py-16 pl-16 text-5xl mb-16'>Elmeri</p>
      <Navigation /></div>
      : <Header/>}
    </div>
  )
}

export default Home