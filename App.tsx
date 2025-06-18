
import React, { useState } from 'react';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedMode, setSelectedMode] = useState('');

  const startGame = (mode: string) => {
    setSelectedMode(mode);
    setGameStarted(true);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <div className="main-menu">
          <div className="title-section">
            <h1 className="game-title">CYBERCOP BATTLEGROUNDS</h1>
            <p className="game-subtitle">Next-Generation Tactical Combat Experience</p>
          </div>

          <div className="game-info">
            <h2>Welcome to the Future of Combat</h2>
            <p>Enter a world where technology meets tactical warfare. Choose your cybernetic enhancements, customize your loadout, and dominate the battlefield in this cutting-edge combat simulator.</p>
          </div>

          <div className="features-grid">
            <div className="feature">
              <h3>🤖 Cybernetic Enhancement</h3>
              <p>Upgrade your character with advanced cybernetic implants and abilities.</p>
            </div>
            <div className="feature">
              <h3>⚔️ Tactical Combat</h3>
              <p>Engage in strategic battles using advanced weapons and technology.</p>
            </div>
            <div className="feature">
              <h3>🌐 Multiplayer Arena</h3>
              <p>Compete against players worldwide in various game modes.</p>
            </div>
            <div className="feature">
              <h3>🏆 Progression System</h3>
              <p>Unlock new gear, abilities, and customization options.</p>
            </div>
          </div>

          <div className="game-modes">
            <h2>Select Game Mode</h2>
            <div className="mode-buttons">
              <button 
                className="mode-btn campaign" 
                onClick={() => startGame('campaign')}
              >
                Campaign Mode
              </button>
              <button 
                className="mode-btn multiplayer" 
                onClick={() => startGame('multiplayer')}
              >
                Multiplayer Arena
              </button>
              <button 
                className="mode-btn training" 
                onClick={() => startGame('training')}
              >
                Training Ground
              </button>
            </div>
          </div>

          <div className="status">
            <h3>🚧 Development Status: Prototype Phase</h3>
            <p>This is an early prototype. Full game features coming soon!</p>
          </div>
        </div>
      ) : (
        <div className="game-screen">
          <div className="game-header">
            <h2>CYBERCOP BATTLEGROUNDS - {selectedMode.toUpperCase()}</h2>
            <button 
              className="back-btn"
              onClick={() => setGameStarted(false)}
            >
              ← Back to Menu
            </button>
          </div>
          
          <div className="game-content">
            <div className="game-placeholder">
              <h3>🎮 Game Loading...</h3>
              <p>Initializing {selectedMode} mode...</p>
              <p>Game mechanics will be implemented here!</p>
              
              <div className="mock-game-ui">
                <div className="player-stats">
                  <h4>Player Stats</h4>
                  <div className="stat">Health: 100/100</div>
                  <div className="stat">Armor: 75/100</div>
                  <div className="stat">Ammo: 30/120</div>
                </div>
                
                <div className="game-controls">
                  <h4>Controls</h4>
                  <div className="control">WASD - Movement</div>
                  <div className="control">Mouse - Aim/Shoot</div>
                  <div className="control">Space - Jump</div>
                  <div className="control">Shift - Sprint</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;