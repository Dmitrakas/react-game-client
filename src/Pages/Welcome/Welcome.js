import React from 'react';
import './Welcome.css';

const Welcome = ({ onGameSelection }) => {
  const handleGameClick = (game) => {
    onGameSelection(game);
  };

  return (
    <div className="welcome-container">
      <h2 className="welcome-title">Welcome!</h2>
      <p className="welcome-description">Select a game:</p>
      <div className="welcome-buttons">
        <button onClick={() => handleGameClick('tic-tac-toe')} className="welcome-button">
          Tic-Tac-Toe
        </button>
        <button onClick={() => handleGameClick('four')} className="welcome-button">
          ConnectFour
        </button>
      </div>
    </div>
  );
};

export default Welcome;
