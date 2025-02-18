import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TPlayer } from '@/types/players';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TPlayer>[] = [
  {
    accessorKey: 'player',
    header: 'Avatar',
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.img} alt={row.original.name} />
        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'nickname',
    header: 'Nickname',
  },

  // {
  //   accessorKey: 'stats',
  //   header: 'Stats',
  // },
];
