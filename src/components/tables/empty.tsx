import { Inbox } from 'lucide-react';
import { TableRow, TableCell } from '../ui/table';

export const Empty = () => (
  <TableRow>
    <TableCell colSpan={24}>
      <div className='text-muted-foreground flex h-32 w-full flex-col items-center justify-center'>
        <Inbox className='size-10' />
        <p className='font-medium'>No results</p>
      </div>
    </TableCell>
  </TableRow>
);
