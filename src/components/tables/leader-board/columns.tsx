import { TLeaderBoard } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';
import { Btn } from './btn';
import { cn, priceFormatter } from '@/lib/utils';
import { getRankColor, getRankDisplay } from './utils';

// const formatWinningsChange = (change: number) => (
//   <span
//     className={cn(
//       change > 0
//         ? 'text-green-600'
//         : change < 0
//           ? 'text-red-600'
//           : 'text-border',
//     )}
//   >
//     {change > 0 ? `▲£${change}` : change < 0 ? `▼£${Math.abs(change)}` : '—£0'}
//   </span>
// );

// const formatRankChange = (change: number) => (
//   <span
//     className={cn(
//       change > 0
//         ? 'text-green-600'
//         : change < 0
//           ? 'text-red-600'
//           : 'text-border',
//     )}
//   >
//     {change > 0 ? `▲${change}` : change < 0 ? `▼${Math.abs(change)}` : '—0'}
//   </span>
// );

export const columns: ColumnDef<TLeaderBoard>[] = [
  {
    accessorKey: 'rank',
    header: ({ column }) => <Btn column={column}>Rank</Btn>,
    cell: ({ row, table }) => {
      const rank = row.original.rank;
      const totalParticipants = table.getFilteredRowModel().rows.length;

      return (
        <div className={cn(getRankColor(rank), 'rounded px-2 py-1')}>
          {getRankDisplay(rank, totalParticipants)}
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'change',
  //   header: '+/-',
  //   cell: () => formatRankChange(1),
  // },
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
    cell: ({ row }) => {
      const amount = row.original.winnings;
      return (
        <span className={cn(amount >= 0 ? 'text-green-600' : 'text-red-600')}>
          {priceFormatter(Math.abs(amount))}
        </span>
      );
    },
  },
  // {
  //   accessorKey: 'winningsChange',
  //   header: '+/-',
  //   cell: () => formatWinningsChange(10),
  // },
];
