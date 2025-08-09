
import { useState } from 'react'
import logo from './assets/dutch-blitz-logo.png'
import './App.css'



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
    const newTotals = playerNames.map((_, idx) => positivePoints[idx] + (negativeCards[idx] * -2));
    setTotals(newTotals);
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
          <form className="db-player-form" onSubmit={handleGo}>
            <label htmlFor="numPlayers" className="db-player-label">
              Enter the number of players
            </label>
            <div className="db-player-input-row">
              <input
                id="numPlayers"
                name="numPlayers"
                type="number"
                min="2"
                max="8"
                defaultValue={numPlayers}
                className="db-player-input"
              />
              <button type="submit" className="db-blue-btn">Go!</button>
            </div>
          </form>
        )}
        {playerNames && (
              <div className="db-player-totals-row">
            {/* Player Inputs Column */}
                <div className="db-player-inputs-col">
              <div className="db-totals-title">Players</div>
              {playerNames.map((name, idx) => (
                    <div key={idx} className="db-player-row">
                  <input
                    type="text"
                    value={name}
                    onChange={e => handleNameChange(idx, e.target.value)}
                        className="db-player-name-input"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={positivePoints[idx]}
                    onChange={e => handlePositiveChange(idx, e.target.value)}
                    placeholder="Positive Points"
                    className="db-player-pos-input"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={negativeCards[idx]}
                    onChange={e => handleNegativeChange(idx, e.target.value)}
                    placeholder="Negative Cards"
                    className="db-player-neg-input"
                  />
                </div>
              ))}
                  <div className="db-calc-btn-row">
                    <button className="db-blue-btn db-calc-btn" onClick={handleCalculate}>
                      Calculate
                    </button>
                  </div>
            </div>
            {/* Totals Column */}
            {totals && (
                  <div className="db-totals-col">
                <div style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.1rem' }}>Total</div>
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
