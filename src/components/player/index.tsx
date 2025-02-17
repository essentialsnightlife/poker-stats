import { dateFormatter } from '@/lib/utils';
import { TPlayer } from '@/types/players';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Trophy } from 'lucide-react';
import { Badge } from '../ui/badge';

export const PLayerStats = ({ data }: { data?: TPlayer }) => {
  if (!data) return null;

  return (
    <div className='mb-8 rounded-lg'>
      <div className='flex flex-col items-center justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-24 border-4'>
            <AvatarImage
              src={data.img}
              alt={data.name}
              className='object-cover'
            />
            <AvatarFallback>{data.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className='space-y-1'>
            <div className='flex items-end gap-1'>
              <h1 className='text-3xl font-bold sm:text-4xl'>{data.name} </h1>
              <p className='text-xl opacity-90'>{`(${data.nickname})`}</p>
            </div>
            {data.birthday && (
              <div className='text-muted-foreground flex items-center gap-1'>
                <Calendar className='size-4' />

                <p className='text-xs font-medium'>
                  {dateFormatter(data.birthday)}
                </p>
              </div>
            )}
            {data.stats && (
              <div className='text-muted-foreground flex items-center gap-1'>
                <Trophy className='size-4' />
                <p className='text-xs font-medium'>{data.stats}</p>
              </div>
            )}
          </div>
        </div>
        <Badge variant='outline' className='text-lg'>
          Rank: #1
        </Badge>
      </div>
    </div>
  );
};
