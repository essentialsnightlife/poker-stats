import { useGetPlayerGameResults } from '@/lib/services/players';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Stat } from './stat';
import { DollarSign, Hash, Users, Trophy } from 'lucide-react';

export const ResultGames = ({ playerId }: { playerId: number }) => {
  const { data, isLoading } = useGetPlayerGameResults(playerId);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalWinnings =
    data?.reduce((sum, game) => sum + (game.total_winnings ?? 0), 0) || 0;
  const totalGames = data?.length || 0;
  const winRate =
    totalGames > 0
      ? ((data?.filter((game) => game.finishing_position === 1).length ?? 0) /
          totalGames) *
        100
      : 0;

  return (
    <>
      <div className='mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Stat
          title='Total Winnings'
          value={`$${totalWinnings}`}
          loading={isLoading}
          icon={DollarSign}
        />
        <Stat
          title='Games Played'
          value={totalGames}
          loading={isLoading}
          icon={Users}
        />
        <Stat
          title='Win Rate'
          value={`${(winRate * 100).toFixed(1)}%`}
          loading={isLoading}
          icon={Trophy}
        />
        <Stat
          title='Player ID'
          value={`#${playerId}`}
          icon={Hash}
          loading={isLoading}
        />
      </div>
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
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
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
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};
