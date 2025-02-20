import { LeaderBoard, RecentGames } from '@/components/tables';
import { Statistics } from '@/components/statistics';
import { Title } from '@/components/title';
import { ROUTES } from '@/lib/constants';

export const Route = createFileRoute(ROUTES.home)({
  component: Index,
});

function Index() {
  return (
    <>
      <Title
        title='PokerStats'
        desc=' Elevate your game with advanced analytics and insights'
      />

      <div className='space-y-4'>
        <RecentGames limit={3} />
        <LeaderBoard />
        <Statistics />
      </div>
    </>
  );
}
