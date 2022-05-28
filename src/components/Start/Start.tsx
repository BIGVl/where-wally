import { Link } from 'react-router-dom';
import './Start.css';

const Start = () => {
  return (
    <div className="start-screen">
      <div className="start-div">
        As soon as you click on 'Start Game' the timer will start counting and you will need to find Waldo and Wilma as soon as
        you can. After you find b oth of them enter your name and check the leaderboard to see where you locate yourself. Have
        fun!
        <Link to="gameboard" className="start-button">
          Start game
        </Link>
      </div>
    </div>
  );
};

export default Start;
