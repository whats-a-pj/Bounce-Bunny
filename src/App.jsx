import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  //const [isGameOver, setIsGameOver] = useState(false);
  //const [score, setScore] = useState(0);

  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpTimeout, setJumpTimeout] = useState(null);

  const maxJumpDuration = 2000; //max duration of jump in milliseconds (2 seconds)

  const endJump = () => {
    setIsJumping(false);
    setPlayerY(0);
    if (jumpTimeout) {
      clearTimeout(jumpTimeout);
      setJumpTimeout(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 32 && !isJumping) {
      setIsJumping(true);
      setPlayerY(100);//jump height
      const timeout = setTimeout(endJump, maxJumpDuration);
      setJumpTimeout(timeout);
    }
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 32 && isJumping) {
      endJump();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (jumpTimeout) {
        clearTimeout(jumpTimeout);
      }
    };
  }, [isJumping]);

  //todo add score counter
  //todo add endgame logic when player collides with obstacle

  //todo create obstacles and bunny character
  return (
    <div className="game-area">
      {/* Player character */}
      <div className="player bg-pink-400" style={{ bottom: `${playerY}px`, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Player</div>
      {/* Ground or obstacles */}
      <div className="ground bg-purple-400">this is the ground lol</div>
    </div>
  );
}

export default App;
