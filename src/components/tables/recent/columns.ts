import { dateFormatter, priceFormatter } from '@/lib/utils';
import { TResultSummary } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TResultSummary>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => dateFormatter(row.original.date),
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'winner',
    header: 'Winner',
  },
  {
    accessorKey: 'number_of_players',
    header: 'Players',
  },
  {
    accessorKey: 'buy_in_price',
    header: 'Buy-in',
    cell: ({ row }) => priceFormatter(row.original.buy_in_price || 0),
  },
  {
    accessorKey: 'total_rebuys',
    header: 'Rebuys',
  },
  // {
  //   accessorKey: 'winner',
  //   header: 'Winner',
  // },
  {
    accessorKey: 'total_pot',
    header: 'Total Pot',
    cell: ({ row }) => priceFormatter(row.original.total_pot),
  },
];
