import { RecentGames } from '@/components/tables';
import { Title } from '@/components/title';
import { ROUTES } from '@/lib/constants';

export const Route = createFileRoute(ROUTES.games)({
  component: Games,
});

function Games() {
  return (
    <>
      <Title title='Recent Poker Games' desc='View the latest poker results' />
      <RecentGames />
    </>
  );
}
