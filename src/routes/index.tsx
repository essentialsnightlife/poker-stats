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
      <Title title='PokerStats' desc='Analytics for the crew' />
      <div className='space-y-4'>
        <RecentGames limit={3} />
        <LeaderBoard />
        <Statistics />
        <div
          id='shareDiv'
          className='space-y-4'
          style={{
            display: 'none',
            width: '1200px',
            padding: '20px',
            backgroundColor: '#1a1a1a',
            borderRadius: '10px',
          }}
        >
          <LeaderBoard />
          <Statistics />
        </div>
      </div>
    </>
  );
}
