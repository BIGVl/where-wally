import { useEffect, useState } from 'react';
import gameImg from '../../assets/wheres-waldo.jpg';
import './Gameboard.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const Gameboard = () => {
  //Saving the window dimensions every time they resize
  const [circle, setCircle] = useState(0);
  const [styleCircle, setStyleCircle] = useState({ top: 0, left: 0 });

  //Adds the circle where the user has clicked
  const popFounder = (e: any) => {
    console.log(e.clientY, e.clientX);
    setStyleCircle(() => {
      return { top: e.clientY, left: e.clientX };
    });
    setCircle(1);
  };

  //Removes the circle when the user clicks out of the image
  const removeCircle = (e: any) => {
    if (e.target.classList.contains('gameImg') || e.target.classList.contains('circle')) return;
    setCircle(0);
  };

  useEffect(() => {
    checkTarget();
  }, [styleCircle]);

  const checkTarget = async () => {
    const { innerWidth, innerHeight } = window;
    const y = (styleCircle.top * 100) / innerHeight;
    const x = (styleCircle.left * 100) / innerWidth;

    const target = await getTarget();
    console.log(target);
    const targetX = target[0].image1TargetX;
    const targetY = target[0].image1TargetY;
    console.log(x, y, targetX, targetY);
    if (x - 2 <= targetX && targetX <= x + 2 && y - 3 <= targetY && targetY <= y + 3) {
    }
  };

  //Checks with the server if the user clicked on the right spot by calculating the percentage of width and height of where the user clicked
  const getTarget = async () => {
    let target: any[] = [];

    try {
      const targets = await getDocs(collection(db, 'targets'));

      targets.forEach((doc) => {
        target.push({ ...doc.data() });
      });
    } catch (err) {
      console.log(err);
    }
    return target;
  };

  return (
    <div className="gameboard" onClick={removeCircle}>
      <img src={gameImg} alt="Characters everywhere and Waldo" className="gameImg" onClick={popFounder} />
      {circle === 1 ? (
        <div className="circle-div" style={{ top: styleCircle.top, left: styleCircle.left, transform: 'translate(-50%, -50%)' }}>
          <div className="circle"></div>
          <div className="options-target">
            <li className="waldo">Waldo</li>
            <li className="wilma">Wilma</li>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Gameboard;
