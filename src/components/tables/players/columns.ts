import { dateFormatter } from '@/lib/utils';
import { TPlayer } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TPlayer>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'nickname',
    header: 'Nickname',
  },
  {
    accessorKey: 'birthday',
    header: 'Birthday',
    cell: ({ row }) => dateFormatter(row.original.birthday),
  },
  {
    accessorKey: 'stats',
    header: 'Stats',
  },
];
