import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Trophy,
  Users,
  Calendar,
  Percent,
  Medal,
  Hash,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TPlayerDashboard } from '@/types/players';

export function PlayerDashboard({ data }: { data?: TPlayerDashboard }) {
  if (!data) return null;

  return (
    <div className='mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      <DashboardCard
        title='Total Wins'
        value={data.total_wins}
        icon={Trophy}
        color='text-yellow-500'
        description='Career victories'
      />
      <DashboardCard
        title='Top 2 Finishes'
        value={data.top_2_finishes}
        icon={Medal}
        color='text-blue-500'
        description='1st or 2nd place'
      />
      <DashboardCard
        title='Games Played'
        value={data.games_played}
        icon={Users}
        color='text-green-500'
        description='Total games'
      />
      <DashboardCard
        title='Win Percentage'
        value={`${(data.win_percentage * 100).toFixed(1)}%`}
        icon={Percent}
        color='text-purple-500'
        description='Success rate'
      />
      <DashboardCard
        title='Player ID'
        value={`#${data.player_id}`}
        icon={Hash}
        color='text-green-400'
        description='Player info'
      />
      <DashboardCard
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

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description: string;
  color: string;
}

function DashboardCard({
  icon: Icon,
  description,
  color,
  title,
  value,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className='items-center justify-between'>
        <CardTitle className='text-lg font-medium sm:text-sm'>
          {title}
        </CardTitle>
        <Icon className={cn('size-5', color)} />
      </CardHeader>
      <span className='text-2xl font-bold'>{value}</span>
      <p className='text-muted-foreground text-xs'>{description}</p>
    </Card>
  );
}
