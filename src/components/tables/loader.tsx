import { ColumnDef } from '@tanstack/react-table';
import { Skeleton } from '../ui/skeleton';
import { TableRow, TableCell } from '../ui/table';
interface LoaderProps<T> {
  length?: number;
  columns: ColumnDef<T>[];
}

export const Loader = <T,>({ length = 5, columns }: LoaderProps<T>) => (
  <>
    {Array.from({ length }).map((_, index) => (
      <TableRow key={index}>
        {columns.map((column) => (
          <TableCell key={column.id as string}>
            <Skeleton className='h-7 w-full' />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);
