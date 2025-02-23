import { Loader } from '@/components/ui/loader';
import { useGetDetailedResults } from '@/lib/services/players';
import { redirect } from '@tanstack/react-router';
import { Rankings } from '@/components/tables';
import { ROUTES } from '@/lib/constants';
import { Game } from '@/components/game';

export const Route = createFileRoute(ROUTES.gameId)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { gameId } = params;

    if (!gameId || !/^\d+$/.test(gameId)) {
      throw redirect({ to: '/games' });
    }

    return { gameId: Number(gameId) };
  },
  pendingComponent: () => <Loader size='lg' />,
  errorComponent: () => <div>Error</div>,
});

function RouteComponent() {
  const { gameId } = Route.useLoaderData();
  const { data, isLoading } = useGetDetailedResults(gameId);

  if (isLoading) return <Loader size='lg' />;
  if (!data) return null;

  return (
    <Game data={data}>
      <Rankings gameId={gameId} />
    </Game>
  );
}
