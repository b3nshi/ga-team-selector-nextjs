import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Player } from '../shared/interfaces';
import { DEFAULT_PLAYERS_TEST, LOCALSTORAGE_PLAYERS } from '../constants';

const DEFAULT_VOTE = '7';
const EMPTY_PLAYER = {
  name: '',
  score: '7',
  country: 'Argentina',
} as const;

export default function Home() {
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [inputVotesValues, setInputVotesValues] = useState<{
    [key: string]: string;
  }>({});
  const [newPlayer, setNewPlayer] = useState({ ...EMPTY_PLAYER });
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    setPlayersList(
      JSON.parse(
        window?.localStorage.getItem(LOCALSTORAGE_PLAYERS) ||
          JSON.stringify(DEFAULT_PLAYERS_TEST) ||
          '[]'
      )
    );
  }, []);

  const votePlayer = (index: number) => {
    return () => {
      const newPlayersList: Player[] = JSON.parse(JSON.stringify(playersList));
      const score =
        Math.round(
          ((newPlayersList[index].score * newPlayersList[index].totalVotes +
            Number(inputVotesValues[index])) /
            (newPlayersList[index].totalVotes + 1)) *
            10
        ) / 10;
      newPlayersList[index].score = score;

      newPlayersList[index].totalVotes += 1;
      setPlayersList(newPlayersList);
      window?.localStorage.setItem(
        LOCALSTORAGE_PLAYERS,
        JSON.stringify(newPlayersList)
      );
    };
  };

  const removePlayer = (indexToRemove: number) => {
    return () => {
      const newPlayersList: Player[] = JSON.parse(JSON.stringify(playersList));
      newPlayersList.splice(indexToRemove, 1);
      setPlayersList(newPlayersList);
      window?.localStorage.setItem(
        LOCALSTORAGE_PLAYERS,
        JSON.stringify(newPlayersList)
      );
    };
  };

  const addPlayer = () => {
    if (newPlayer.name.length) {
      const newPlayersList: Player[] = JSON.parse(JSON.stringify(playersList));

      const player: Player = {
        ...newPlayer,
        id: newPlayersList[newPlayersList.length - 1]?.id || 0 + 1,
        score: Number(newPlayer.score),
        totalVotes: 1,
      };

      newPlayersList.push(player);
      setPlayersList(newPlayersList);
      setNewPlayer({ ...EMPTY_PLAYER });
      window?.localStorage.setItem(
        LOCALSTORAGE_PLAYERS,
        JSON.stringify(newPlayersList)
      );
    }
  };

  const onChangeInputVoteNumber = (index: number) => (event) => {
    setInputVotesValues({
      ...inputVotesValues,
      [index]: event.target.value,
    });
  };

  const onChangeInput = (name: string) => (event) => {
    setNewPlayer({
      ...newPlayer,
      [name]: event.target.value,
    });
  };

  const sortBy = (column: string, order: 'ASC' | 'DESC') => {
    const sortedPlayers = [...playersList];

    sortedPlayers.sort((playerA: Player, playerB: Player) => {
      if (order === 'DESC') {
        return playerA[column] > playerB[column] ? -1 : 1;
      }
      return playerA[column] > playerB[column] ? 1 : -1;
    });

    return sortedPlayers;
  };

  const onTogglePlayer = (index: number) => (_evt) => {
    const selectedIndex = selectedPlayers.indexOf(index);
    const newSelected = [...selectedPlayers];

    if (selectedIndex === -1) {
      newSelected.push(index);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedPlayers(newSelected);
  };

  const isSelected = (index: number) => selectedPlayers.indexOf(index) !== -1;

  useEffect(() => {
    const sortedPlayers = sortBy('score', 'DESC');
    setTopPlayers(sortedPlayers.slice(0, 3));
  }, [playersList]);

  return (
    <div className="container">
      <header className="header">Team Selector</header>

      <aside>
        <ul>
          <li>Dashboard</li>
          <li>
            <Link href="/">Players</Link>
          </li>
        </ul>
      </aside>

      <main>
        <h1>Players</h1>
        <h2>Best Players</h2>
        <div className="best-players">
          <div className="player">
            <div className="name">
              {topPlayers[1]?.name}{' '}
              <span className="score">{topPlayers[1]?.score}</span>
            </div>
            <div className="country">{topPlayers[1]?.country}</div>
          </div>
          <div className="player best">
            <div className="name">
              {topPlayers[0]?.name}{' '}
              <span className="score">{topPlayers[0]?.score}</span>
            </div>
            <div className="country">{topPlayers[0]?.country}</div>
          </div>
          <div className="player">
            <div className="name">
              {topPlayers[2]?.name}{' '}
              <span className="score">{topPlayers[2]?.score}</span>
            </div>
            <div className="country">{topPlayers[2]?.country}</div>
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
            {playersList.map(({ id, name, score, country }, index) => {
              return (
                <tr key={name}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={onTogglePlayer(index)}
                      checked={isSelected(index)}
                    />
                  </td>
                  <td>{name}</td>
                  <td>{score}</td>
                  <td>{country}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      onChange={onChangeInputVoteNumber(index)}
                      value={inputVotesValues[index] || DEFAULT_VOTE}
                    />
                    <button onClick={votePlayer(index)}>Vote</button>
                    <button className="btnRemove" onClick={removePlayer(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      <footer>
        <div className="newPlayer">
          <input
            type="text"
            placeholder="Name"
            value={newPlayer.name}
            onChange={onChangeInput('name')}
          />
          <input
            type="text"
            placeholder="Country"
            value={newPlayer.country}
            onChange={onChangeInput('country')}
          />
          <input
            type="number"
            placeholder="Score"
            min="1"
            max="10"
            value={newPlayer.score}
            onChange={onChangeInput('score')}
          />
          <button onClick={addPlayer}>Add Player</button>
        </div>
        <div className="newGame">
          <div className="selectedPlayers">
            {selectedPlayers.length}/{playersList.length} Selected
          </div>
          <button
            disabled={
              !selectedPlayers.length || selectedPlayers.length % 2 !== 0
            }
          >
            <Link
              href={{
                pathname: `/games`,
                query: { selected: selectedPlayers.join(',') },
              }}
            >
              New Game
            </Link>
          </button>
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
          background: #aa0000;
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
    </div>
  );
}
