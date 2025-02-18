import { LeaderBoard, RecentGames } from '@/components/tables';
import { Statistics } from '@/components/statistics';
import { Title } from '@/components/title';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <Title
        title='Poker Stats Pro'
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
