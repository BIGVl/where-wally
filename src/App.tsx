import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gameboard from './pages/Gameboard/Gameboard';
import Start from './components/Start/Start';
import Navbar from './components/Navbar/Navbar';
import Leaderboards from './pages/Leaderboards/Leaderboards';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="start" element={<Start />} />
          <Route path="start/gameboard" element={<Gameboard />} />
          <Route path="leaderboards" element={<Leaderboards />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
