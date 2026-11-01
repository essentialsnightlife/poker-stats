export type GameResultPlayer = {
  id: number;
  sourcePlayerId?: number;
  name: string;
  nickname: string;
  buyIns: number;
  potWinnings: number;
  bounties: number;
};

export const BUY_IN_PRICE = 20;
export const BOUNTY_VALUE = 10;

export const INITIAL_PLAYERS: GameResultPlayer[] = [
  {
    id: 1,
    name: 'Ed Smith',
    nickname: 'Eddie',
    buyIns: 1,
    potWinnings: 100,
    bounties: 4,
  },
  {
    id: 2,
    name: 'Sarah Jones',
    nickname: 'SJ',
    buyIns: 2,
    potWinnings: 70,
    bounties: 2,
  },
  {
    id: 3,
    name: 'Tom Baker',
    nickname: 'Bakes',
    buyIns: 1,
    potWinnings: 30,
    bounties: 2,
  },
  {
    id: 4,
    name: 'Alex Morgan',
    nickname: 'Morgs',
    buyIns: 3,
    potWinnings: 0,
    bounties: 0,
  },
  {
    id: 5,
    name: 'Priya Shah',
    nickname: 'PS',
    buyIns: 2,
    potWinnings: 0,
    bounties: 1,
  },
  {
    id: 6,
    name: 'James King',
    nickname: 'JK',
    buyIns: 1,
    potWinnings: 0,
    bounties: 0,
  },
];

export const formatMoney = (value: number) => `£${value.toFixed(0)}`;

export function getGameTotals(
  players: GameResultPlayer[],
  buyInPrice = BUY_IN_PRICE,
) {
  const totalBuyIns = players.reduce((sum, player) => sum + player.buyIns, 0);
  const pot = totalBuyIns * buyInPrice;
  const payouts = players.reduce((sum, player) => sum + player.potWinnings, 0);
  const bounties = players.reduce((sum, player) => sum + player.bounties, 0);
  const expectedBounties = Math.max(0, totalBuyIns - 1);

  return {
    players: players.length,
    totalBuyIns,
    rebuys: totalBuyIns - players.length,
    pot,
    payouts,
    bounties,
    expectedBounties,
    payoutDifference: pot - payouts,
    bountyDifference: expectedBounties - bounties,
  };
}
