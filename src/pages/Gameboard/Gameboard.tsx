import { useEffect, useState } from 'react';
import gameImg from '../../assets/wheres-waldo.jpg';
import './Gameboard.css';
import mark from '../../assets/mark.svg';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import AddToBoard from '../../components/AddToBoard/AddToBoard';

const Gameboard = () => {
  //Saving the window dimensions every time they resize
  const [circle, setCircle] = useState(0);
  const [styleCircle, setStyleCircle] = useState({ top: 0, left: 0 });
  const [characters, setCharacters]: any[] = useState([]);
  const [loading, setLoading] = useState(true);
  const [missedFeedback, setMissedFeedback] = useState(false);
  const [marks, setMarks]: any[] = useState([]);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    getCharacters().then((data) => {
      setCharacters(() => {
        const chars = data.map((char) => {
          return char.character;
        });
        return chars;
      });
    });
  }, []);

  //Set timer
  useEffect(() => {
    const intervalId = setTimeout(() => {
      setCountdown(countdown + 1);
    }, 1000);

    if (marks.length >= 2) {
      clearInterval(intervalId);
    }
  });

  //Adds the circle where the user has clicked
  const popFounder = (e: any) => {
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

  //Reset the characters set back to what they were at the start so the user can play again

  const restorePlay = () => {
    getCharacters().then((data) => {
      setCharacters(() => {
        const chars = data.map((char) => {
          return char.character;
        });
        return chars;
      });
    });
    setMarks([]);
    setCountdown(0);
  };

  //Check what character did the user selected and check if it is in the spot he clicked
  const checkTarget = async (e: any) => {
    const { innerWidth, innerHeight } = window;
    const y = (styleCircle.top * 100) / innerHeight;
    const x = (styleCircle.left * 100) / innerWidth;
    console.log(x, y);
    const data = await getCharacters();

    data.forEach((char) => {
      if (char.character.toLowerCase() === e.target.dataset.name.toLowerCase()) {
        const targetX = char.x;
        const targetY = char.y;
        if (x - 2 <= targetX && targetX <= x + 2 && y - 3 <= targetY && targetY <= y + 3) {
          setMarks((prev: any) => {
            const target = { x: char.x, y: char.y };
            return [...prev, target];
          });
          setCharacters((prev: any) => {
            const remChar = prev.filter((char: string) => {
              return char !== e.target.dataset.name;
            });
            return remChar;
          });
        } else {
          setMissedFeedback(true);
          setTimeout(() => {
            setMissedFeedback(false);
          }, 1000);
        }
      }
    });
  };

  //Checks with the server if the user clicked on the right spot by calculating the percentage of width and height of where the user clicked
  const getCharacters = async () => {
    let target: any[] = [];

    try {
      const targets = await getDocs(collection(db, 'targets'));

      targets.forEach((doc) => {
        target.push({ ...doc.data() });
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    return target;
  };

  return (
    <div className="gameboard" onClick={removeCircle}>
      {loading === true ? <div className="loading">Wait for it...</div> : null}
      {missedFeedback === true ? <div className="missed-pop"> That was a miss ! </div> : null}
      <div className="timer"> Time: {countdown}s</div>
      <img src={gameImg} alt="Characters everywhere and Waldo" className="gameImg" onClick={popFounder} />
      {marks.map((theMark: any, i: number) => {
        return (
          <img
            key={i}
            src={mark}
            alt="x mark"
            className="x-mark"
            style={{ top: theMark.y + '%', left: theMark.x + '%', transform: 'translate(-50%,-50%)' }}
          />
        );
      })}
      {circle === 1 ? (
        <>
          <div
            className="circle-div"
            style={{ top: styleCircle.top, left: styleCircle.left, transform: 'translate(-50%, -50%)' }}
          >
            <div className="circle"></div>
          </div>
          <div
            className="options-target"
            onClick={checkTarget}
            style={{ top: styleCircle.top, left: styleCircle.left, transform: 'translate(+40%, -25%)' }}
          >
            {characters.map((char: string) => {
              return (
                <li key={char} data-name={char}>
                  {char}
                </li>
              );
            })}
          </div>
        </>
      ) : null}

      {characters.length === 0 ? (
        <div className="modal">
          <div className="popup">
            <div className="announce">Winner, winner, Chicken Dinner!</div>
            <AddToBoard time={countdown} />
            <button className="play-again" onClick={restorePlay}>
              Play again
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Gameboard;
