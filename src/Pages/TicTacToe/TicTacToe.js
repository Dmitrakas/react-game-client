import Header from "../../Components/Header/Header";
import MainTicTacToe from "../../Components/MainTicTacToe/MainTicTacToe";
import Footer from "../../Components/Footer/Footer";
import JoinRoomModal from "../../Components/JoinRoomModal/JoinRoomModal";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("https://dmitrakas-game-react-server.onrender.com");

export default function TicTacToe({ username }) {
  const [showModal, setShowModal] = useState(false);
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    console.log(roomCode);
    if (roomCode) {
      socket.emit("joinRoom", username, roomCode);
    }
  }, [username, roomCode]);

  return (
    <>
      <JoinRoomModal
        showModal={showModal}
        setShowModal={setShowModal}
        setRoomCode={setRoomCode}
      />
      <Header title={"Tic-Tac-Toe"} />
      <MainTicTacToe socket={socket} roomCode={roomCode} username={username} />
      <Footer setShowModal={setShowModal} />
    </>
  );
};
