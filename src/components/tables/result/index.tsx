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
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
                  key={row.id}
                  // onClick={() => navigate(`/game/${row.original.game_id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
    </>
  );
};
