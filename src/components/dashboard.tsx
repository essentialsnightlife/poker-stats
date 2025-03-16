import { Trophy, Users, Medal } from 'lucide-react';
import { TPlayerDashboard } from '@/types/players';
import { Box } from './box';

export function PlayerDashboard({ data }: { data?: TPlayerDashboard }) {
  if (!data) return null;

  return (
    <div className='mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <Box
        title='Games Played'
        value={data.games_played}
        icon={Users}
        color='text-green-500'
        description='Total games'
      />
      <Box
        title='Total Wins'
        value={data.total_wins}
        icon={Trophy}
        color='text-yellow-500'
        description='Career victories'
      />
      <Box
        title='Top 2 Finishes'
        value={data.top_2_finishes}
        icon={Medal}
        color='text-blue-500'
        description='1st or 2nd place'
      />
    </div>
  );
}
