import React from 'react';
import './App.css';
import './login-page.css'
import Login from './components/Login';
import Login2 from './components/Login2'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login2 />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
