import { useGetGameRankings } from '@/lib/services/players';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { columns } from './columns';
import { Card, CardTitle } from '@/components/ui/card';
import { Empty } from '../empty';
import { Loader } from '../loader';

export const Rankings = ({ gameId }: { gameId: number }) => {
  const { data, isLoading } = useGetGameRankings(gameId);

  const table = useReactTable({
    data: data || [],
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardTitle className='mb-3'>Rankings</CardTitle>
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
          {isLoading ? (
            <Loader columns={columns} />
          ) : table.getRowModel().rows.length ? (
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
            <Empty />
          )}
        </TableBody>
      </Table>
    </Card>
  );
};
