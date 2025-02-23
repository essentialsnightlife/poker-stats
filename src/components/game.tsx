import { Card, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
              <span>{priceFormatter(data.total_pot)} Total-pot</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Users className='text-yellow-400' />
              <span>{data.number_of_players} Players</span>
            </div>
            <div className='flex items-center space-x-2'>
              <PoundSterling className='text-purple-400' />
              <span>{priceFormatter(data.buy_in_price)} Buy-in</span>
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

        <Card className='space-y-3'>
          <CardTitle>Leaderboard</CardTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Buy Ins</TableHead>
                <TableHead className='text-right'>Winnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className='bg-rank-1 text-rank-text rounded px-2 py-1'>
                    1st
                  </div>
                </TableCell>
                <TableCell>{data.winner}</TableCell>
                <TableCell>1</TableCell>
                <TableCell className='text-right'>
                  ${data.total_pot * 0.5}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='bg-rank-2 text-rank-text rounded px-2 py-1'>
                    2nd
                  </div>
                </TableCell>
                <TableCell>{data.second_place}</TableCell>
                <TableCell>1</TableCell>
                <TableCell className='text-right'>
                  ${data.total_pot * 0.3}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='bg-rank-3 text-rank-text rounded px-2 py-1'>
                    3rd
                  </div>
                </TableCell>
                <TableCell>{data.third_place}</TableCell>
                <TableCell>1</TableCell>
                <TableCell className='text-right'>
                  ${data.total_pot * 0.2}
                </TableCell>
              </TableRow>
              <TableRow className='opacity-50'>
                <TableCell className='font-medium'>😢 Last</TableCell>
                <TableCell>{data.last_place}</TableCell>
                <TableCell>1</TableCell>
                <TableCell className='text-right'>$0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
            <Link to='/recent-games'>
              <RefreshCcw /> Back to Recent Games
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
