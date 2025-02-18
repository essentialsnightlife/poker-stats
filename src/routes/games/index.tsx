import { RecentGames } from '@/components/tables';
import { Title } from '@/components/title';

export const Route = createFileRoute('/games/')({
  component: Games,
});

function Games() {
  return (
    <>
      <Title
        title='Recent Games'
        desc='Explore the latest poker games, their outcomes, and player performances. Stay updated with the most recent results.'
      />
      <RecentGames />
    </>
  );
}
