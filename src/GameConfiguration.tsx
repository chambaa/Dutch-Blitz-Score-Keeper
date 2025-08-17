import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface GameConfigurationProps {
  numPlayers: number;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const GameConfiguration: React.FC<GameConfigurationProps> = ({ numPlayers, onSubmit }) => (
  <form className="db-player-form" onSubmit={onSubmit}>
    <div>
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
      </div>
    </div>
    <div>
      <label htmlFor="numPoints" className="db-player-label">
        How many points are you playing to?
      </label>
      <div style={{marginLeft: '10px'}}>
        <RadioGroup
          aria-labelledby="numPoints-radio-group-label"
          defaultValue="75"
          name="numPoints-radio-group"
        >
          <FormControlLabel value="50" control={<Radio />} label="50" />
          <FormControlLabel value="75" control={<Radio />} label="75" />
          <FormControlLabel value="100" control={<Radio />} label="100" />
        </RadioGroup>
      </div>
    </div>
    <div className="db-player-form-btn-row">
      <button type="submit" className="db-blue-btn">Go!</button>
    </div>
  </form>
);

export default GameConfiguration;
