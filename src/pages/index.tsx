import React, { EventHandler, InputHTMLAttributes, useEffect, useState } from "react";
import { Player } from "../shared/interfaces";

const DEFAULT_PLAYERS_TEST: Player[] = [
  {
    id: 1,
    name: "Benjamin",
    score: 4.5,
    totalVotes: 3,
    country: "Argentina"
  }
];

const DEFAULT_VOTE = "7";
const LOCALSTORAGE_PLAYERS = "PLAYERS";

export default function Home() {
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [inputVotesValues, setInputVotesValues] = useState<{[key: string]: string}>({});
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    score: "7",
    country: "Argentina"
  });

  useEffect(() => {
    setPlayersList(JSON.parse(window?.localStorage.getItem(LOCALSTORAGE_PLAYERS) || JSON.stringify(DEFAULT_PLAYERS_TEST) || "[]"));
  }, []);

  const votePlayer = (index: number) => {
    return () => {
      const newPlayersList: Player[] = JSON.parse(JSON.stringify(playersList));
      const score = Math.round(((newPlayersList[index].score * newPlayersList[index].totalVotes) + Number(inputVotesValues[index])) / (newPlayersList[index].totalVotes + 1) * 10) / 10;
      newPlayersList[index].score = score;
      
      newPlayersList[index].totalVotes += 1
      setPlayersList(newPlayersList);
      window?.localStorage.setItem(LOCALSTORAGE_PLAYERS, JSON.stringify(newPlayersList));
    };
  }
  
  const removePlayer = (indexToRemove: number) => {
    return () => {
      const newPlayersList: Player[] = JSON.parse(JSON.stringify(playersList));
      newPlayersList.splice(indexToRemove, 1);
      setPlayersList(newPlayersList);
      window?.localStorage.setItem(LOCALSTORAGE_PLAYERS, JSON.stringify(newPlayersList));
    };
  }
  
  const addPlayer = () => {
    if (newPlayer.name.length) {
      const newPlayersList: Player[] = JSON.parse(JSON.stringify(playersList));

      const player: Player = {
        ...newPlayer,
        id: newPlayersList[newPlayersList.length -1]?.id || 0 + 1,
        score: Number(newPlayer.score),
        totalVotes: 1
      }

      newPlayersList.push(player);
      setPlayersList(newPlayersList);
      window?.localStorage.setItem(LOCALSTORAGE_PLAYERS, JSON.stringify(newPlayersList));
    }
  }

  const onChangeInputVoteNumber = (index: number) => (event) => {
    setInputVotesValues({
      ...inputVotesValues,
      [index]: event.target.value
    })
  };
  
  const onChangeInput = (name: string) => (event) => {
    setNewPlayer({
      ...newPlayer,
      [name]: event.target.value
    })
  };

  return (
    <div className="container">
      <header className="header">Team Selector</header>

      <aside>
        <ul>
          <li>Dashboard</li>
          <li>Players</li>
          <li>Games</li>
        </ul>
      </aside>

      <main>
        <h1>Players</h1>
        <h2>Best Players</h2>
        <div className="best-players">
          <div className="player">
            <div className="name">
              Nico T <span className="score">4.9</span>
            </div>
            <div className="country">Argentina</div>
          </div>
          <div className="player best">
            <div className="name">
              Bictor B <span className="score">5.0</span>
            </div>
            <div className="country">Argentina</div>
          </div>
          <div className="player">
            <div className="name">
              Pato M <span className="score">4.6</span>
            </div>
            <div className="country">Argentina</div>
          </div>
        </div>

        <h2>All Players</h2>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Score</th>
              <th>Country</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
          {playersList.map(({id, name, score, country}, index) => {
            return (
            <tr key={id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{name}</td>
              <td>{score}</td>
              <td>{country}</td>
              <td>
                <input type="number" min="1" max="10" onChange={onChangeInputVoteNumber(index)} value={inputVotesValues[index]|| DEFAULT_VOTE}/>
                <button onClick={votePlayer(index)}>Vote</button>
                <button className="btnRemove" onClick={removePlayer(index)}>Remove</button>
              </td>
            </tr>
            )
          })}
          </tbody>
        </table>
      </main>

      <footer>
        <div className="newPlayer">
          <input type="text" placeholder="Name" value={newPlayer.name} onChange={onChangeInput("name")}/>
          <input type="text" placeholder="Country" value={newPlayer.country} onChange={onChangeInput("country")}/>
          <input type="number" placeholder="Score" min="1" max="10" value={newPlayer.score} onChange={onChangeInput("score")}/>
          <button onClick={addPlayer}>Add Player</button>
        </div>
        <div className="newGame">
          <div className="selectedPlayers">0/12 Selected</div>
          <button>New Game</button>
        </div>
      </footer>

      <style jsx>{`
        main {
          min-height: calc(100vh - 85px - 52px);
          width: calc(100% - 262px);
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          margin-left: 262px;
          margin-top: 85px;
        }

        .best-players {
          display: flex;
          flex-direction: row;
          align-content: space-between;
          justify-content: space-between;
          width: calc(100% - 16px);
          margin-left: 16px;
        }

        .best-players .player {
          width: 30%;
          background: white;
          border-radius: 4px;
          padding: 8px;
        }

        .best-players .player.best {
          background: linear-gradient(45deg, #7e57c2, #ab47bc);
          color: white;
        }

        .best-players .player .name {
          font-weight: bold;
          line-height: 32px;
        }

        .player .name .score {
          display: inline-box;
          float: right;
        }

        .best-players .player .country {
          border-top: 1px solid #ddd;
          line-height: 24px;
          font-size: 12px;
        }

        table {
          width: calc(100% - 16px);
          margin-left: 16px;
          border: none;
          border-spacing: 0 4px;
          border-collapse: separate;
        }

        table th,
        table td {
          text-align: left;
          line-height: 48px;
        }

        table tbody td {
          background: white;
          border: none;
        }

        .btnRemove {
          margin-left: 8px;
          background: #AA0000;
        }

        footer {
          height: 52px;
          width: calc(100% - 262px);
          margin-left: 262px;
          line-height: 52px;
          background: white;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 16px;
        }

        
        footer > .newPlayer {
          flex: 2;
        }
        
        footer > .newGame {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        
        footer div.selectedPlayers {
          margin-right: 8px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background: #f6f8f9;
        }

        * {
          box-sizing: border-box;
        }

        .header {
          height: 85px;
          width: 100%;
          text-align: left;
          background: white;
          position: fixed;
          top: 0;
          font-size: 32px;
          padding-left: 16px;
          line-height: 85px;
          box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        }

        aside {
          height: calc(100vh - 85px);
          width: 262px;
          background: rgba(255, 255, 255, 0.8);
          position: fixed;
          top: 84px;
          left: 0;
          border-top: 4px solid white;
          box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
        }

        aside ul {
          list-style: none;
          margin: 0;
          padding: 16px;
          font-size: 16px;
        }

        aside ul li {
          line-height: 28px;
          cursor: pointer;
          margin: 8px 0;
        }

        aside ul li:hover {
          font-weight: bold;
        }

        h1,
        h2 {
          font-size: 28px;
          text-align: left;
          margin: 0;
          padding: 8px 16px;
          width: 100%;
        }

        h2 {
          font-size: 18px;
        }

        button {
          background: #007bff;
          color: white;
          line-height: 24px;
          font-size: 14px;
          text-align: center;
          border: none;
          cursor: pointer;
        }
        
        input {
          line-height: 22px;
          font-size: 14px;
          border: 1px solid #CCC;
        }

        button:hover {
          opacity: .9;
        }
      `}</style>
    </div>
  );
}
