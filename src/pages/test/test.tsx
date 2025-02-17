import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ColumnDef } from '@tanstack/react-table';

import { TResultSummary } from '@/types/players';
import { useGetRecentResultsSummary } from '@/lib/services/players';

const columns: ColumnDef<TResultSummary>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'number_of_players',
    header: 'Players',
  },
  // {
  //   accessorKey: 'buy_in_price',
  //   header: 'Buy-in',
  //   cell: ({ row }) => `$${row.original.buy_in_price}`,
  // },
  {
    accessorKey: 'total_rebuys',
    header: 'Rebuys',
  },
  {
    accessorKey: 'winner',
    header: 'Winner',
  },
  {
    accessorKey: 'total_pot',
    header: 'Total Pot',
    cell: ({ row }) => `$${row.original.total_pot}`,
  },
];

export const Test = () => {
  const { navigate } = useRouter();
  const { data } = useGetRecentResultsSummary(5);
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1 className='text-3xl font-bold'>Recent Poker Games</h1>
      <p className='text-muted-foreground mb-6'>
        View the latest poker results
      </p>

      <Table hasBorder>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              // onClick={() => navigate(`/game/${row.original.game_id}`)}
              className='cursor-pointer hover:bg-gray-100'
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className='mt-6' onClick={() => navigate({ to: '/games' })}>
        View All Games
      </Button>
    </div>
  );
};
