import { Trophy, Users, Calendar, Medal } from 'lucide-react';
import { TPlayerDashboard } from '@/types/players';
import { Box } from './box';

export function PlayerDashboard({ data }: { data?: TPlayerDashboard }) {
  if (!data) return null;

  return (
    <div className='mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
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

      <Box
        title='Days Since Last Win'
        value={data.days_since_last_win || 'N/A'}
        color='text-muted-foreground'
        icon={Calendar}
        description={
          data.days_since_last_win === 0
            ? 'Won today!'
            : data.days_since_last_win === 1
              ? 'Last won yesterday'
              : data.days_since_last_win
                ? `Last won ${data.days_since_last_win} days ago`
                : 'N/A'
        }
      />
    </div>
  );
}
