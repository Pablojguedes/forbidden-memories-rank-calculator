export const calculateRank = ({
  turns,
  effectiveAttacks,
  defensiveVictories,
  faceDownPlays,
  fusions,
  equips,
  pureMagics,
  triggeredTraps,
  usedCards,
  remainingLPs,
}) => {
  const BASE_POINTS = 50;

  return (
    BASE_POINTS +
    turnPoints(turns) +
    effectiveAttackPoints(effectiveAttacks) +
    defensiveVictoryPoints(defensiveVictories) +
    faceDownPlaysPoints(faceDownPlays) +
    fusionPoints(fusions) +
    equipPoints(equips) +
    pureMagicPoints(pureMagics) +
    triggeredTrapPoints(triggeredTraps) +
    usedCardPoints(usedCards) +
    remainingLPPoints(remainingLPs)
  );
};

const turnPoints = (turns) => {
  if (turns < 5) return 12;
  if (turns < 9) return 8;
  if (turns < 29) return 0;
  if (turns < 33) return -8;
  return -12;
};
const effectiveAttackPoints = (effectiveAttacks) => {
  if (effectiveAttacks < 2) return 4;
  if (effectiveAttacks < 4) return 2;
  if (effectiveAttacks < 10) return 0;
  if (effectiveAttacks < 20) return -2;
  return -4;
};
const defensiveVictoryPoints = (defensiveVictories) => {
  if (defensiveVictories < 2) return 0;
  if (defensiveVictories < 6) return -10;
  if (defensiveVictories < 10) return -20;
  if (defensiveVictories < 15) return -30;
  return -40;
};
const faceDownPlaysPoints = (faceDownPlays) => {
  if (faceDownPlays < 1) return 0;
  if (faceDownPlays < 11) return -2;
  if (faceDownPlays < 21) return -4;
  if (faceDownPlays < 31) return -6;
  return -8;
};
const fusionPoints = (fusions) => {
  if (fusions < 1) return 4;
  if (fusions < 5) return 0;
  if (fusions < 10) return -4;
  if (fusions < 15) return -8;
  return -12;
};
const equipPoints = (equips) => {
  if (equips < 1) return 4;
  if (equips < 5) return 0;
  if (equips < 10) return -4;
  if (equips < 15) return -8;
  return -12;
};
const pureMagicPoints = (pureMagics) => {
  if (pureMagics < 1) return 2;
  if (pureMagics < 4) return -4;
  if (pureMagics < 7) return -8;
  if (pureMagics < 10) return -12;
  return -16;
};
const triggeredTrapPoints = (triggeredTraps) => {
  if (triggeredTraps < 1) return 2;
  if (triggeredTraps < 3) return -8;
  if (triggeredTraps < 5) return -16;
  if (triggeredTraps < 7) return -24;
  return -32;
};
const usedCardPoints = (remainingCards) => {
  const usedCards = 40 - remainingCards;

  if (usedCards < 9) return 15;
  if (usedCards < 13) return 12;
  if (usedCards < 33) return 0;
  if (usedCards < 37) return -5;
  return -7;
};
const remainingLPPoints = (remainingLPs) => {
  if (remainingLPs < 100) return -7;
  if (remainingLPs < 100) return -5;
  if (remainingLPs < 7000) return 0;
  if (remainingLPs < 8000) return 4;
  return 6;
};
