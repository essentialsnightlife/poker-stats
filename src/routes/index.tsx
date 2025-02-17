import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, TrendingUp, DollarSign } from 'lucide-react';
import { LeaderBoard, RecentGames } from '@/components/tables';

const stats = [
  {
    title: 'Current Ranking',
    value: '#3',
    icon: Trophy,
    description: 'Top 1% of players',
  },
  {
    title: 'Total Winnings',
    value: '$12,345',
    icon: DollarSign,
    description: '+15% from last month',
  },
  {
    title: 'Win Percentage',
    value: '68%',
    icon: TrendingUp,
    description: '180 games played',
  },
  {
    title: 'Average Points',
    value: '89',
    icon: Users,
    description: 'Per game',
  },
];

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='space-y-6'>
      <RecentGames limit={3} />
      <LeaderBoard />

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className='items-center justify-between'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <stat.icon className='text-muted-foreground size-4' />
            </CardHeader>
            <div className='text-2xl font-bold'>{stat.value}</div>
            <p className='text-muted-foreground text-xs'>{stat.description}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
