import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Home';
import Room from './Room';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Room/>} />
          <Route path="/room" element={<Room />} />
          
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
