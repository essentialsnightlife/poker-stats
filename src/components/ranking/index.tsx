import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Player, data } from './constants';

export function RankingTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<Player>[] = [
    {
      accessorKey: 'rank',
      header: ({ column }) => (
        <button
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rank
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      ),
      cell: ({ row }) => {
        const rank = row.original.rank;
        let bgColor = '';
        if (rank === 1) bgColor = 'bg-yellow-400';
        else if (rank === 2) bgColor = 'bg-gray-300';
        else if (rank === 3) bgColor = 'bg-amber-700';
        else if (rank >= 9) {
          const intensity = Math.min(400 + (rank - 9) * 100, 700);
          bgColor = `bg-red-${intensity}`;
        }
        return <div className={`${bgColor} rounded px-2 py-1`}>{rank}</div>;
      },
    },
    {
      accessorKey: 'change',
      header: '+/-',
      cell: ({ row }) => {
        const change = row.original.change;
        if (change > 0)
          return <span className='text-green-600'>▲{change}</span>;
        if (change < 0)
          return <span className='text-red-600'>▼{Math.abs(change)}</span>;
        return <span className='text-gray-400'>—0</span>;
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      ),
    },
    {
      accessorKey: 'played',
      header: ({ column }) => (
        <button
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Played
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      ),
    },
    {
      accessorKey: 'winPercentage',
      header: ({ column }) => (
        <button
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Win %
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      ),
      cell: ({ row }) => `${row.original.winPercentage}%`,
    },
    {
      accessorKey: 'wins',
      header: ({ column }) => (
        <button
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Wins
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      ),
    },
    {
      accessorKey: 'ppg',
      header: ({ column }) => (
        <button
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          PPG
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      ),
      cell: ({ row }) => row.original.ppg.toFixed(2),
    },
    {
      accessorKey: 'points',
      header: ({ column }) => (
        <button
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Points
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      ),
    },
    {
      accessorKey: 'winnings',
      header: ({ column }) => (
        <button
          className='flex items-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Winnings
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      ),
      cell: ({ row }) => {
        const winnings = row.original.winnings;
        const color = winnings >= 0 ? 'text-green-600' : 'text-red-600';
        return <span className={color}>£{Math.abs(winnings)}</span>;
      },
    },
    {
      accessorKey: 'winningsChange',
      header: '+/-',
      cell: ({ row }) => {
        const change = row.original.winningsChange;
        if (change > 0)
          return <span className='text-green-600'>▲£{change}</span>;
        if (change < 0)
          return <span className='text-red-600'>▼£{Math.abs(change)}</span>;
        return <span className='text-gray-400'>—£0</span>;
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            {table.getFlatHeaders().map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
