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
  },
  {
    accessorKey: 'stats',
    header: 'Stats',
  },
];
