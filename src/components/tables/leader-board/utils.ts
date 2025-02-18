export const getRankColor = (rank: number) => {
  if (rank === 1) return 'bg-rank-1 text-rank-text';
  if (rank === 2) return 'bg-rank-2 text-rank-text';
  if (rank === 3) return 'bg-rank-3 text-rank-text';
  if (rank >= 9)
    return `bg-red-${Math.min(400 + (rank - 9) * 100, 700)} text-rank-text `;
  return '';
};

export const getRankDisplay = (rank: number, totalParticipants: number) => {
  if (rank === totalParticipants) {
    return `${rank} 🥲`;
  }
  return `${rank}`;
};
