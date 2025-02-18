import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './pages/header';
import Main from './pages';
import UpdatedMain from './pages/updated';
const App = () => {
  
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/" element={<UpdatedMain />} /> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
