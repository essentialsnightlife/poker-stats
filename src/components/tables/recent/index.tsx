import { useGetRecentResultsSummary } from '@/lib/services/players';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty } from '../empty';
import { Button } from '@/components/ui/button';

export const RecentGames = ({ limit }: { limit?: number }) => {
  const { navigate } = useRouter();
  const { data, isLoading } = useGetRecentResultsSummary(limit);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClick = (gameId: number) => {
    navigate({ to: `/games/${gameId}` });
  };

  return (
    <Card>
      {limit && (
        <CardHeader className='items-center justify-between'>
          <CardTitle>Recent Games</CardTitle>

          <Button size='sm' asChild>
            <Link to='/games'>View All Games</Link>
          </Button>
        </CardHeader>
      )}
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
            Array.from({ length: limit ?? 10 }).map((_, index) => (
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
              <TableRow
                key={row.id}
                className='cursor-pointer'
                onClick={handleClick.bind(null, row.original.id)}
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
