import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Empty } from '../empty';
import { TGameResult } from '@/types/players';

export const ResultGames = ({ data }: { data?: TGameResult[] }) => {
  const { navigate } = useRouter();
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
      <CardHeader className='items-center justify-between'>
        <CardTitle>Game History</CardTitle>

        <Button size='sm' asChild>
          <Link to='/players'>Back to Players List</Link>
        </Button>
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
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className='cursor-pointer'
                key={row.id}
                onClick={handleClick.bind(null, row.original.game_id)}
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
