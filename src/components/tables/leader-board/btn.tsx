import { TLeaderBoard } from '@/types/players';
import type { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { ReactNode } from 'react';

export const Btn = ({
  children,
  column,
}: {
  children: ReactNode;
  column: Column<TLeaderBoard, unknown>;
}) => (
  <button
    className='hover:text-primary group flex cursor-pointer items-center gap-1 transition-all duration-300 md:gap-2'
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    {children}
    <ArrowUpDown className='size-4 transition-transform duration-300 group-hover:rotate-180' />
  </button>
);
