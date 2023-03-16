import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Report from './components/Report'
import ReportsList from './components/ReportsList'
import Guide from './components/Guide'
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path='/' element={<Navigation/>}/>
            <Route path='/report' element={<Report/>}/>
            <Route path='/reportslist' element={<ReportsList/>}/>
            <Route path='/guide' element={<Guide/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
