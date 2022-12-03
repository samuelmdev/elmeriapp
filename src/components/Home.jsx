import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Report from './Report'
import ReportsList from './ReportsList'

const Home = () => {
  return (
    <div>
    <Router>
      <Link to='/'><button>Kotisivu</button></Link>
      <Link to='/report'><button>Luo uusi raportti</button></Link>
      <Link to='/reportslist'><button>Raportit</button></Link>
        <Routes>
          <Route exact path='/' element={this}></Route>  
          <Route exact path='/report' element={< Report />}></Route>
          <Route exact path='/reportslist' element={< ReportsList />}></Route>
        </Routes>
      </Router>
  </div>
  )
}

export default Home