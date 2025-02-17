import { Button } from '@/components/ui/button';
import { useGetPlayerStats } from '@/lib/services/players';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Calendar } from 'lucide-react';
import { ResultGames } from '@/components/tables';
import { redirect } from '@tanstack/react-router';
import { Loader } from '@/components/ui/loader';

export const Route = createFileRoute('/players/$playerId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { playerId } = params;

    if (!playerId || !/^\d+$/.test(playerId)) {
      throw redirect({ to: '/players' });
    }

    return { playerId: Number(playerId) };
  },
  // pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { playerId } = Route.useLoaderData();
  const { data: player, isLoading } = useGetPlayerStats(playerId);

  if (isLoading) return <Loader size='lg' />;
  if (!player) return null;
  return (
    <>
      <Button variant='ghost' asChild className='mb-6'>
        <Link to='/players'>
          <ArrowLeft />
          Back to Players List
        </Link>
      </Button>

      <div className='mb-8 rounded-lg'>
        <div className='flex flex-col items-center justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0'>
          <div className='flex items-center'>
            <Avatar className='size-24 border-4'>
              <AvatarImage
                src={player.img}
                alt={player.name}
                className='object-cover'
              />
              <AvatarFallback>{player.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className='ml-6'>
              <h1 className='text-3xl font-bold sm:text-4xl'>{player.name}</h1>
              <p className='text-xl opacity-90'>{player.nickname}</p>
            </div>
          </div>
          <Badge variant='outline' className='text-lg'>
            Rank: #1
          </Badge>
        </div>
      </div>

      <div className='mb-8 grid gap-4 sm:grid-cols-2'>
        <div className='flex items-center space-x-4'>
          <Calendar className='text-muted-foreground h-6 w-6' />
          <div>
            <p className='text-muted-foreground text-sm'>Birthday</p>
            <p className='text-lg font-medium'>
              {player.birthday || 'Not provided'}
            </p>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <Trophy className='text-muted-foreground h-6 w-6' />
          <div>
            <p className='text-muted-foreground text-sm'>Player Stats</p>
            <p className='text-lg font-medium'>
              {player.stats || 'Not available'}
            </p>
          </div>
        </div>
      </div>

      <ResultGames playerId={playerId} />
    </>
  );
}
