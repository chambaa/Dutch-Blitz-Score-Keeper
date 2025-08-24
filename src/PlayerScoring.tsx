import React from 'react';

interface PlayerScoringProps {
  playerNames: string[];
  positivePoints: number[];
  negativeCards: number[];
  handleNameChange: (idx: number, value: string) => void;
  handlePositiveChange: (idx: number, value: string) => void;
  handleNegativeChange: (idx: number, value: string) => void;
}


const PlayerScoring: React.FC<PlayerScoringProps> = ({ 
  playerNames, 
  positivePoints, 
  negativeCards, 
  handleNameChange, 
  handlePositiveChange, 
  handleNegativeChange,
}) => {
  return (
    <div className="db-player-inputs-col">
      <div className="db-player-title-row">
        <div className="db-title" style={{marginRight: '200px'}}>Players</div>
        <div className="db-title" style={{marginRight: '45px'}}>Positive Points</div>
        <div className="db-title">Negative Cards</div>
      </div>
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
            className="db-input db-pos-input"
          />
          <input
            type="number"
            inputMode="numeric"
            min="0"
            max="10"
            value={negativeCards[idx]}
            onChange={e => handleNegativeChange(idx, e.target.value)}
            placeholder="Negative Cards"
            className="db-input db-neg-input"
          />
        </div>
      ))}
    </div>
  );
};

export default PlayerScoring;
