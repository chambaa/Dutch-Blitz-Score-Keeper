import React from 'react';

interface NumberOfPlayersInputProps {
  numPlayers: number;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const NumberOfPlayersInput: React.FC<NumberOfPlayersInputProps> = ({ numPlayers, onSubmit }) => (
  <form className="db-player-form" onSubmit={onSubmit}>
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
        className="db-input db-neutral-input"
      />
      <button type="submit" className="db-blue-btn">Go!</button>
    </div>
  </form>
);

export default NumberOfPlayersInput;
