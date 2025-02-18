import { PlayersTable } from '@/components/tables';
import { Title } from '@/components/title';

export const Route = createFileRoute('/players/')({
  component: Players,
});

function Players() {
  return (
    <>
      <Title
        title='All players'
        desc='Browse through the list of poker players and select a player to view their stats for the season.'
      />
      <PlayersTable />
    </>
  );
}
