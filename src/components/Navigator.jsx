/*

import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Report from './Report';
import ReportsList from './ReportsList';


const Navigator = (props) => {

  const GoToHome = () => {
    return (
      <Router>
        <Link to='/home'></Link>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    )
  }

  const GoToReport = () => {
    return (
      <Router>
        <Link to='/report'></Link>
        <Routes>
          <Route path='/report' element={<Report />} />
        </Routes>
      </Router>
    )
  }

  const GoToReportsList = () => {
    return (
      <Router>
        <Link to='/reportslist'></Link>
        <Routes>
          <Route path='/reportslist' element={<ReportsList />} />
        </Routes>
      </Router>
    )
  }

  const SelectComponent = (props) => {
    if (props.target === 'Home') return (<GoToHome />)
    if (props.target === 'Report') return(<GoToReport />)
    if (props.target === 'ReportsList') return(<GoToReportsList />)
  }

  return (
      <SelectComponent target = {props.target} /> 
  )
} 

export default Navigator */