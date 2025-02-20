import { PlayersTable } from '@/components/tables';
import { Title } from '@/components/title';
import { ROUTES } from '@/lib/constants';

export const Route = createFileRoute(ROUTES.players)({
  component: Players,
});

function Players() {
  return (
    <>
      <Title
        title='Players'
        desc='Browse through the list of poker players and select a player to view their stats for the season.'
      />
      <PlayersTable />
    </>
  );
}
