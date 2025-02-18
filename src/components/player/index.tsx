import { dateFormatter } from '@/lib/utils';
import { TPlayer } from '@/types/players';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Dot, Trophy } from 'lucide-react';

export const PlayerStats = ({ data }: { data?: TPlayer }) => {
  if (!data) return null;

  return (
    <div className='mb-8 rounded-lg'>
      <div className='grid grid-cols-[auto_1fr] items-center gap-4'>
        <Avatar className='size-24 border-4'>
          <AvatarImage
            src={data.img}
            alt={data.name}
            className='object-cover'
          />
          <AvatarFallback>{data.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className='space-y-1'>
          <h1 className='flex items-end gap-1 text-3xl font-bold sm:text-4xl'>
            {data.name}{' '}
            {data.nickname && (
              <span className='text-xl font-normal opacity-70'>
                ({data.nickname})
              </span>
            )}
          </h1>

          <div className='text-muted-foreground grid auto-cols-max grid-flow-col items-center gap-2 text-xs font-medium'>
            {data.birthday && (
              <span className='flex items-center gap-1'>
                <Calendar className='size-4' />
                {dateFormatter(data.birthday, 'MMM D')}
              </span>
            )}
            {data.birthday && data.stats && <Dot />}
            {data.stats && (
              <span className='flex items-center gap-1'>
                <Trophy className='size-4' />
                {data.stats}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
