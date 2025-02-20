import { dateFormatter, priceFormatter } from '@/lib/utils';
import { TDetailedResult } from '@/types/players';
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  Frown,
  Medal,
  Trophy,
} from 'lucide-react';
import { Card, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Box } from '../box';

export const Game = ({ data }: { data: TDetailedResult }) => {
  const leaderboard = [
    {
      title: 'Winner',
      key: 'winner',
      value: data.winner,
      icon: Trophy,
      color: 'text-yellow-400',
      description: 'Champion of the night!',
    },
    {
      title: '2nd Place',
      key: 'second_place',
      value: data.second_place,
      icon: Medal,
      color: 'text-gray-400',
      description: 'Just missed the top.',
    },
    {
      title: '3rd Place',
      key: 'third_place',
      value: data.third_place,
      icon: Medal,
      color: 'text-amber-600',
      description: 'A solid podium finish.',
    },
    {
      title: 'Last Place',
      key: 'last_place',
      value: data.last_place,
      icon: Frown,
      color: 'text-red-400',
      description: 'Better luck next time!',
    },
  ];

  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {leaderboard.map((item) => (
          <Box {...item} key={item.key} />
        ))}
      </div>

      <Card className='mt-4 space-y-3'>
        <CardTitle>Game Details</CardTitle>

        <div className='flex justify-between gap-3 text-sm'>
          <div className='space-y-2'>
            {[
              { icon: CalendarIcon, label: dateFormatter(data.date) },
              { icon: UsersIcon, label: `${data.number_of_players} players` },
              { icon: MapPinIcon, label: data.location },
            ].map(({ icon: Icon, label }, idx) => (
              <div key={idx} className='flex items-center gap-2'>
                <Icon className='text-muted-foreground size-5' />
                <p>{label}</p>
              </div>
            ))}
          </div>
          <div className='flex w-1/2 flex-col items-start gap-2'>
            {[
              { label: 'Total Rebuys', value: data.total_rebuys },
              { label: 'Buy-in', value: priceFormatter(data.buy_in_price) },
              { label: 'Total Pot', value: priceFormatter(data.total_pot) },
            ].map(({ label, value }, idx) => (
              <span key={idx}>
                {label}: <strong>{value}</strong>
              </span>
            ))}
          </div>
        </div>

        {data.comments && (
          <>
            <Separator />
            <p className='text-muted-foreground'>{data.comments}</p>
          </>
        )}

        {data.pic && (
          <>
            <Separator />
            <img
              src={data.pic}
              alt='Game photo'
              className='max-h-96 w-full rounded-lg object-cover'
            />
          </>
        )}
      </Card>
    </>
  );
};
