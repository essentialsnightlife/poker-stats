import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';

import { TPlayer, TGameResult } from '@/types/players';
import {
  useGetPlayerGameResults,
  useGetPlayerStats,
} from '@/lib/services/players';

const columns: ColumnDef<TGameResult>[] = [
  {
    accessorKey: 'game_date',
    header: 'Game Date',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'finishing_position',
    header: 'Finishing Position',
  },
  {
    accessorKey: 'total_winnings',
    header: 'Total Winnings',
    cell: ({ row }) => `$${row.original.total_winnings}`,
  },
  {
    accessorKey: 'total_spend',
    header: 'Total Buy-ins',
    cell: ({ row }) => `$${row.original.total_spend}`,
  },
  {
    accessorKey: 'net_winnings',
    header: 'Net Winnings',
    cell: ({ row }) => `$${row.original.net_winnings}`,
  },
];

const PlayerStatsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { navigate } = useNavigate();
  const { data: player } = useGetPlayerStats(id);
  const { data: gameResults } = useGetPlayerGameResults(id);
  const table = useReactTable({
    data: gameResults || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold'>
        Player Stats - {player?.name}
      </h1>

      <div className='mb-8 grid grid-cols-2 gap-6'>
        <div>
          <h2 className='mb-4 text-xl font-semibold'>Player Information</h2>
          <ul className='space-y-2'>
            <li>
              <strong>Name:</strong> {player?.name}
            </li>
            <li>
              <strong>Nickname:</strong> {player?.nickname}
            </li>
            <li>
              <strong>Birthday:</strong> {player?.birthday}
            </li>
            <li>
              <strong>Stats:</strong> {player?.stats}
            </li>
          </ul>
        </div>
        <div>
          <img
            src={player?.img || '/placeholder.svg'}
            alt={player?.name}
            className='h-64 w-full rounded-lg object-cover'
          />
        </div>
      </div>

      <h2 className='mb-4 text-2xl font-semibold'>Game History</h2>
      <Table>
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
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className='mt-8' onClick={() => navigate('/players')}>
        Back to Players List
      </Button>
    </div>
  );
};

export default PlayerStatsPage;
