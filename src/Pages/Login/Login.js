import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleButtonClick = () => {
    if (username.trim() !== '') {
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <input
        type="text"
        value={username}
        onChange={handleInputChange}
        className="login-input"
        placeholder="Enter your username"
        required
      />
      <button onClick={handleButtonClick} className="login-button">
        Enter
      </button>
    </div>
  );
};

export default Login;
