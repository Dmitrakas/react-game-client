import { useEffect, useState } from "react";
import CellTicTacToe from "../CellTicTacToe/CellTicTacToe";
import "./MainTicTacToe.css";

const MainTicTacToe = ({ socket, roomCode, username }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [canPlay, setCanPlay] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socket.on("startGame", () => {
      setGameStarted(true);
    });
  
    return () => socket.off("startGame");
  }, [socket]);

  useEffect(() => {
    socket.on("updateGame", ({ id, currentPlayer }) => {
      setBoard((data) => {
        const updatedBoard = [...data];
        updatedBoard[id] = currentPlayer;
        return updatedBoard;
      });
      
      setCanPlay(true);
    });
  
    return () => socket.off("updateGame");
  }, [socket]);

  useEffect(() => {
    checkWinningCombinations();
  }, [board]);

  useEffect(() => {
    if (gameStarted) {
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setWinner(null);
      setCanPlay(true);
    }
  }, [gameStarted]);

  const handleCellClick = (e) => {
    if (!gameStarted || !canPlay) return;
  
    const id = e.currentTarget.id;
    if (board[id] === "") {
      const currentPlayer = board.filter((cell) => cell !== "").length % 2 === 0 ? "X" : "O";
  
      setBoard((data) => {
        const updatedBoard = [...data];
        updatedBoard[id] = currentPlayer;
        return updatedBoard;
      });

      socket.emit("play", { id, currentPlayer, roomCode });
      setCanPlay(false);
    }
  };

  const checkWinningCombinations = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let isBoardFull = true;
    let winner = null;

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
        break;
      }
    }

    if (!winner) {
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          isBoardFull = false;
          break;
        }
      }
    }

    if (winner) {
      handleWin(winner);
    } else if (isBoardFull) {
      handleDraw();
    }
  };

  const handleWin = (winner) => {
    setWinner(winner);
  };

  const handleDraw = () => {
    setWinner("draw");
  };

  const handleRestart = () => {

    setGameStarted(true);
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setWinner(null);
  };
  

  return (
    <main>
      <h1>Room #{roomCode}</h1>
      <h2>Username: {username}</h2>
      {gameStarted ? (
        <>
          <section className="main-section">
            <CellTicTacToe handleCellClick={handleCellClick} id={"0"} text={board[0]} />
            <CellTicTacToe handleCellClick={handleCellClick} id={"1"} text={board[1]} />
            <CellTicTacToe handleCellClick={handleCellClick} id={"2"} text={board[2]} />

            <CellTicTacToe handleCellClick={handleCellClick} id={"3"} text={board[3]} />
            <CellTicTacToe handleCellClick={handleCellClick} id={"4"} text={board[4]} />
            <CellTicTacToe handleCellClick={handleCellClick} id={"5"} text={board[5]} />

            <CellTicTacToe handleCellClick={handleCellClick} id={"6"} text={board[6]} />
            <CellTicTacToe handleCellClick={handleCellClick} id={"7"} text={board[7]} />
            <CellTicTacToe handleCellClick={handleCellClick} id={"8"} text={board[8]} />
          </section>
          {winner && (
            <div className="result">
              {winner === "draw" ? <p>Draw!</p> : <p>Won {winner}!</p>}
              <button onClick={handleRestart}>Restart game</button>
            </div>
          )}
        </>
      ) : (
        <p>Waiting game...</p>
      )}
    </main>
  );
};

export default MainTicTacToe;
