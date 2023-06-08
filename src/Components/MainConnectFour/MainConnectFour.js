import { useEffect, useState } from "react";
import "./MainConnectFour.css";
import CellConnectFour from "../CellConnectFour/CellConnectFour";

const MainConnectFour = ({ socket, roomCode, username }) => {
  const [board, setBoard] = useState(Array(42).fill(""));
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
        let columnIndex = id % 7;
        for (let row = 5; row >= 0; row--) {
          const index = row * 7 + columnIndex;
          if (updatedBoard[index] === "") {
            updatedBoard[index] = currentPlayer;
            break;
          }
        }
        return updatedBoard;
      });

      setCanPlay(true);
    });

    return () => socket.off("updateGame");
  }, [socket]);

  useEffect(() => {
    checkWinningCombinations();
  });

  useEffect(() => {
    if (gameStarted) {
      setBoard(Array(42).fill(""));
      setWinner(null);
      setCanPlay(true);
    }
  }, [gameStarted]);

  const handleCellClick = (e) => {
    if (!gameStarted || !canPlay) return;

    const columnIndex = parseInt(e.currentTarget.id);
    let rowIndex = -1;
    for (let row = 5; row >= 0; row--) {
      const index = row * 7 + columnIndex;
      if (board[index] === "") {
        rowIndex = row;
        break;
      }
    }

    if (rowIndex !== -1) {
      const id = rowIndex * 7 + columnIndex;
      const currentPlayer =
        board.filter((cell) => cell !== "").length % 2 === 0 ? "X" : "O";

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
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [7, 8, 9, 10],
      [8, 9, 10, 11],
      [9, 10, 11, 12],
      [10, 11, 12, 13],
      [14, 15, 16, 17],
      [15, 16, 17, 18],
      [16, 17, 18, 19],
      [17, 18, 19, 20],
      [21, 22, 23, 24],
      [22, 23, 24, 25],
      [23, 24, 25, 26],
      [24, 25, 26, 27],
      [28, 29, 30, 31],
      [29, 30, 31, 32],
      [30, 31, 32, 33],
      [31, 32, 33, 34],
      [35, 36, 37, 38],
      [36, 37, 38, 39],
      [37, 38, 39, 40],
      [38, 39, 40, 41],

      [0, 7, 14, 21],
      [1, 8, 15, 22],
      [2, 9, 16, 23],
      [3, 10, 17, 24],
      [4, 11, 18, 25],
      [5, 12, 19, 26],
      [6, 13, 20, 27],
      [7, 14, 21, 28],
      [8, 15, 22, 29],
      [9, 16, 23, 30],
      [10, 17, 24, 31],
      [11, 18, 25, 32],
      [12, 19, 26, 33],
      [13, 20, 27, 34],
      [14, 21, 28, 35],
      [15, 22, 29, 36],
      [16, 23, 30, 37],
      [17, 24, 31, 38],
      [18, 25, 32, 39],
      [19, 26, 33, 40],
      [20, 27, 34, 41],

      [0, 8, 16, 24],
      [1, 9, 17, 25],
      [2, 10, 18, 26],
      [3, 11, 19, 27],
      [7, 15, 23, 31],
      [8, 16, 24, 32],
      [9, 17, 25, 33],
      [10, 18, 26, 34],
      [14, 22, 30, 38],
      [15, 23, 31, 39],
      [16, 24, 32, 40],
      [17, 25, 33, 41],

      [3, 9, 15, 21],
      [4, 10, 16, 22],
      [5, 11, 17, 23],
      [6, 12, 18, 24],
      [10, 16, 22, 28],
      [11, 17, 23, 29],
      [12, 18, 24, 30],
      [13, 19, 25, 31],
      [17, 23, 29, 35],
      [18, 24, 30, 36],
      [19, 25, 31, 37],
      [20, 26, 32, 38],
    ];

    let isBoardFull = true;
    let winner = null;

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c, d] = winningCombinations[i];
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c] &&
        board[a] === board[d]
      ) {
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
    setTimeout(() => {
      setBoard(Array(42).fill(""));
    }, 2000);
  };

  const handleDraw = () => {
    setWinner("draw");
    setTimeout(() => {
      setBoard(Array(42).fill(""));
    }, 2000);
  };

  const handleRestart = () => {
    setGameStarted(true);
    setWinner(null);
    setCanPlay(true);
  };

  return (
    <main>
      <h1>Room #{roomCode}</h1>
      <h2>Username: {username}</h2>
      {gameStarted ? (
        <>
          <section className="main-section-four">
            {board.map((cell, index) => (
              <CellConnectFour
                key={index}
                handleCellClick={handleCellClick}
                id={index % 7}
                text={cell}
              />
            ))}
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

export default MainConnectFour;
