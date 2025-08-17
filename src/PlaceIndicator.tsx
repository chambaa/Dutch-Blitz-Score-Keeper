import React from 'react';

interface PlaceIndicatorProps {
  totals: number[] | null;
  idex: number;
}

const PlaceIndicator: React.FC<PlaceIndicatorProps> = ({ totals, idex }) => {
  if (!totals || totals.length === 0) return null;

  let leaderIdx: number | null = null;
  let loserIdx: number | null = null;
  const max = Math.max(...totals);
  const min = Math.min(...totals);
  leaderIdx = totals.findIndex(t => t === max);
  loserIdx = totals.findIndex(t => t === min);

  return (
    <span>
      {leaderIdx === idex ? (
        <span title="Leader" style={{ marginLeft: 5, color: '#f7b500', fontSize: '1.3em', display: 'flex', alignItems: 'center' }}>★</span>
      ) : loserIdx === idex ? (
        <span title="Loser" style={{ marginLeft: 5, fontSize: '1.3em', display: 'flex', alignItems: 'center' }}>😞</span>
      ) : null}
    </span>
  );
};

export default PlaceIndicator;