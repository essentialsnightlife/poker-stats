import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { SortingState } from '@tanstack/react-table';
import { useGetLeaderboard } from '@/lib/services/players';
import { columns } from './columns';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Empty } from '../empty';
import { Loader } from '../loader';
import { Button } from '@/components/ui/button.tsx';
import { onShareButtonClick } from '@/lib/utils.ts';

function onButtonClick() {
  onShareButtonClick();
}

export const LeaderBoard = () => {
  const { data, isLoading } = useGetLeaderboard();
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'winnings', desc: true },
    { id: 'points', desc: true },
  ]);

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    initialState: {
      sorting: [
        { id: 'winnings', desc: true },
        { id: 'total_points', desc: true },
      ],
    },
  });

  return (
    <Card>
      <CardHeader className='items-center justify-between'>
        <CardTitle>Leaderboard</CardTitle>
        <Button onClick={onButtonClick} size='sm'>
          Share Leaderboard
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
          {isLoading ? (
            <Loader columns={columns} length={6} />
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
