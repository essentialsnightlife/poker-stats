import type React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ size = 'md', className, ...props }: LoaderProps) {
  return (
    <div
      className={cn(
        'flex h-[70vh] flex-1 grow items-center justify-center',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'relative',
          size === 'sm' && 'size-6',
          size === 'md' && 'size-10',
          size === 'lg' && 'size-16',
        )}
      >
        <div className='border-primary absolute inset-0 animate-spin rounded-full border-t-2 border-r-2'></div>
        <div className='border-primary/30 absolute inset-0 animate-ping rounded-full border-t-2 border-r-2'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div
            className={cn(
              'bg-primary rounded-full',
              size === 'sm' && 'h-1.5 w-1.5',
              size === 'md' && 'h-2.5 w-2.5',
              size === 'lg' && 'h-4 w-4',
            )}
          ></div>
        </div>
      </div>
    </div>
  );
}
