import { Badge } from '@/components/ui/badge';
import { cn, dateFormatter, priceFormatter } from '@/lib/utils';
import { TGameResult } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const columns: ColumnDef<TGameResult>[] = [
  {
    accessorKey: 'game_date',
    header: 'Date',
    cell: ({ row }) => dateFormatter(row.original.game_date),
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'finishing_position',
    header: 'Position',
    cell: ({ row }) => {
      const position = row.original.finishing_position;
      return (
        <Badge
          className={cn(
            'shadow-none sm:size-8',
            position === 1 &&
              'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100',
            position === 2 &&
              'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
            position === 3 &&
              'bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100',
          )}
          variant={position > 3 ? 'secondary' : 'outline'}
        >
          {position}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'total_players',
    header: 'Players',
  },
  {
    accessorKey: 'game_buy_in',
    header: 'Buy in Price',
    cell: ({ row }) => priceFormatter(row.original.game_buy_in),
  },
  {
    accessorKey: 'total_spend',
    header: 'Total Spent',
  },
  {
    accessorKey: 'total_winnings',
    header: 'Total Won',
    cell: ({ row }) => (
      <p className='text-green-600 dark:text-green-400'>
        {priceFormatter(row.original.total_winnings)}
      </p>
    ),
  },
  {
    accessorKey: 'net_winnings',
    header: 'Winnings',
    cell: ({ row }) => {
      const netWinnings = row.original.net_winnings;
      const Icon = netWinnings >= 0 ? TrendingUp : TrendingDown;

      return (
        <div
          className={cn(
            'flex items-center gap-1',
            netWinnings >= 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400',
          )}
        >
          <Icon className='size-4' />
          {priceFormatter(Math.abs(netWinnings))}
        </div>
      );
    },
  },
];
