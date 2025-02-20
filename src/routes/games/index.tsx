import { RecentGames } from '@/components/tables';
import { Title } from '@/components/title';
import { ROUTES } from '@/lib/constants';

export const Route = createFileRoute(ROUTES.games)({
  component: Games,
});

function Games() {
  return (
    <>
      <Title
        title='Recent Games'
        desc='Explore the latest poker games, their outcomes, and player performances. Stay updated with the most recent results'
      />
      <RecentGames />
    </>
  );
}
