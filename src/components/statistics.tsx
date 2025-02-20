import { useGetGameStatistics } from '@/lib/services/players';
import { Users, ShoppingCart, PoundSterling, RefreshCw } from 'lucide-react';
import { priceFormatter } from '@/lib/utils';
import { Box } from './box';

export function Statistics() {
  const { data } = useGetGameStatistics();

  if (!data) return null;
  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <Box
        title='Total Games Played'
        value={data.total_games_played}
        icon={Users}
        color='text-blue-500'
        description='Number of games participated'
      />
      <Box
        title='Total Spend on Games'
        value={priceFormatter(data.total_spend_on_games)}
        icon={PoundSterling}
        color='text-green-500'
        description='Total amount spent on games'
      />
      <Box
        title='Total Buy-ins'
        value={data.total_buy_ins}
        icon={ShoppingCart}
        color='text-purple-500'
        description='Number of initial buy-ins'
      />
      <Box
        title='Total Rebuys'
        value={data.total_rebuys}
        icon={RefreshCw}
        color='text-orange-500'
        description='Number of additional buy-ins'
      />
    </div>
  );
}
