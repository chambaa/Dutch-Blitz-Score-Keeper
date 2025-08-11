import React from 'react';

interface PlayerScoringProps {
  playerNames: string[];
  positivePoints: number[];
  negativeCards: number[];
  handleNameChange: (idx: number, value: string) => void;
  handlePositiveChange: (idx: number, value: string) => void;
  handleNegativeChange: (idx: number, value: string) => void;
  handleCalculate: React.MouseEventHandler<HTMLButtonElement>;
}

const PlayerScoring: React.FC<PlayerScoringProps> = ({ 
  playerNames, 
  positivePoints, 
  negativeCards, 
  handleNameChange, 
  handlePositiveChange, 
  handleNegativeChange, 
  handleCalculate 
}) => (
  <div className="db-player-inputs-col">,
    <div className="db-title">Players</div>
    {playerNames.map((name, idx) => (
      <div key={idx} className="db-player-row">
        <input
          type="text"
          value={name}
          onChange={e => handleNameChange(idx, e.target.value)}
              className="db-input db-neutral-input"
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          value={positivePoints[idx]}
          onChange={e => handlePositiveChange(idx, e.target.value)}
          placeholder="Positive Points"
          className="db-input db-pos-input"
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          value={negativeCards[idx]}
          onChange={e => handleNegativeChange(idx, e.target.value)}
          placeholder="Negative Cards"
          className="db-input db-neutral-input"
        />
      </div>
    ))}
    <div className="db-calc-btn-row">
      <button className="db-blue-btn" style={{ minWidth: '120px' }} onClick={handleCalculate}>
        Calculate
      </button>
    </div>
  </div>
);

export default PlayerScoring;
