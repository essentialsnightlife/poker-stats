import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TGameResult } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';
import { Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export const columns: ColumnDef<TGameResult>[] = [
  {
    accessorKey: 'game_date',
    header: 'Game Date',
    cell: ({ row }) => (
      <div className='flex items-center whitespace-nowrap'>
        <Calendar className='text-muted-foreground mr-2 size-4' />
        {row.original.game_date}
      </div>
    ),
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
        >
          {position}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'total_winnings',
    header: 'Winnings',
    cell: ({ row }) => (
      <div className='flex items-center gap-1 text-green-600 dark:text-green-400'>
        <DollarSign className='size-4' />
        {row.original.total_winnings}
      </div>
    ),
  },
  {
    accessorKey: 'total_spend',
    header: 'Buy-ins',
    cell: ({ row }) => (
      <div className='flex items-center gap-1 text-red-600 dark:text-red-400'>
        <DollarSign className='size-4' />
        {row.original.total_spend}
      </div>
    ),
  },
  {
    accessorKey: 'net_winnings',
    header: 'Net',
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
          <Icon className='size-4' />${Math.abs(netWinnings)}
        </div>
      );
    },
  },
];
