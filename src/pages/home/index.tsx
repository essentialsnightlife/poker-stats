import { RankingTable } from '@/components/ranking';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetPlayers } from '@/lib/services/players';

export const Home = () => {
  const { data, isLoading } = useGetPlayers();

  return (
    <div className='space-y-5'>
      {isLoading ? (
        <Skeleton className='h-5 w-full max-w-96' />
      ) : (
        <ul className='flex gap-2'>
          {data?.map((item) => <li key={item.name}>{item.name}</li>)}
        </ul>
      )}
      <RankingTable />
    </div>
  );
};
