import wally from '../../assets/wally.png';
import wilma from '../../assets/wilma.jpg';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <p className="introduction">Let's see how fast can you find Waldo and Wilma. Click on 'New Game ' to start. </p>
      <div className="wally">
        <img src={wally} alt="Wally from Where's Wally" />
        Wally
      </div>
      <div className="wilma">
        <img src={wilma} alt="Wilma from Where's Waldo" />
        Wilma
      </div>
    </div>
  );
};

export default Home;
