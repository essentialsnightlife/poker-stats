import { cn, priceFormatter } from '@/lib/utils';
import { TRankingResults } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';
import { getRankColor, getRankDisplay } from '../leader-board/utils';

export const columns: ColumnDef<TRankingResults>[] = [
  {
    accessorKey: 'rank',
    header: 'Rank',
    cell: ({ row, table }) => {
      const rank = row.index + 1;
      const totalParticipants = table.getFilteredRowModel().rows.length;

      return (
        <div className={cn(getRankColor(rank), 'rounded px-2 py-1')}>
          {getRankDisplay(rank, totalParticipants)}
        </div>
      );
    },
  },
  {
    accessorKey: 'player_nickname',
    header: 'Player Nickname',
  },
  {
    accessorKey: 'player_name',
    header: 'Player Name',
  },
  {
    accessorKey: 'no_of_buy_ins',
    header: 'Buy Ins',
  },
  {
    accessorKey: 'total_winnings',
    header: 'Total Winnings',
    cell: ({ row }) => {
      const amount = row.original.total_winnings;
      return (
        <span className={cn(amount >= 0 ? 'text-green-600' : 'text-red-600')}>
          {priceFormatter(Math.abs(amount))}
        </span>
      );
    },
  },
];
