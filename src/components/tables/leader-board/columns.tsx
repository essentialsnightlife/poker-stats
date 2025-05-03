import { TLeaderBoard } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';
import { Btn } from './btn';
import { cn, priceFormatter } from '@/lib/utils';
import { getRankColor, getRankDisplay } from './utils';

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
  {
    accessorKey: 'nickname',
    header: ({ column }) => <Btn column={column}>Name</Btn>,
  },
  {
    accessorKey: 'games_played',
    header: ({ column }) => <Btn column={column}>Played</Btn>,
    sortingFn: 'basic',
    invertSorting: true,
  },
  {
    accessorKey: 'wins',
    header: ({ column }) => <Btn column={column}>Wins</Btn>,
    sortingFn: 'basic',
    invertSorting: true,
  },
  {
    accessorKey: 'win_percentage',
    header: ({ column }) => <Btn column={column}>Win %</Btn>,
    cell: ({ row }) => `${row.original.win_percentage}%`,
    sortingFn: 'basic',
    invertSorting: true,
  },
  {
    accessorKey: 'total_bounties_count',
    header: ({ column }) => <Btn column={column}>Bounties</Btn>,
    sortingFn: 'basic',
    invertSorting: true,
  },
  {
    accessorKey: 'bpg',
    header: ({ column }) => <Btn column={column}>BPG</Btn>,
    sortingFn: 'basic',
    invertSorting: true,
  },
  {
    accessorKey: 'total_points',
    header: ({ column }) => <Btn column={column}>Points</Btn>,
    sortingFn: 'basic',
    invertSorting: true,
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
    sortingFn: 'basic',
    sortDescFirst: true,
  },
];
