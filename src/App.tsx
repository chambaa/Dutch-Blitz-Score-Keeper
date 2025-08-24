

import { useState } from 'react'
import logo from './assets/dutch-blitz-logo.png'
import './App.css'
import GameConfiguration from './GameConfiguration'
import PlayerScoring from './PlayerScoring'
import PlaceIndicator from './PlaceIndicator'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material'



function App() {
  const [numPlayers, setNumPlayers] = useState(4);
  const [numPoints, setNumPoints] = useState(75);
  const [playerNames, setPlayerNames] = useState<string[] | null>(null);
  const [positivePoints, setPositivePoints] = useState<number[]>([]);
  const [negativeCards, setNegativeCards] = useState<number[]>([]);
  const [totals, setTotals] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleGo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const numPlayersInput = form.elements.namedItem('numPlayers') as HTMLInputElement;
    const numPointsInput = form.elements.namedItem('numPoints-radio-group') as HTMLInputElement;
    let count = parseInt(numPlayersInput.value, 10);
    if (isNaN(count) || count < 2) count = 2;
    if (count > 8) count = 8;
    setNumPlayers(count);
    setNumPoints(parseInt(numPointsInput.value, 10) || 75);
    setPlayerNames(Array.from({ length: count }, (_, i) => `Player ${i + 1} ✎`));
    setPositivePoints(Array(count).fill(0));
    setNegativeCards(Array(count).fill(0));
    setTotals(Array(count).fill(0));
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
      return playerNames.map((_, idx) => {
        const newPlayerTotal = prev[idx] + positivePoints[idx] + (negativeCards[idx] * -2);
        if (newPlayerTotal >= numPoints) {
          handleOpen();
        }
        return newPlayerTotal;
      });
    });
  };

  const newGameClicked = () => {
    setPlayerNames(null);
    setNumPlayers(4);
    setPositivePoints([]);
    setNegativeCards([]);
    handleClose();
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <header className="db-header">
        <img src={logo} alt="dutch-blitz" className="db-logo" />
        <button
          className="db-blue-btn"
          onClick={newGameClicked}
        >
          New Game
        </button>
      </header>
      <div className="db-main-content">
        {!playerNames && (
          <GameConfiguration numPlayers={numPlayers} onSubmit={handleGo} />
        )}
        {playerNames && (
          <div className="db-player-totals-row">
            <PlayerScoring
              playerNames={playerNames}
              positivePoints={positivePoints}
              negativeCards={negativeCards}
              handleNameChange={handleNameChange}
              handlePositiveChange={handlePositiveChange}
              handleNegativeChange={handleNegativeChange}
            />
            {(
              <div className="db-totals-col">
                <div className="db-title">Total</div>
                  {totals.map((total, idx) => (
                    <div className="db-player-row">
                      <div key={idx} className={`db-total-value${total >= 0 ? ' db-total-pos' : ' db-total-neg'}`}>
                        {total}
                      </div>
                      <PlaceIndicator
                        totals={totals}
                        idex={idx}
                      />
                    </div>
                ))}
                <div className="db-calc-btn-row">
                  <button className="db-blue-btn" style={{ minWidth: '120px', marginTop: '2rem' }} onClick={handleCalculate}>
                    Calculate
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        aria-labelledby="end-game-modal-title"
        aria-describedby="end-game-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={modalStyle}>
            <Typography id="end-game-modal-title" variant="h6" component="h2">
              Game Over!
            </Typography>
            <Typography id="end-game-modal-description" sx={{ mt: 2 }}>
              The winner is: {playerNames && totals ? playerNames[totals.findIndex(t => t === Math.max(...totals))] : 'Player 1'}
            </Typography>
            <div className="db-modal-btn-row">
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={newGameClicked}>New Game</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default App
