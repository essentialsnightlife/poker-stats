import { useGetGameStatistics } from '@/lib/services/players';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  DollarSign,
  ShoppingCart,
  RefreshCw,
  LucideIcon,
} from 'lucide-react';
import { cn, priceFormatter } from '@/lib/utils';

export function Statistics() {
  const { data } = useGetGameStatistics();

  if (!data) return null;
  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <StatCard
        title='Total Games Played'
        value={data.total_games_played}
        icon={Users}
        color='text-blue-500'
        description='Number of games participated'
      />
      <StatCard
        title='Total Spend on Games'
        value={priceFormatter(data.total_spend_on_games)}
        icon={DollarSign}
        color='text-green-500'
        description='Total amount spent on games'
      />
      <StatCard
        title='Total Buy-ins'
        value={data.total_buy_ins}
        icon={ShoppingCart}
        color='text-purple-500'
        description='Number of initial buy-ins'
      />
      <StatCard
        title='Total Rebuys'
        value={data.total_rebuys}
        icon={RefreshCw}
        color='text-orange-500'
        description='Number of additional buy-ins'
      />
    </div>
  );
}

interface StatCardProps {
  color: string;
  title: string;
  value: number | string;
  icon: LucideIcon;
  description: string;
}

function StatCard({
  color,
  title,
  value,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center justify-between gap-1'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className={cn('size-4', color)} />
      </CardHeader>

      <div className='mt-auto'>
        <h4 className='text-2xl font-bold'>{value}</h4>
        <p className='text-muted-foreground text-xs'>{description}</p>
      </div>
    </Card>
  );
}
