import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <Link className="nav-leaderboards" to="/leaderboards">
        Leaderboards
      </Link>
      <Link className="nav-start" to="/start">
        New Game
      </Link>
    </nav>
  );
};

export default Navbar;
