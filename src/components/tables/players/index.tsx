import { useGetPlayers } from '@/lib/services/players';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { columns } from './columns';
import { Loader } from '../loader';
import { Empty } from '../empty';

export const Players = () => {
  const { data, isLoading } = useGetPlayers();
  const { navigate } = useRouter();
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card title='Players'>
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
                onClick={() => navigate({ to: `/players/${row.original.id}` })}
                className='cursor-pointer'
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
