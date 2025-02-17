import { PlayersTable } from '@/components/tables';

export const Route = createFileRoute('/players/')({
  component: Players,
});

function Players() {
  return <PlayersTable />;
}
