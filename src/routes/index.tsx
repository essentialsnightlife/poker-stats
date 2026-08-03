import { LeaderBoard, RecentGames } from '@/components/tables';
import { Statistics } from '@/components/statistics';
import { Title } from '@/components/title';
import { ROUTES } from '@/lib/constants';
import type { LeaderBoardSeason } from '@/components/tables/leader-board';

export const Route = createFileRoute(ROUTES.home)({
  component: Index,
});

function Index() {
  const [selectedSeason, setSelectedSeason] =
    useState<LeaderBoardSeason>('all');

  return (
    <>
      <Title title='PokerStats' desc='Analytics for the crew' />
      <div className='space-y-4'>
        <RecentGames limit={3} />
        <LeaderBoard
          selectedSeason={selectedSeason}
          onSeasonChange={setSelectedSeason}
        />
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
          <LeaderBoard selectedSeason={selectedSeason} showControls={false} />
          <Statistics />
        </div>
      </div>
    </>
  );
}
