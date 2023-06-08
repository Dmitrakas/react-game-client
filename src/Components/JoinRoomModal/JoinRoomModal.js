import "./JoinRoomModal.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const drop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "00px",
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const JoinRoomModal = ({ showModal, setShowModal, setRoomCode }) => {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  
  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    setRoomCodeInput(code);
  };

  useEffect(() => {
    setRoomCodeInput('');
  }, [showModal]);

  const handleSave = () => {
    setShowModal(false);
    setRoomCode(roomCodeInput);
  };

  return (
    <>
      {showModal && (
        <motion.div
          className="joinRoomModal-container"
          variants={drop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="joinRoomModal-card" variants={modal}>
            <h1 className="joinRoomModal-card-title">Enter a room code</h1>
            <input
              className="joinRoomModal-card-input"
              type="text"
              placeholder="Enter a room code"
              value={roomCodeInput}
              onChange={(e) => setRoomCodeInput(e.target.value)}
            />
            <button onClick={generateRandomCode} className="joinRoomModal-card-button rnd">
              Generate Random Code
            </button>
            <button onClick={handleSave} className="joinRoomModal-card-button">
              Join
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default JoinRoomModal;
