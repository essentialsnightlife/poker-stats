import { LeaderBoard, RecentGames } from '@/components/tables';
import { Statistics } from '@/components/statistics';
import { Title } from '@/components/title';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button.tsx';
import { onShareButtonClick } from '@/lib/utils.ts';

export const Route = createFileRoute(ROUTES.home)({
  component: Index,
});

function onButtonClick() {
  onShareButtonClick();
}

function Index() {
  return (
    <>
      <Title
        title='PokerStats'
        desc=' Elevate your game with advanced analytics and insights'
      />

      <div className='space-y-4'>
        <RecentGames limit={3} />
        <Button onClick={onButtonClick} className='mb-6'>
          Share Leaderboard
        </Button>
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
