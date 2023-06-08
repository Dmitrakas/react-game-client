import Login from "./Pages/Login/Login";
import Welcome from "./Pages/Welcome/Welcome";
import TicTacToe from "./Pages/TicTacToe/TicTacToe";
import ConnectFour from "./Pages/ConnectFour/ConnectFour";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
  };

  const handleGameSelection = (game) => {
    setSelectedGame(game);
  };

  const renderContent = () => {
    if (!loggedIn) {
      return <Login onLogin={handleLogin} />;
    } else if (selectedGame === null) {
      return <Welcome onGameSelection={handleGameSelection} />;
    } else if (selectedGame === 'tic-tac-toe') {
      return <>
        <TicTacToe username={username} />
      </>;
    } else if (selectedGame === 'four') {
      return <>
        <ConnectFour username={username} />
      </>;
    };
  }

  return (
    <>
      {renderContent()}
    </>
  );
};

export default App;
