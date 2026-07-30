import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, RefreshCcw, PoundSterling } from 'lucide-react';
import { Title } from './title';
import { dateFormatter, priceFormatter } from '@/lib/utils';
import { TDetailedResult } from '@/types/players';
import { ReactNode } from 'react';

export function Game({
  data,
  children,
}: {
  data: TDetailedResult;
  children: ReactNode;
}) {
  return (
    <>
      <Title
        title={`Poker - ${data.location}`}
        desc={dateFormatter(data.date)}
      />

      <div className='space-y-8'>
        <Card className='space-y-3'>
          <CardTitle>Game Summary</CardTitle>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
            <div className='flex items-center space-x-2'>
              <PoundSterling className='text-green-400' />
              <span>{priceFormatter(data.total_pot)} Total Pot</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Users className='text-yellow-400' />
              <span>{data.number_of_players} Players</span>
            </div>
            <div className='flex items-center space-x-2'>
              <PoundSterling className='text-purple-400' />
              <span>{priceFormatter(data.buy_in_price)} Buy In</span>
            </div>
            <div className='flex items-center space-x-2'>
              <RefreshCcw className='text-red-400' />
              <span>{data.total_rebuys} Rebuys</span>
            </div>
          </div>

          {data.pic && (
            <>
              <img
                src={data.pic}
                alt='Game snapshot'
                className='aspect-video h-96 w-full rounded-lg object-cover'
              />
            </>
          )}
        </Card>

        {children}

        {data.comments && (
          <Card>
            <CardTitle className='mb-3'>Game Comments</CardTitle>
            <p>{data.comments}</p>
          </Card>
        )}

        <div className='mt-8 flex justify-center'>
          <Button asChild>
            <Link to='/games'>
              <RefreshCcw /> Back to All Games
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
