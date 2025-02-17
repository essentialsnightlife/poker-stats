import { TLeaderBoard } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';
import { Btn } from './btn';
import { cn } from '@/lib/utils';

const getRankColor = (rank: number) => {
  if (rank === 1) return 'bg-yellow-400';
  if (rank === 2) return 'bg-secondary';
  if (rank === 3) return 'bg-border';
  if (rank >= 9) return `bg-red-${Math.min(400 + (rank - 9) * 100, 700)}`;
  return '';
};

const formatWinnings = (amount: number) => (
  <span className={cn(amount >= 0 ? 'text-green-600' : 'text-red-600')}>
    £{Math.abs(amount)}
  </span>
);

const formatWinningsChange = (change: number) => (
  <span
    className={cn(
      change > 0
        ? 'text-green-600'
        : change < 0
          ? 'text-red-600'
          : 'text-border',
    )}
  >
    {change > 0 ? `▲£${change}` : change < 0 ? `▼£${Math.abs(change)}` : '—£0'}
  </span>
);

const formatRankChange = (change: number) => (
  <span
    className={cn(
      change > 0
        ? 'text-green-600'
        : change < 0
          ? 'text-red-600'
          : 'text-border',
    )}
  >
    {change > 0 ? `▲${change}` : change < 0 ? `▼${Math.abs(change)}` : '—0'}
  </span>
);

export const columns: ColumnDef<TLeaderBoard>[] = [
  {
    accessorKey: 'rank',
    header: ({ column }) => <Btn column={column}>Rank</Btn>,
    cell: ({ row }) => (
      <div className={cn(getRankColor(row.original.rank), 'rounded px-2 py-1')}>
        {row.original.rank}
      </div>
    ),
  },
  {
    accessorKey: 'change',
    header: '+/-',
    cell: () => formatRankChange(1),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <Btn column={column}>Name</Btn>,
  },
  {
    accessorKey: 'games_played',
    header: ({ column }) => <Btn column={column}>Played</Btn>,
  },
  {
    accessorKey: 'win_percentage',
    header: ({ column }) => <Btn column={column}>Win</Btn>,
    cell: ({ row }) => `${row.original.win_percentage}%`,
  },
  {
    accessorKey: 'wins',
    header: ({ column }) => <Btn column={column}>Wins</Btn>,
  },
  {
    accessorKey: 'ppg',
    header: ({ column }) => <Btn column={column}>PPG</Btn>,
    cell: ({ row }) => row.original.ppg.toFixed(2),
  },
  {
    accessorKey: 'total_points',
    header: ({ column }) => <Btn column={column}>Points</Btn>,
  },
  {
    accessorKey: 'winnings',
    header: ({ column }) => <Btn column={column}>Winnings</Btn>,
    cell: ({ row }) => formatWinnings(row.original.winnings),
  },
  {
    accessorKey: 'winningsChange',
    header: '+/-',
    cell: () => formatWinningsChange(10),
  },
];
