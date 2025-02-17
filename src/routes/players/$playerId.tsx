import { Button } from '@/components/ui/button';
import { useGetPlayerData } from '@/lib/services/players';
import { ArrowLeft } from 'lucide-react';
import { ResultGames } from '@/components/tables';
import { redirect } from '@tanstack/react-router';
import { Loader } from '@/components/ui/loader';
import { PlayerDashboard } from '@/components/dashboard';
import { PLayerStats } from '@/components/player';

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
  const { dashboard, player, gameResults, isLoading } =
    useGetPlayerData(playerId);

  if (isLoading) return <Loader size='lg' />;

  return (
    <>
      <Button variant='ghost' asChild className='mb-6'>
        <Link to='/players'>
          <ArrowLeft />
          Back to Players List
        </Link>
      </Button>

      <PLayerStats data={player} />

      <PlayerDashboard data={dashboard} />
      <ResultGames data={gameResults} />
    </>
  );
}
