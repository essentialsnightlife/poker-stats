import { RecentGames } from '@/components/tables';

export const Route = createFileRoute('/games/')({
  component: Games,
});

function Games() {
  return <RecentGames />;
}
