import { TPlayer } from '@/types/players';
import { supabase } from './api';
import { useQuery } from '@tanstack/react-query';

const getLeaderboard = async (): Promise<TPlayer[]> => {
  const { data } = await supabase.from('leaderboard_2025').select();

  return data as TPlayer[];
};

export const useGetLeaderboard = () =>
  useQuery({
    queryKey: ['leaderboard_2025'],
    queryFn: getLeaderboard,
  });
