import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gameboard from './pages/Gameboard/Gameboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Gameboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
