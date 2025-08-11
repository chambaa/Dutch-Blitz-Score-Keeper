

import { useState } from 'react'
import logo from './assets/dutch-blitz-logo.png'
import './App.css'
import NumberOfPlayersInput from './NumberOfPlayersInput'
import PlayerScoring from './PlayerScoring'



function App() {
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[] | null>(null);
  const [positivePoints, setPositivePoints] = useState<number[]>([]);
  const [negativeCards, setNegativeCards] = useState<number[]>([]);
  const [totals, setTotals] = useState<number[] | null>(null);

  const handleGo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem('numPlayers') as HTMLInputElement;
    let count = parseInt(input.value, 10);
    if (isNaN(count) || count < 2) count = 2;
    if (count > 8) count = 8;
    setNumPlayers(count);
    setPlayerNames(Array.from({ length: count }, (_, i) => `Player ${i + 1}`));
    setPositivePoints(Array(count).fill(0));
    setNegativeCards(Array(count).fill(0));
    setTotals(null);
  };

  const handleNameChange = (idx: number, value: string) => {
    if (!playerNames) return;
    const updated = [...playerNames];
    updated[idx] = value;
    setPlayerNames(updated);
  };

  const handlePositiveChange = (idx: number, value: string) => {
    const updated = [...positivePoints];
    updated[idx] = parseInt(value, 10) || 0;
    setPositivePoints(updated);
  };

  const handleNegativeChange = (idx: number, value: string) => {
    const updated = [...negativeCards];
    updated[idx] = parseInt(value, 10) || 0;
    setNegativeCards(updated);
  };

  const handleCalculate = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault();
    if (!playerNames) return;
    setTotals(prevTotals => {
      const prev = prevTotals && prevTotals.length === playerNames.length ? prevTotals : Array(playerNames.length).fill(0);
      return playerNames.map((_, idx) => prev[idx] + positivePoints[idx] + (negativeCards[idx] * -2));
    });
  };

  return (
    <>
      <header className="db-header">
        <img src={logo} alt="dutch-blitz" className="db-logo" />
        <button
          className="db-blue-btn"
          onClick={() => {
            setPlayerNames(null);
            setNumPlayers(4);
            setPositivePoints([]);
            setNegativeCards([]);
          }}
        >
          New Game
        </button>
      </header>
      <div className="db-main-content">
        {!playerNames && (
          <NumberOfPlayersInput numPlayers={numPlayers} onSubmit={handleGo} />
        )}
        {playerNames && (
          <div className="db-player-totals-row">
            {/* Player Inputs Column */}
            <PlayerScoring
              playerNames={playerNames}
              positivePoints={positivePoints}
              negativeCards={negativeCards}
              handleNameChange={handleNameChange}
              handlePositiveChange={handlePositiveChange}
              handleNegativeChange={handleNegativeChange}
              handleCalculate={handleCalculate}
            />
            {/* Totals Column */}
            {totals && (
              <div className="db-totals-col">
                <div className="db-title">Total</div>
                  {totals.map((total, idx) => (
                    <div key={idx} className={`db-total-value${total >= 0 ? ' db-total-pos' : ' db-total-neg'}`}>
                      {total}
                    </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App
