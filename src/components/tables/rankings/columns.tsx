import { cn, priceFormatter } from '@/lib/utils';
import { TRankingResults } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TRankingResults>[] = [
  {
    accessorKey: 'player_nickname',
    header: 'Player nickname',
  },
  {
    accessorKey: 'player_name',
    header: 'Player name',
  },
  {
    accessorKey: 'no_of_buy_ins',
    header: 'Buy-ins',
  },
  {
    accessorKey: 'total_winnings',
    header: 'Total winnings',
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
