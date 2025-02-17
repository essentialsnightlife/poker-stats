import { useGetRecentResultsSummary } from '@/lib/services/players';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';

export const RecentGames = ({ limit = 10 }: { limit?: number }) => {
  const { data, isLoading } = useGetRecentResultsSummary(limit);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader className='items-center justify-between'>
        <CardTitle>Recent Games</CardTitle>

        {limit < 10 && (
          <Button size='sm' asChild>
            <Link to='/games'>View All Games</Link>
          </Button>
        )}
      </CardHeader>
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
        <TableBody className='w-fit overflow-x-auto'>
          {isLoading ? (
            Array.from({ length: limit }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((row) => (
                  <TableCell key={row.id}>
                    <Skeleton className='h-7 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
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
    </Card>
  );
};
