import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import './AddToBoard.css';

interface Props {
  time: number;
}

const AddToBoard = ({ time }: Props) => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (e: any) => {
    setName((): string => {
      return e.target.value;
    });
  };

  const checkName = async () => {
    const querrySnap = await getDocs(collection(db, 'leaderboards'));
    const checker: any[] = [];
    querrySnap.forEach((doc) => {
      checker.push(doc.data());
    });
    return checker;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (name.length < 3) {
      setErrorMsg('The name has to be at least 3 characters');
      return;
    }
    try {
      const currentPlayers = await checkName();
      const check = currentPlayers.find((player) => {
        return player.name === name;
      });
      if (check !== undefined) {
        setErrorMsg('This name is already taken.');
        return;
      }
      await addDoc(collection(db, 'leaderboards'), {
        name: name,
        time: time
      });
      setSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {submitted === true ? (
        <div className="submitted">
          <p className="submitted-p">Your score has been submitted !</p>
          <Link className="link-leaderboards" to="/leaderboards">
            Leaderboards
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <legend>Add your score to the leaderboard .</legend>
          <p>Good job !</p>
          <p className="result-secs">
            Time : <p className="time-p">{time}</p>
            seconds
          </p>
          <label htmlFor="name">Enter your name : </label>
          <input type="text" id="name" className="name" onChange={onChange} value={name} />
          {errorMsg && <p className="error-name">{errorMsg}</p>}
          <button type="submit" className="add-score">
            Add score
          </button>
        </form>
      )}
    </div>
  );
};

export default AddToBoard;
