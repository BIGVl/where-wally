import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import './Leaderboards.css';

interface Players {
  name: string;
  time: number;
}

const Leaderboards = () => {
  const [players, setPlayers] = useState<Players[]>([]);

  //When the page loads it retrieves the data from the server
  const getLeaderboards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'leaderboards'));
      querySnapshot.forEach((doc) => {
        setPlayers((prev: any[]) => {
          const data = doc.data();
          return [...prev, data];
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLeaderboards();
  }, []);

  return (
    <div className="leaderboards-page">
      {players.length === 0 ? (
        <div className="no-leader">
          No results yet. <div> Play a game and register it to be the first one on the leaderboard! </div>{' '}
        </div>
      ) : (
        <table className="leaderboard">
          <thead>
            <tr>
              <th className="rankings">Rk.</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player: Players, i: number) => {
              return (
                <tr key={i} className="player">
                  <td className="ranking">{i + 1}. </td>
                  <td className="p-name"> {player.name}</td>
                  <td className="p-time"> {player.time} seconds</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboards;
