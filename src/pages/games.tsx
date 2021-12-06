import { useRouter } from "next/dist/client/router";
import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { DEFAULT_PLAYERS_TEST, LOCALSTORAGE_PLAYERS } from "../constants";
import { GeneticResponse, runGenetic } from "../ga/genetic.function";
import { Player } from "../shared/interfaces";

export default function Games() {
  const router = useRouter();
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [solution, setSolution] = useState<GeneticResponse>(null);
  const [teams, setTeams] = useState<{population: number[], score: number}[]>([]);
  const [teamSize, setTeamSize] = useState<number>(0);

  useEffect(() => {
    setPlayersList(JSON.parse(window?.localStorage.getItem(LOCALSTORAGE_PLAYERS) || JSON.stringify(DEFAULT_PLAYERS_TEST) || "[]"));
  }, []);

  useEffect(() => {
    if (router.query?.selected) {
      const selectedPlayerQS = ((router.query?.selected as string) || "").split(",");
      const newPlayersList = selectedPlayerQS.map((index) => playersList[index]);
      setSelectedPlayers(newPlayersList.filter(player => !!player));
    }
  }, [router, playersList])
  
  useEffect(() => {
    if (selectedPlayers.length) {
      const result = runGenetic(
        20,
        selectedPlayers,
        100,
        0.7,
        0.2,
        0.1,
        true
      );
      
      setSolution(result);

      const solutions = result.population.map((population, index) => ({
        population,
        score: result.scores[index]
      }))

      solutions.sort((solA, solB) => solA.score > solB.score ? -1 : 1)
      // TODO: Remove duplicated options
      setTeams(solutions.slice(0, 10));
      setTeamSize(result.population[0].length / 2);
    }
  }, [selectedPlayers])

  // Auxiliar functions
  const calculateTeamScore = (team: number[]) => team.reduce((acc, val) => acc + selectedPlayers[val].score, 0);
  
  return (
    <div className="container">
      <header className="header">Team Selector</header>

      <aside>
        <ul>
          <li>Dashboard</li>
          <li><Link href="/">Players</Link></li>
        </ul>
      </aside>

      <main>
        <h1>Game</h1>
        
        <h2>Team Selection</h2>
        <p>Max Possible Score: <b>{solution?.maxPossibleScore}</b></p>
        <p>The best combination got: <b>{solution?.maxScore}</b></p>
        <table>
          <thead>
            <tr>
              <th>Team 1</th>
              <th>Score</th>
              <th>Team 2</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          {teams?.map((teamsOption, index) => {
            return (
            <tr key={index}>
              <td>{teamsOption.population.slice(0, teamSize).map((indexPlayer) => selectedPlayers[indexPlayer].name).join(",")}</td>
              <td>{calculateTeamScore(teamsOption.population.slice(0, teamSize))}</td>
              <td>{teamsOption.population.slice(teamSize).map((indexPlayer) => selectedPlayers[indexPlayer].name).join(",")}</td>
              <td>{calculateTeamScore(teamsOption.population.slice(teamSize))}</td>
            </tr>
            )
          })}
          </tbody>
        </table>
      </main>

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
        
        aside ul a {
          color: black;
          text-decoration: none;
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
      `}</style>
    </div>
  );
}
