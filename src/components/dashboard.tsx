import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Calendar, Percent, Medal, Hash } from 'lucide-react';
import { useGetPlayerDashboard } from '@/lib/services/players';

export type TPlayerDashboard = {
  player_id: number;
  name: string;
  total_wins: number;
  top_2_finishes: number;
  games_played: number;
  days_since_last_win: number;
  win_percentage: number;
};

export function PlayerDashboard({ playerId }: { playerId: number }) {
  const { data } = useGetPlayerDashboard(playerId);

  if (!data) return null;

  return (
    <div className='mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      <DashboardCard
        title='Total Wins'
        value={data.total_wins}
        icon={<Trophy className='size-4 text-yellow-500' />}
        description='Career victories'
      />
      <DashboardCard
        title='Top 2 Finishes'
        value={data.top_2_finishes}
        icon={<Medal className='size-4 text-blue-500' />}
        description='1st or 2nd place'
      />
      <DashboardCard
        title='Games Played'
        value={data.games_played}
        icon={<Users className='size-4 text-green-500' />}
        description='Total games'
      />
      <DashboardCard
        title='Win Percentage'
        value={`${(data.win_percentage * 100).toFixed(1)}%`}
        icon={<Percent className='size-4 text-purple-500' />}
        description='Success rate'
      />
      <DashboardCard
        title='Player ID'
        value={`#${playerId}`}
        icon={<Hash className='size-4 text-green-400' />}
        description='User id'
      />
      <DashboardCard
        title='Days Since Last Win'
        value={data.days_since_last_win}
        icon={<Calendar className='text-muted-foreground h-4 w-4' />}
        description={
          data.days_since_last_win === 0
            ? 'Won today!'
            : data.days_since_last_win === 1
              ? 'Last won yesterday'
              : `Last won ${data.days_since_last_win} days ago`
        }
      />
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description: string;
}

function DashboardCard({
  title,
  value,
  icon,
  description,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-lg font-medium sm:text-sm'>
          {title}
        </CardTitle>
        <div className='bg-secondary rounded-full p-2'>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-muted-foreground text-xs'>{description}</p>
      </CardContent>
    </Card>
  );
}
