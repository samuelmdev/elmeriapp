import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Report from './components/Report'
import ReportsList from './components/ReportsList'
import Guide from './components/Guide'
import Navigation from './components/Navigation';
import './App.css';
import Home from './components/Home';
import Item from './components/Item';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Home />
          <Routes>
            <Route path='/report' element={<Report/>}/>
            <Route path='/reportlist' element={<ReportsList/>}/>
            <Route path='/guide' element={<Guide/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
