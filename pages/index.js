export default function Home() {
  return (
    <div className="container">
      <header className="header">Team Selector</header>

      <side>
        <ul>
          <li>Dashboard</li>
          <li>Players</li>
          <li>Games</li>
        </ul>
      </side>

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
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>Nico T</td>
              <td>4,9</td>
              <td>Argentina</td>
              <td>
                <button>Button</button>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>Nico T</td>
              <td>4,9</td>
              <td>Argentina</td>
              <td>
                <button>Button</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <footer>
        <div>0/12 Selected</div>
        <button>New Game</button>
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

        footer {
          height: 52px;
          line-height: 52px;
          background: white;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          padding-right: 16px;
        }

        footer > div {
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

        side {
          height: calc(100vh - 85px);
          width: 262px;
          background: rgba(255, 255, 255, 0.8);
          position: fixed;
          top: 84px;
          left: 0;
          border-top: 4px solid white;
          box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
        }

        side ul {
          list-style: none;
          margin: 0;
          padding: 16px;
          font-size: 16px;
        }

        side ul li {
          line-height: 28px;
          cursor: pointer;
          margin: 8px 0;
        }

        side ul li:hover {
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
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background: #108bff;
        }
      `}</style>
    </div>
  );
}
